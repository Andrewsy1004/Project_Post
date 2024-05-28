import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    comment:{
      type:String,
      required: [true, 'Please add a comment'],
    },
    post:{
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Post'
    },
    author:{
      type: mongoose.Schema.Types.ObjectId, 
      ref:'User'
   },
  }, {
    timestamps: true,
  });
  
  const CommentModel = mongoose.model('Comment', CommentSchema);
  export default CommentModel   