import { MongoClient } from "mongodb";

const user = "fsa-admin";
const password = "foodsponsor";
const cluster = "orchard.zlzqh";

const url = `mongodb+srv://${user}:${password}@${cluster}.mongodb.net/orchard?retryWrites=true&w=majority`;


export const connectDatabase = async () => {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const db = client.db("OSDB");

    return {
        listings: db.collection("OSC")
    };
};