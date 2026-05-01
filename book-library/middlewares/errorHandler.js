export default {
    notFound(req, res) {
        res.status(404).json({ message: 'Not found' });
    },
    errors(err, req, res, next) {
        res.status(500).json({ message: err.message });
    }
};