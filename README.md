🚀 Project Objective

To create a REST API that supports:

➕ Add a new book

📖 Retrieve all books or one book

✏️ Update a book

❌ Delete a book

This project demonstrates understanding of:

REST principles

Express routing

HTTP methods

JSON handling

API testing using Postman

🛠️ Technologies Used

Node.js

Express.js

Postman (for testing)

VS Code

📦 Installation & Setup
1️⃣ Initialize Project
npm init -y

2️⃣ Install Express
npm install express

3️⃣ (Optional) Install Morgan for Logging
npm install morgan

4️⃣ Run Server
node index.js


Server runs on:

http://127.0.0.1:3000

📁 Project Structure
📂 Books-REST-API
│── index.js
│── package.json
│── README.md

📚 API Endpoints
🔹 1. GET All Books

URL: GET /books
Description: Returns all books

Response Example

[
  {
    "id": 1,
    "title": "The Pragmatic Programmer",
    "author": "Andrew Hunt & David Thomas"
  }
]

🔹 2. GET Book by ID

URL: GET /books/:id
Example: /books/1

Response Example

{
  "id": 1,
  "title": "The Pragmatic Programmer",
  "author": "Andrew Hunt & David Thomas"
}

🔹 3. POST Add New Book

URL: POST /books
Headers:
Content-Type: application/json

Body Example

{
  "title": "My New Book",
  "author": "Kiran"
}


Response

{
  "id": 3,
  "title": "My New Book",
  "author": "Kiran"
}

🔹 4. PUT Update Book

URL: PUT /books/:id

Body Example

{
  "title": "Updated Title",
  "author": "Kiran"
}


Response

{
  "id": 3,
  "title": "Updated Title",
  "author": "Kiran"
}

🔹 5. DELETE Remove Book

URL: DELETE /books/:id
Example: /books/3

Response

{
  "id": 3,
  "title": "Updated Title",
  "author": "Kiran"
}

🧪 Testing With Postman

Open Postman

Create new request

Choose HTTP METHOD (GET/POST/PUT/DELETE)

Enter URL (e.g., http://127.0.0.1:3000/books)

For POST/PUT → Select Body → raw → JSON

Click Send

