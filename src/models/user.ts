const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

schema.methods.hashPassword = async () => {
  // check if password has been hashed
  this.password = await bcrypt.hash(this.password, 12);
};

schema.methods.validatePassword = async (password) => bcrypt.compare(password, this.password);

module.exports = model("User", schema);
