# Obrigado - SERVER

O projeto consiste em uma API com foco em pagamentos digitais, com a possibilidade de enviar e receber saldos de uma determinada moeda virtual.

## Tecnologias utilizadas:

```
TypeScript, Prisma ORM, PostgreSQL, Nodemon, Express, Node, Jest, dotenv, cors
```

## Instalando a aplicação:

### Baixando o repositório
Insira os seguintes comandos no terminal:

#### Sem a chave SSH
```
git clone https://github.com/igor-gui/obrigado_back.git
cd obrigado_back
```

#### Com a chave SSH
```
git clone git@github.com:igor-gui/obrigado_back.git
cd obrigado_back
```
#### Configure as variáveis de ambiente em um arquivo .env
```
POSTGRES_USERNAME=postgres
POSTGRES_PASSWORD=?
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=?

PORT=?
DATABASE_URL=postgresql://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}?schema=public
```

Insira os seguintes comandos no terminal:
#### Preparando o Banco de dados
```
pnpm prisma:migration:generate
pnpm prisma:migration:run
```

#### Instalando dependências
```
pnpm i
```

#### Executando Servidor
```
pnpm start
```


### Rotas:
<ol>

<li>GET '/health'</li>
<li>GET '/users'</li>
<li>POST '/users'</li>
<li>POST '/login'</li>
<li>POST '/payments'</li>

</ol>

### Como o servidor espera o body e headers da requisição para cada rota post:
``/users``<br>
req.body:
```
    {
        "nickName": string,
        "email": string tipo @mail,
        "password": string
    } 
```
<br>

``/login``<br>
req.body:
```
    {
        "nickName/email": string/string tipo @mail,
        "password": string
    }
```
Após sucesso no Login, o servidor retornarar um token uuid. <br> <br>
``/payments``<br>
req.body:
```
    {
        "nickName": string,
        "value": number
    } 
```

req.headers:

```
    {
        Authorization: Bearer {token uuid},
    } 
```
