import { useEffect, useState } from "react";
import { ItemCard } from "../components/ItemCard";
import type { Product } from "../types";


export default function MainItems() {
     const [items, setItems] = useState<Product[]>([]);
    
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
       
    console.log(items);
  return (
    <main>
      <ul className='products-grid'>
        {items.map((currItem, index)=>{
          return <li key={index}>
              <ItemCard item={currItem}/>
          </li>
        })}
      </ul>     
      </main>
  )
}
