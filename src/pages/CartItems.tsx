import { useDispatch, useSelector } from "react-redux"
import { Navbar } from "../components/Navbar"
import type { RootState } from "../store";
import { useEffect } from "react";

export default function CartItems() {
    const items = useSelector((state:RootState)=> state.cart.items);
    useEffect(() => {
  console.log("📦 Cart items from store:", items);
}, [items]);
  return (
    <>
    <Navbar/>   
    <div>
        <ul>
            <div>
                {items.map((currItem, index)=>{
                    return <li key={index}>
                        <div>
                            <div>
                                
                            </div>
                        </div>
                    </li>
                })}
            </div>
        </ul>
    </div>
    </>
  )
}
