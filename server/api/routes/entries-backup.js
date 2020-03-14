const express = require("express");
const router = express.Router();
const moment = require("moment");
const Entry = require("../models/entry");
const Stock = require("../models/stock");
const User = require("../models/user");
const Product = require("../models/product");

const mongoose = require("mongoose");
const formatResponse = require("../utils/formatResponse");

const addEntry = async (req,res,next) => {
    let product = [];
    let user = [];
    let stock = [];
    let remaining = 0;
    let taken = undefined;
    let consumed = undefined;
    let returned = undefined;

    await Product.findById(req.body.product_id).exec().then(result => {
        product = result;
    }).catch(error => {
        console.log(error)
    });

    await User.findById(req.body.user_id).exec().then(result => {
        user = result;
    }).catch(error => {
        console.log(error)
    });

    await Stock.findOne({ product_id: req.body.product_id, user_id: req.body.user_id }).exec().then(result => {
        stock = result;
        console.log("test if stock is coming correct",stock)
    }).catch(error => {
        console.log(error)
    });
    if (req.body.entry_type === "taken") {
        remaining = Number(stock.bag_value) + Number(req.body.entry_value);
        taken = Number(req.body.entry_value)
    } else if (req.body.entry_type === "consumed") {
        remaining = Number(stock.bag_value) - Number(req.body.entry_value);
        consumed = Number(req.body.entry_value)
    } else if (req.body.entry_type === "returned") {
        remaining = Number(stock.bag_value) - Number(req.body.entry_value);
        returned = Number(req.body.entry_value)
    } else {
        remaining = Number(stock.bag_value)
    }
    await Stock.findOne({ product_id: req.body.product_id, user_id: req.body.user_id }).exec().then(result => {
        stock = result;
        result.bag_value = remaining;
        result.save()
    }).catch(error => {
        console.log(error)
    });

    const entry = new Entry({
        _id: new mongoose.Types.ObjectId(),
        user_id: req.body.user_id,
        product_id: req.body.product_id,
        product_name: product.name,
        user_name: user.name,
        entry_type: req.body.entry_type,
        entry_value: req.body.entry_value,
        taken: taken || 0,
        consumed: consumed || 0,
        returned: returned || 0,
        remaining: Number(remaining),
        created_at: moment().format("DD-MM-YYYY hh:mm:ss A")
    });
    return entry;
}

const updateEntry = async (req,res,next) => {
    let product = [];
    let user = [];
    let entry = [];
    // var stock = [];
    let remaining = 0;
    let taken = undefined;
    let consumed = undefined;
    let returned = undefined;
console.group("update entry:")
    await Product.findById(req.product_id).exec().then(result => {
        product = result;
    }).catch(error => {
        console.log(error)
    });

    await User.findById(req.user_id).exec().then(result => {
        user = result;
    }).catch(error => {
        console.log(error)
    });

 await Stock.findOne({ product_id: req.product_id, user_id: req.user_id }).exec().then( async result => {
        stock = await result;
        if (req.entry_type === "taken") {
            console.log("test karo kon pehle chalta hai if")
            console.log(stock.bag_value,"taken case bag_value");
            console.log(req.entry_value,"taken case entry value");
            remaining = Number(stock.bag_value) + Number(req.entry_value);
            taken = Number(req.entry_value)
        } else if (req.entry_type === "consumed") {
            console.log("test karo kon pehle chalta hai if")
            remaining = Number(stock.bag_value) - Number(req.entry_value);
            consumed = Number(req.entry_value)
        } else if (req.entry_type === "returned") {
            remaining = Number(stock.bag_value) - Number(req.entry_value);
            returned = Number(req.entry_value)
        } else {
            remaining = Number(stock.bag_value)
        }
        console.log("test karo kon pehle chalta hai stock>>>>>>>>>>>>",result)
        console.log("stock retrieved")
    }).catch(error => {
        console.log(error)
    });

    // const getStock = await Stock.findOne({ product_id: req.product_id, user_id: req.user_id })
    await  Stock.findOne({ product_id: req.product_id, user_id: req.user_id }).exec().then(async result => {
        console.log(result,"stock in update entry beofre update");
        result.bag_value = remaining;
        console.log(stock,"stock in update entry after update")
        await result.save().then((result) => {

            console.log("test result after stock save",result);
        }).catch(error => {
            console.log("error while updating stock table",error)
        });

        console.groupEnd();
        return entry;
    }).catch(error => {
        console.log(error)
    });
    entry = new Entry({
        _id: new mongoose.Types.ObjectId(),
        user_id: req.user_id,
        product_id: req.product_id,
        product_name: product.name,
        user_name: user.name,
        entry_type: req.entry_type,
        entry_value: req.entry_value,
        taken: taken || 0,
        consumed: consumed || 0,
        returned: returned || 0,
        remaining: Number(remaining),
        created_at: moment(req.created_at,"DD-MM-YYYY hh:mm:ss A").format("DD-MM-YYYY hh:mm:ss A")
    });
resolve(entry);

}


