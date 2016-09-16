import dotenv from "dotenv";

dotenv.load();

export const MONGODB_URL = process.env.MONGODB_URL || "mongodb://lambda-aggregator:bFoDtRuN6HHIxZSeUJlkYzOBI3qwYFKTNOVqLukeoJ5RUtXJ@ds013268-a0.mongolab.com:13268,ds013268-a1.mongolab.com:13268/iwwa-test?replicaSet=rs-ds013268";
export const KEEP_ALIVE = process.env.KEEP_ALIVE || 1;
export const SOCKET_CONNECT_TIMEOUT_MS = process.env.SOCKET_CONNECT_TIMEOUT_MS || 30000;

/*
export const SERVER_CONNECT_TIMEOUT_MS = process.env.SERVER_CONNECT_TIMEOUT_MS || 500;
export const SERVER_AUTO_RECONNECT = process.env.SERVER_AUTO_RECONNECT || true;
export const SERVER_POOL_SIZE = process.env.SERVER_POOL_SIZE || 5;
*/

export const COLLECTION_NAME = "answers";
