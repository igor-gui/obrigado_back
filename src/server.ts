import app from './app';
import { Express } from 'express';
import { connectDb, disconnectDB } from '@/config';

function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(app)
}

async function close(): Promise<void> {
    return await disconnectDB()

}
const PORT = process.env.PORT || 3000;

init().then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
})