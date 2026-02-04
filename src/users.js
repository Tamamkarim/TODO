// Users module: mock data and REST handlers

const users = [
  {
    id: 1,
    username: 'johndoe',
    password: 'password1',
    email: 'johndoe@example.com',
  },
  {
    id: 2,
    username: 'janedoe',
    password: 'password2',
    email: 'janedoe@example.com',
  },
  {
    id: 3,
    username: 'bobsmith',
    password: 'password3',
    email: 'bobsmith@example.com',
  },
];

let nextUserId = users.length + 1;

const getUsers = (req, res) => {
  // لا نُرجِع كلمة المرور في الـ API
  const safeUsers = users.map((u) => ({
    id: u.id,
    username: u.username,
    email: u.email,
  }));

  res.json(safeUsers);
};

const getUserById = (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid user id' });
  }
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { password, ...safeUser } = user;
  res.json(safeUser);
};

const createUser = (req, res) => {
  const { username, password, email } = req.body || {};

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ error: 'username, password and email are required' });
  }

  // Simple uniqueness check for username
  const existing = users.find((u) => u.username === username);
  if (existing) {
    return res.status(409).json({ error: 'Username already exists' });
  }

  const newUser = {
    id: nextUserId++,
    username,
    password, // Note: in a real app, never store plaintext passwords
    email,
  };

  users.push(newUser);

  const { password: _pw, ...safeUser } = newUser;
  res.status(201).json(safeUser);
};

const loginUser = (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: 'username and password are required' });
  }

  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  res.json({ message: 'Login successful', userId: user.id });
};

export { getUsers, getUserById, createUser, loginUser };
