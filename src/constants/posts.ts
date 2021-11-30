export const posts = [
  {
    title: 'Que rumo vou seguir?',
    subtitle:
      'Você já deve ter feito essa pergunta para sí mesmo várias vezes e apesar de ninguém ter a resposta 100% correta, abaixo eu deixei algumas dicas 👇',
    description: 'Você já deve ter se feito essa pergunta várias vezes, ninguém tem a resposta 100% correta...',
    createdAt: new Date('2021-11-28'),
  },
  {
    title: 'Swagger Express',
    subtitle: 'Como usar Swagger em seu aplicativo ExpressJS',
    description: 'Esse artigo tem a intenção de te auxiliar na documentação com Swagger e expressjs...',
    createdAt: new Date('2021-11-29'),
  },
  {
    title: 'Socket.io',
    subtitle:
      'Você já precisou criar uma aplicação que precisasse de comunicação cliente-servidor em tempo real? Neste post, vamos te ajudar a fazer isso usando o framework Socket.IO, incluindo exemplos reais de casos de uso. Vamos lá?',
    description:
      'Socket.io é uma implementação em node para web socket, ou seja, uma forma de fazer comunicação em tempo real...',
    createdAt: new Date('2021-11-30'),
  },
] as Array<{ title: string; description: string; markdown: string; subtitle: string; createdAt: Date }>

