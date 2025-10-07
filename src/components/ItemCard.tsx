interface productDetails{
    availabilityStatus: string,
    brand:string,
    catagory: string,
    price: number,
    rating: number,
    title: string,
    images:[],
    description:string
}
export const ItemCard = (prop:productDetails) => {
    const {availabilityStatus, price, rating, title, images,description} = prop.item;
    console.log(prop);
    
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
            
        <div>
        <div>
            <p>{availabilityStatus}</p>
        </div>
        <div className="bottom-card">
            <p className="product-price">price: ₹{Math.floor(price * 88)}</p>
            <button>ADD TO CART</button>
        </div>
        </div>
       </div>
    </div>
  )
}

