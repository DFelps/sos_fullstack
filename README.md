# SOS Fullstack

Releitura moderna do projeto **SOS - System Operation of Stock**, meu primeiro sistema desenvolvido originalmente em Java e agora reconstruído em arquitetura fullstack moderna.

Este projeto foi recriado com foco em organização de código, componentização, interface profissional e integração completa entre frontend e backend.

## Demonstração em vídeo

https://www.youtube.com/watch?v=fIMEck_o-yw

## Objetivo do projeto

Criar um sistema de gerenciamento de estoque genérico e reutilizável para diferentes tipos de negócio, permitindo controle operacional completo de produtos, entradas, saídas, clientes, fornecedores e indicadores.

## Stack utilizada

### Frontend

- Vue 3
- TypeScript
- Vite
- Pinia
- Vue Router
- Tailwind CSS

### Backend

- Laravel
- PHP
- API REST
- Eloquent ORM
- Migrations
- Seeders
- MySQL / SQLite

## Estrutura do projeto

sos_fullstack/
- vue_front_sos/
- laravel_backend_sos/

## Funcionalidades implementadas

### Dashboard
- Visão geral da operação
- Quantidade total em estoque
- Valor total do inventário
- Produtos críticos com paginação
- Últimas movimentações

### Produtos
- Cadastro completo
- Edição em modal
- Exclusão com confirmação
- Status de estoque
- Paginação

### Categorias
- Cadastro
- Edição
- Exclusão
- Paginação

### Fornecedores
- Cadastro
- Edição
- Exclusão
- Paginação

### Clientes
- Cadastro
- Edição
- Exclusão
- Paginação

### Movimentações
- Entrada
- Saída
- Ajuste manual
- Histórico completo
- Filtros
- Busca
- Paginação

### Relatórios
- Produtos sem estoque
- Baixo estoque
- Produtos com validade
- Cards resumidos

### Configurações
- Preferências locais
- Dados gerais
- Stack do sistema

## Como executar localmente

### Frontend

cd vue_front_sos
npm install
npm run dev

### Backend

cd laravel_backend_sos
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve

## Autor

Desenvolvido por Daniel como evolução moderna do projeto original SOS.
