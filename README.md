# Pizzaria Backend

Backend do sistema de gestão de pizzaria desenvolvido com Node.js, Express 5, Prisma ORM e PostgreSQL.

## Tecnologias

- **Runtime:** Node.js + TypeScript
- **Framework:** Express 5
- **ORM:** Prisma 7 + PostgreSQL (adapter-pg)
- **Autenticação:** JWT + bcryptjs
- **Upload:** Multer (memoryStorage)
- **Cloud Storage:** Cloudinary
- **Validação:** Zod 4
- **Dev:** tsx (watch mode), Husky + lint-staged + Prettier + commitlint

## Modelos do Banco

| Modelo   | Descrição                  |
| -------- | -------------------------- |
| User     | Usuários (STAFF/ADMIN)     |
| Category | Categorias de produtos     |
| Product  | Produtos do cardápio       |
| Order    | Pedidos (abertos/fechados) |
| Item     | Itens dentro de um pedido  |

## Rotas da API

| Método | Rota              | Auth | Admin | Descrição                  |
| ------ | ----------------- | ---- | ----- | -------------------------- |
| POST   | `/api/users`      | Não  | Não   | Criar novo usuário         |
| POST   | `/api/session`    | Não  | Não   | Autenticar (login/JWT)     |
| GET    | `/api/me`         | Sim  | Não   | Dados do usuário logado    |
| GET    | `/api/categories` | Sim  | Não   | Listar categorias          |
| POST   | `/api/categories` | Sim  | Sim   | Criar categoria            |
| POST   | `/api/products`   | Sim  | Sim   | Criar produto (com imagem) |

## Como usar

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais

# Executar migrations
npx prisma migrate dev

# Iniciar servidor (desenvolvimento)
npm run dev
```

## Scripts

| Comando       | Descrição                      |
| ------------- | ------------------------------ |
| `npm run dev` | Inicia servidor com hot-reload |

## Variáveis de Ambiente

```env
PORT=3333
DATABASE_URL="postgresql://user:password@localhost:5432/DB_Pizza?schema=public"
JWT_SECRET="your-secret-key"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

## Estrutura do Projeto

```
src/
├── @types/express/       # Tipos estendidos do Express
├── controllers/          # Controllers (entrada HTTP)
│   ├── user/
│   ├── category/
│   └── product/
├── config/                # Configurações (Cloudinary, Multer)
├── middlewares/           # isAuthenticated, isAdmin, validateSchema
├── schemas/               # Schemas de validação Zod
├── services/              # Regras de negócio
│   ├── user/
│   ├── category/
│   └── product/
├── lib/prisma.ts          # Conexão com banco
├── routes.ts              # Definição de rotas
└── server.ts              # Entry point
```
