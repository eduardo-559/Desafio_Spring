# Projeto de Gestão de Estoque

## Tecnologias Utilizadas
- **Java** + **Spring Boot** para o backend
- **React** + **Bootstrap** para o frontend

## Passo a Passo para Rodar o Projeto

### Passo 1: 
Certificar-se de ter o Java, o PostgreSQL e o Node devidamente instalados em sua máquina.
### Passo 2:
Abra o pgadmin e crie o banco com o nome "estoque". Para isso, basta usar o comando "CREATE DATABASE estoque".
### Passo 3:
Identificar o arquivo application.properties, disponível em "backend/src/main/resources/application.properties" e configurar com o seu usuário e senha do postgre.
### Passo 4:
Abra duas janelas diferentes do vscode, uma para o front e outra back.
### Passo 5:
Dentro do repositório do back, rodar o comando "./mvnw spring-boot:run". Isso irá rodar o backend.
### Passo 6:
Dentro do repositório do front, rodar o comando "npm install" e em seguida "npm start", isso irá rodar o frontend.

### 
Ao final desses passos, o projeto de Gestão de Estoque irá rodar localmente em sua máquina.
### 
Com ele já em funcionamento, execute, no pgadmin, um script para popular o banco de dados, fornecido dentro da pasta do backend com o nome de "populate.sql".
## Após isso, pode ficar a vontade para navegar pela aplicação.
- **Obs**: quando um determinado produto atingir a quantidade 0 no estoque, automático o status desse produto vai de "ativo" para "inativo".
- **Obs**: o Diagrama Entidade Relacionamento está disponível na pasta inicial do projeto, nomeado de **DER.jpeg**
