# Desafio Ibridge

Este é o README para o projeto Desafio Ibridge. Ele contém as instruções para clonar o projeto, configurar e executar os ambientes de backend e frontend.

## Primeiros Passos

Estas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (v22 ou superior)
- [MySQL](https://www.mysql.com/)

### Clonando o Repositório

Para clonar o repositório, abra seu terminal e execute o seguinte comando:

```bash
git clone https://github.com/viniciusmope/desafio-ibridge.git
cd desafio_ibridge
```

## Configuração do Backend

Siga estes passos para configurar o ambiente de backend:

1.  **Navegue até o diretório do backend:**

    ```bash
    cd backend
    ```

2.  **Crie o arquivo de ambiente:**

    Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env`. Você pode fazer isso com o seguinte comando:

    ```bash
    cp .env.example .env
    ```

    Abra o arquivo `.env` e configure as seguintes variáveis com as suas credenciais do banco de dados e a URL de dados:

    ```
    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=seu_usuario
    DB_PASSWORD=sua_senha
    DB_NAME=seu_banco
    DATA_URL=https://www.ibridge.com.br/dados-teste-tecnico.json
    ```

3.  **Instale as dependências:**

    Execute o seguinte comando para instalar todas as dependências do projeto:

    ```bash
    npm install
    ```

4.  **Inicie o banco de dados:**

    Certifique-se de que seu servidor MySQL esteja em execução e que o banco de dados, com o nome que você especificou na variável `DB_NAME` no arquivo `.env`, já tenha sido criado.

    Para verificar o status do serviço do MySQL, você pode utilizar o comando:

    ```bash
    sudo systemctl status mysql
    ```

    Se o serviço estiver ativo, a saída do comando deverá indicar `active (running)`. Caso contrário, inicie o serviço.

    Se precisar criar o banco de dados, você pode fazer isso através do cliente de linha de comando do MySQL:

    ```sql
    CREATE DATABASE seu_banco;
    ```

5.  **Execute as migrações:**

    Para criar as tabelas no banco de dados, execute o seguinte comando de migração:

    ```bash
    npm run migrate
    ```

6.  **Importe os dados:**

    Após a execução das migrações, importe os dados para o banco de dados com o seguinte script:

    ```bash
    npm run import
    ```

7.  **Execute o servidor de desenvolvimento:**

    Agora você pode iniciar o servidor de desenvolvimento do NestJS:

    ```bash
    npm run start:dev
    ```

    O backend estará em execução em `http://localhost:3000`.

## Configuração do Frontend

Siga estes passos para configurar o ambiente de frontend:

1.  **Navegue até o diretório do frontend:**

    Se você estava no diretório `backend`, primeiro volte para a raiz do projeto (`cd ..`) e depois entre no diretório `frontend`:

    ```bash
    cd ../frontend
    ```

2.  **Crie o arquivo de ambiente:**

    Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env`:

    ```bash
    cp .env.example .env
    ```

    *Observação: O arquivo `.env` do frontend deve conter a URL da API do backend, que por padrão é `http://localhost:3000`.*

3.  **Instale as dependências:**

    Execute o seguinte comando para instalar as dependências do React:

    ```bash
    npm install
    ```

4.  **Execute o servidor de desenvolvimento:**

    Inicie o servidor de desenvolvimento do Vite com o seguinte comando:

    ```bash
    npm run dev
    ```

    O frontend estará acessível em `http://localhost:5173`.

## Executando a Aplicação

Para executar a aplicação completa, você precisará ter dois terminais abertos:

1.  **Terminal 1 (Backend):**
    ```bash
    cd backend
    npm run start:dev
    ```

2.  **Terminal 2 (Frontend):**
    ```bash
    cd frontend
    npm run dev
    ```

Após iniciar ambos os servidores, você pode abrir seu navegador e acessar `http://localhost:5173` para ver a aplicação em funcionamento.
