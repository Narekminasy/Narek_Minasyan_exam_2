import fs from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid';

const file = path.resolve('book-library/data/users.json');

async function read() {
    try {
        const data = await fs.readFile(file, 'utf8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function write(data) {
    await fs.writeFile(file, JSON.stringify(data, null, 2));
}

export async function create(user) {
    const users = await read();
    const newUser = { id: uuid(), ...user };
    users.push(newUser);
    await write(users);
    return newUser;
}

export async function findByEmail(email) {
    const users = await read();
    return users.find(u => u.email === email);
}

export async function findById(id) {
    const users = await read();
    return users.find(u => u.id === id);
}

export default { create, findByEmail, findById };