const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/todo_list_db', { useNewUrlParser: true, useUnifiedTopology: true });

const todoSchema = new mongoose.Schema({
    text: String
});
const Todo = mongoose.model('Todo', todoSchema);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.render('index', { todos: todos });
});

app.post('/add', async (req, res) => {
    const newTodo = new Todo({ text: req.body.text });
    await newTodo.save();
    res.redirect('/');
});

app.listen(3000, () => console.log('Server started on port 3000'));