router.get(("/"), async (req, res, next) => {
    Entry.find().exec().then(result => {
        res.status(200).json(formatResponse(true, "entries retrieved successfully", { entries: result }));
    }).catch(error => {
        res.status(500).json(formatResponse(false, `error occured while retrieving entries: ${error}`))
    });
});

router.post(("/"), async (req, res, next) => {
const entry = await addEntry(req, res, next);
    entry.save().then((result) => {
        res.status(201).json(formatResponse(true, "entry created successfully", { createdEntry: entry }));
    }).catch(error => {
        res.status(500).json(formatResponse(false, `error while creating entry: ${error}`));
    });
});

router.delete(("/:entryId"), (req, res, next) => {
    const id = req.params.entryId;
    Entry.findByIdAndRemove(id).exec().then(response => {
        res.status(200).json({
            message: "entry deleted successsfully",
            id: response.id
        });
    }).catch(error => {
        res.status(500).json(formatResponse(false, `error while deleting entry: ${error}`));
    })
});


// router.get(("/:productId"),(req, res, next) => {
//     const id = req.params.productId;
//     Product.findById(id).exec().then(product => {
//         console.log(product)
//         res.status(200).json({product:product});
//     }).catch(error => {console.log(error)})
// });

router.put(("/"),async (req, res, next) => {
    await Entry.aggregate(
        [{
            $match: {
                user_id: req.body.user_id,
                product_id: req.body.product_id,
                created_at: { $gte: req.body.created_at }
            }
        },
            // {$group:{
            //     _id:"$_id",total:{$sum:{$add: ["$consumed", "$returned"]}}
            // }},

            // { $project: {
            //     total: { $add: ["$consumed", "$returned"] }
            // }}
        ]
    ).exec(async (err, result) => {
        console.group("put call")
        console.log(result,"queried result");
        if(result.length !== 0){
        let prevBagValue = null;
        if (result.length !== 0 && result[0].entry_type === "taken") {
            prevBagValue = result[0].remaining - result[0].taken
        } else {
            prevBagValue = result[0].remaining + result[0][result[0]["entry_type"]]
        }
        console.log("prevBagValue:",prevBagValue)
        await Stock.findOne({ product_id: result[0].product_id, user_id: result[0].user_id }).exec().then(async result => {
            stock = await result;
            result.bag_value = prevBagValue;
            console.log(result,"findone stock")
            result.save()
        }).catch(error => {
            console.log(error)
        });

        console.log(prevBagValue, "prevBagValue");
        const test = await result.reduce((acc, item, index) => {
            const updatedItem = {
                _id:item._id,
                user_id: item.user_id,
                entry_type: item.entry_type,
                entry_value: item.entry_value,
                product_id: item.product_id,
                created_at:item.created_at
            }
             acc.push(updatedItem);
            return acc;
        }, []);
        console.log("updated items:",test);
        const recordsTobeDeleted = test.map((item) => {
            return item._id
        });
    console.log("recordsTobeDeleted:",recordsTobeDeleted);
        await Entry.deleteMany({ _id: { $in: recordsTobeDeleted}}, async (err,result) => {
            if(err){
                console.log(err);
            }else{
                console.log(result,"delete success result");
                await next();
            }
        })
         test[0].entry_type = req.body.entry_type;
         test[0].entry_value = req.body.entry_value;
        let inserted = 0;
        let error = ""
        console.log("updated test with entry type and value:",test);
        console.groupEnd("put call end");
        test.forEach(async (item,index) => {
            console.group("for loop:")
            console.log("item to be added payload:",item)
             await updateEntry(item).then((result) => {
                result.save().then((result) => {
                    console.log("inserted result",result)
                    console.groupEnd();
                    inserted++;
                    // res.status(201).json(formatResponse(true, "entry created successfully", { createdEntry: entry }));
                }).catch(error => {
                    console.log("error while insert")
                    error = error
                    // res.status(500).json(formatResponse(false, `error while creating entry: ${error}`));
                });
            }).catch(error => {console.log(error,"error")});
            console.log("entry to be inserted:",)
       
        });
        res.status(201).json(formatResponse(true, `${inserted} entries created successfully`));
        res.status(500).json(formatResponse(false, `error while inserting: ${error}` ));



        // isTakenCaseValid = result.total < bag_value;
        // console.log(result,"result",err,isTakenCaseValid)
    }else{
        res.status(500).json(formatResponse(false,"no matching records found"))
    }
    })

    // console.log("test",test);
    //test end
    // let message = "product edited"
    // if(req.params.productId === "specific"){
    //     message = "specific product edited"
    // }
    // res.status(200).json({
    //     messaage:message
    // });
});

module.exports = router;