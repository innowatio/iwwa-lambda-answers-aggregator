import {MongoClient} from "mongodb";

import {COLLECTION_NAME, MONGODB_URL} from "../config";

export const mongodb = MongoClient.connect(MONGODB_URL, {
    replSet: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
        }
    }
});


export async function upsert (id, answers) {
    const db = await mongodb;
    return db.collection(COLLECTION_NAME).update(
        {_id: id},
        {$set: answers},
        {upsert: true}
    );
}

export async function find (query) {
    const db = await mongodb;
    return db.collection(COLLECTION_NAME).find(query).toArray();
}
