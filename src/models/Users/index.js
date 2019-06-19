const mongoose = require('mongoose');
const nanoid = require('nanoid');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  firstName: String,
  lastName: String,
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
  phone: String,
  dateOfBirth: String,
  avatar: String,
  roles: {
    type: Schema.Types.ObjectId,
    ref: 'RoleUsers',
    required: true,
    default: '5d08dd12634ef560b0f19cc6'
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
    delete ret.password;
    return ret;
  }
});
const usersModels = mongoose.model('Users', UsersSchema);

module.exports = usersModels;