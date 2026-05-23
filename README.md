# PharmaChat 💊🤖

PharmaChat é uma aplicação full-stack projetada para auxiliar no setor farmacêutico, utilizando Inteligência Artificial (Gemini) para processar regras de negócio e fornecer assistência inteligente.

## 🚀 Tecnologias

### Backend
- **Java 21**
- **Spring Boot 3.4.1**
- **Spring Data JPA**: Persistência de dados.
- **Spring Security**: Autenticação e proteção de rotas.
- **H2 Database**: Banco de dados em memória para desenvolvimento rápido.
- **LangChain4j**: Integração com LLMs (Large Language Models).
- **Google AI Gemini**: Motor de IA para processamento de linguagem natural.
- **Lombok**: Redução de código boilerplate.
- **Springdoc-OpenAPI (Swagger)**: Documentação da API.

### Frontend
- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS** (ou sua biblioteca de estilo preferida)

---

## 🛠️ Configuração do Backend

### Pré-requisitos
- JDK 21
- Maven 3.9+

### Configuração de Variáveis de Ambiente
No arquivo `src/main/resources/application.properties`, configure sua chave da API do Gemini:
```properties
gemini.api.key=SUA_CHAVE_AQUI
```

### Como Executar
1. Navegue até a pasta `backend`.
2. Instale as dependências e compile:
   ```bash
   ./mvnw clean install
   ```
3. Execute a aplicação:
   ```bash
   ./mvnw spring-boot:run
   ```
A API estará disponível em `http://localhost:8080`.
O Swagger (documentação) pode ser acessado em `http://localhost:8080/swagger-ui.html`.

---

## 💻 Configuração do Frontend

### Pré-requisitos
- Node.js (v18+)
- npm ou yarn

### Como Executar
1. Navegue até a pasta do frontend.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
O frontend estará disponível em `http://localhost:5173` (porta padrão do Vite).

---

## 📖 Funcionalidades
- **Chat com IA**: Interação inteligente baseada em regras de negócio farmacêuticas.
- **Gestão de Regras**: O sistema lê regras de `business_rules.txt` para guiar o comportamento da IA.
- **Segurança**: Acesso restrito via Spring Security.
- **Banco de Dados**: Armazenamento em memória (H2) configurado para facilitar o teste.

---

## 📁 Estrutura do Projeto
- `backend/`: Código fonte Spring Boot.
- `src/main/resources/business_rules.txt`: Arquivo contendo as diretrizes que a IA deve seguir.
