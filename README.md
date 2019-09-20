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
