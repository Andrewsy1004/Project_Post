import UserModel from '../models/User.js';

export const usernameExist = async (username = "") => {
    const existe = await UserModel.findOne({username});
    if(existe){
      throw new Error(`the username ${username} already exists in the database`);
    }
}
