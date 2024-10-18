import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'provide name'],
      minlength: 3,
    },
    age: {
      type: Number,
      required: [true, 'provide age'],
      min: 0
    },
    parents: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Member',
        default: [],
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model('Member', MemberSchema);
