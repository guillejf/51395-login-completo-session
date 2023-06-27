//@ts-check
import { Schema, model } from 'mongoose';
import monsoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  firstName: {
    type: String,
    max: 100,
  },
  lastName: {
    type: String,
    max: 100,
  },
  password: {
    type: String,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    max: 100,
    unique: true,
  },

  admin: {
    type: Boolean,
  },
  age: {
    type: Number,
  },
});
schema.plugin(monsoosePaginate);
export const UserModel = model('users', schema);
