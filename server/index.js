import cors from 'cors';
import express, { request, response } from 'express';


import { download } from './download.js';

const app = express();
app.use(cors());
app.listen()


app.get('/summary/:id', (req = request, res = response) => {
    download(req.params.id);
    res.send("Id do vídeo: " + req.params.id)
});


app.listen(3333, () => console.log(
    "Server is running on port 3333"
))