export const markdowns = [
  `
Em um momento da vida, especificamente quando você está se formando, sempre começam a te fazer perguntas como: "Iai, vai trabalhar onde?", "Vai fazer faculdade?", "Qual faculdade você vai fazer?". Essas são perguntas extremamente comuns e muitas vezes os jovens não possuem a resposta, graças às inúmeras possibilidades que podemos escolher. Na área da tecnologia, por exemplo, temos diversos carreiras e tecnologias que podemos seguir, e a única pergunta que fica é "o que devo escolher?".

Eu não escapei desse processo; quando eu decidi que queria traçar uma carreira da área da tecnologia, tive dúvidas sobre qual profissão me dedicar. Depois de estudar mais sobre as possibilidades, vi que o melhor para minhas habilidades seria engenharia de software, mas aí me fiz mais uma pergunta: qual linguagem aprender?

Após entender o que era ser um engenheiro de software eu precisava escolher uma linguagem de programação que atendesse os requisitos que eu precisava na época e, sem foco, eu comecei a estudar PHP, Python, Html, Css e Javascript - e isso foi o que me atrasou. Com a experiência que vivi, aqui está uma dica que pode te ajudar bastante:

* Foque em uma coisa de cada vez, não adianta você querer aprender tudo de uma vez e não conseguir aprender nada, o único caminho é focar em apenas uma coisa e dar o seu melhor.

Enfim não adiantou tentar estudar todas essas linguagens de programação se eu não estava focado, após ver um anúncio de uma escola de programação, resolvi fazer o desafio  que era um desafio de 1 semana codando em javascript usando os frameworks react-native, reactjs e nodejs. Mas aí o problema veio novamente, após o final de semana, o curso mais completo que eu precisaria para dar um up na minha carreira era pago e custava R$1900,00 que eu não tinha na época.

E aqui vão mais algumas dicas:

- Você nunca vai precisar de dinheiro para aprender, pois sempre há boas soluções como: YouTube, Stack Overflow, Github e entre outras ferramentas de aprendizagem grátis.
- Caso não queira soluções de aprendizagem grátis, sempre dá pra usar soluções como o financiamento de cursos, oferecido ppr empresas como a [Provi](https://provi.com.br);
- Também é sempre bom pedir ajuda para pessoas que você conheça e já sejam da área.;
`,
  `
## O que é um Swagger?

Você já deve ter visto sobre Swagger - uma das ferramentas mais utilizadas para o desenvolvimento de OpenAPI Specification(OAS). Para documentações Swagger é uma ferramenta extremamente poderosa, que auxilia desenvolvedores a documentar suas APIs de uma forma muito simples. O Swagger também consegue ler a estrutura e criar documentações automaticamente, assim como fazer o oposto: ler uma documentação e criar uma API.

Você também pode gerar especificações como: operações da API, parâmetros da API, retorno e autorizações necessárias, seja de forma manual ou automática, através de comentários no código.

Documentação [aqui](https://swagger.io/)
 
E Hoje vamos ver como criar uma documentação através de comentários no código.

Para começar vamos criar um projeto e iniciá-lo:

~~~shell
  mkdir swagger_app
  cd swagger_app
  yarn init -y
~~~

Após iniciar o projeto vamos criar a pasta source e instalar as bibliotecas iniciais:

~~~shell
yarn add express cors http nodemon typescript @types/node ts-node express-promise-router @types/express @types/cors
~~~

E criamos o arquivo root do projeto, nesse caso, o index.ts. Após isso, precisamos criar a configuração básica do express, como no exemplo

~~~ts
import express from "express";
import cors from "cors";
import http from "http";

import { routes } from "./routes/index";

const port = 5000;

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(routes);

server.listen(port, () => {
  console.log("We are live on \${port}/");
  console.log("Environment: production");
});
~~~

Nosso routes/index se parece com isso:

~~~ts
import Router from "express-promise-router";

const routes = Router();

routes.get("/users", (req, res) => {
  return res.json("OK");
});

export { routes };
~~~

E estes são os scripts para rodar o projeto:

~~~json
"scripts": {
  "dev": "nodemon src/index.ts"
},
~~~

## Configurando Swagger

Adicionando as bibliotecas necessárias:

~~~shell
yarn add swagger-jsdoc swagger-ui-express @types/swagger-jsdoc @types/swagger-ui-express
~~~

Com isso, vamos inserir a configuração do Swagger no root do projeto. Depois é só importar as duas bibliotecas que baixamos:

~~~ts
import swaggerUI from "swagger-ui-express";
import swaggerJsDocs from "swagger-jsdoc";
~~~

E então adicionar as seguintes linhas:

~~~ts
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "Api documentation",
    },
    servers: [{ url: "https://localhost:5000" }],
  },
  apis: ["src/routes/*.ts"],
};

const specs = swaggerJsDocs(options);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));
~~~

Agora rode o projeto e acesse [http://localhost:5000/docs](http://localhost:5000/docs), para você poder ver a tela inicial do swagger que é construído automaticamente.

Vamos então criar o nosso primeiro schema dentro de routes/index:

~~~ts
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - fullName
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         fullName:
 *           type: string
 *           description: The name of user
 *       example:
 *         id: 60ff3fe25a1209001eadefb5
 *         fullName: Alexander K. Dewdney
 */
~~~

Após isso os schemas que você criou já aparecem, aí finalmente pode documentar a nossa rota, adicionando as linhas:

~~~ts
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Return ok
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Return ok
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               items:
 *                "OK"
 */
~~~

Dessa forma, sua primeira documentação com Swagger foi feita.
`,
  `
## O que é o Socket.io?

Socket.io é um framework que auxilia na implementação do realtime em aplicações, podendo ser usado no frontend e no backend. Neste artigo, iremos ver a implementação com ReactJs e NodeJs.

O Socket.io também é muito fácil de escalar e, como é em tempo real, o chamamos de "io intensive", ou seja, acontece muito io quando estamos utilizando o mesmo.

O Socket.io funciona basicamente com os métodos emitir e escutar. Ambos sempre recebem dois parâmetros: o evento e os dados. O evento de emitir é "emit" e o de escutar é "on". Veja um exemplo de emissão de uma mensagem:

~~~ts
socket?.emit("message", { message: "Hello" })
~~~

Da mesma forma temos o exemplo de recebimento da mensagem emitida acima:

~~~ts
socket?.on("message", (response) => console.log(response)) // { message: "Hello" }
~~~

# NodeJS

Agora que sabemos o que é o Socket.io e como ele funciona, vamos fazer a implementação.

O primeiro passo é baixar as bibliotecas:

~~~shell
yarn add socket.io express
~~~

E então criar a estrutura básica do Express:

~~~ts
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

server.listen(3000, () => {
  console.log("Server running in: 3000");
});
~~~

Se acessarmos [http://localhost:3000](http://localhost:3000) teremos a mensagem "Hello world!". E para recebermos essa mensagem toda vez que um usuário se conectar, faremos o seguinte:

~~~ts
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

io.on("connection", (socket) => {
  console.log("User connected");
});

server.listen(3000, () => {
  console.log("Server running in: 3000");
});
~~~

O interessante desse on "connection" é que podemos usá-lo para criar os status "online" ou "offline" de um usuário. Quando ele se conectar inserimos seu status como "online", já ao se desconectar inserimos seu status como "offline", como no exemplo abaixo:

~~~ts
// User online
io.on("connection", (socket) => {
  console.log("User connected")

  // User offline
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
~~~

Então, vamos emitir uma mensagem toda vez que um usuário sair, por exemplo:

~~~ts
io.on("connection", (socket) => {
  io.emit("message", "Hi new user!")

  socket.on("disconnect", () => {
    io.emit("message", "User desconnected")
  });
});
~~~

Assim, temos todos os principais métodos a nível backend do Socket.io, mas caso queira conhecer mais, pode ver na documentação oficial [aqui](https://socket.io/docs/v4/server-installation/).

# ReactJs

Agora vamos para o React, onde o cliente vai ouvir essas atualizações em tempo real, apesar de podermos enviar e receber mensagens de ambos os lados, já que o socket trabalha com os dois.

Vamos instalar a bibliotecas necessárias:

~~~shell
yarn add socket.io-client react
~~~

Para executar o evento assim que o componente for renderizado, podemos usar o useEffect, como no exemplo:

~~~ts
import socketio from "socket.io-client";

const [messages, setMessages] = useState([])

useEffect(() => {
  async function SocketFunction() {
    const socket = socketio("http://localhost:3000");

    socket.on("message", (response) => {
      setMessages([...messages, response])
    });
  }

  SocketFunction();
}, []);
~~~

Com esse trecho de código, conseguiremos ouvir toda vez que uma mensagem for enviada no backend (ou frontend), assim como podemos enviar mensagemos para o backend com socket.emit:

~~~ts
const socket = socketio("http://localhost:3000");

socket.emit("message", "Hello World!");
~~~

Viu como é fácil? Em apenas alguns minutos a implementação do Socket.io foi concluída - uma ferramenta muito completa e poderosa.

Caso tenha alguma dúvida, abaixo estarão links para responder as perguntas mais comuns sobre o assunto:

Consigo enviar parâmetros de autorização de um usuário? Como token JWT, email, senha...

> _Sim, conseguimos! [Aqui](https://stackoverflow.com/questions/13745519/send-custom-data-along-with-handshakedata-in-socket-io) você consegue ver como fazer isso, usando handshake query._

Consigo enviar uma mensagem somente para um usuário?

> _Sim, é possível enviar uma mensagem para um único usuário e, além disso, depois você também pode enviar uma mensagem para todos os usuários e impedir que aqueles que já receberam a mensagem antes não a recebam novamente. Todos os principais métodos relacionados a isso se encontram aqui:_

* [https://socket.io/docs/v3/broadcasting-events/](https://socket.io/docs/v3/broadcasting-events/)
* [https://socket.io/docs/v3/rooms/](https://socket.io/docs/v3/rooms/)
* [https://socket.io/docs/v3/emit-cheatsheet/](https://socket.io/docs/v3/emit-cheatsheet/)
`,
] as Array<string>
