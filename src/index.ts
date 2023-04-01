import express from 'express';
import UserRouter from './UserRouter';

const app = express();
const PORT = 4000;

app.use(express.json());

app.use('/user', UserRouter);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
