## Backend - Wefit

Entrega - Teste de backend da Wefit

### Para iniciar a aplicação, você deve ter instalado:

- Node.js & npm
- Docker

### Instale as dependencias

```
npm i
```

### Suba a instancia do Banco de Dados

```
docker-compose up -d
```

### Suba o servidor

```
npm run dev
```

### Para executar os testes de unidade:

```
npm test
```

### Para fazer um novo commit dentro dos padrões do conventional commits:

```
npm run commit
```

### Para revisar code style e corrigir identação

```
npm run lint:fix
```

# Sobre a entrega

### O TypeOrm esta com a opção `synchronize` setada como `true`, então toda a estrutura do banco será criada automaticamente quando qualquer endpoint rodar. Como se trata apenas de um teste que não vai pra produção, optei por não implementar as migrations.

### A arquitetura foi pensada para que o domínio da aplicação fique minimamente acoplado à dependencias externas, dentro do possível. Por isso a utilização do container de IoC. Numa situação real normalmente eu optaria por utilizar o Nest.js já que ele trás abstrações que em muitas situações facilita o dia a dia, mas quis mostrar um pouco da minha bagagem e não me prender a um framework especifico.

### As validações da regra de negócio durante o cadastro foram pensadas de maneira arbitrária, mas os testes unitários do caso de uso estão descrevendo bem como estruturei, então imagino que sejam suficientes como _**documentação do processo**_.

### A API não esta servindo um endpoint para consultar a documentação diretamente, mas o arquivo swagger esta disponível na pasta **_docs_** na raiz do projeto. Basta copiar o conteúdo do arquivo `wefit-api-swagger.yaml` e colar no [Swagger Editor](https://editor.swagger.io/). Também pode efetuar as chamadas para a API pelo postman ou terminal utilizando as seguintes CURL'S:

### CURL para cadastro de vendedor

```sh
curl --location 'localhost:4568/api/person/create' \
--header 'x-api-key: CHAVESUPERSECRETAETC' \
--header 'Content-Type: application/json' \
--data-raw '{
    "personType": "2",
    "cnpj": "57.240.262/0001-40",
    "cpf": "825.186.670-75",
    "name": "Kauê Tiago Davi Rezende",
    "phone": "(69) 2847-9557",
    "cellPhone": "1114721459",
    "email": "kaue.tiago.rezende@nextel.com.br",
    "termsAccept": true,
    "zipCode": "76963-732",
    "street": "Avenida Cuiabá",
    "number": "387",
    "complement": "Ao lado do mercado",
    "city": "Cacoal",
    "neighborhood": "Centro",
    "state": "RO"
```

### CURL para cadastro de comprador

```sh
curl --location 'localhost:4568/api/person/create' \
--header 'x-api-key: CHAVESUPERSECRETAETC' \
--header 'Content-Type: application/json' \
--data-raw '{
    "personType": "1",
    "cpf": "825.186.670-75",
    "name": "Kauê Tiago Davi Rezende",
    "phone": "(69) 2847-9557",
    "cellPhone": "1114721459",
    "email": "kaue.tiago.rezende@nextel.com.br",
    "termsAccept": true,
    "zipCode": "76963-732",
    "street": "Avenida Cuiabá",
    "number": "387",
    "complement": "Ao lado do mercado",
    "city": "Cacoal",
    "neighborhood": "Centro",
    "state": "RO"
}'
```

### **\*dados retirados de [4devs.com](https://www.4devs.com.br/)**
