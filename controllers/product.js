const Product = require('../models/product.js')
const slugify = require('slugify')
const jwt = require('jsonwebtoken')
const fs = require("fs");

const create = async (req, res) => {
    try{
        const {name, description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files;

        //validation
        switch(true){
            case !name.trim():
                res.json({error:"Name is required"});
                case !description.trim():
                res.json({error:"Description is required"})
                case !price.trim():
                res.json({error:"Price is required"})
                case !category.trim():
                res.json({error:"Category is required"})
                case !quantity.trim():
                res.json({error:"Quantity is required"})
                case !shipping.trim():
                res.json({error:"Shipping is required"})
                case photo && photo.size > 1000000:
                    res.json({error:"Image should be less than 1mb in size"})
        }
       
        //create product
        const product = new Product({...req.fields, slug:slugify(name)});

        if(photo){
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        
        await product.save();
        res.json(product);

    } catch(err){
        console.log(err)
        return res.status(400).json(err.message);
    }
}

// update  
const update = async (req,res) => {
    try{
        const {name} = req.body;
        const {updateId} = req.params;
        const category = await Category.findByIdAndUpdate(updateId, {
            name, slug:slugify(name),
        },
        {new:true}
        );
        res.json(category);

    } catch(err){
        console.log(err)
        return res.status(400).json( err.message);

    }
}


// delete
const remove = async (req,res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.productId).select("-photo");
        res.json(product);
    } catch(err){
        console.log(err)
        return res.status(400).json(err.message);

    }
};


// get all
const list = async (req,res) => {
    try{
        const products = await Product.find({}).populate("category").select('-photo').limit(3).sort({createdAt:-1});

        res.json(products);
    } catch(err){
        console.log(err)
        return res.status(400).json(err.message);

    }
}


// read
const read = async (req,res) => {
    try{
        const product =  await Product.findOne({slug: req.params.slug}).select("-photo").populate('category');
        res.json(product);

    } catch(err){
        console.log(err)
        return res.status(400).json(err.message);

    }
}


const photo = async (req,res) => {
    try{
        const product = await Product.findById(req.params.productId).select('photo');
        if(product.photo.data){
            res.set("Content-Type",product.photo.contentType);
            return res.send(product.photo.data);
        }
    } catch(err){
        console.log(err)
    }
}

module.exports = {create,update,remove,list,read,photo};