import cors from 'cors';
import express, { request, response } from 'express';


import { download } from './download.js';
import { transcribe } from './transcribe.js';
import { summarize } from './summarize.js';
import { convert } from './convert.js';

const app = express();
app.use(express.json())
app.use(cors());
app.listen()


app.get('/summary/:id', async (req = request, res = response) => {
    try{
        await download(req.params.id);
        const audioConverted = await convert()
        console.log(audioConverted)
    
        const result = await transcribe(audioConverted);
        res.json({result})
    } catch (error) {
        console.log(error)
        return res.json({error})
    }
});

app.post("/summary", async (req = request, res = response) => {
    try{
        const result = await summarize(req.body.text)
        return res.json({result})
    } catch (error) {
        console.log(error)
        return res.json({ error })
    }
})

app.listen(3333, () => console.log(
    "Server is running on port 3333"
))