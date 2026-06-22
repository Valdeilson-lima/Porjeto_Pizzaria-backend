# Endpoints

**Base URL:** `/api` (definido em `src/server.ts:13`)

---

## Autenticação e Usuário

| Método | Rota           | Middleware                         | Admin | Descrição                        |
| ------ | -------------- | ---------------------------------- | ----- | -------------------------------- |
| POST   | `/api/users`   | `validateSchema(createUserSchema)` | Não   | Criar novo usuário               |
| POST   | `/api/session` | `validateSchema(authUserSchema)`   | Não   | Autenticar usuário (retorna JWT) |
| GET    | `/api/me`      | `isAuthenticated`                  | Não   | Detalhes do usuário logado       |

## Categorias

| Método | Rota              | Middleware                                                           | Admin   | Descrição                  |
| ------ | ----------------- | -------------------------------------------------------------------- | ------- | -------------------------- |
| GET    | `/api/categories` | `isAuthenticated`                                                    | Não     | Listar todas as categorias |
| POST   | `/api/categories` | `isAuthenticated`, `isAdmin`, `validateSchema(createCategorySchema)` | **Sim** | Criar nova categoria       |

## Produtos

| Método | Rota                    | Middleware                                                                                   | Admin   | Descrição                            |
| ------ | ----------------------- | -------------------------------------------------------------------------------------------- | ------- | ------------------------------------ |
| POST   | `/api/products`         | `isAuthenticated`, `isAdmin`, `upload.single("file")`, `validateSchema(createProductSchema)` | **Sim** | Criar produto (com upload de imagem) |
| GET    | `/api/products`         | `isAuthenticated`, `validateSchema(listProductsSchema)`                                      | Não     | Listar todos os produtos             |
| DELETE | `/api/product`          | `isAuthenticated`, `isAdmin`                                                                 | **Sim** | Deletar um produto                   |
| GET    | `/api/category/product` | `isAuthenticated`, `validateSchema(listProductByCategorySchema)`                             | Não     | Listar produtos por categoria        |

## Pedidos

| Método | Rota                | Middleware                                             | Admin | Descrição                  |
| ------ | ------------------- | ------------------------------------------------------ | ----- | -------------------------- |
| POST   | `/api/order`        | `isAuthenticated`, `validateSchema(createOrderSchema)` | Não   | Criar novo pedido          |
| GET    | `/api/orders`       | `isAuthenticated`, `validateSchema(listOrdersSchema)`  | Não   | Listar todos os pedidos    |
| POST   | `/api/order/add`    | `isAuthenticated`, `validateSchema(addItemSchema)`     | Não   | Adicionar item a um pedido |
| DELETE | `/api/order/remove` | `isAuthenticated`, `validateSchema(removeItemSchema)`  | Não   | Remover item de um pedido  |
| GET    | `/api/order/detail` | `isAuthenticated`, `validateSchema(detailOrderSchema)` | Não   | Detalhes de um pedido      |
| PUT    | `/api/order/send`   | `isAuthenticated`, `validateSchema(sendOrderSchema)`   | Não   | Enviar/finalizar pedido    |
| PUT    | `/api/order/finish` | `isAuthenticated`, `validateSchema(finishOrderSchema)` | Não   | Concluir pedido            |
| DELETE | `/api/order`        | `isAuthenticated`, `validateSchema(deleteOrderSchema)` | Não   | Deletar um pedido          |

---

**Total:** 17 endpoints | **Públicos:** 2 (`POST /api/users`, `POST /api/session`) | **Admin:** 3
