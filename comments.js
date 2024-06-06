// Create Web Server 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comments', { useNewUrlParser: true });

// Schema for MongoDB
const commentSchema = new mongoose.Schema({
  username: String,
  body: String,
  date: Date,
});

const Comment = mongoose.model('Comment', commentSchema);

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Get comments from MongoDB
app.get('/api/comments', (req, res) => {
  Comment.find({}, (err, comments) => {
    res.send(comments);
  });
});

// Post comments to MongoDB
app.post('/api/comments', (req, res) => {
  const comment = new Comment(req.body);
  comment.save((err, comment) => {
    res.send(comment);
  });
});

// Start server
app.listen(8080, () => {
  console.log('Server started on http://localhost:8080');
});