import Books from '../models/books.js';

export async function getAll(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { books, total } = await Books.findAll(req.userId, page, limit);

    res.json({
        books,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    });
}

export async function create(req, res) {
    const book = await Books.create({
        ...req.body,
        userId: req.userId
    });

    res.json({ book });
}

export async function update(req, res) {
    const book = await Books.update(req.params.id, req.userId, req.body);
    if (!book) return res.status(404).json({ message: 'Not found' });

    res.json({ book });
}

export async function remove(req, res) {
    const ok = await Books.deleteBook(req.params.id, req.userId);
    if (!ok) return res.status(404).json({ message: 'Not found' });

    res.json({ message: 'Deleted' });
}
