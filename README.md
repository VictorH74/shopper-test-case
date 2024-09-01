# Projeto de Serviço de Leitura de Imagens - Shopper.com.br

## Descrição do Projeto

Este projeto implementa o backend de um serviço de leitura individualizada de consumo de água e gás utilizando uma API de IA para obter a medição através da foto de um medidor. O projeto segue a **Arquitetura Hexagonal** e faz uso do **PostgreSQL** como banco de dados, sem o uso de uma ORM, dado que os requisitos relacionados ao banco de dados eram simples.

## Estrutura do Projeto

- **Arquitetura:** Hexagonal
- **Banco de Dados:** PostgreSQL (sem ORM)
- **Validações:** `zod` para validação de rotas e variáveis de ambiente
- **Agendamento de Tarefas:** `node-cron` para remoção automática de imagens expiradas
- **Execução:** Uso de Docker com `docker-compose` e um `Makefile` para facilitar a execução do projeto

## Funcionalidades Implementadas

### Endpoints:

- **POST /upload**
  - Recebe uma imagem em Base64, consulta a API do Google Gemini para extrair o valor da medição e retorna um link temporário para a imagem, além do valor e do UUID da medição.
  - **Validação:** Verifica se já existe uma leitura para o mês atual e o tipo de leitura.
  - **Dados no Banco:** A imagem é salva no banco de dados com as seguintes colunas: `image_uuid`, `buffer_data`, `type`, `expiration_date`.

- **PATCH /confirm**
  - Confirma ou corrige o valor lido pelo LLM. Valida se o código de leitura informado existe e se a leitura já foi confirmada.
  
- **GET /:customer_code/list**
  - Lista todas as medições realizadas por um determinado cliente, com a opção de filtrar por tipo de medição (`WATER` ou `GAS`).

- **GET /images/:image_uuid.:extension**
  - Rota adicional para renderizar a imagem. Foi criada para fornecer o link temporário no response body da rota `/upload`, permitindo que a aplicação sirva as imagens diretamente.

### Gerenciamento de Imagens Expiradas

- **Cron Job:**
  - Um cron job, rodando a cada 3 minutos, verifica e remove imagens expiradas do banco de dados. Para isso, o projeto utiliza o pacote `node-cron`.

### Variáveis de Ambiente

- As variáveis de ambiente relacionadas ao banco de dados e à URL base são definidas no arquivo `docker-compose.yml`. 
- A chave da API do Gemini é carregada a partir de um arquivo `.env` que será gerado durante os testes, conforme indicado na documentação.

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