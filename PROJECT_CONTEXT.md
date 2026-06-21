# PROJECT_CONTEXT.md — Pizzaria Backend

> Documento de contexto gerado automaticamente pela análise completa do código-fonte.
> Sirva como referência principal para desenvolvimento e manutenção do projeto.

---

## 1. Visão Geral do Projeto

| Item                           | Descrição                                                                                                                                    |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nome do projeto**            | Pizzaria Backend                                                                                                                             |
| **Objetivo principal**         | Sistema de gestão de pedidos para pizzaria                                                                                                   |
| **Problema que resolve**       | Gerenciamento de cardápio (categorias, produtos), controle de pedidos (abertura, fechamento, itens) e autenticação de usuários (STAFF/ADMIN) |
| **Público-alvo**               | Estabelecimentos do ramo alimentício (pizzarias/restaurantes)                                                                                |
| **Principais funcionalidades** | Cadastro e autenticação de usuários, gerenciamento de categorias, produtos, pedidos e itens                                                  |

---

## 2. Stack Tecnológica

| Categoria                 | Tecnologia         | Versão  | Finalidade                                               |
| ------------------------- | ------------------ | ------- | -------------------------------------------------------- |
| **Linguagem**             | TypeScript         | ^6.0.3  | Tipagem estática e segurança em tempo de desenvolvimento |
| **Runtime**               | Node.js            | —       | Execução do servidor                                     |
| **Framework HTTP**        | Express            | ^5.2.1  | Roteamento e middleware HTTP                             |
| **ORM**                   | Prisma Client      | ^7.8.0  | Acesso e manipulação do banco de dados                   |
| **Banco de Dados**        | PostgreSQL         | —       | Persistência de dados                                    |
| **Adapter DB**            | @prisma/adapter-pg | ^7.8.0  | Driver adaptador Prisma para PostgreSQL                  |
| **Driver DB**             | pg                 | ^8.13.3 | Driver nativo PostgreSQL                                 |
| **Autenticação**          | jsonwebtoken       | ^9.0.3  | Geração e verificação de tokens JWT                      |
| **Hash de senhas**        | bcryptjs           | ^3.0.3  | Hash e comparação de senhas                              |
| **Validação**             | Zod                | ^4.4.3  | Schemas de validação de dados                            |
| **Variáveis de ambiente** | dotenv             | ^17.4.2 | Carregamento de variáveis de ambiente                    |
| **CORS**                  | cors               | ^2.8.6  | Controle de acesso HTTP                                  |
| **Dev Server**            | tsx                | ^4.22.4 | Execução TypeScript com hot-reload                       |
| **Transpilador**          | TypeScript (tsc)   | ^6.0.3  | Compilação TS → JS                                       |
| **Linter/Formatter**      | Prettier           | ^3.8.4  | Formatação automática de código                          |
| **Git Hooks**             | Husky              | ^9.1.7  | Gatilhos para hooks do Git                               |
| **Staged Linter**         | lint-staged        | ^17.0.7 | Executa linters apenas em arquivos staged                |
| **Commit Lint**           | @commitlint/cli    | ^21.0.2 | Valida mensagens de commit (conventional commits)        |

---

## 3. Arquitetura da Aplicação

### 3.1 Padrão Arquitetural

Arquitetura em camadas (Controller → Service → Prisma/DB), seguindo o padrão de responsabilidade única.

### 3.2 Fluxo de Requisições

```
Cliente HTTP
    ↓
Express (server.ts)
    ↓
Router (routes.ts)
    ↓
Middleware(s) [validateSchema → isAuthenticated → isAdmin]
    ↓
Controller
    ↓
Service
    ↓
Prisma Client (lib/prisma.ts)
    ↓
PostgreSQL
```

### 3.3 Responsabilidades de cada camada

| Camada          | Diretório             | Responsabilidade                                                                                    |
| --------------- | --------------------- | --------------------------------------------------------------------------------------------------- |
| **Routes**      | `src/routes.ts`       | Definir endpoints HTTP, associar middlewares e controllers                                          |
| **Controllers** | `src/controllers/**/` | Receber e responder requisições HTTP. Extrair dados de `req.body/params/query` e delegar ao service |
| **Services**    | `src/services/**/`    | Conter todas as regras de negócio, validações e chamadas ao Prisma                                  |
| **Middlewares** | `src/middlewares/`    | Interceptar requisições para validação, autenticação e autorização                                  |
| **Schemas**     | `src/schemas/`        | Definir schemas de validação com Zod                                                                |

