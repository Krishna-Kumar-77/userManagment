const mongoose= require("mongoose");

const bookSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      title:{
        type: String,
        required: [true,"Please Enter title"],

      },
      
       author_name:{
            type: String,
            required:[true,"Please Enter Author Name"]
      },
      isbn:{
          type: String,
          required:[true,"Please Enter ISB Number"],
          unique: true
      },
      favorite:{
        type: Boolean,
        required:false
      }
})
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;