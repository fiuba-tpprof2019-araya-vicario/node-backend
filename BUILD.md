# Frontend

## Aplicaciones que tenemos que tener pre instaladas

- GIT
- NODE (8.16) y NPM

## Como buildear la aplicacion

Crear una carpeta donde buildear la aplicacion con `mkdir` y nos movemos a esa carpeta.

Luego descargamos el repositorio de la aplicacion frontend. Tenemos que tener git instalado con SSH configurado. Hacemos:
```
git clone git@github.com:fiuba-tpprof2019-araya-vicario/node-backend.git
```

Nos movemos a la carpeta del repositorio, luego hacemos:
```
cd node-backend
cp .env.test .env
npm ci
npm install -g nodemon
npm install -g sequelize@5.18.2
npm install -g sequelize-cli@5.5.1
```

Ahora en el archivo `.env` que tenemos en la carpeta donde estamos parados tenemos que configurar la base de datos con usuario, password, db name, etc (basarse en los datos prefijados). Una vez que tengamos todo podemos inicializar la base de datos con:

```
 ./db/scripts/migrations.sh
```

Recomendamos que la base de datos sea postgres para el correcto funcionamiento del servicio.
Una vez tegamos la base de datos hacemos:

```
npm run start
```