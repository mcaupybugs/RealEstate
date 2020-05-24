var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var Property = require('./models/property');
var User = require('./models/user');
var fs = require('fs')
var imgbbUploader = require('imgbb-uploader');

mongoose.connect("mongodb+srv://nipun:nipun@cluster0-wsbzn.mongodb.net/test?retryWrites=true&w=majority")
    .then(() => {
        console.log('enjoy buddy')
    })
    .catch((err) => {
        console.log(err)
    })

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage })
app.post('/addProperty', upload.single('Image'), async (req, res) => {
    console.log(req.file.path)
    console.log(req.body.userId)
    await imgbbUploader("3c85336ea4a28e4419f4776bbdd78290", req.file.path)
        .then(async (response) => {
            fs.unlinkSync(req.file.path)
            //   console.log(response)
            console.log(response)
            if (response.url) {
                console.log('errr');
            }
            let person_name = '';
            await User.findOne({ userId: req.body.userId })
                .then((doc) => {
                    if (doc) {
                        person_name = doc.name;
                    }
                })
                .catch((err) => {
                    console.log('err in selecting person name in adding property')
                })
            if (person_name != undefined) {
                const newProperty = new Property({

                    State: req.body.State,
                    HouseNo: req.body.HouseNo,
                    City: req.body.City,
                    Price: req.body.Price,
                    userId: req.body.userId,
                    ImageUrl: response.url,
                    OwnedBy: person_name

                })
                newProperty.save((err, newEntry) => {
                    console.log(newEntry, err)
                    if (err) {
                        res.status(404).send({ response: false });
                    } else {
                        res.status(200).send({ response: true })
                    }
                })
            }
            else{
                console.log('person is undefined')
            }
        })
        .catch((err) => {
            console.log(err)
        })
})
//get the list of all the properties

app.get('/propertyList', (req, res) => {
    //console.log("running");
    Property.find({}, (err, data) => {
        if (err) {
            res.status(404).send();
        } else {
            // console.log(data);
            res.status(200).send(data);
        }
    })
})

//get one property
app.get('/property/:id', (req, res) => {
    //console.log("runninhg");
    //console.log(req.params.id);
    Property.find({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(404).send();
        } else {
            res.status(200).send(data[0]);
        }
    })
})

//update a property

app.patch('/property/:id', (req, res) => {
    //console.log(req.body);
    //console.log(req.params.id);
    Property.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
        if (err) {
            res.status(404).send();
        } else {
            res.status(200).send();
        }
    })
})
app.get('/mycart/:id', async (req, res) => {

    let data = [];
    await Property.find({})
        .then((doc) => {
            doc.map((value) => {
                value.Users_Cart ? value.Users_Cart.map((val) => {
                    if (val == req.params.id) {
                        data.push(value);
                    }
                }) : null;
            })
        })
    res.status(200).json({ data: data });
})
app.post('/delete_from_cart',async (req,res)=>{
    await Property.findById(req.body.property_id)
        .then((doc)=>{
           let arr = doc.Users_Cart.filter((value)=>{
                if(value!=req.body.user_id)
                    return true;
            })
            doc.Users_Cart=arr
            doc.save('done');
            console.log('enjoy');
            res.status(200).json();
        })
        .catch((err)=>{
            console.log('err in catching delete from cart',err)
        })

})
app.post('/mycart/:id', async (req, res) => {
    Property.findOne({ _id: req.body.id })
        .then((doc) => {
            if (doc) {
                if(doc.Users_Cart.includes(req.params.id)){
                    console.log('sdmsdmsm')
                    res.json({'msg':'already exist'})
                }
                else{
                    doc.Users_Cart.push(req.params.id);
                    doc.save('done');
                    res.status(200).json();
                }
            }
        })
        .catch((err) => {
            console.log(err)
        })
})

//delete a property

app.delete('/property/:id', (req, res) => {
    Property.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            res.status(400).send();
        } else {
            res.status(200).send();
        }
    })

})
app.post('/pay', async (req, res) => {
    let total_money = 0;
    let profile_name = '';
    await User.findOne({ userId: req.body.id })
        .then((doc) => {
            if (doc) {
                profile_name = doc.name;
            }
        })
        .catch((err) => {
            console.log('err');
            return res.status(400).json();
        })
    console.log(profile_name, req.body.data)
    req.body.data.map(async (value) => {
        //   console.log(value)
        total_money = total_money + value.Property.Price
        let x = 'ObjectId("' + value.Property._id + '")';
        //   console.log(x)
        await Property.updateMany({ _id: value.Property._id }, { $set: { OwnedBy: profile_name } });
    });
    const items = req.body.id;
    console.log({ items, total_money });
    res.status(200).json();
})
app.post('/newUser', (req, res) => {
    User.exists({ userId: req.body.values.userId }, (err, result) => {
        if (err) {
            res.status(404).send();
            console.log(err);
        } else {
            if (result == true) {
                //   console.log(req.body.values);
                User.findOneAndUpdate({ userId: req.body.values.userId }, req.body, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(404).send();
                    } else {
                        //   console.log("Update");
                        res.status(200).send();
                    }
                })
            } else {
                User.create(req.body.values, (err, data) => {
                    if (err) {
                        console.log(err)
                        res.status(404).send();
                    } else {
                        // console.log("Create");
                        res.status(200).send();
                    }
                })
            }
        }
    })
    res.status(200).send();
})

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})