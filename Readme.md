## Tecnologias usadas:

La siguiente API fue desarrollada utilizando __nodeJS, Express y Mongo DB.__

Las librerias utilizadas desde NPM fueron las siguientes:

    -bcrypt: con el fin de encriptar claves
    -cors: como middleware para express
    -dotenv: para cargar datos del environment
    -express: para crear la SPA y sus rutas necesarias
    -express-validator: para validar datos de entrada
    -mongoose: para conenctar de manera asyncrona con MongoDB
    -multer: para trabajar con multipart data, y asi poder manejar las  imagenes

## Instalacion:

Para poder correr el archivo se deben instalar a traves de las librerias de NPM en la terminal ingresando el comando: 

```
    npm install
```

Luego crear en la _raiz_ del proyecto un archivo __.env__ con los sigueintes valores:
    
```
    PORT : puertoDeseado
    DB_URL_CONNECTION: url a la base de datos
    BASE_URL: Ej: http://localhost:puertoDeseado
```

Finalmente para correr el servidor, se debe ingresar en la terminal el siguiente comando:

```
    npm run dev
```