### 3.4 Regras por Camada

#### Routes (`src/routes.ts`)

- **Responsabilidade:** Mapear URLs e métodos HTTP para controllers e middlewares
- **Organização:** Arquivo único (`routes.ts`) que exporta um `Router` do Express
- Prefixo `"/api"` aplicado no `server.ts` via `app.use("/api", routes)`

#### Controllers (`src/controllers/**/*`)

- **Responsabilidade:** Extrair dados da requisição, instanciar o service e retornar a resposta HTTP
- **O que podem fazer:**
  - Ler `req.body`, `req.params`, `req.query`
  - Definir status code e corpo da resposta (`res.status(X).json(...)`)
  - Tratar erros esperados com try/catch
- **O que NÃO podem fazer:**
  - Conter regras de negócio
  - Acessar diretamente o banco de dados
  - Importar o Prisma

#### Services (`src/services/**/*`)

- **Responsabilidade:** Conter todas as regras de negócio, validações de domínio e acesso ao banco via Prisma
- **Integrações externas:** Apenas o banco de dados (Prisma) e bcryptjs (hash de senha)

#### Middlewares (`src/middlewares/`)

- **`validateSchema`** — Valida `body/query/params` contra um schema Zod antes de chegar ao controller
- **`isAuthenticated`** — Verifica token JWT no header `Authorization: Bearer <token>` e injeta `req.userId`
- **`isAdmin`** — Consulta o banco e verifica se `req.userId` possui role `ADMIN`

---

## 4. Estrutura de Pastas

```
├── prisma/
│   ├── schema.prisma              # Schema do banco de dados (modelos, enum, relações)
│   ├── migrations/                # Migrations geradas pelo Prisma
│   │   └── 20260619145757_create_tables/
│   │       └── migration.sql      # SQL da migration inicial
│   ├── migration_lock.toml        # Lock do provider do banco
│   └── prisma.config.ts           # Configuração do Prisma CLI
├── src/
│   ├── @types/express/
│   │   └── index.d.ts             # Augmentação do Express Request (userId)
│   ├── controllers/
│   │   ├── user/
│   │   │   ├── createUserController.ts
│   │   │   ├── authUserController.ts
│   │   │   └── detailUserController.ts
│   │   └── category/
│   │       └── createCategoryController.ts
│   ├── generated/prisma/          # Cliente Prisma gerado (gitignored)
│   ├── lib/
│   │   └── prisma.ts              # Inicialização do PrismaClient com adapter-pg
│   ├── middlewares/
│   │   ├── isAuthenticated.ts     # Autenticação JWT
│   │   ├── isAdmin.ts             # Autorização ADMIN
│   │   └── validateSchema.ts      # Validação Zod
│   ├── schemas/
│   │   ├── userSchema.ts          # Schemas de usuário (criação + login)
│   │   └── categorySchema.ts      # Schema de criação de categoria
│   ├── services/
│   │   ├── user/
│   │   │   ├── createUserService.ts
│   │   │   ├── authUserService.ts
│   │   │   └── detailUserService.ts
│   │   └── category/
│   │       └── createCategoryService.ts
│   ├── routes.ts                  # Definição de todas as rotas
│   └── server.ts                  # Entry point do servidor Express
├── .agents/                       # Habilidades de agentes de IA (opencode)
├── .husky/                        # Hooks do Husky (pre-commit, commit-msg)
├── .vscode/
│   └── settings.json              # Configurações do VS Code
├── .commitlintrc.json             # Configuração do commitlint
├── .env                           # Variáveis de ambiente (gitignored)
├── .env.example                   # Template de variáveis de ambiente
├── .gitignore
├── .lintstagedrc                  # Configuração do lint-staged
├── .prettierrc                    # Configuração do Prettier
├── opencode.json                  # Configuração opencode
├── package.json
├── tsconfig.json                  # Configuração TypeScript
└── skills-lock.json               # Lock de skills opencode
```

### Responsabilidade de cada diretório

