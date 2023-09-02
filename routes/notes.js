const express = require('express');
const connection = require('../connection');
const router = express.Router();

const dbName = 'notes'


// create note
router.post('/create', (req, res, next) => {
  // create new note 
  let newNote = req.body;
  // check if user send data or not
  if (newNote !== null && newNote !== undefined) {
    // check if user send title name of the note and description
    if ((newNote.name !== null && newNote.name !== undefined) || (newNote.description !== null && newNote.description !== undefined)) {
      insQuery = "insert into "+ dbName+" (name,description) values (?,?)";
      // store the note into database
      connection.query(insQuery, [newNote.name, newNote.description], (err, results) => {
        // if it works fine 
        if (!err) {
          res.status(200).json({ message: 'note created successfully!!'});
        } else {
          // if there any error in creating note 
          res.status(500).json({ errror: err });
        }
      });
    }
    else {
      res.status(404).json({ message: 'name or description is not entered properly! try again please ...' });
    }
  } else {
    res.status(402).json({ message: 'Invalid request body' });
  }
});

// get all notes
router.get('/notes',(req,res,next)=>{

   var notes = "select * from "+dbName;
   connection.query(notes , (err,results)=>{
    if(!err){
      if (notes == null){
        res.status(204).json({ message:'no notes added yet!'})
      }else{
        res.status(200).json(results)
      }
    }else{
      res.status(500).json({ errror: err });
    }
   });
});

// get specific notes
router.get('/notes/:id',(req,res,next)=>{
  const id = req.params.id;
  var notes = "select * from "+dbName+" where id=?";
  connection.query(notes ,[id], (err,results)=>{
   if(!err){
    // check if the note id exists or not
    if (results== null){
      // means that the id given by user is wrong
      res.status(404).json({
        message:"note you're lookin for is not found!!"
      });
    }else{
      // if id exists 
      res.status(200).json(results);
    }  
   }else{
     res.status(500).json({ errror: err });
   }
  });
});

// update note
router.patch('/update/:id',(req,res,next)=>{
  // get note id from parameter
  const id = req.params.id;
  // get note want to be updated 
  let note = req.body;
  // update note into database
  var noteToUpdate = "update "+dbName+" SET name=?, description=? WHERE id=?";
  connection.query(noteToUpdate,[note.name,note.description,id],(err,results)=>{
    if(!err){
      // check if the note id exists or not
      if (results.affectedRows == 0){
        // means that the id given by user is wrong
        res.status(404).json({
          message:"note you're lookin for is not found!!"
        });
      }else{
        // if id exists 
        res.status(200).json({
          message:"note updated successfully!!"
        });
      }
    }else{
      res.status(500).json({
        message: err
      });
    }
  });
});

// delete note
router.delete('/delete/:id',(req,res,next)=>{
  // get note id from parameter
  const id = req.params.id;
  // update note into database
  var noteToDelete = "delete from "+dbName+" WHERE id=?";
  connection.query(noteToDelete,[id],(err,results)=>{
    if(!err){
      // check if the note id exists or not
      if (results.affectedRows == 0){
        // means that the id given by user is wrong
        res.status(404).json({
          message:"note you're lookin for is not found!!"
        });
      }else{
        // if id exists 
        res.status(200).json({
          message:"note deleted successfully!!"
        });
      }
    }else{
      res.status(500).json({
        message: err
      });
    }
  })
});
module.exports = router;