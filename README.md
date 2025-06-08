# Cats API

API RESTful para gerenciar gatos com autenticação e autorização usando NestJS.

## Funcionalidades

- Autenticação de usuários (Login/Register)
- Gestão de raças de gatos
- Gestão de gatos com controle de propriedade
- Sistema de roles (ADMIN/USER)
- Documentação Swagger
- Soft delete para gatos

## Tecnologias

- NestJS
- TypeORM
- MySQL
- JWT
- Swagger
- Bcrypt para hashing de senhas

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/evandro-costa/cats_fy_nestjs.git
cd cats_fy_nestjs
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=database_name

# JWT
JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=24h
```

4. Inicie o servidor:
```bash
pnpm start:dev
```

## Endpoints

### Autenticação

- `POST /api/v1/auth/register` - Registrar novo usuário
- `POST /api/v1/auth/login` - Login de usuário
- `GET /api/v1/auth/profile` - Ver perfil do usuário (requer autenticação)

### Usuários (ADMIN)

- `POST /api/v1/users` - Criar novo usuário
- `GET /api/v1/users/:id` - Buscar usuário por ID

### Raças de Gatos (USER+)

- `POST /api/v1/breeds` - Criar nova raça
- `GET /api/v1/breeds` - Listar todas as raças

### Gatos (USER+)

- `POST /api/v1/cats` - Criar novo gato
- `GET /api/v1/cats` - Listar gatos do usuário
- `GET /api/v1/cats/:id` - Buscar gato por ID
- `PATCH /api/v1/cats/:id` - Atualizar gato
- `DELETE /api/v1/cats/:id` - Remover gato (soft delete)
- `PATCH /api/v1/cats/:id/restore` - Restaurar gato removido

## Documentação Swagger

A documentação completa da API está disponível em:
```
http://localhost:4000/api/v1/docs
```

## Segurança

- Autenticação JWT
- Autorização baseada em roles
- Validação de propriedade de gatos
- Senhas criptografadas
- Validação de dados com class-validator

## Estrutura do Projeto

```
src/
├── auth/           # Módulo de autenticação
├── breeds/         # Módulo de raças de gatos
├── cats/           # Módulo principal de gatos
├── common/         # Recursos compartilhados
├── users/          # Módulo de usuários
└── app.module.ts   # Módulo principal
```

## Contribuição

1. Faça um fork do projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para o branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE.md](LICENSE.md) para mais detalhes.
