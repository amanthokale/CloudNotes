const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const {body,validationResult}=require('express-validator');


const router = express.Router();

// [ROUTE 1] GET ALL THE NOTES login req api/notes/fetchallnotes

  router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
    const notes  = await Note.find({user:req.user.id});
    res.json(notes);

} catch (error) {
//  console.error(error.message);
  res.status(500).send("Internal server error");
}
  })

// [ROUTE 2] ADD A NEW NOTE USINGN POST login req api/notes/addnote
router.post('/addnote',fetchuser,[
  body('title','Enter a valid name').isLength({min:3}),
  body('description','description must be atleast 5 characters').isLength({min:5}),],async (req,res)=>{
try {
    const {title,description,tag}=req.body;

  const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    }
    const note = new Note({
      title,description,tag,user:req.user.id
    })
    const savedNote = await note.save();

   res.json(savedNote);

} catch (e) {
//  console.error(error.message);
  res.status(500).send("Internal server error");
}

})

// [ROUTE 3] UPDATE A NEW NOTE USINGN PUT login req api/notes/updatenote

router.put('/updatenote/:id',fetchuser,async (req,res)=>{
try {
  const {title,description,tag}=req.body;

  const newNote = {};
  if(title){newNote.title=title};
  if(title){newNote.description=description};
  if(title){newNote.tag=tag};


let note = await Note.findById(req.params.id);
console.log(note.user);
if(!note){return res.status(404).send("Not found")}

if(note.user.toString() !== req.user.id){
  return res.status(401).send("Not allowed");
}
note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
res.json({note});
} catch (e) {

res.status(500).send("Internal server error");
}

})



// [ROUTE 4] DELETE A NEW NOTE USINGN DELETE login req api/notes/deletenote

router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
try {

  //FIND THE NOTE TO BE DELTED AND DELETE IT
  let note = await Note.findById(req.params.id);
  console.log(note.user);
  if(!note){return res.status(404).send("Not found")}

  //ALLOW DELEIO ONLY IF USER OWNS THE NOTE
  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not allowed");
  }

  note = await Note.findByIdAndDelete(req.params.id);
  res.json({"Success" : "note has been deleted",note:note});

} catch (e) {

res.status(500).send("Internal server error");
}
  })


module.exports=router;
