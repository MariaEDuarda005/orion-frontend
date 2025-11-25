# Orion Fitness

Sistema completo de gerenciamento de produtos para uma loja de suplementos e acessórios fitness.  
O projeto possui **front-end** em React + Vite + TypeScript e **back-end** em Spring Boot com Spring Data JPA.

---

## Tecnologias

### Front-end
- React 18
- TypeScript
- Vite
- Axios (para requisições HTTP)
- CSS modularizado
- React Router DOM (para rotas)
  
### Back-end
- Java 21
- Spring Boot
- Spring Data JPA
- Hibernate
- Banco de dados (H2/MySQL/PostgreSQL)
- Lombok

---
## Estrutura de Pastas

### Front-end (`src`)
```

src/
├─ components/        # Componentes reutilizáveis (Card, Header, Modal)
├─ page/              # Páginas (Home, Produtos, Admin, EditModal)
├─ interface/         # Tipagens TypeScript
├─ services/          # Axios e funções para API
└─ css/               # Arquivos CSS

```

### Back-end
```

src/main/java/com/poo/orion/
├─ Controller/        # Endpoints REST
├─ DTO/               # Data Transfer Objects
├─ Enum/              # Enums (Categoria)
├─ Model/             # Entidades JPA
├─ Repository/        # Repositórios Spring Data
└─ Service/           # Lógica de negócio

````

---

## Como rodar o projeto

### 1. Back-end
1. Abra o projeto no IDE (IntelliJ, Eclipse, VSCode)
2. Configure o banco de dados no `application.properties`:
```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
````

3. Rode a aplicação (`SpringBootApplication`)
4. API REST estará disponível em: `http://localhost:8080/produtos`
5. Link do Swagger: `http://localhost:8080/swagger-ui/index.html`

---

### 2. Front-end

1. Instale dependências:

```bash
npm install
```

2. Rode o servidor de desenvolvimento:

```bash
npm run dev
```

3. Abra no navegador:

```
http://localhost:5173
```

---

## Endpoints da API

| Método | Endpoint                 | Descrição                     |
| ------ | ------------------------ | ----------------------------- |
| GET    | /produtos                | Lista todos os produtos       |
| GET    | /produtos/{id}           | Retorna produto por ID        |
| POST   | /produtos/criar          | Cria novo produto             |
| PUT    | /produtos/atualizar/{id} | Atualiza produto existente    |
| DELETE | /produtos/{id}           | Remove produto por ID         |
| DELETE | /produtos/deleteAll      | Remove todos os produtos      |
| GET    | /produtos/categoria      | Filtra produtos por categoria |
