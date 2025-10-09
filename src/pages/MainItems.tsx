import { useEffect, useState } from "react";
import { ItemCard } from "../components/ItemCard";
import type { Product } from "../types";
import { Navbar } from "../components/Navbar";


export default function MainItems() {
     const [items, setItems] = useState<Product[]>([]);
     const [searchItems, setSearchItems] = useState<string>("");
     const [searchToggle, setsearchToggle] = useState(false);
    
     async function fetchData(){
        try{const url = "https://dummyjson.com/products";
        const response = await fetch(url);
        const data = await response.json();
        setItems(data.products);       
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
           return title.includes(search) || category.includes(search);
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
       
    console.log(items);

    
    
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
