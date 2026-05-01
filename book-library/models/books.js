import fs from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid';

const file = path.resolve('book-library/data/books.json');

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

export async function findAll(userId, page, limit) {
    const books = await read();
    const userBooks = books.filter(b => b.userId === userId);

    const skip = (page - 1) * limit;
    return {
        books: userBooks.slice(skip, skip + limit),
        total: userBooks.length
    };
}

export async function create(book) {
    const books = await read();
    const newBook = { id: uuid(), ...book };
    books.push(newBook);
    await write(books);
    return newBook;
}

export async function update(id, userId, data) {
    const books = await read();
    const index = books.findIndex(b => b.id === id && b.userId === userId);
    if (index === -1) return null;

    books[index] = { ...books[index], ...data };
    await write(books);
    return books[index];
}

export async function deleteBook(id, userId) {
    const books = await read();
    const newBooks = books.filter(b => !(b.id === id && b.userId === userId));
    if (books.length === newBooks.length) return false;

    await write(newBooks);
    return true;
}

export default { findAll, create, update, deleteBook };