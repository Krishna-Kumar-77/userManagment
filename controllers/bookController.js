const Book = require("../models/booksModel");
const User = require("../models/userModel");

const getBooks = async (req, res) => {
  try {
     
    const books = await Book.find({ user: req.user.id });
  
    res.status(200).json({ data: books });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const createBooks = async (req, res) => {
    const {title, author_name, isbn} = req.body;
    if(!title || !author_name || !isbn){
        res.status(401)
        throw new Error("Please Enter All The required Fields")
    }
  
  try {
    const book = await Book.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


   


module.exports = {
  getBooks,
  createBooks
  
};