const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const User  =require("../models/user");
const Stock = require("../models/stock")
const mongoose = require("mongoose");
const formatResponse = require("../utils/formatResponse");

router.get(("/"),(req, res, next) => {
    Product.find().exec().then(result => {
        res.status(200).json(formatResponse(true,"product retrieved successfully",{products:result}));
    }).catch(error => {
        res.status(500).json(formatResponse(false,`error occured while retrieving product: ${error}`))
    });
});

router.post(("/"),async (req, res, next) => {
    const product = new Product({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name
    });
    let users = [];
    await User.find().exec().then(result => {
        users = result;
    }).catch(error => {
        console.log(error)
    });
    console.log(users);
    product.save().then((result) => {
        const stock = users.map((user) => {
            return {
                product_id:product._id,
                user_id:user._id,
                user_name:user.name,
                product_name:product.name,
                bag_value:0
            }
        })
        Stock.collection.insert(stock).then(result => {
            console.log("result",result)
        }).catch(error => {
            console.log(error);
        });
        res.status(201).json(formatResponse(true,"product created successfully",{createdProduct:product}));
    }).catch(error => {
        res.status(500).json(formatResponse(false,`error while creating product: ${error}`));        
    });
});

router.delete(("/:productId"),(req, res, next) => {
    const id = req.params.productId;
    Product.findByIdAndRemove(id).exec().then(response => {
        res.status(200).json({
            message:"product deleted successsfully",
            id: response.id
        });
    }).catch(error => {
        res.status(500).json(formatResponse(false,`error while deleting product: ${error}`));
    })
});

// router.get(("/:productId"),(req, res, next) => {
//     const id = req.params.productId;
//     Product.findById(id).exec().then(product => {
//         console.log(product)
//         res.status(200).json({product:product});
//     }).catch(error => {console.log(error)})
// });

// router.patch(("/:productId"),(req, res, next) => {
//     let message = "product edited"
//     if(req.params.productId === "specific"){
//         message = "specific product edited"
//     }
//     res.status(200).json({
//         messaage:message
//     });
// });

module.exports = router;
