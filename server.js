const express = require('express');
const path = require('path');
const grpcClient = require('./client');

const app = express();
app.use(express.json());
app.use(express.static('public'));
const cors = require('cors');
app.use(cors());

// API Routes
app.get('/api/users', async (req, res) => {
    try {
        const users = await grpcClient.listUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await grpcClient.getUser(req.params.id);
        res.json(user);
    } catch (err) {
        if (err.code === 5) { // NOT_FOUND
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const result = await grpcClient.createUser(req.body);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/users/:id', async (req, res) => {
    try {
        const result = await grpcClient.updateUser({
            userId: req.params.id,
            ...req.body
        });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        const result = await grpcClient.deleteUser(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
