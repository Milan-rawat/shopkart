const express = require('express');
const mongoose =  require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();



// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/cartapp";
// // var url = "mongodb://127.0.0.1:27017/mydb";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var myquery = { address: "Valley 345" };
//   var newvalues = { name: "Mickey", address: "Canyon 123" };
//   db.collection("customers").updateOne(myquery, newvalues, function(err, res) {
//     if (err) throw err;
//     console.log("1 document updated");
//     db.close();
//   });
// });

mongoose.connect('mongodb://localhost:27017/cartapp', {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Succesfully connected to database");
}).catch(err => {
    console.log("Could not connected to database", err);
    process.exit();
})

var db = mongoose.connection;
db.on('error', console.log.bind(console, "connecton error"));
db.once('open', function(callback) {
    console.log("connection succeeded");
})



app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));


var User = require('./models/user');



//---------------function for checking 
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
}

// ----------------live user signup searching------------------
app.use('/api/user/signUpEmailLiveSearch', (req, res) => {
    User.find({email: req.body.email}, function(err, data) {
        if(err) throw err;
        // console.log("  ...  ");
        if(isEmpty(data)){
            // console.log("unique")
            res.send({message:""});
            res.end();
        }
        else {
            // console.log("exists")
            res.send({message:"email already exists", isLoggedIn: false});
            res.end();
        }
    })
});


// ----------------live user signin searching------------------
app.use('/api/user/signInEmailLiveSearch', (req, res) => {
    User.find({email: req.body.email}, function(err, data) {
        if(err) throw err;
        // console.log("  ...  ");
        if(isEmpty(data)){
            // console.log("unique")
            res.send({message:"no account found"});
            res.end();
        }
        else {
            // console.log("exists")
            res.send({message:""});
            res.end();
        }
    })
});



//-------------User Signup---------phone or email exists or not-----------\



// app.use('/api/user/signup', (req, res, next) => {
//     User.find({phone: req.body.phone}, function(err, data) {
//         if(err) throw err;
//         if(isEmpty(data)) {
//             next()
//         }
//         else {
//             res.send({message: "phone alredy exists", isLoggedIn: false});
//             res.end();
//         }
//     })
// });

app.use('/api/user/signup', (req, res, next) => {
    User.find({email: req.body.email}, function(err, data) {
        if(err) throw err;
        // console.log("  ...  ");
        if(isEmpty(data)){
            next()
        }
        else {
            res.send({message:"email already exists", isLoggedIn: false});
            res.end();
        }
    })
});


app.post('/api/user/signup', (req, res) => {
    const newUser = new User ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        // phone: req.body.phone,
        password: req.body.password,
        sell: req.body.sell,
        isLoggedIn: false
    });
    newUser.save(function(err, newUser) {
        if(err) return console.error(err);
        const userResponse = {
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            // phone: newUser.phone,
            sell: newUser.sell,
            isLoggedIn: true
        }
        console.log(userResponse);
        res.send(userResponse);
        res.end();
    });
    console.log(User);
});


//----------------User Signin-------------------------------
app.use('/api/user/signin', (req, res, next) => {
    User.find({email: req.body.email}, function(err, data) {
        if(err) throw err;
        if(isEmpty(data)) {
            res.send({message: "no account found!", isLoggedIn: false});
            res.end();
        }
        else {
            next();
        }
    })
});

app.use('/api/user/signin', (req, res) => {
    User.findOne({email: req.body.email, password: req.body.password}, function(err, data) {
        if(err) throw err;
        if(isEmpty(data)) {
            res.send({message: "Wrong password! Try again.", isLoggedIn: false});
            res.end();
        }
        else {
            const userResponse = {
                _id: data._id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                // phone: data.phone,
                sell: data.sell,
                isLoggedIn: true
            }
            res.send(userResponse);
            res.end();
        }
    })
});


// ----------------sending USer Data------------------

app.use('/api/user/datacourier/userdata', (req, res) => {
    User.findOne({_id: req.body._id}, function(err, data) {
        if(err) throw err
        if(isEmpty(data)) {
            res.send({message: "Something Happen! Account not Found"});
            res.end();
        }
        else {
            const userResponse = {
                _id: data._id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                // phone: data.phone,
                sell: data.sell
            }
            res.send(userResponse);
            res.end();
        }
    });
});



