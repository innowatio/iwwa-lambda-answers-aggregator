import {MongoClient} from "mongodb";

import {COLLECTION_NAME, MONGODB_URL, KEEP_ALIVE, SOCKET_CONNECT_TIMEOUT_MS} from "../config";

export const mongodb = MongoClient.connect(MONGODB_URL, {
    replSet: {
        socketOptions: {
            keepAlive: KEEP_ALIVE,
            connectTimeoutMS: SOCKET_CONNECT_TIMEOUT_MS
        }
    },
/*    server: {
        auto_reconnect: SERVER_AUTO_RECONNECT,
        poolSize : SERVER_POOL_SIZE,
        socketOptions: {
            connectTimeoutMS: SERVER_CONNECT_TIMEOUT_MS
        }
    } */
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
