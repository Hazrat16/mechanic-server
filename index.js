const express = require('express')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser')
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t04cp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);
client.connect(err => {
    const servicesCollection = client.db("mechanic").collection("services");
    const bookingsCollection = client.db("mechanic").collection("bookings");
    const reviewCollection = client.db("mechanic").collection("review");
    const adminCollection = client.db("mechanic").collection("admin");


    app.post('/addService', (req, res) => {
        const newService = req.body;
        servicesCollection.insertOne(newService)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
        console.log(newService);
    })
    app.get('/service', (req, res) => {
        servicesCollection.find()
            .toArray((err, items) => {
                res.send(items);
            })
    })

    // app.post('/bookings', (req, res) => {
    //     const email = req.body.email;
    //     console.log(newBookings);
    //     adminCollection.find({email:email})
    //         .toArray((err,admin) => {
    //             const filter = {email:email}
    //             if(admin === 0){
    //                 filter.email= email;
    //             }
    //             bookingsCollection.find(filter)
    //             .toArray((err,documents) => {
    //                 res.send(documents)
    //             })
    //         })
    //     console.log(newBookings);
    // })

    app.post('/bookings', (req, res) => {
        const newBookings = req.body;
        console.log(newBookings);
        bookingsCollection.insertOne(newBookings)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
        console.log(newBookings);
    })

    app.get('/bookings', (req, res) => {
        const email = req.body.email;
        bookingsCollection.find()
            .toArray((err, items) => {
                res.send(items);
            })
    })

    app.post('/review', (req, res) => {
        const newReview = req.body;
        console.log(newReview);
        reviewCollection.insertOne(newReview)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
        console.log(newReview);
    })

    app.get('/review', (req, res) => {
        reviewCollection.find()
            .toArray((err, items) => {
                res.send(items);
            })
    })

    app.post('/admin', (req, res) => {
        const newAdmin = req.body;
        console.log(newAdmin);
        adminCollection.insertOne(newAdmin)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
        console.log(newAdmin);
    })


    // console.log('success');
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})