//------------product upload----------------------
app.use('/api/user/productsale', (req, res, next) => {
    const productImage = req.body.productImage;
    // console.log(productImage)
    var d = new Date();
    const product_id =  req.body.productName + d.getFullYear() + (d.getMonth()+1) + d.getDate() + d.getHours() + d.getMinutes() + d.getSeconds() + d.getMilliseconds();
    const productImageName = req.body.productName + "_" + d.getFullYear() + (d.getMonth()+1) + d.getDate() + "_" + d.getHours() + d.getMinutes() + d.getSeconds() + '.jpg';
    var newProduct = {
        product_id: product_id,
        // productImageName: req.body.productImageName,
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productCategory: req.body.productCategory,
        productQuantity: req.body.productQuantity,
        productDescription: req.body.productDescription
    }
    var buf = new Buffer(req.body.productImage, 'base64');

    fs.writeFile('../public/assets/products/' + productImageName ,buf, (err) => {
        if (err) throw err;
        console.log("File written");
    });
	// res.end();


    
    User.findOneAndUpdate({_id: req.body._id},{ $push: { sell: newProduct }}, (err, data) => {
            if(err) throw err;
            if(isEmpty(data)) {
                res.send({message: "Something happened. no account found!"});
                res.end();
            }
            else {
                next();
            }
        }
    );
    
    console.log( newProduct);
});
app.use('/api/user/productsale', (req, res) => {
    User.findOne({_id: req.body._id}, function(err, data) {
            if(err) throw err;
            if(isEmpty(data)) {
                res.send({message: "Something happened. no account found!"});
                res.end();
            }
            else {
                const userResponse = {
                    _id: data._id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    // phone: data.phone,
                    sell: data.sell,
                    prdadded: "ok"
                }
                console.log(userResponse);
                res.send(userResponse);
                res.end();
            }
        }
    );
});

app.use('/api/user/ctgSearched', (req, res) => {
    User.find({}, function(err, data) {

                if(err) throw err;
                if(isEmpty(data)) {
                    res.send({message: "Something happened. no product found!"});
                    res.end();
                }
                else {
                    // const searchResponse = {
                    //     product_id: data.product_id,
                    //     productName: data.productName,
                    //     productPrice: data.productPrice,
                    //     productDescription: data.productDescription,
                    //     productCategory: data.productCategory,
                    //     productQuantity: data.productQuantity
                    // }
                    const products = []
                    
                    // console.log(searchResponse);
                    console.log(req.body.prd);
                    for(let i=0; i<data.length; i++) {
                        // console.log(data[i].firstName)
                        for(let j=0; j<data[i].sell.length; j++) {
                            if(data[i].sell[j].productCategory === req.body.ctgprd) {
                                const tempObj = data[i].sell[j];
                                tempObj.sellerName = data[i].firstName+" "+data[i].lastName;
                                tempObj.seller_id = data[i]._id
                                products.push(tempObj)
                            }
                        }
                    }
                    const newresponse = products.filter(function(item, pos, self) {
                        return self.indexOf(item) == pos;
                    })
                    res.send(newresponse);
                    console.log(newresponse);
                    res.end();
                }

        }
    );
    console.log(req.body)
});



app.use('/api/user/mainSearch', (req, res) => {
    User.find({}, function(err, data) {

                if(err) throw err;
                if(isEmpty(data)) {
                    res.send({message: "Something happened. no product found!"});
                    res.end();
                }
                else {

                    const products = []
                    const splitkeys = req.body.searchedKey.split(" ")
                    console.log(splitkeys);
                    for(let i=0; i<data.length; i++) {
                        for(let j=0; j<data[i].sell.length; j++) {
                            for(let k=0; k<splitkeys.length; k++) {
                                const splitData = data[i].sell[j].productName.split(" ")
                                if(data[i].sell[j].productCategory === splitkeys[k].toString().toUpperCase()) {
                                    const tempObj = data[i].sell[j];
                                    tempObj.sellerName = data[i].firstName+" "+data[i].lastName;
                                    tempObj.seller_id = data[i]._id;
                                    products.push(tempObj)
                                }
                                for(let l=0; l<splitData.length; l++) {
                                    if(splitData[l].toString().toLowerCase() === (splitkeys[k].toString().toLowerCase())) {
                                        const tempObj2 = data[i].sell[j];
                                        tempObj2.sellerName = data[i].firstName+" "+data[i].lastName;
                                        tempObj2.seller_id = data[i]._id
                                        products.push(tempObj2)
                                    }
                                }
                            }
                        }
                    }
                    const newresponse = products.filter(function(item, pos, self) {
                        return self.indexOf(item) == pos;
                    })
                    console.log(newresponse);
                    res.send({data: newresponse, status: "ok"});
                    res.end();
                }

        }
    );
    console.log(req.body)
});


app.listen(5001, function() {
    console.log("Server listening at port 5001");
})