# todo-server

**Create User**
----
  Returns json data for newly created User.

* **URL**

  /users/resgister

* **Method:**

  `POST`
  
*  **Request Body**

   **Required:**
   <br />
    ` {"email" : "user1@gmail.com",
	"password" : "user1password"
    }`


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** <br />`{ user : {id : 1, email : "user1@gmail.com"
    } }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** <br />`{ message : [validation errors] }`

    OR 

  * **Code:** 500 <br />
    **Content:** <br />`{ error : "Internal Server Error" }`


**Login User**
----
  Returns token data for logged in User.

* **URL**

  /users/login

* **Method:**

  `POST`
  
*  **Request Body**

   **Required:**
   <br />
    ` {"email" : "user1@gmail.com",
	"password" : "user1password"
    }`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />`{ token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ1c2VyM0BnbWFpbC5jb20iLCJpYXQiOjE1ODMyMjgzOTB9.ifWoYwYPhWsXaaydbMKittQ8ZXHhcY5esgnhb2QdD9M" }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** <br />`{ message : "Wrong Email / Password" }`

    OR 

  * **Code:** 500 <br />
    **Content:** <br />`{ error : "Internal Server Error" }`


**Create ToDo**
----
  Returns json data with GIF URL for newly created Todo.

* **URL**

  /todos

* **Method:**

  `POST`

*  **Headers**

   **Required:**
 
   `token=[string]`
  
*  **Request Body**

   **Required:**
   <br />
    ` {"title" : "Read Book",
	"description" : "Book titled Iron Man",
	"status" : "false",
    "due_date" : "2020-04-12"
    }`


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** <br />`{
    "imageURL": "https://media3.giphy.com/media/l39JrKv9ZZX2g/giphy.gif?cid=0a0cdce44bd2ad8edd7921868826ab902c2e5c55094e1fc2&rid=giphy.gif",
    "message": "success"
}`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** <br />`{ message : [validation errors] }`

    OR 

  * **Code:** 500 <br />
    **Content:** <br />`{ error : "Internal Server Error" }`


**Show ToDos**
----
  Returns json data for all Todos created by User logged in.

* **URL**

  /todos

* **Method:**

  `GET`

*  **Headers**

   **Required:**
 
   `token=[string]`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "data": [
        {
            "id": 1,
            "title": "Standing",
            "description": "",
            "status": false,
            "due_date": "2020-03-10T00:00:00.000Z",
            "UserId": 1
        },
        {
            "id": 4,
            "title": "Flying",
            "description": "",
            "status": false,
            "due_date": "2020-05-10T00:00:00.000Z",
            "UserId": 1
        },
        {
            "id": 5,
            "title": "Flyings",
            "description": "",
            "status": false,
            "due_date": "2020-05-10T00:00:00.000Z",
            "UserId": 1
        } ] }`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`



**Show Todo**
----
  Returns json data about a single Todo.

* **URL**

  /todos/:id

* **Method:**

  `GET`

*  **Headers**

   **Required:**
 
   `token=[string]`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ` {
    "data": {
        "id": 47,
        "title": "Flying High",
        "description": "",
        "status": false,
        "due_date": "2020-05-10T00:00:00.000Z",
        "UserId": 1,
        "createdAt": "2020-03-04T01:28:34.768Z",
        "updatedAt": "2020-03-04T01:28:34.768Z"
    }
}`
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ message : "Not found" }`
  
  OR 

  * **Code:** 500 <br />
    **Content:** <br />`{ error : "Internal Server Error" }`


**Update ToDo**
----
  Update Todo and returns json data for updated Todo.

* **URL**

  /todos/:id

* **Method:**

  `PUT`

*  **Headers**

   **Required:**
 
   `token=[string]`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None
  
*  **Request Body**

   **Required:**
   <br />
    ` {"title" : "Read Book",
	"description" : "Book titled Captain America",
	"status" : "true",
    "due_date" : "2020-04-12"
    }`


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** <br />`{
    "data": [
        {
            "id": 49,
            "title": "Gym",
            "description": "trial5updated",
            "status": true,
            "due_date": "2020-03-13T00:00:00.000Z",
            "createdAt": "2020-03-04T01:38:03.392Z",
            "updatedAt": "2020-03-04T01:42:36.743Z",
            "UserId": 1
        }
    ],
    "message": "updated"
}`
 
* **Error Response:**

    * **Code:** 400 <br />
    **Content:** <br />`{ message : [validation errors] }`

    OR 

    * **Code:** 404 <br />
    **Content:** <br />`{ error : "Not Found" }`

    OR 

    * **Code:** 500 <br />
    **Content:** <br />`{ error : "Internal Server Error" }`


**Delete ToDo**
----
  Delete Todo and returns json data for deleted Todo.

* **URL**

  /todos/:id

* **Method:**

  `DELETE`

*  **Headers**

   **Required:**
 
   `token=[string]`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** <br />`{
    "data": {
        "id": 49,
        "title": "Gym",
        "description": "trial5updated",
        "status": true,
        "due_date": "2020-03-13T00:00:00.000Z",
        "UserId": 1,
        "createdAt": "2020-03-04T01:38:03.392Z",
        "updatedAt": "2020-03-04T01:42:36.743Z"
    },
    "message": "deleted"
}`
 
* **Error Response:**

    * **Code:** 404 <br />
    **Content:** <br />`{ error : "Not Found" }`

    OR 

    * **Code:** 500 <br />
    **Content:** <br />`{ error : "Internal Server Error" }`