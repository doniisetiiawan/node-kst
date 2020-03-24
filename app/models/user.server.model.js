import mongoose from 'mongoose';
import crypto from 'crypto';

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    match: [
      /.+@.+\..+/,
      'Please fill a valid email address',
    ],
  },
  username: {
    type: String,
    unique: true,
    required: 'Username is required',
    trim: true,
  },
  password: {
    type: String,
    validate: [
      (password) => password && password.length > 6,
      'Password should be longer',
    ],
  },
  salt: {
    type: String,
  },
  provider: {
    type: String,
    required: 'Provider is required',
  },
  providerId: String,
  providerData: {},
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

UserSchema.pre('save', function (next) {
  if (this.password) {
    this.salt = Buffer.from(
      crypto.randomBytes(16).toString('base64'),
      'base64',
    );
    this.password = this.hashPassword(this.password);
  }

  next();
});

UserSchema.methods.hashPassword = function (password) {
  return crypto
    .pbkdf2Sync(password, this.salt, 10000, 64, 'sha256')
    .toString('base64');
};

UserSchema.methods.authenticate = function (password) {
  return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function (
  username,
  suffix,
  callback,
) {
  const _this = this;

  const possibleUsername = username + (suffix || '');

  _this.findOne(
    {
      username: possibleUsername,
    },
    (err, user) => {
      if (!err) {
        if (!user) {
          callback(possibleUsername);
        } else {
          return _this.findUniqueUsername(
            username,
            (suffix || 0) + 1,
            callback,
          );
        }
      } else {
        callback(null);
      }
    },
  );
};

UserSchema.set('toJSON', {
  getters: true,
  virtuals: true,
});

// eslint-disable-next-line import/prefer-default-export
export const User = mongoose.model('User', UserSchema);
