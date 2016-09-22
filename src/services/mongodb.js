import {MongoClient} from "mongodb";

import {COLLECTION_NAME, MONGODB_URL} from "../config";

var mongoClientInstance;

export async function getMongoClient () {
    if (!mongoClientInstance) {
        mongoClientInstance = await MongoClient.connect(MONGODB_URL);
    }
    return mongoClientInstance;
}

export async function upsert (id, answers) {
    const db = await getMongoClient();
    await db.collection(COLLECTION_NAME).update(
        {_id: id},
        {$set: answers},
        {upsert: true}
    );
}

export async function find (query) {
    const db = await getMongoClient();
    return db.collection(COLLECTION_NAME).find(query).toArray();
}
