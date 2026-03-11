const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    // minlength : 10,
    // maxlength : 10 ,
    match: [/^[0-9]{10}$/, "Phone number must be exactly 10 digits"],
  },
  country: String,
  state: String,
  city: String,
},

{ timestamps: true }
 
);

module.exports = mongoose.model("User", userSchema);
