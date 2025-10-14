const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const productsController = require('./controllers/productController')

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = 3001;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 221);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });



app.post('/products',upload.single("image"),productsController.craeteProduct);
app.get('/products',productsController.getProducts);

app.listen(PORT, ()=>{
    console.log(`the server is running at port ${PORT}`);
    
})