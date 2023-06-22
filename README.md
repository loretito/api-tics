# API AquaCare

## Inicializar servidor 

```
npm start
```

## Rutas

### Ruta para Login

```
API_PATH/auth/login
```

formato ejemplo
```json
{
  "id_dispositivo": "dispositivo-prueba123"
}

```
### Ruta para mandar datos desde arduino a bdd

```
API_PATH/data
```
formato ejemplo
```json
{
   "id_dispositivo": "dispositivo-prueba901",
  "temperatura": 20.5,
  "ph": 6.0 
}

```

### Ruta para recibir los datos de x dispositivo

```
API_PATH/data/:id 
```

formato ejemplo (ruta)

>API_PATH/data/dispositivo-prueba901
