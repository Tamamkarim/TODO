// Items module: in-memory mock data and REST handlers

let items = [
  { id: 1, name: 'Item 1', description: 'First mock item' },
  { id: 2, name: 'Item 2', description: 'Second mock item' },
  { id: 3, name: 'Item 3', description: 'Third mock item' },
];

let nextId = items.length + 1;

const getItems = (req, res) => {
  res.json(items);
};

const getItemById = (req, res) => {
  const id = Number(req.params.id);
  const item = items.find((i) => i.id === id);

  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  res.json(item);
};

const createItem = (req, res) => {
  const { name, description } = req.body || {};

  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  const newItem = {
    id: nextId++,
    name,
    description,
  };

  items.push(newItem);

  res.status(201).json(newItem);
};

const deleteItem = (req, res) => {
  const id = Number(req.params.id);
  const index = items.findIndex((i) => i.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  items.splice(index, 1);

  // 204 No Content is typical for a successful DELETE with no body
  res.status(204).end();
};

export { getItems, getItemById, createItem, deleteItem };
