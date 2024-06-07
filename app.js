// app.js
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const app = express();

let posts = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { posts });
});

app.get('/posts/new', (req, res) => {
  res.render('new-post');
});

app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content });
  res.redirect('/');
});

app.get('/posts/:id/edit', (req, res) => {
  const post = posts[req.params.id];
  res.render('edit-post', { post, id: req.params.id });
});

app.put('/posts/:id', (req, res) => {
  const { title, content } = req.body;
  posts[req.params.id] = { title, content };
  res.redirect('/');
});

app.delete('/posts/:id', (req, res) => {
  posts.splice(req.params.id, 1);
  res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
