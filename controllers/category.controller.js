const Category = require('../models/category');


exports.createCategory = async (req, res) => {
    try{
        const {name} = req.body;

        if(!name) return res.status(400).json({msg:"Category name is required"});

        const existing = await Category.findOne({ name });

        if(existing) return res.status(400).json({msg:"Category already exists"});



        const category = await Category.create({name});
        res.status(200).json({msg:"Category is been Created", category});
    }catch(error){
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
}


exports.getallCategory = async (req, res) => {
    try{
        let category = await Category.find({isActive:true});

        res.status(200).json({category});
    }catch(error){
        res.status(500).json({msg:"Server error"})
    }
}


// exports.deleteCategory = async (req, res) => {
//     try{
//         const {categoryId} = req.parama
//     }
// }