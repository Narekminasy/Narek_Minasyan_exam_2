import Users from '../models/users.js';

export async function register(req, res) {
    const user = await Users.create(req.body);
    res.json({ user });
}

export async function login(req, res) {
    const user = await Users.findByEmail(req.body.email);
    if (!user) return res.status(401).json({ message: 'Invalid' });

    res.json({ token: user.id, user });
}

export async function profile(req, res) {
    const user = await Users.findById(req.userId);
    res.json({ user });
}