import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface User {
  uid: string;
  email: string;
  password: string;
  email_verified: boolean;
  OTP: string;
  username: string;
  signup_date: Date;
  gender: string;
  birth: Date;
  country: string;
  study_field: string;
  writing_ids: [string];
  isSubscribed: boolean;
  isAdmin: boolean;
  login_history: [[Date,String]];
  isActive: boolean;
}

export interface UserDocument extends User, Document {
  hashPassword: () => Promise<void>;
  validatePassword: (password: string) => Promise<void>;
}

const schema: Schema<UserDocument> = new Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email_verified: {
    type: Boolean,
    required: true,
  },
  OTP: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  birth: {
    type: Date,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  study_field: {
    type: String,
    required: false,
  },
  writing_ids: {
    type: [String],
    required: false,
  }, 
  isSubscribed: {
    type: Boolean,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  login_history: {
    type: [[Date, String]],
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  }
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

const user = model<UserDocument>("User", schema);
export default user;
