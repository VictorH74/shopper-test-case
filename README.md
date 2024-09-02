# Projeto de Serviço de Leitura de Imagens - Shopper.com.br

## Descrição do Projeto

Este projeto implementa o backend de um serviço de leitura individualizada de consumo de água e gás utilizando uma API de IA para obter a medição através da foto de um medidor. O projeto segue a **Arquitetura Hexagonal** e faz uso do **PostgreSQL** como banco de dados, sem o uso de uma ORM, dado que os requisitos relacionados ao banco de dados eram simples.

## Estrutura do Projeto

-   **Arquitetura:** Hexagonal
-   **Banco de Dados:** PostgreSQL (sem ORM)
-   **Validações:** `zod` para validação de rotas e variáveis de ambiente
-   **Agendamento de Tarefas:** `node-cron` para remoção automática de imagens expiradas
-   **Execução:** Uso de Docker com `docker-compose` e um `Makefile` para facilitar a execução do projeto

## Funcionalidades Implementadas

### Endpoints:

-   **POST /upload**

    -   Recebe uma imagem em Base64, consulta a API do Google Gemini para extrair o valor da medição e retorna um link temporário para a imagem, além do valor e do UUID da medição.
    -   **Validação:** Verifica se já existe uma leitura para o mês atual e o tipo de leitura.
    -   **Dados no Banco:** A imagem é salva no banco de dados com as seguintes colunas: `image_uuid`, `buffer_data`, `type`, `expiration_date`.

-   **PATCH /confirm**
    -   Confirma ou corrige o valor lido pelo LLM. Valida se o código de leitura informado existe e se a leitura já foi confirmada.
-   **GET /:customer_code/list**

    -   Lista todas as medições realizadas por um determinado cliente, com a opção de filtrar por tipo de medição (`WATER` ou `GAS`).

-   **GET /images/:image_uuid.:extension**
    -   Rota adicional para renderizar a imagem. Foi criada para fornecer o link temporário no response body da rota `/upload`, permitindo que a aplicação sirva as imagens diretamente.

### Gerenciamento de Imagens Expiradas

-   **Cron Job:**
    -   Um cron job, rodando a cada 3 minutos, verifica e remove imagens expiradas do banco de dados. Para isso, o projeto utiliza o pacote `node-cron`.

### Testes Unitários

O projeto inclui testes unitários para garantir a corretude e a robustez dos principais casos de uso implementados. Os testes foram desenvolvidos utilizando o framework **Jest**.

#### Use Cases Testados:

-   **ConfirmValue**

    -   Verifica se a confirmação do valor lido pelo LLM é realizada corretamente, incluindo a verificação de duplicatas e a atualização do valor confirmado no banco de dados.
    -   **Testes Incluídos:**
        -   Chama o repositório com o UUID correto.
        -   Atualiza a leitura com a confirmação correta.
        -   Retorna um erro se a medição não for encontrada.
        -   Retorna um erro se a confirmação for duplicada.
        -   Retorna sucesso ao confirmar corretamente.

-   **GetCustomerMeasure**

    -   Garante que a lista de medições de um cliente é recuperada corretamente, com a opção de filtragem por tipo de medição.
    -   **Testes Incluídos:**
        -   Recupera a lista de medições com o código de cliente e tipo de medição corretos.
        -   Retorna um erro se nenhuma medição for encontrada.
        -   Retorna a lista de medições corretamente associadas ao cliente.

-   **UploadImage**
    -   Valida o processo de upload de imagem, verificação de duplicatas e armazenamento das informações de medição e imagem no banco de dados.
    -   **Testes Incluídos:**
        -   Verifica a existência de medições duplicadas.
        -   Armazena a imagem com os dados corretos.
        -   Salva a medição com os dados corretos.
        -   Retorna um erro em caso de medição duplicada.
        -   Retorna sucesso com o URL da imagem e os dados da medição.

### Variáveis de Ambiente

-   As variáveis de ambiente relacionadas ao banco de dados e à URL base são definidas no arquivo `docker-compose.yml`.
-   A chave da API do Gemini é carregada a partir de um arquivo `.env` que será gerado durante os testes, conforme indicado na documentação.

## Execução do Projeto

### Docker

Para executar o projeto, basta utilizar o `docker-compose`:

```bash
docker-compose up --build
```

### Makefile

O projeto inclui um Makefile para facilitar a execução de comandos comuns. Por exemplo:

```bash
make up   # Inicia o projeto
make down    # Para o projeto
make restart # Reconstrói a imagem Docker
```

### Considerações Finais

Este projeto foi desenvolvido para atender aos requisitos especificados no teste técnico fornecido pela Shopper.com.br. O foco foi na implementação de uma API robusta, seguindo boas práticas de desenvolvimento e utilizando ferramentas adequadas para cada funcionalidade requerida.
