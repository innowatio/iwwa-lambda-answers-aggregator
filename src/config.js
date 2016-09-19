import dotenv from "dotenv";

dotenv.load();

export const MONGODB_URL = process.env.MONGODB_URL || "mongodb://lambda-aggregator:bFoDtRuN6HHIxZSeUJlkYzOBI3qwYFKTNOVqLukeoJ5RUtXJ@ds013268-a0.mongolab.com:13268,ds013268-a1.mongolab.com:13268/iwwa-test?replicaSet=rs-ds013268";
export const COLLECTION_NAME = "answers";
