import fs from 'fs/promises';
import path from 'path';
import {v4 as uuidv4} from uuid;

const filePath = path.resolve('data/books.json');

async function readJSON(){
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data || '[]');
    } catch {
        return [];
    }
}
async function writeJSON(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

export async function findAll(userId, page = 1, limit = 10) {
    const books = await readJSON();

    const userBooks = books.filter(b => b.userId === userId);

    const total = userBooks.length;

    const skip = (page - 1) * limit;

    const paginated = userBooks.slice(skip, skip + limit);

    return { books: paginated, total };
}

export async function create(data) {
    const books = await readJSON();

    const newBook = {
        id: uuidv4(),
        ...data
    };

    books.push(newBook);
    await writeJSON(books);

    return newBook;
}

export async function findById(id) {}
export async function update(id, userId, data) {}
export async function deleteBook(id, userId) {}

export default {
    findAll,
    create,
    findById,
    update,
    deleteBook
};
