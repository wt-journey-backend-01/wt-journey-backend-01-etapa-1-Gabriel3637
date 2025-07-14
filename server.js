const express = require('express');
const path = require('path');
const fs = require('fs');
const { findPackageJSON } = require('module');

const app = express();
const port = 3000;

let ultimocontato = null;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/contato', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'contato.html'))
})

app.get('/api/lanches', (req, res) => {
    fs.readFile('public/data/lanches.json', 'utf8', (err, data) => {
       if (err) {
           console.error(err);
           return;
       }
       try {
           const meuObjeto = JSON.parse(data);
           res.status(200).json(meuObjeto);
       } catch (erro) {
           console.error("Erro ao analisar JSON:", erro);
       }
    });
})

app.post('/contato', (req, res) => {
    ultimocontato = req.body;
    if(ultimocontato){
        let paginaresposta = `<!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Sucesso</title>
            <style>
                *{
                    font-family: Arial, Helvetica, sans-serif;
                    margin: 0px;
                    padding: 0px;
                }
                body{
                    text-align: center;
                }
                h1{
                    background-color: red;
                    color: white;
                    margin-bottom: 20px;
                }
                body > p{
                    margin-bottom: 10px;
                }
                div > p{
                    margin-bottom: 10px;
                }
                span.destacar{
                    font-weight: bold;
                }

            </style>
        </head>
        <body>
            <h1>Contato realizado com sucesso!</h1>
            <p>Obrigado por entrar em contato conosco ${ultimocontato.nome}. Responderemos o mais breve possível a sua mensagem para o email de retorno: ${ultimocontato.email}.</p>

            <div>
                <p><span class="destacar">Assunto:</span> ${ultimocontato.assunto}</p>
                <p><span class="destacar">Mensagem:</span> ${ultimocontato.mensagem}</p>
            </div>
            <a href="/">Voltar para a página inicial</a>
        </body>
        </html>`


        res.status(200).send(paginaresposta);
    }
})

app.get('/sugestao', (req, res) => {
    let parametros = req.query;
    let paginaresposta = `<!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sucesso</title>
        <style>
            *{
                font-family: Arial, Helvetica, sans-serif;
                margin: 0px;
                padding: 0px;
            }
            body{
                text-align: center;
            }
            h1{
                background-color: red;
                color: white;
                margin-bottom: 20px;
            }
            body > p{
                margin-bottom: 10px;
            }
            div > p{
                margin-bottom: 10px;
            }
            span.destacar{
                font-weight: bold;
            }

        </style>
    </head>
    <body>
        <h1>Sugestão de lanche enviada com sucesso!</h1>
        <p>Obrigado pela sua sugestão de lache. Avaliaremos se será possível incluí-lo no nosso cardápio</p>

        <div>
            <p><span class="destacar">Nome:</span> ${parametros.nome}</p>
            <p><span class="destacar">Ingredientes:</span> ${parametros.ingredientes}</p>
        </div>
        <a href="/">Voltar para a página inicial</a>
    </body>
    </html>`
    res.status(200).send(paginaresposta);
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});