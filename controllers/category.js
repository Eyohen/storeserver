const Category = require('../models/category.js')
const slugify = require('slugify')
const jwt = require('jsonwebtoken')

const create = async (req, res) => {
    try{
        const {name, slug} = req.body;
        if(!name.trim()){
            return res.json({error: "Name is required"});
        }
      const existingCategory = await Category.findOne({name});
      if(existingCategory){
        return res.json({error:"Already exist"})
      }

    const category = await new Category({name, slug: slugify(name)}).save();
    res.json(category);

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
        return res.status(400).json(err.message);

    }
}


// delete
const remove = async (req,res) => {
    try{
        const removed = await Category.findByIdAndDelete(req.params.deleteId);
        res.json(removed);
    } catch(err){
        console.log(err)
        return res.status(400).json(err.message);

    }
};


// get all
const list = async (req,res) => {
    try{
        const all = await Category.find({});
        res.json(all);
    } catch(err){
        console.log(err)
        return res.status(400).json(err.message);

    }
}


// read
const read = async (req,res) => {
    try{
        const category =  await Category.findOne({slug: req.params.slug});
        res.json(category);

    } catch(err){
        console.log(err)
        return res.status(400).json(err.message);

    }
}

module.exports = {create,update,remove,list,read};