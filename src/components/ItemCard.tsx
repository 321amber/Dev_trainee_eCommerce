import { useDispatch } from "react-redux";
import { addItemToCart } from "../features/CartSlice";
import type { Product } from "../types";

interface itemCardProp{
  item:Product
}
export const ItemCard = ({item}:itemCardProp) => {
    const {id,availabilityStatus, price, rating, title, images,description,category} = item;
     const dispatch = useDispatch();

     const handleAddToCart = (e)=>{
        e.preventDefault();
        dispatch(addItemToCart(item));
     }
    
  return (
    <div className="product-card ">
       <div>
            <img 
            src={images[0]} 
            alt={`item image: ${title}`}
            className="product-image" />
       </div>
       <div className="product-content">
            <p className="product-title">{title}</p>
            <a className="product-description">{description.length>40?description.slice(0,40)+"...":description}</a>
            <p>rating: {rating}</p>
            <p>category: {category}</p>
            
        <div>
        <div>
            <p>{availabilityStatus}</p>
        </div>
        <div className="bottom-card">
            <p className="product-price">price: ₹{Math.floor(price * 88)}.00</p>
            <button className="addButton" onClick={handleAddToCart}>ADD TO CART</button>
        </div>
        </div>
       </div>
    </div>
  )
}

