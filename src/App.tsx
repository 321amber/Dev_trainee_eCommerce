import { useEffect, useState } from 'react'
import './App.css'

import { ItemCard } from './components/ItemCard';
import { Navbar } from './components/Navbar';

function App() {
  const [items, setItems] = useState<any[]>([]);

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
    <>
      <nav>
        <Navbar/>
      </nav>
      <main>
      <ul className='products-grid'>
        {items.map((currItem, index)=>{
          return <li key={index}>
              <ItemCard item={currItem}/>
          </li>
        })}
      </ul>     
      </main>
    </>
  )
}

export default App
