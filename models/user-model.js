const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// This user model will store the username, email, and the thumbnail
// or the Profile Picture as coming from the google service itself
const userSchema = new Schema({
  username:String,
  googleId:String,
  thumbnail:String
});

const User = mongoose.model('user',userSchema);

module.exports = User;
