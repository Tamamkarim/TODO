import express from 'express';
import {
  getItems,
  getItemById,
  createItem,
  deleteItem,
} from './items.js';
import {
  getUsers,
  getUserById,
  createUser,
  loginUser,
} from './users.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Simple health check / root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Items endpoints
app.get('/items', getItems);
app.get('/items/:id', getItemById);
app.post('/items', createItem);
app.delete('/items/:id', deleteItem);

// Users endpoints
app.get('/users', getUsers);
app.get('/users/:id', getUserById);
app.post('/users', createUser);

// Dummy login endpoint under users resource
app.post('/users/login', loginUser);

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
