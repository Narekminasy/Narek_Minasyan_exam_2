import createError from 'http-errors';

export default function validator(schema, path = 'body') {
    return (req, res, next) => {
        const { error } = schema.validate(req[path], {
            abortEarly: false
        });

        if (error) {
            return next(createError(422, error.message));
        }

        next();
    };
}