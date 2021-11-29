# node-backend

## Como correr migrations y seed en el container de Node

1- Ejecutar bash dentro del container:

* iOS / Linux:

  ```docker exec -it nodeBack bash```

* Windows

  ```winpty docker exec -it nodeBack bash```

2- En la consola de bash correr el comando de migrations:

```sequelize db:migrate```

3- Luego correr el comando de seeds:

```sequelize db:seed:all```

## Como agregar otra carpeta en Drive FIUBA

1- Ingreo al drive con la cuenta de administrador de carpetas de FIUBA ```https://drive.google.com```

1- Creo una carpeta

2- Una vez creada, click derecho y ponemos compartir y agregamos la cuenta de servicio asignada al proyecto que se encuentra en la ruta:

```https://console.cloud.google.com/iam-admin/serviceaccounts?project=fiuba-tp-1557094314545```

3- Una vez asignado entramos en la carpeta y nos copiamos el ID de la misma que se encuenta en el link:
  drive.google.com/drive/u/2/folders/**1tWYqI10Mus6252DEqZWleF6i6hdjE2tj**

4- Luego con este ID generamos una variable en el .env y la usamos para asignar files en el drive con el modulo de la API de Google.

Guia Usada: https://medium.com/@abhimanyuPathania/google-drive-service-accounts-and-nodejs-a038b8ec482f 

## Como correr los test

Si es la primera vez, se debe correr el script ```testRestartDB.sh``` de la carpeta scripts del proyecto docker.

1- Levantar el docker-compose

2- Ejecutar bash dentro del container de node:

* iOS / Linux:

  ```docker exec -it nodeBack bash```

* Windows

  ```winpty docker exec -it nodeBack bash```

3- Dentro de la consola de bash correr el comando:

  ```npm run test```

## Environment

Crear el archivo .env en la carpeta root del proyecto con los siguientes campos:

```
USERNAME_DB=<Usuario de la base>
PASSWORD_DB=<Usuario de la base>
HOST_DB=<Usuario de la base>
DATABASE=<Usuario de la base>
DIALECT_DB=<Usuario de la base> Ej: postgres
TOKEN_SECRET_JWT=<Token secreto para JWT> Ej: "mi_secreto"
AUDIENCE=<Client id del json del OAuth Client del proyecto de google console>
CLIENT_GOOGLE_SECRET=<Client secret del json del OAuth Client del proyecto de google console>
EMAIL_SERVICE=<Servicio de envio de mails> Ej: gmail
EMAIL_DEST=<Email de destino>
EMAIL_USR=<Usuario de email> Ej: example@gmail.com
EMAIL_PWD=<Password de usuario de email>
URL_REQUEST_STUDENT=<Url de solicitudes de estudinate> Ej: "https://brain-search/my_projects"
ACTIVE_MAILS=<Opcion para habilitar envio de mails> Ej: true
PROPOSAL_FOLDER_FIUBA_DRIVE_ID=<ID de la carpeta del google drive de Propuestas>
REQUIREMENT_FOLDER_FIUBA_DRIVE_ID=<ID de la carpeta del google drive de Requerimientos>
PRESENTATION_FOLDER_FIUBA_DRIVE_ID=<ID de la carpeta del google drive de Presentaciones>
DOCUMENTATION_FOLDER_FIUBA_DRIVE_ID=<ID de la carpeta del google drive de Documentación>
```

## Como limpiar DB en Heroku
1. Entramos al dashboard de heroku, buscamos el proyecto brainsearch-api y vamos a la solapa de DB.
2. Vamos a configuracion y eliminamos el contenido de la DB.
3. Nos logueamos en heroku por terminal con el comando: ```heroku login```
4. Nos posicionamos en la carpeta del proyecto node y corremos el comando de bash de heroku: ```heroku ps:exec```. Esto nos abre una consola bash en heroku.
5. Corremos migrations con el comando ```sequelize db:migrate```.
6. Corremos seeds con el comando ```sequelize db:seed:all```. Listo.


