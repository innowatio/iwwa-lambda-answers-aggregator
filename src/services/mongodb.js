import {MongoClient} from "mongodb";

import {COLLECTION_NAME, MONGODB_URL, KEEP_ALIVE, CONNECT_TIMEOUT_MS} from "../config";

export const mongodb = MongoClient.connect(MONGODB_URL, {
    replSet: {socketOptions: {keepAlive: KEEP_ALIVE, connectTimeoutMS: CONNECT_TIMEOUT_MS}}
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
