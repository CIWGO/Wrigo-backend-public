import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  password: string;
  email: string;
  verified: boolean;
  otp: string;
  username: string;
  avatar?: string;
  gender: string;
  birth: Date;
  country: string;
  study_field: string;
  articles: string[]; //all articles' ids uploaded by this user
  subscription: boolean;
  planID?: string;
}

export interface IUserDocument extends IUser, Document {
  hashPassword: () => Promise<void>;
  validatePassword: (password: string) => Promise<void>;
}

const schema: Schema<IUserDocument> = new Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: undefined,
    required: false,
  },
  gender: {
    type: String,
    required: true,
  },
  birth: {
    type: Date,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  study_field: {
    type: String,
    required: true,
  },
  articles: {
    type: [String],
    required: true,
  }, //all articles' ids uploaded by this user
  subscription: {
    type: Boolean,
    required: true,
  },
  planID: {
    type: undefined,
    required: false,
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

const user = model<IUserDocument>("User", schema);
export default user;
