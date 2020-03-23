import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    index: true,
  },
  username: {
    type: String,
    trim: true,
    unique: true,
  },
  password: String,
  website: {
    type: String,
    get(url) {
      if (!url) {
        return url;
      }
      if (
        url.indexOf('http://') !== 0
        && url.indexOf('https://') !== 0
      ) {
        url = `http://${url}`;
      }

      return url;
    },
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.virtual('fullName')
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function (fullName) {
    const splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
  });

UserSchema.statics.findOneByUsername = function (
  username,
  callback,
) {
  this.findOne(
    {
      username: new RegExp(username, 'i'),
    },
    callback,
  );
};

UserSchema.methods.authenticate = function (password) {
  return this.password === password;
};

UserSchema.set('toJSON', { getters: true, virtuals: true });

export const User = mongoose.model('User', UserSchema);