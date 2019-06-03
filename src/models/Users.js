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

        const user = await usersModels.findOne({username: value});

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
    type: String,
    required: true
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
    type: String,
    required: true
  },
  avatar: String,
  roles: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin"]
  },
  createData: {
    type: String,
    required: true,
    default: new Date()
  },
  updatedDate: String
});

UsersSchema.methods.generateToken = function () {
  return this.token = nanoid()
};
UsersSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password)
};
UsersSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  return next()
});
UsersSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    // delete ret.password;
    return ret;
  }
});
const usersModels = mongoose.model('Users', UsersSchema);

module.exports = usersModels;