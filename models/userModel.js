const mongoose = require('mongoose');
//const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema(
  {
   /* name: {
      type: String,
      required: [true, "Please Enter Your name"],
    },*/
    email: {
      type: String,
      required: [true, "Please Enter your email"],
      unique: true,
    },
    username:{
      type: String,
      required:[true, "Please Enter your UserName"],
      unique:true
    },
    password: {
      type: String,
      required: [true, "Please Enter your password"],
    },
    date_of_birth:{
      type : String,
      required:[true,"Enter date of birth in dd/mm/yy formate"],
    },
  },
  {
    timestamps: true,
  }
);

//userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

module.exports = User;