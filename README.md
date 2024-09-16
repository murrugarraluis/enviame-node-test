# Proyecto ENVIAME Node.js con Docker

Este proyecto es una aplicación Node.js que utiliza varios paquetes como `chai`, `mocha`, `express`, `redis`, y más. Está configurado para ser levantado y gestionado mediante Docker.

## Requisitos

- Node.js (10.x o superior)
- Docker
- Docker Compose

## Levantar el Proyecto con Docker

A continuación, encontrarás las instrucciones para levantar el proyecto utilizando Docker Compose.

1. Asegúrate de tener Docker y Docker Compose instalados.
2. Construye las imágenes de Docker y levanta los contenedores en segundo plano:
    ```sh
    docker-compose up -d --build
    ```

   Esto construirá las imágenes necesarias y levantará los contenedores definidos en el archivo `docker-compose.yml` en segundo plano.
## Detener el Servicio

Para detener los contenedores y eliminar las redes y volúmenes creados por Docker Compose, ejecuta:
```sh
docker-compose down -v
```