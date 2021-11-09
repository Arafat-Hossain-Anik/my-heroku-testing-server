const express = require('express');
require('dotenv').config()
const cors = require('cors');
const port = process.env.PORT || 7000;
const app = express();
app.use(cors());
app.use(express.json());

// const users = [
//     {
//         name: "Arafat Hossain Anik",
//         age: '22'
//     },
//     {
//         name: "Arafat Hossain Anik",
//         age: '22'
//     },
//     {
//         name: "Arafat Hossain Anik",
//         age: '22'
//     }
// ];


//connect to databasee
// password: XMg0i7QAwLEhwwXW
const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.weuxy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//connection
app.get('/', (req, res) => {
    res.send('getting from express server')
})
//get request
app.get('/users', (req, res) => {
    async function run() {
        try {
            await client.connect();
            const database = client.db("mycrudDB");
            const usersCollection = database.collection("users");
            // query for users
            const cursor = usersCollection.find({});
            const users = await cursor.toArray();
            res.send(users)
        } finally {
            // await client.close();
        }
    }
    run().catch(console.dir);
})
//post request
app.post('/users', (req, res) => {
    const user = req.body;
    async function run() {
        try {
            await client.connect();
            const database = client.db("mycrudDB");
            const usersCollection = database.collection("users");
            const result = usersCollection.insertOne(user);
            console.log(`A document was inserted with the _id: ${result}`);
            res.json(result);
        } finally {
            // await client.close();
        }
    }
    run().catch(console.dir);
})
app.listen(port, () => {
    console.log('yapp i am listenning from', port);
})