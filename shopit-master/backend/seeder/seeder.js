import mongoose from "mongoose";
import Product from "../models/product.js";
import products from "./data.js";

const seedProducts = async () => {
    try{
        
        await mongoose.connect("mongodb+srv://fahadchacha0:chacha_123@shopit.aptad.mongodb.net/shopit?retryWrites=true&w=majority&appName=shopit");

        await Product.deleteMany();
        console.log('Products are deleted');

        await Product.insertMany(products);
        console.log('Products are Added');
        process.exit();
    }catch(err){
        console.log(err.message);
        process.exit();
    }
}

seedProducts();