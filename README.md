# SOS Fullstack

A modern fullstack inventory management system built with Vue 3, TypeScript, Laravel and MySQL.

## Overview

SOS Fullstack is a modern reinterpretation of the original **SOS (System Operation of Stock)** project, initially developed in Java and rebuilt using a fullstack architecture.

The project focuses on clean code organization, component-based frontend structure, a professional UI and full integration between frontend and backend.

## Demo

https://www.youtube.com/watch?v=fIMEck_o-yw

## Purpose

To provide a generic and reusable inventory management system that can be adapted to different types of businesses, allowing full operational control over products, stock movements, clients, suppliers and key metrics.

## Stack

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
- REST API
- Eloquent ORM
- Migrations
- Seeders
- MySQL / SQLite

## Project Structure

```
sos_fullstack/
├── vue_front_sos/
└── laravel_backend_sos/
```

## Features

### Dashboard
- Operational overview
- Total stock quantity
- Total inventory value
- Critical products with pagination
- Latest stock movements

### Products
- Full CRUD
- Modal-based editing
- Delete with confirmation
- Stock status tracking
- Pagination

### Categories
- Create, edit and delete
- Pagination

### Suppliers
- Create, edit and delete
- Pagination

### Clients
- Create, edit and delete
- Pagination

### Movements
- Stock entry
- Stock exit
- Manual adjustments
- Full history
- Filters and search
- Pagination

### Reports
- Out-of-stock products
- Low stock alerts
- Expiring products
- Summary cards

### Settings
- Local preferences
- General data
- System stack info

## Running locally

### Frontend

```bash
cd vue_front_sos
npm install
npm run dev
```

### Backend

```bash
cd laravel_backend_sos
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

## Author

Developed by Daniel Siqueira as a modern evolution of the original SOS project.
