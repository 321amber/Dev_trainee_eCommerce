import type { RootState } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux"

export const Navbar = () => {
  const items = useSelector((state:RootState)=> state.cart.items);
  return (
    <nav className="navbar">
      <div>
        SimpleMart
      </div>
      <div>
        <a href="/">Home</a>
        <a href="/">Contacts</a>
        <a href="/">About</a>
      </div>
      <div>
        <p style={{'color':'red', 'marginRight':'20px'}}>cart: {items.length}</p>
      </div>
    </nav>
  )
}


