const db = require('../db')
exports.craeteProduct = async (req,res)=>{
    const {id, title, description, stock, catagory, price, rating} = req.body;
    const image_url = `/uploads/${req.file.filename}`;

    const query = "INSERT INTO products (id, title, description, stock, category, price, rating, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING*"

    try{
        const result = await db.query(query, [id, title, description, stock, catagory, price, rating, image_url]);
        res.status(200).json(result.rows);
    }
    catch(error){
        res.status(501).json({error: error.message});
    }

}


exports.getProducts = async (req,res)=>{
    const query = "SELECT * FROM products";

    try{
        const results = await db.query(query);
        res.status(201).json(results.rows);
    }
    catch(error){
         res.status(500).json({error:error.message})
    }
}