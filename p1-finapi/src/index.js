const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

const clients = [];

/*
* MIDDLEWARE
*/ 
function verifyIfClientExists(request, response, next) {
    const { cpf } = request.headers;
    const client = clients.find(client => client.cpf === cpf);
    if (!client) {
        return response.status(400).json({ error: "Client not found" });
    }
    request.client = client;
    return next();
}

function getBalance(statement) {
    const balance = statement.reduce((acc, operation) => {
        if (operation.type == "credit") {
            return acc + operation.amount;
        } else {
            return acc - operation.amount;
        }
    }, 0);
    return balance;
}

/*
* CRIA CONTA
*/
app.post('/account', (request, response) => {
    const { cpf, name } = request.body;
    const clientAlreadyExists = clients.some(client => client.cpf === cpf);

    if (clientAlreadyExists) {
        return response.status(400).json({ error: "Client already exists" });
    }

    clients.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    });

    return response.status(201).send();
});

/*
* RETORNA EXTRATO BANCÁRIO
*/
app.get('/statement', verifyIfClientExists, (request, response) => {
    const { client } = request;
    return response.json(client.statement);
});

/*
* REALIZA DEPÓSITO
*/
app.post('/deposit', verifyIfClientExists, (request, response) => {
    const { description, amount } = request.body;
    const { client } = request;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    }
    client.statement.push(statementOperation);

    return response.status(201).send();
});

/*
* REALIZA SAQUE
*/
app.post('/withdraw', verifyIfClientExists, (request, response) => {
    const { amount } = request.body;
    const { client } = request;

    const balance = getBalance(client.statement);

    if ( balance >= amount ) {
        const statementOperation = {
            amount,
            created_at: new Date(),
            type: "debit"
        }
        client.statement.push(statementOperation);
        response.status(201).send();
    } else {
        response.status(400).json({ error: "Insufficient funds"});
    }
});

/*
* RETORNA EXTRATO BANCÁRIO DE DETERMINADA DATA
*/
app.get('/statement/date', verifyIfClientExists, (request, response) => {
    const { client } = request;
    const { date } = request.query;
    const formatedDate = new Date(date + " 00:00");

    const statementByDate = client.statement.filter(operation => 
        operation.created_at.toDateString() == formatedDate.toDateString()
    );
    return response.json(statementByDate);
});

/*
* ATUALIZA DADOS DA CONTA
*/
app.put('/account', verifyIfClientExists, (request, response) => {
    const { client } = request;
    const { name } = request.body;

    client.name = name;
    return response.status(201).send();
});

/*
* OBTEM DADOS DA CONTA
*/
app.get('/account', verifyIfClientExists, (request, response) => {
    const { client } = request;
    return response.json(client);
});

/*
* DELETA CONTA
*/
app.delete('/account', verifyIfClientExists, (request, response) => {
    const { client } = request;
    clients.splice(client, 1);
    return response.status(200).json(clients);
});

app.listen(3333);