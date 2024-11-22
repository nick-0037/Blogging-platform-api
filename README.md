# Blogging Platform API

This application is a RESTful API built with Express and MySQL to manage a system of posts. It allows users to interact with the database through various endpoints, which enable CRUD (Create, Read, Update, and Delete) operations on posts.
https://roadmap.sh/projects/blogging-platform-api

## Features

- Create posts (POST /posts): Users can submit data to create new posts with a title, content, category, and tags. The post data is stored in a MySQL database, including creation and last updated dates.

- Get all posts (GET /posts): Users can retrieve a list of all posts stored in the database. The posts are returned with details such as title, content, category, tags, and dates.

- Search posts (GET /posts/search): The API allows users to search for posts based on a search term, which can be part of the title, content, or category. If no search term is provided, the API returns an error.

- Get a specific post (GET /posts/:id): Users can get the details of a specific post by its ID. If the post is not found, an error is returned.

- Update a post (PUT /posts/:id): Users can update the details of an existing post, including title, content, category, and tags. The update field includes a modification date.

- Delete a post (DELETE /posts/:id): Users can delete an existing post by its ID. If the post is not found, an error is returned.

## Installation 

Clone the repository, navigate into the project directory and install dependencies:

```bash
git clone https://github.com/nick-0037/Task-tracker-cli.git
cd task-tracker-cli
npm install
```

## Usage

### 1. Create a Post (POST /posts)
- Description: Allows you to create a new post by providing a title, content, category, and tags.
- Request:
  - Method: POST
  - Endpoint: /posts
  - Body (JSON):
  ```json
  {
    "title": "Post Title",
    "content": "This is the content of the post.",
    "category": "Technology",
    "tags": ["JavaScript", "Node.js"]
  }
  ```
Response: Returns the created post with a unique ID, creation date, and updated date.
```json
{
  "id": 1,
  "title": "Post Title",
  "content": "This is the content of the post.",
  "category": "Technology",
  "tags": ["JavaScript", "Node.js"],
  "createdAt": "2024-11-21 23:26:12",
  "updatedAt": "2024-11-21 23:26:12"
}
```

### 2. Get All Posts (GET /posts)
- Description: Retrieve a list of all posts stored in the database.
- Request:
  - Method: GET
  - Endpoint: /posts
  - Response: Returns an array of all posts with their details.
  ```json
  [
    {
      "id": 1,
      "title": "Post Title",
      "content": "This is the content of the post.",
      "category": "Technology",
      "tags": ["JavaScript", "Node.js"],
      "createdAt": "2024-11-21 23:26:12",
      "updatedAt": "2024-11-21 23:26:12"
    }
  ]
  ```
### 4. Get a Specific Post (GET /posts/:id)
- Description: Retrieve details of a specific post using its ID.
- Request:
  - Method: GET
  - Endpoint: /posts/:id
  - Example: /posts/1
- Response:: Returns the details of the post with the specified ID.
```json
{
  "id": 1,
  "title": "Post Title",
  "content": "This is the content of the post.",
  "category": "Technology",
  "tags": ["JavaScript", "Node.js"],
  "createdAt": "2024-11-21 23:26:12",
  "updatedAt": "2024-11-21 23:26:12"
}
```

### 5. Update a Post (PUT /posts/:id)
- Description: Update the details of an existing post, including title, content, category, and tags.
- Request:
  - Method: PUT
  - Endpoint: /posts/:id
  - Body (JSON):
  ```json
  {
    "title": "Updated Title",
    "content": "Updated content",
    "category": "Tech",
    "tags": ["Node.js", "API"]
  }
  ```
- Response: Returns the updated post details.
```json
{
  "id": 1,
  "title": "Updated Title",
  "content": "Updated content",
  "category": "Tech",
  "tags": ["Node.js", "API"],
  "createdAt": "2024-11-21 23:26:12",
  "updatedAt": "2024-11-22 02:54:10"
}
```

### 6. Delete a Post (DELETE /posts/:id)
- Description: Delete a post by its ID.
- Request:
  - Method: DELETE
  - Endpoint: /posts/:id
  - Example: /posts/1
- Response: Returns a success message if the post was deleted.
```json
{
  "message": "Post with id: 1 deleted successfully"
}
```

### Error Handling:
If a request is invalid or something goes wrong, the API will return an error message with a status code indicating the issue:

- 400 Bad Request for missing required fields or invalid data.
- 404 Not Found if a resource (like a post) is not found.
- 500 Internal Server Error for any server issues.
