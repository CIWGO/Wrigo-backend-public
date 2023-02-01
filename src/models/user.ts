import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  username: string;
  password: string;
  email: string;
  avatar?: string;
}

export interface IUserDocument extends IUser, Document {
  hashPassword: () => Promise<void>;
  validatePassword: (password: string) => Promise<void>;
}

const schema : Schema<IUserDocument> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

//Do not declare methods using ES6 arrow functions (=>). 
//Arrow functions explicitly prevent binding this, so your method will not have access to the document and the above examples will not work.
schema.methods.hashPassword = async function () {
  // check if password has been hashed
  this.password = await bcrypt.hash(this.password, 12);
};

schema.methods.validatePassword = async function (password) {
  bcrypt.compare(password, this.password);
};

const user  = model<IUserDocument>("User", schema);
export default user
