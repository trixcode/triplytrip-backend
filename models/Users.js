const mongoose = require('mongoose');
const nanoid = require('nanoid');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (value) {
        if (!this.isModified('username')) return;

        const user = await UserModule.findOne({username: value});

        if (user) throw new Error();
      },
      message: 'This username is already taken'
    }
  },
  password: {
    type: String,
    required: true
  },
  token: {

  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  avatar: String,
  userCategory: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'moderator', 'admin']
  },
  createData: {
    type: String,
    required: true,
    default: new Date()
  },
  updatedDate: {
    type: String,
    required: true
  }
});

UsersSchema.methods.generateToken = function () {
  return this.token = nanoid()
};
UsersSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password)
};
UsersSchema.pre('save', async function (next) {
  if (!isModified) return next();

  const salt = bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = bcrypt.hash(this.password, salt);
  this.password = hash;
  return next
});

const usersModels = mongoose.model('Users', UsersSchema);

model.exports = usersModels;