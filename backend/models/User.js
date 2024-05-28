import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    FullName: {
        type: String, 
        required: [true, 'Please add a name'], 
        min: 4
    },
    username: {
        type: String, 
        required: [true, 'Please add a username'],
        min: 4, 
        unique: true
    },
    password: {
        type: String, 
        required: [true, 'Please add a password'],
    },
});
  
const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