| Diretório          | Responsabilidade                                     |
| ------------------ | ---------------------------------------------------- |
| `src/controllers/` | Classes que manipulam requisições/respostas HTTP     |
| `src/services/`    | Classes com regras de negócio e acesso ao banco      |
| `src/middlewares/` | Funções de middleware (auth, validação, autorização) |
| `src/schemas/`     | Schemas Zod para validação de dados de entrada       |
| `src/lib/`         | Inicialização de bibliotecas (Prisma)                |
| `src/@types/`      | Declarações de tipos e augmentações                  |
| `src/generated/`   | Código gerado pelo Prisma (não versionado)           |
| `prisma/`          | Schema, migrations e configuração do Prisma          |
| `.husky/`          | Hooks do Git gerenciados pelo Husky                  |

---

## 5. Banco de Dados

### 5.1 Informações Gerais

| Atributo                                 | Valor                                                                |
| ---------------------------------------- | -------------------------------------------------------------------- |
| **Banco**                                | PostgreSQL                                                           |
| **ORM**                                  | Prisma 7 (com @prisma/adapter-pg)                                    |
| **Provider**                             | `postgresql`                                                         |
| **Estratégia de migrations**             | `prisma migrate dev` (declarativa, gerada a partir do schema)        |
| **Convenção de nomenclatura de tabelas** | Plural, snake_case (`users`, `categories`, `products`, `orders`)     |
| **Convenção de nomenclatura de campos**  | camelCase (Prisma), mapeados via `@@map` para snake_case nas tabelas |
| **IDs**                                  | UUID (`@default(uuid())`)                                            |
| **Timestamps**                           | `createdAt` e `updatedAt` em todas as tabelas                        |
| **Soft delete**                          | Não implementado                                                     |
| **Enum**                                 | `Role` (STAFF, ADMIN) — mapeado nativamente no PostgreSQL como ENUM  |

### 5.2 Tabelas/Modelos

#### `User` → `users`

| Campo       | Tipo            | Restrições             | Descrição                  |
| ----------- | --------------- | ---------------------- | -------------------------- |
| `id`        | `String` (UUID) | `@id @default(uuid())` | Identificador único        |
| `name`      | `String`        | —                      | Nome do usuário            |
| `email`     | `String`        | `@unique`              | Email para login           |
| `password`  | `String`        | —                      | Hash bcrypt da senha       |
| `role`      | `Role` enum     | `@default(STAFF)`      | `STAFF` ou `ADMIN`         |
| `createdAt` | `DateTime`      | `@default(now())`      | Data de criação            |
| `updatedAt` | `DateTime`      | `@updatedAt`           | Data da última atualização |

#### `Category` → `categories`

| Campo       | Tipo            | Restrições             | Descrição                  |
| ----------- | --------------- | ---------------------- | -------------------------- |
| `id`        | `String` (UUID) | `@id @default(uuid())` | Identificador único        |
| `name`      | `String`        | —                      | Nome da categoria          |
| `createdAt` | `DateTime`      | `@default(now())`      | Data de criação            |
| `updatedAt` | `DateTime`      | `@updatedAt`           | Data da última atualização |
| `products`  | `Product[]`     | Relação 1:N            | Produtos da categoria      |

#### `Product` → `products`

| Campo         | Tipo            | Restrições             | Descrição                  |
| ------------- | --------------- | ---------------------- | -------------------------- |
| `id`          | `String` (UUID) | `@id @default(uuid())` | Identificador único        |
| `name`        | `String`        | —                      | Nome do produto            |
| `description` | `String`        | —                      | Descrição do produto       |
| `price`       | `Int`           | —                      | Preço em centavos          |
| `banner`      | `String`        | —                      | URL da imagem/banner       |
| `disable`     | `Boolean`       | `@default(false)`      | Produto ativo/desativado   |
| `categoryId`  | `String`        | FK → `categories.id`   | Categoria do produto       |
| `Items`       | `Item[]`        | Relação 1:N            | Itens de pedido            |
| `createdAt`   | `DateTime`      | `@default(now())`      | Data de criação            |
| `updatedAt`   | `DateTime`      | `@updatedAt`           | Data da última atualização |

#### `Order` → `orders`

| Campo       | Tipo            | Restrições             | Descrição                               |
| ----------- | --------------- | ---------------------- | --------------------------------------- |
| `id`        | `String` (UUID) | `@id @default(uuid())` | Identificador único                     |
| `table`     | `Int`           | —                      | Número da mesa                          |
| `status`    | `Boolean`       | `@default(false)`      | `false` = aberto, `true` = fechado      |
| `draft`     | `Boolean`       | `@default(true)`       | `true` = rascunho, `false` = finalizado |
| `name`      | `String?`       | Opcional               | Nome do cliente                         |
| `Items`     | `Item[]`        | Relação 1:N            | Itens do pedido                         |
| `createdAt` | `DateTime`      | `@default(now())`      | Data de criação                         |
| `updatedAt` | `DateTime`      | `@updatedAt`           | Data da última atualização              |

