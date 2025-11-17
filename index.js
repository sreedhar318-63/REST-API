const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json()); // body parser

const store = require('./dataStore');
let books = store.read();
let nextId = books.length ? Math.max(...books.map(b=>b.id))+1 : 1;

// after any create/update/delete, call store.write(books)


// Root route
app.get('/', (req, res) => {
  res.send('Books API is running. Use GET /books to see the books.');
});

// GET all
app.get('/books', (req, res) => res.json(books));

// GET one
app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

// POST create (with logging + validation)
app.post('/books', (req, res) => {
  try {
    console.log('POST /books — body received:', req.body);
    const { title, author } = req.body;
    if (!title || !author) {
      console.log('Validation failed: title or author missing');
      return res.status(400).json({ error: 'title and author are required' });
    }
    const book = { id: nextId++, title, author };
    books.push(book);
    console.log('Book created:', book);
    return res.status(201).json(book);
  } catch (err) {
    console.error('Error in POST /books:', err && err.stack ? err.stack : err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update
app.put('/books/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, author } = req.body;
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return res.status(404).json({ error: 'Book not found' });
    if (!title && !author) return res.status(400).json({ error: 'Provide title or author to update' });
    books[index] = { ...books[index], ...(title && { title }), ...(author && { author }) };
    console.log('Book updated:', books[index]);
    return res.json(books[index]);
  } catch (err) {
    console.error('Error in PUT /books/:id', err && err.stack ? err.stack : err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE
app.delete('/books/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return res.status(404).json({ error: 'Book not found' });
    const removed = books.splice(index, 1)[0];
    console.log('Book removed:', removed);
    return res.json(removed);
  } catch (err) {
    console.error('Error in DELETE /books/:id', err && err.stack ? err.stack : err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Handle body-parser JSON errors (malformed JSON) — returns 400
app.use((err, req, res, next) => {
  if (err && err.type === 'entity.parse.failed') {
    console.error('Bad JSON received:', err.body || err.message);
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }
  next(err);
});

// Final generic error handler
app.use((err, req, res, next) => {
  console.error(err && err.stack ? err.stack : err);
  res.status(500).json({ error: 'Internal server error' });
});

// Bind explicitly to IPv4 localhost
app.listen(PORT, '127.0.0.1', () => console.log(`Server running on http://127.0.0.1:${PORT}`));
