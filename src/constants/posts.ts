export const posts = [
  {
    title: 'Que rumo vou seguir?',
    subtitle:
      'Você já deve ter se feito essa pergunta várias vezes, ninguém tem a resposta 100% correta, mas sempre tem dicas, segue umas abaixo 👇',
    description: 'Você já deve ter se feito essa pergunta várias vezes, ninguém tem a resposta 100% correta...',
    createdAt: new Date('2021-11-28'),
  },
  {
    title: 'Swagger Express',
    subtitle: 'Como usar express em seu aplicativo expressjs',
    description: 'Esse artigo tem a intenção de te auxiliar na documentação com swagger e expressjs...',
    createdAt: new Date('2021-11-29'),
  },
] as Array<{ title: string; description: string; markdown: string; subtitle: string; createdAt: Date }>

export const markdowns = [
  `
Em um momento da vida especificamente quando você está se formando sempre começam a te fazer perguntas como: "Iai, vai trabalhar onde?", "Vai fazer faculdade?", "Qual faculdade você vai fazer?"

São perguntas extremamente comuns e muita das vezes os jovens não possuem a resposta, principalmente na área da tecnologia, temos diversos caminhos, diversas tecnologias, dentre diversas carreiras que dá pra seguir.

E eu não escapei desse processo, quando eu decidi que queria traçar a carreira de tecnologia, tive problemas em qual profissão me dedicaria, mas depois de estudar mais sobre as possibilidades, vi que o melhor para minhas habilidades seria engenharia de software, mas ai, me fiz mais uma duvida, qual linguagem?

Após entender o que era ser um engenheiro de software eu precisava escolher uma linguagem de programação que atendesse os requisitos que eu precisava na época, e sem foco, eu comecei a estudar PHP, Python, Html, Css, Javascript.

Por isso aqui está uma dica que pode te ajudar bastante:

* Foque em 1 coisa de cada vez, não adianta você querer aprender tudo de uma vez que você não vai conseguir, porém se você focar em apenas uma coisa e tente ser o melhor naquilo. 

Enfim não adiantou tentar estudar todas essas linguagens de programação se eu não estava focado, após ver um anúncio de uma escola de programação, resolvi fazer o desafio  que era um desafio de 1 semana codando em javascript usando os frameworks react-native, reactjs e nodejs. Mas aí o problema veio novamente, após o final de semana, o curso mais completo que eu precisaria para dar um up na minha carreira era pago e custava R$1900,00 que eu não tinha na época.

E aí mais algumas dicas:

* Você nunca vai precisar de dinheiro para aprender, sempre há boas soluções como youtube, stackoverflow, github entre outras ferramentas de aprendizagem grátis.

* Também é sempre bom pedir ajuda para pessoas que você conheça e já seja da área.

* Sempre dá pra usar soluções como o financiamento de cursos, para isso temos empresas como: [Provi](https://provi.com.br)  
`,
  `
## O que é um Swagger?

Você já deve ter visto sobre Swagger, Swagger é uma das ferramentas mais utilizadas para o desenvolvimento de OpenAPI Specification(OAS). Para documentações Swagger é uma ferramenta extremamente poderosa auxiliando desenvolvedores a documentar suas APIs de uma forma muito simples, Swagger consegue ler a estrutura e criar documentações automaticamente, e também fazer o oposto, lendo uma documentação e criando uma API.
 
Você pode gerar especificações como: operações da API, parâmetros da API, retorno, Autorizações necessárias manualmente, bem como gerar automaticamente através de comentários no código.
 
Documentação [aqui](https://swagger.io/)
 
E Hoje vamos ver como criar uma documentação através de comentários no código.

Para começar vamos criar um projeto e iniciá-lo.

~~~shell
  mkdir swagger_app
  cd swagger_app
  yarn init -y
~~~

Após dar iniciar o projeto vamos criar a pasta source do projeto e vamos instalar as bibliotecas iniciais:

~~~shell
yarn add express cors http nodemon typescript @types/node ts-node express-promise-router @types/express @types/cors
~~~

E criamos o arquivo root do projeto, nesse caso index.ts , vamos criar então a configuração básica do express, como no exemplo:

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
  console.log('We are live on \${port}/');
  console.log('Environment: production');
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

Vamos criar os scripts para rodar o projeto

~~~json
"scripts": {
  "dev": "nodemon src/index.ts"
},
~~~

## Configurando swagger

Adicionando as bibliotecas necessárias

~~~shell
yarn add swagger-jsdoc swagger-ui-express @types/swagger-jsdoc @types/swagger-ui-express
~~~

Com isso vamos inserir a configuração do swagger no root do projeto, vamos importar as duas bibliotecas que baixamos

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

Agora rode o projeto e acesse [http://localhost:5000/docs](http://localhost:5000/docs), dessa forma você vai ver a tela inicial do swagger que é construído automaticamente
 
Vamos então criar o nosso primeiro schema dentro de routes/index

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

Após isso já aparece os schemas que você criou, e então vamos finalmente documentar a nossa rota, adicionando as linhas

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

Dessa forma sua primeira rota foi documentada e prontinho, sua primeira documentação com swagger foi feita.
`,
] as Array<string>