#### `Item` → `Item`

| Campo       | Tipo            | Restrições             | Descrição                  |
| ----------- | --------------- | ---------------------- | -------------------------- |
| `id`        | `String` (UUID) | `@id @default(uuid())` | Identificador único        |
| `amount`    | `Int`           | —                      | Quantidade do produto      |
| `orderId`   | `String`        | FK → `orders.id`       | Pedido                     |
| `productId` | `String`        | FK → `products.id`     | Produto                    |
| `createdAt` | `DateTime`      | `@default(now())`      | Data de criação            |
| `updatedAt` | `DateTime`      | `@updatedAt`           | Data da última atualização |

### 5.3 Relacionamentos

- **Category 1:N Product** — Uma categoria pode ter vários produtos; um produto pertence a uma categoria
- **Order 1:N Item** — Um pedido pode ter vários itens; um item pertence a um pedido
- **Product 1:N Item** — Um produto pode aparecer em vários itens; um item referencia um produto

### 5.4 Constraints e Índices

- **Unique:** `users.email` (índice único)
- **Foreign Keys:**
  - `products.categoryId` → `categories.id` (ON DELETE RESTRICT, ON UPDATE CASCADE)
  - `Item.orderId` → `orders.id` (ON DELETE RESTRICT, ON UPDATE CASCADE)
  - `Item.productId` → `products.id` (ON DELETE RESTRICT, ON UPDATE CASCADE)

---

## 6. Modelagem de Dados (Diagrama Textual)

```
Role (Enum)
├── STAFF
└── ADMIN

User
├── id: String (UUID, PK)
├── name: String
├── email: String (Unique)
├── password: String (hash bcrypt)
├── role: Role (default: STAFF)
├── createdAt: DateTime
└── updatedAt: DateTime

Category
├── id: String (UUID, PK)
├── name: String
├── createdAt: DateTime
├── updatedAt: DateTime
└── products: Product[] (1:N)

Product
├── id: String (UUID, PK)
├── name: String
├── description: String
├── price: Int (centavos)
├── banner: String
├── disable: Boolean (default: false)
├── categoryId: String (FK → categories.id)
├── Items: Item[] (1:N)
├── createdAt: DateTime
└── updatedAt: DateTime

Order
├── id: String (UUID, PK)
├── table: Int
├── status: Boolean (default: false = aberto)
├── draft: Boolean (default: true = rascunho)
├── name: String? (opcional)
├── Items: Item[] (1:N)
├── createdAt: DateTime
└── updatedAt: DateTime

Item
├── id: String (UUID, PK)
├── amount: Int
├── orderId: String (FK → orders.id)
├── productId: String (FK → products.id)
├── createdAt: DateTime
└── updatedAt: DateTime

Relações:
  Category 1 ── N Product
  Product  1 ── N Item
  Order    1 ── N Item
```

---

## 7. Validações

### 7.1 Informações Gerais

| Atributo          | Valor                                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| **Biblioteca**    | Zod ^4.4.3                                                                                                |
| **Localização**   | `src/schemas/`                                                                                            |
| **Estratégia**    | Schema validation middleware — valida `{ body, query, params }` antes do controller                       |
| **Fluxo de erro** | `ZodError` é capturado pelo middleware `validateSchema`, que retorna `400` com array de mensagens de erro |

### 7.2 Schemas

#### `createUserSchema` (`src/schemas/userSchema.ts`)

| Campo           | Regra                                 | Onde é usado      |
| --------------- | ------------------------------------- | ----------------- |
| `body.name`     | `string`, mínimo 3 caracteres         | `POST /api/users` |
| `body.email`    | `z.email()` (formato de email válido) | `POST /api/users` |
| `body.password` | `string`, mínimo 6 caracteres         | `POST /api/users` |

#### `authUserSchema` (`src/schemas/userSchema.ts`)

| Campo           | Regra                                 | Onde é usado        |
| --------------- | ------------------------------------- | ------------------- |
| `body.email`    | `z.email()` (formato de email válido) | `POST /api/session` |
| `body.password` | `string`, mínimo 6 caracteres         | `POST /api/session` |

#### `createCategorySchema` (`src/schemas/categorySchema.ts`)

