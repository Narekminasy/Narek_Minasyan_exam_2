import createError from 'http-errors';
import Books from '../models/books.js';

export async function getAll(req, res, next) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const { books, total } = await Books.findAll(
            req.userId,
            page,
            limit
        );

        res.json({
            books,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });

    } catch (err) {
        next(err);
    }
}

export async function create(req, res, next) {
    try {
        const { title, author, year, genre } = req.body;

        const book = await Books.create({
            title,
            author,
            year,
            genre,
            userId: req.userId
        });

        res.json({
            message: "Book added successfully",
            book
        });

    } catch (err) {
        next(err);
    }
}

export async function update(req, res, next) {}
export async function deleteBook(req, res, next) {}

export default {
    getAll,
    create,
    update,
    delete: deleteBook
};

