# todo-server

**Create ToDo**
----
  Returns json data for newly created Todo.

* **URL**

  /todos

* **Method:**

  `POST`
  
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
    **Content:** <br />`{ data : { id : 1, title : "Read Book", description : "Book titled Iron Man", status: false, due_date : 2020-04-12 } }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** <br />`{ error : "Bad Request" }`

    OR 

  * **Code:** 500 <br />
    **Content:** <br />`{ error : "Internal Server Error" }`


**Show ToDos**
----
  Returns json data for all Todos.

* **URL**

  /todos

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{data : [ { id : 1, title : "Read Book", description : "Book titled Iron Man", status: false, due_date : 2020-04-12 }, { id : 2, title : "Drink Coffee", description : "Coffee latte", status: false, due_date : 2020-04-12 } ] }`
 
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
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ` { data :  { id : 1, title : "Read Book", description : "Book titled Iron Man", status: false, due_date : 2020-04-12 } }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`


**Update ToDo**
----
  Update Todo and returns json data for updated Todo.

* **URL**

  /todos/:id

* **Method:**

  `PUT`

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
    **Content:** <br />`{ data : { id : 1, title : "Read Book", description : "Book titled Captain America", status: true, due_date : 2020-04-12 } }`
 
* **Error Response:**

    * **Code:** 400 <br />
    **Content:** <br />`{ error : "Bad Request" }`

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
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** <br />`{ data : { id : 1, title : "Read Book", description : "Book titled Captain America", status: true, due_date : 2020-04-12 } }`
 
* **Error Response:**

    * **Code:** 404 <br />
    **Content:** <br />`{ error : "Not Found" }`

    OR 

    * **Code:** 500 <br />
    **Content:** <br />`{ error : "Internal Server Error" }`