| Campo       | Regra                         | Onde é usado           |
| ----------- | ----------------------------- | ---------------------- |
| `body.name` | `string`, mínimo 3 caracteres | `POST /api/categories` |

---

## 8. Autenticação e Autorização

### 8.1 Fluxo de Autenticação (JWT Bearer Token)

```
1. POST /api/session { email, password }
2. AuthUserController → AuthUserService
3. Service busca usuário por email no banco
4. Compara senha com bcrypt (compare)
5. Se válido: gera JWT com sign({ name, email }, JWT_SECRET, { subject: user.id, expiresIn: "7d" })
6. Retorna { id, name, email, role, token }
7. Cliente armazena o token e envia em requisições protegidas como:
   Authorization: Bearer <token>
```

### 8.2 Fluxo de Autorização

```
1. Rota protegida: isAuthenticated middleware
2. Extrai token do header Authorization
3. Verifica (verify) com JWT_SECRET
4. Extrai sub (userId) do payload e injeta em req.userId
5. Se rota exige ADMIN: isAdmin middleware
6. Consulta o banco: prisma.user.findFirst({ where: { id: req.userId } })
7. Verifica se user.role === "ADMIN"
8. Se não: retorna 403 "Acesso negado"
```

| Middleware        | Função               | Resposta em caso de falha                        |
| ----------------- | -------------------- | ------------------------------------------------ |
| `isAuthenticated` | Verificar token JWT  | `401 "Não autorizado"` ou `401 "Token inválido"` |
| `isAdmin`         | Verificar role ADMIN | `401 "Não autorizado"` ou `403 "Acesso negado"`  |

### 8.3 Tecnologias

- **JWT:** `jsonwebtoken` (sign/verify)
- **Hash de senha:** `bcryptjs` (10 salt rounds)
- **Chave secreta:** `process.env.JWT_SECRET`

---

## 9. APIs

### 9.1 `POST /api/users` — Criar usuário

| Atributo         | Valor                              |
| ---------------- | ---------------------------------- |
| **Controller**   | `CreateUserController`             |
| **Service**      | `CreateUserService`                |
| **Autenticação** | Não                                |
| **Validação**    | `validateSchema(createUserSchema)` |

