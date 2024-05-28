import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title:{
    type:String,
    required: [true, 'Please add a title'],
  },
  summary:{
    type:String,
    required: [true, 'Please add a summary'],
  },
  content:{
    type:String,
    required: [true, 'Please add a content'],
  },
  cover:{
    type:String,
    required: [true, 'Please add a cover'],
  },
  author:{
    type: mongoose.Schema.Types.ObjectId, 
    ref:'User'
 },
}, {
  timestamps: true,
});

const PostModel = mongoose.model('Post', PostSchema);
export default PostModel