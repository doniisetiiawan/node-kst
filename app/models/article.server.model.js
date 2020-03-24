import mongoose from 'mongoose';

const { Schema } = mongoose;

const ArticleSchema = new Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank',
  },
  content: {
    type: String,
    default: '',
    trim: true,
  },
  creator: {
    type: Schema.ObjectId,
    ref: 'User',
  },
});

// eslint-disable-next-line import/prefer-default-export
export const Article = mongoose.model('Article', ArticleSchema);