**Request:**

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456"
}
```

**Response (201):**

```json
{
  "message": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@email.com",
    "role": "STAFF",
    "created_at": "2026-06-19T...Z"
  }
}
```

**Erros possíveis:**
| Status | Condição |
|---|---|
| `400` | Dados inválidos (validação Zod) |
| `400` | Email já cadastrado |

---

### 9.2 `POST /api/session` — Autenticar usuário

| Atributo         | Valor                            |
| ---------------- | -------------------------------- |
| **Controller**   | `AuthUserController`             |
| **Service**      | `AuthUserService`                |
| **Autenticação** | Não                              |
| **Validação**    | `validateSchema(authUserSchema)` |

**Request:**

```json
{
  "email": "joao@email.com",
  "password": "123456"
}
```

**Response (200):**

```json
{
  "id": "uuid",
  "name": "João Silva",
  "email": "joao@email.com",
  "role": "STAFF",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Erros possíveis:**
| Status | Condição |
|---|---|
| `400` | Dados inválidos (validação Zod) |
| `400` | Email ou senha incorretos |

---

### 9.3 `GET /api/me` — Detalhes do usuário logado

| Atributo         | Valor                  |
| ---------------- | ---------------------- |
| **Controller**   | `DetailUserController` |
| **Service**      | `DetailUserService`    |
| **Autenticação** | `isAuthenticated`      |
| **Validação**    | Nenhuma                |

**Request Headers:**

```
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "id": "uuid",
  "name": "João Silva",
  "email": "joao@email.com",
  "createdAt": "2026-06-19T...Z",
  "updatedAt": "2026-06-19T...Z"
}
```

**Erros possíveis:**
| Status | Condição |
|---|---|
| `401` | Token ausente ou inválido |

---

### 9.4 `POST /api/categories` — Criar categoria

| Atributo         | Valor                                  |
| ---------------- | -------------------------------------- |
| **Controller**   | `CreateCategoryController`             |
| **Service**      | `CreateCategoryService`                |
| **Autenticação** | `isAuthenticated`                      |
| **Autorização**  | `isAdmin`                              |
| **Validação**    | `validateSchema(createCategorySchema)` |

**Request:**

```json
{
  "name": "Pizzas Salgadas"
}
```

**Response (201):**

```json
{
  "id": "uuid",
  "name": "Pizzas Salgadas",
  "createdAt": "2026-06-19T...Z"
}
```

**Erros possíveis:**
| Status | Condição |
|---|---|
| `400` | Dados inválidos (validação Zod) |
| `400` | Categoria já existe |
| `401` | Token ausente ou inválido |
| `403` | Usuário não é ADMIN |

---

## 10. Bibliotecas e Dependências

### Dependências de Produção

| Nome                 | Versão  | Finalidade                       | Utilização                                      |
| -------------------- | ------- | -------------------------------- | ----------------------------------------------- |
| `express`            | ^5.2.1  | Framework HTTP                   | `src/server.ts`, roteamento, middlewares        |
| `cors`               | ^2.8.6  | Middleware de CORS               | `src/server.ts`                                 |
| `dotenv`             | ^17.4.2 | Carregar variáveis de ambiente   | `src/server.ts`, `src/lib/prisma.ts`            |
| `@prisma/client`     | ^7.8.0  | ORM — consultas ao banco         | Todos os services                               |
| `@prisma/adapter-pg` | ^7.8.0  | Adaptador Prisma para PostgreSQL | `src/lib/prisma.ts`                             |
| `pg`                 | ^8.13.3 | Driver PostgreSQL nativo         | Via adapter-pg                                  |
| `jsonwebtoken`       | ^9.0.3  | JWT sign/verify                  | `isAuthenticated` middleware, `authUserService` |
| `bcryptjs`           | ^3.0.3  | Hash e comparação de senhas      | `createUserService`, `authUserService`          |
| `zod`                | ^4.4.3  | Validação de schemas             | `validateSchema` middleware, schemas            |
| `tsx`                | ^4.22.4 | Execução TypeScript com watch    | `npm run dev`                                   |

### Dependências de Desenvolvimento

| Nome                              | Versão   | Finalidade                           | Utilização                               |
| --------------------------------- | -------- | ------------------------------------ | ---------------------------------------- |
| `typescript`                      | ^6.0.3   | Compilador TypeScript                | Projeto todo                             |
| `prisma`                          | ^7.8.0   | CLI do Prisma (migrations, generate) | Migrations e geração de cliente          |
| `husky`                           | ^9.1.7   | Gerenciador de hooks Git             | `.husky/pre-commit`, `.husky/commit-msg` |
| `lint-staged`                     | ^17.0.7  | Executar linters em arquivos staged  | `.lintstagedrc`                          |
| `prettier`                        | ^3.8.4   | Formatador de código                 | `.prettierrc`                            |
| `@commitlint/cli`                 | ^21.0.2  | Validar mensagens de commit          | `.commitlintrc.json`, hook commit-msg    |
| `@commitlint/config-conventional` | ^21.0.2  | Regras conventional commits          | Extendido pelo commitlint                |
| `@types/express`                  | ^5.0.6   | Tipos do Express                     | Projeto todo                             |
| `@types/jsonwebtoken`             | ^9.0.10  | Tipos do jsonwebtoken                | Middleware isAuthenticated               |
| `@types/cors`                     | ^2.8.19  | Tipos do cors                        | `src/server.ts`                          |
| `@types/node`                     | ^25.9.3  | Tipos do Node.js                     | Projeto todo                             |
| `@types/pg`                       | ^8.11.11 | Tipos do pg                          | Via adapter-pg                           |

---

## 11. Configurações de Ambiente

| Variável       | Finalidade                                      | Valor esperado (exemplo)                                           |
| -------------- | ----------------------------------------------- | ------------------------------------------------------------------ |
| `PORT`         | Porta do servidor Express                       | `3333`                                                             |
| `DATABASE_URL` | String de conexão PostgreSQL                    | `postgresql://user:password@localhost:5432/DB_Pizza?schema=public` |
| `JWT_SECRET`   | Chave secreta para assinar/verificar tokens JWT | String aleatória                                                   |

---

## 12. Fluxos de Negócio

### 12.1 Cadastro de Usuário

```
1. Cliente envia POST /api/users com { name, email, password }
2. Middleware validateSchema(createUserSchema) valida os campos
3. CreateUserController recebe os dados validados
4. CreateUserService.execute() é chamado
5. Service verifica se já existe usuário com o mesmo email (prisma.user.findUnique)
6. Se existir: lança erro "Já existe um usuário com esse email."
7. Faz hash da senha com bcrypt (10 salt rounds)
8. Cria usuário no banco (prisma.user.create)
9. Retorna { id, name, email, role, created_at }
10. Controller responde com 201
```

### 12.2 Autenticação (Login)

```
1. Cliente envia POST /api/session com { email, password }
2. Middleware validateSchema(authUserSchema) valida os campos
3. AuthUserController recebe os dados validados
4. AuthUserService.execute() é chamado
5. Service busca usuário por email (prisma.user.findUnique)
6. Se não existir: erro "Email ou senha incorretos"
7. Compara senha com bcrypt.compare
8. Se não coincidir: erro "Email ou senha incorretos"
9. Gera token JWT com sign({ name, email }, JWT_SECRET, { subject: user.id, expiresIn: "7d" })
10. Retorna { id, name, email, role, token }
11. Controller responde com 200
```

### 12.3 Visualizar Perfil

```
1. Cliente envia GET /api/me com Authorization: Bearer <token>
2. Middleware isAuthenticated verifica e decodifica o token
3. Injeta req.userId com o subject do token
4. DetailUserController recebe userId
5. DetailUserService.execute(userId) busca usuário no banco (prisma.user.findUnique)
6. Retorna { id, name, email, createdAt, updatedAt }
7. Controller responde com 200
```

### 12.4 Criar Categoria (Admin)

```
1. Cliente envia POST /api/categories com { name } e Authorization: Bearer <token>
2. Middleware validateSchema(createCategorySchema) valida o campo name
3. Middleware isAuthenticated verifica o token e injeta req.userId
4. Middleware isAdmin consulta o banco e verifica se role === "ADMIN"
5. CreateCategoryController recebe { name }
6. CreateCategoryService.execute({ name }) é chamado
7. Service verifica se já existe categoria com o mesmo nome (prisma.category.findFirst)
8. Se existir: erro "Categoria já existe"
9. Cria categoria no banco (prisma.category.create)
10. Retorna { id, name, createdAt }
11. Controller responde com 201
```

---

## 13. Convenções do Projeto

### 13.1 Padrão de Nomenclatura

| Contexto                   | Padrão                           | Exemplo                                   |
| -------------------------- | -------------------------------- | ----------------------------------------- |
| **Arquivos de controller** | PascalCase + sufixo `Controller` | `createUserController.ts`                 |
| **Arquivos de service**    | PascalCase + sufixo `Service`    | `createUserService.ts`                    |
| **Arquivos de middleware** | camelCase                        | `isAuthenticated.ts`                      |
| **Arquivos de schema**     | camelCase + sufixo `Schema`      | `userSchema.ts`, `categorySchema.ts`      |
| **Classes**                | PascalCase                       | `CreateUserController`                    |
| **Métodos**                | camelCase                        | `execute()`, `handle()`                   |
| **Pastas**                 | camelCase                        | `controllers/user/`, `services/category/` |

### 13.2 Organização de Arquivos

- Cada recurso/entidade tem uma pasta em `controllers/` e `services/` (ex: `controllers/user/`, `services/user/`)
- Schemas são centralizados em `src/schemas/`
- Middlewares ficam em `src/middlewares/`
- Rotas em arquivo único `src/routes.ts`

### 13.3 Estratégia de Imports

- Imports relativos (ex: `../../services/user/createUserService`)
- Imports de bibliotecas sem prefixo de caminho (ex: `import express from "express"`)

### 13.4 Tratamento de Erros

- **Services:** Lançam erros com `throw new Error("mensagem")`
- **Controllers (alguns):** Capturam com `try/catch` e retornam `400` com `{ error: message }`
- **Controllers (outros):** Não capturam erros — o erro propaga para o handler global em `server.ts` que retorna `500`
- **Middleware validateSchema:** Captura `ZodError` e retorna `400` com array de mensagens
- **Middleware isAuthenticated:** Retorna `401` diretamente se token ausente ou inválido
- **Middleware isAdmin:** Retorna `401` ou `403` diretamente

### 13.5 Logging

- Apenas um `console.log` no startup do servidor (`src/server.ts`)
- Nenhuma biblioteca de logging externa

### 13.6 Convenções de Commits

- **Formato:** Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, etc.)
- **Validação:** Husky + commitlint (@commitlint/config-conventional) no hook `commit-msg`
- **Pré-commit:** Husky executa `npx lint-staged`, que roda `prettier --write` em todos os arquivos staged

