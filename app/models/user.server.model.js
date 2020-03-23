import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String,
});

export const User = mongoose.model('User', UserSchema);
