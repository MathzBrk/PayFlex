# PayFlex API

Bem-vindo à API do PayFlex Solutions, uma plataforma de pagamentos simplificada que permite depósitos e transferências de dinheiro entre usuários. Existem dois tipos de usuários: comuns e lojistas, ambos com carteiras para realizar transações entre si.

## Documentação Swagger

A documentação completa da API pode ser acessada em: [Swagger UI](http://localhost:8082/api/v1/docs/)

## Configuração Inicial

1. Crie um arquivo `.env` na raiz do projeto para configurar as variáveis de ambiente.
   - Use o arquivo `.env.example` como referência para definir o caminho do banco de dados.

## Dicas
1. Para a criação de um User, recomendo a utilização de um gerador de CPF ou CNPJ para evitar erros.
  

## Endpoints Disponíveis

Abaixo estão os principais endpoints disponíveis na API:

### 1. Realizar Transferência

- **Endpoint:** `/transactions/transfer`
- **Método:** `POST`
- **Descrição:** Realiza uma transferência de um valor entre um pagador (`payer`) e um recebedor (`payee`).
- **Exemplo de Corpo da Requisição:**
  ```json
  {
    "value": 23,
    "payee": "0a05d403-cfe4-4593-b93f-f352f6cc0a24",
    "payer": "f1183c75-7dac-45fb-a039-635dec701a44"
  }
  ```

### 2. Recuperar Todas as Transações

- **Endpoint:** `/transactions`
- **Método:** `GET`
- **Descrição:** Obtém todas as transações registradas no banco de dados.
- **Resposta Exemplo:**
  ```json
  [
    {
      "id": 22,
      "value": 23.0,
      "payer": "f1183c75-7dac-45fb-a039-635dec701a44",
      "payee": "0a05d403-cfe4-4593-b93f-f352f6cc0a24",
      "createdAt": "2025-02-01T20:10:00.000Z"
    }
  ]
  ```

### 3. Obter Transações por Período de Tempo

- **Endpoint:** `/transactions/time`
- **Método:** `GET`
- **Descrição:** Retorna todas as transações que ocorreram em um determinado período de tempo.
- **Parâmetro de Query:**
  - `seconds` (opcional): Número de segundos para filtrar as transações (padrão: 60 segundos).
- **Resposta Exemplo:**
  ```json
  [
    {
      "id": 22,
      "value": 23.0,
      "payer": "f1183c75-7dac-45fb-a039-635dec701a44",
      "payee": "0a05d403-cfe4-4593-b93f-f352f6cc0a24",
      "createdAt": "2025-02-01T20:10:00.000Z"
    }
  ]
  ```

### 4. Estatísticas das Transações em um Intervalo de Tempo

- **Endpoint:** `/transactions/stats/time`
- **Método:** `GET`
- **Descrição:** Retorna estatísticas das transações ocorridas em um determinado intervalo de tempo.
- **Parâmetro de Query:**
  - `seconds` (opcional): Intervalo de busca em segundos (padrão: 60 segundos).
- **Resposta Exemplo:**
  ```json
  {
    "count": 100,
    "sum": 25640.13,
    "min": 2.65,
    "max": 483.91,
    "avg": 256.40
  }
  ```

### 5. Criar um Novo Usuário

- **Endpoint:** `/users`
- **Método:** `POST`
- **Descrição:** Cadastro de um novo usuário. Envia os dados do usuário para cadastro.
- **Exemplo de Corpo da Requisição:**
  ```json
  {
    "fullName": "Luis Felipe",
    "email": "luisss@email.com",
    "isMerchant": false,
    "password": "123456",
    "document": "914.426.990-00",
    "balance": 10000
  }
  ```
- **Respostas:**
  - `201 Created`: Usuário criado com sucesso.
    ```json
    {
      "id": "0a05d403-cfe4-4593-b93f-f352f6cc0a24",
      "fullName": "Luis Felipe",
      "email": "luisss@email.com",
      "isMerchant": false,
      "document": "91442699000",
      "documentType": "CPF"
    }
    ```
  - `400 Bad Request`: Dados inválidos enviados para cadastro.
  - `500 Internal Server Error`: Erro interno do servidor.

### 6. Listar Todos os Usuários

- **Endpoint:** `/users`
- **Método:** `GET`
- **Descrição:** Retorna uma lista com todos os usuários registrados no banco de dados.
- **Respostas:**
  - 200 OK: Lista de usuários retornada com sucesso.
  - `400 Bad Request`: Dados inválidos enviados para cadastro.
  - `500 Internal Server Error`: Erro interno do servidor.
    
    

