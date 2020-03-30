var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var Property = require('./models/property');
var User = require('./models/user');
var fs=require('fs')
var imgbbUploader = require('imgbb-uploader');
mongoose.connect("mongodb+srv://nipun:nipun@cluster0-wsbzn.mongodb.net/test?retryWrites=true&w=majority")
    .then(() => {
        console.log('enjoy buddy')
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
//create a property 
app.post('/addProperty', upload.single('Image'), async (req, res) => {
    
    console.log(req.file.path)

    console.log(req.body.userId)
   await imgbbUploader("3c85336ea4a28e4419f4776bbdd78290", req.file.path)
        .then((response) => {
            fs.unlinkSync(req.file.path)
            //   console.log(response)
            console.log(response)
            if(response.url){
                console.log('errr');

            }
                const newProperty = new Property({
                    State: req.body.State,
                    HouseNo: req.body.HouseNo,
                    City: req.body.City,
                    Price: req.body.Price,
                    userId: req.body.userId,
                    ImageUrl:response.url
                })
                newProperty.save((err, newEntry) => {
                    console.log(newEntry, err)
                    if (err) {
                        res.status(404).send({ response: false });
                    } else {
                        res.status(200).send({response:true})
                    }
                })
        })
        .catch((err)=>{
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

//delete a property

app.delete('/property/:id', (req, res) => {
    Property.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            //console.log(err);
            res.status(400).send();
        } else {
            //console.log(data);
            res.status(200).send();
        }
    })

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

// listening route
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})