### 13.7 Padrões de Código (Prettier)

| Regra           | Valor                  |
| --------------- | ---------------------- |
| `useTabs`       | `false` (espaços)      |
| `tabWidth`      | `2`                    |
| `printWidth`    | `80`                   |
| `singleQuote`   | `false` (aspas duplas) |
| `trailingComma` | `es5`                  |
| `semi`          | `true`                 |
| `arrowParens`   | `always`               |

### 13.8 Padrões TypeScript (tsconfig.json)

| Regra                | Valor      |
| -------------------- | ---------- |
| `strict`             | `true`     |
| `noUnusedLocals`     | `true`     |
| `noUnusedParameters` | `true`     |
| `moduleResolution`   | `bundler`  |
| `target`             | `ES2020`   |
| `module`             | `commonjs` |
| `removeComments`     | `true`     |
| `skipLibCheck`       | `true`     |
| `esModuleInterop`    | `true`     |

---

## 14. Pendências Técnicas

### 14.1 Débitos Técnicos

| Item                                   | Descrição                                                                                                                                                           | Localização                                         | Prioridade                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------ | --------------- | ----- |
| **Inconsistência tratamento de erros** | Alguns controllers (CreateUserController, AuthUserController, DetailUserController) não possuem try/catch, permitindo que erros propaguem para o handler global 500 | `src/controllers/user/`                             | Média                                                                          |
| **Typo no nome da interface**          | `CrateUserProps` sem o `e` em `Create`                                                                                                                              | `src/services/user/createUserService.ts:5`          | Baixa                                                                          |
| **Nome inconsistente da tabela Item**  | Tabela gerada como `Item` (PascalCase) enquanto as demais são snake_case — o Prisma não possui `@@map("items")`                                                     | `prisma/schema.prisma`                              | Baixa                                                                          |
| **Mensagem de erro wrapper**           | `createCategoryService` envolve erros originais em "Erro ao criar categoria: ...", perdendo a mensagem específica                                                   | `src/services/category/createCategoryService.ts:33` | Baixa                                                                          |
| **Handler de erro 500 genérico**       | O error handler global em `server.ts` retorna `error.message                                                                                                        |                                                     | "Internal Server Error"`, potencialmente expondo detalhes internos em produção | `src/server.ts` | Média |

