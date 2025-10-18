# LRU Cache Dashboard

A full-stack project implementing an **LRU (Least Recently Used) Cache** using **Spring Boot** for the backend and **React** for the frontend. This project demonstrates how a cache works, including **MRU → LRU ordering**, automatic eviction when capacity is full, and interactive frontend visualization.

## Features

### Backend (Spring Boot)
- Add or update cache entries (`PUT /api/cache/put`)  
- Retrieve value by key (`GET /api/cache/get/{key}`)  
- View all cache entries in **MRU → LRU order** (`GET /api/cache/all`)  
- Implements **HashMap + Doubly Linked List** for efficient LRU operations  
- Configurable cache capacity  

### Frontend (React)
- Input fields to **add/update cache**  
- Input field to **get value by key**  
- Displays cache contents with **MRU highlighted**  
- Refresh button to fetch latest cache  
- Automatically updates list after PUT or GET operations  

## Tech Stack
- **Backend:** Java, Spring Boot, Maven  
- **Frontend:** React, Axios, JavaScript, CSS  
- **Data Structure:** HashMap + Doubly Linked List for LRU logic

 ## Screenshots
 <img width="968" height="589" alt="image" src="https://github.com/user-attachments/assets/a73b4f95-735c-4816-b494-3ca9e7341a0d" />
