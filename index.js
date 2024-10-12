import ollama from "ollama";
import express from "express";

const port = 3030;
const model = "llama3.2";

async function bootstrap() {

    try {
        console.clear();
        const app = express();

        app.use(express.json());

        app.get('/', (req, res) => {
            res.send('Hello World!')
          });
        
        app.post('/chat', async (req, res) => {
            const {query, options} = req.body;
            try {
                const response = await ollama.chat({
                    model,
                    messages: [{ role: 'user', content: query}],
                    options
                });
    
                res.status(201).send({
                    response
                });
            } catch (error) {
                res.status(500).send(error);
            }
        });

        app.listen(port, () => {
            console.log(`ollama api listening on: http://localhost:${port}`)
        });

    } catch (error) {
        console.log('Main APP error: ', error)
    }

}
bootstrap();