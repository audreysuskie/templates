const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name!'],
    },

    email: {
      type: String,
      required: [true, 'Please provide your email.'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email address'],
    },

    photo: { type: String, default: 'default.jpg' },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    events: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Event',
      },
    ],

    password: {
      type: String,
      required: [true, 'A password is required!'],
      minlength: 8,
      select: false,
    },

    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (e) {
          return this.password === e;
        },
        message: 'Passwords do not match',
      },
    },

    passwordChangedAt: { type: Date, default: new Date() },
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    createdAt: String,
    updatedAt: String,
    lastLogin: { type: Date, default: new Date() },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

// userSchema.pre('save', async function (next) {
//   const promises = this.events.map(async (id) => await Event.findById(id));
//   this.events = await Promise.all(promises);
//   next();
// });

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1500;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  //console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// userSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'events',
//   });

//   next();
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
