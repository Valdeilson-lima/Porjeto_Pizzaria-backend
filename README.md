# 🍕 Pizzaria Backend

Backend do sistema de gestão de pizzaria desenvolvido com **Node.js**, **Express 5**, **Prisma ORM** e **PostgreSQL**.

## Tecnologias

- **Runtime:** Node.js + TypeScript
- **Framework:** Express 5
- **ORM:** Prisma 7 + PostgreSQL
- **Autenticação:** JWT + bcryptjs
- **Validação:** Zod
- **Dev:** tsx (watch mode), Husky + lint-staged + Prettier

## Modelos do Banco

| Modelo   | Descrição                  |
| -------- | -------------------------- |
| User     | Usuários (STAFF/ADMIN)     |
| Category | Categorias de produtos     |
| Product  | Produtos do cardápio       |
| Order    | Pedidos (abertos/fechados) |
| Item     | Itens dentro de um pedido  |

## Rotas da API

| Método | Rota           | Descrição              |
| ------ | -------------- | ---------------------- |
| POST   | `/api/users`   | Criar novo usuário     |
| POST   | `/api/session` | Autenticar (login/JWT) |

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
```
