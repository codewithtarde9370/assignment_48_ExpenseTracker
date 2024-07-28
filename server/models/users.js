import { Schema, model } from "mongoose";

// credit means adding money in the acc
// debit means subtracting money from the acc

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

const User = model("User", userSchema);

export default User;