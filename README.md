# Documentación de la API RESTful de Agenda Telefónica

## Base URL

https://agenda-telefonica-92xa.onrender.com/api/persons

## Endpoints

### 1. Obtener todas las personas

**GET** `/`

#### Request

- **Headers**:
  - `Authorization: Bearer <token>`

#### Responses

- **200 OK**
  ```json
  [
    {
      "id": "1",
      "name": "Juan",
      "number": "123-123123"
    },
    ...
  ]
  ```
- **500 Internal Server Error**

  ```json
  {
    "error": "Internal Server Error"
  }
  ```

### 2. Obtener una persona por ID

**GET** `/{uuid}`

#### Request

- **Headers**:
  - `Authorization: Bearer <token>`

#### Responses

- **200 OK**

  ```json
  {
    "id": "1",
    "name": "Juan",
    "number": "123-123123"
  }
  ```

- **404 Not Found**

  ```json
  {
    "error": "Person not found"
  }
  ```

### 3. Crear una nueva persona

**POST** `/`

#### Request

- **Headers**:

  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`

- **Body**:

  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
    ```json
    {
      "name": "Juan",
      "number": "123-123123"
    }
    ```

#### Responses

- **201 Created**

  ```json
  {
    "id": "2",
    "name": "Juan",
    "number": "123-123123"
  }
  ```

- **400 Bad Request**

  ```json
  {
    "error": "Name and number are required"
  }
  ```

### 4. Actualizar una persona

**PUT** `/{uuid}`

#### Request

- **Headers**:

  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`

- **Body**:

  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
    ```json
    {
      "name": "Juan",
      "number": "999-999999"
    }
    ```

#### Responses

- **200 OK**

  ```json
  {
    "id": "1",
    "name": "Juan",
    "number": "999-999999"
  }
  ```

- **404 Not Found**

  ```json
  {
    "error": "Person not found"
  }
  ```

### 5. Eliminar una persona

**DELETE** `/{uuid}`

#### Request

- **Headers**:

  - `Authorization: Bearer <token>`

#### Responses

- **204 No Content**

- **404 Not Found**

  ```json
  {
    "error": "Person not found"
  }
  ```

### Codigos de Estado Comunes

- **200 OK**: La solicitud fue exitosa
- **201 Created**: La solicitud fue exitos y se creo un nuevo recurso
- **204 No Content**: La soliciut fue exiotsa pero no hay contenido que devolver
- **400 Bad Request**: La solicitud no pudo ser procesada debido a un error del cliente.
- **401 Unauthorized**: La solicitud requiere autenticación del usuario.
- **404 Not Found**: El recurso solicitado no fue encontrado.
- **500 Internal Server Error**: Ocurrió un error en el servidor.
