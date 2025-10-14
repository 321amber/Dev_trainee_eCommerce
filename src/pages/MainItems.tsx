import { useEffect, useState } from "react";
import { ItemCard } from "../components/ItemCard";
import type { Product } from "../types";
import { Navbar } from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { setProducts } from "../features/ProductSlice";
import { useOutletContext } from "react-router-dom";


type OutletContextType = {
  catagories: string[];
};
export default function MainItems() {
     const items = useSelector((state:RootState)=> state.products.items)
     const [searchItems, setSearchItems] = useState<string>("");
     const [searchToggle, setsearchToggle] = useState(false);
     const {catagories} = useOutletContext<OutletContextType>();
     
    
     const dispatch = useDispatch();
     async function fetchData(){
        try{
        const url = "https://dummyjson.com/products";
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        

        const prodUrl = "http://localhost:3001/products";
        const res = await fetch(prodUrl);
        const prodData = await res.json();
        
        
        const allProducts = [...data.products, ...prodData];
        const newProducts = allProducts.flat(Infinity);
        console.log(newProducts);
        
        // const uniqueProducts = Array.from(
        // new Map(allProducts.map((item) => [item.id, item])).values()
        // );

        dispatch(setProducts(newProducts));

        }
        catch(error){
          console.error("error fetching the api", error);        
        }
      }
    
      useEffect(()=>{
        fetchData();  
      },[])


      const filterItems:Product[] = items.filter((currItem)=> {
        const title:string = currItem.title?.toLowerCase() || "";
        const category:string = currItem.category?.toLowerCase() || "";
        const search:string = searchItems.toLowerCase();
        const matchesSearch =
    title.includes(search) || category.includes(search);

  const matchesCategory =
    catagories.length === 0 || 
    catagories.includes(currItem.category);

  return matchesSearch && matchesCategory;
      }) 

       

      const handleSearch = (e:any)=>{
        e.preventDefault();
        if(searchItems&& filterItems.length===0){
          setsearchToggle(()=>!searchToggle);
          setSearchItems("");
        }
        else{
           setsearchToggle(false);
        }
      }
       
      console.log(filterItems);
      

    
    
  return (
    <>
    <Navbar/>
    
    <main style={{'padding':'80px'}}>
      <div style={{'marginBottom':'30px'}} className="searchBar">
      <input type="text" placeholder="search items..." 
      value={searchItems}
      onChange={(e)=>setSearchItems(e.target.value)}/>
      <button style={{'marginLeft':'30px'}}
      className="searchBarBtn"
      onClick={handleSearch}
      >Search</button>
    </div>
    {searchToggle? (
      <>
        <div>
          <p>No search item found.... Please Retry</p>
        </div>
    </>):
      <ul className='products-grid'>
        {filterItems.length>0?filterItems.map((currItem,index)=>{
          return<li key={index}>
              <ItemCard item={currItem}/>
          </li>
        }):
        items.map((currItem, index)=>{
          return <li key={index}>
              <ItemCard item={currItem}/>
          </li> 
        })
        }
        
      </ul>
}     
      </main>
    </>
  )

}
