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
