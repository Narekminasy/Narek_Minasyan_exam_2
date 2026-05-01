import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import router from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(morgan('dev'));
app.use(express.json());

app.use(router);

app.use(errorHandler.notFound);
app.use(errorHandler.errors);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});