### 14.2 Melhorias Sugeridas

| Sugestão                                                | Motivação                                                                                 |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Implementar CRUD completo**                           | Product, Order e Item possuem modelos no banco mas não têm rotas, controllers ou services |
| **Adicionar validação Zod nos schemas de query/params** | Atualmente só `body` é validado                                                           |
| **Adicionar logging estruturado**                       | Winston ou Pino para logs em produção                                                     |
| **Adicionar testes**                                    | Testes unitários (services) e de integração (endpoints)                                   |
| **Adicionar Docker/docker-compose**                     | Facilitar setup do ambiente (PostgreSQL + app)                                            |
| **Adicionar rate limiting**                             | Prevenir abuso nos endpoints de autenticação                                              |
| **Adicionar refresh token**                             | Fluxo de refresh para tokens JWT expirados                                                |
| **Adicionar soft delete**                               | Para produtos e categorias (campo `deletedAt`)                                            |
| **Migrar de CommonJS para ESM**                         | Para compatibilidade com EcmaScript modules modernos                                      |
| **Centralizar mensagens de erro**                       | Arquivo de constantes/arquivo i18n para mensagens                                         |

### 14.3 Pontos de Atenção

| Ponto                             | Descrição                                                                                                        |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Chave JWT no .env**             | `JWT_SECRET` exposta no `.env` versionado (não commitado via `.gitignore`, mas cuidado ao compartilhar)          |
| **Express 5**                     | Projeto usa Express 5 (beta/rc), que possui diferenças na API de middlewares de erro (4 parâmetros obrigatórios) |
| **Prisma 7 + adapter-pg**         | Versão recente do Prisma com API de adapter — mudanças em relação ao Prisma 4/5 tradicional                      |
| **TypeScript 6**                  | Versão muito recente do TypeScript — pode conter breaking changes                                                |
| **Zod 4**                         | API diferente do Zod 3 — `z.email()` vs `z.string().email()`, `z.object` changes                                 |
| **Sem validação de query/params** | `validateSchema` valida `body`, `query` e `params` mas os schemas atuais só definem `body`                       |
