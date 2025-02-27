require("dotenv").config();

const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.xpno6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);



exports.getData = async (req, res, next) => {

    try {

        await client.connect();
        const db = client.db("cse341_week1");
        const collection = db.collection("professional");

        const data = await collection.find().toArray();

        res.status(200).json(data[0])
    } catch (err) {
        console.error("Error fetching data:", err);
    } finally {
        await client.close();
    }   
}