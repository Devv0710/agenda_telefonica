## APIRESTful

- Example with Frontend: https://agenda-telefonica-92xa.onrender.com
- APIRESTful : https://agenda-telefonica-92xa.onrender.com/api/persons

---

#### Endpoints

<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>(get all persons)</code></summary>

##### Parameters

> not parameters required

##### Responses

> | http code | content-type              | response |
> | --------- | ------------------------- | -------- |
> | `200`     | `application/json`        | `JSON`   |
> | `500`     | `text/html;charset=utf-8` | none     |

##### Example RestClient

> ```javascript
> GET https://agenda-telefonica-92xa.onrender.com/api/persons HTTP/1.1
> ```

</details>

<details>
 <summary><code>GET</code> <code><b>/{uuid}</b></code> <code>(get a person by id)</code></summary>

##### Parameters

> uuid

##### Responses

> | http code | content-type              | response |
> | --------- | ------------------------- | -------- |
> | `200`     | `application/json`        | JSON     |
> | `404`     | `text/html;charset=utf-8` | none     |

##### Example RestClient

> ```javascript
> GET https://agenda-telefonica-92xa.onrender.com/api/persons/{uuid} HTTP/1.1
> ```

</details>

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>(create a person)</code></summary>

##### Parameters

> | name   | type                 |
> | ------ | -------------------- |
> | name   | String               |
> | number | String(only numbers) |

##### Responses

> | http code | content-type              | response |
> | --------- | ------------------------- | -------- |
> | `201`     | `application/json`        | JSON     |
> | `400`     | `text/html;charset=utf-8` | none     |

##### Example RestClient

> ```javascript
> POST https://agenda-telefonica-92xa.onrender.com/api/persons HTTP/1.1
> content-type: application/json
> {
>   "name": "Juan",
>  "number": "123-123123"
> }
> ```

</details>

<details>
  <summary><code>PUT</code> <code><b>/{uuid}</b></code> <code>(update a person by id)</code></summary>

##### Parameters

> | name   | type     | data type | description                         |
> | ------ | -------- | --------- | ----------------------------------- |
> | `uuid` | required | string    | The specific stub unique idendifier |

##### Responses

> | http code | content-type               | response                                 |
> | --------- | -------------------------- | ---------------------------------------- |
> | `200`     | `application/json        ` | JSON                                     |
> | `400`     | `application/json`         | `{"code":"400","message":"Bad Request"}` |

##### Example RestClient

> ```javascript
> PUT https://agenda-telefonica-92xa.onrender.com/api/persons/{uuid} HTTP/1.1
> Content-Type: application/json
>
> {
>    "number": "999-999999"
> }
> ```

</details>

<details>
  <summary><code>DELETE</code> <code><b>/{uuid}</b></code> <code>(delete a person by id)</code></summary>

##### Parameters

> uuid

##### Responses

> | http code | content-type               | response |
> | --------- | -------------------------- | -------- |
> | `202`     | `application/json        ` | JSON     |
> | `404`     | `application/json`         | none     |

##### Example cURL

> ```javascript
>  DELETE https://agenda-telefonica-92xa.onrender.com/api/persons/{uuid} HTTP/1.1
> ```

</details>

---
