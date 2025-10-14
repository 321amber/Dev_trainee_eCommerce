import type { RootState } from "../store";
import { useState } from "react";
import { useSelector } from "react-redux";

export const AddProducts = () => {
  const items = useSelector((state:RootState)=> state.products.items); 
  const [formData, setFormData] = useState({
    id: items.length+1,
    title: "",
    price:0,
    stock:"IN STOCK",
    rating:0,
    description: "",
    category: "",
    image: null as File | null,
  });

  console.log(formData);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "image" && files) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("id",formData.id);
    data.append("stock",formData.stock);
    data.append("price", formData.price);
    data.append("rating", formData.rating);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const res = await fetch("http://localhost:3001/products", {
        method: "POST",
        body: data,
      });

      const newProduct = await res.json();
      console.log("Product added:", newProduct);

    } catch (err) {
      console.error("Error uploading product:", err);
    }

    setFormData({
      id : items.length + 1,
      stock: "IN STOCK",
      price: 0,
      rating:0,
      title: "",
      description: "",
      category: "",
      image: null,
    });
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
      <input type="number" name="price" placeholder="price" onChange={handleChange} required />
      <input type="text" name="stock" placeholder="price is in stock?" onChange={handleChange}/>
      <input type="number" name="rating" placeholder="current rating" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
      <input type="file" name="image" accept="image/*" onChange={handleChange} required />
      <button type="submit">Add Product</button>
    </form>
  );
};

