// Code source: https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial

import { ObjectId } from "mongodb";

export default class User {
    constructor(public username: string, public password: number, public id?: ObjectId) {}
}