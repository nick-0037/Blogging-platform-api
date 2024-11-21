const express = require('express')
const app = express()
const db = require('./db')

app.use(express.json())

app.post('/posts', (req, res) => {
  const { title, content, category, tags } = req.body

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' })
  }
  console.log('Received data:', req.body)

  const postTitle = title
  const postContent = content
  const postCategory = category || null;
  const postTags = tags ? JSON.stringify(tags) : null
  const createdAt = new Date().toISOString().replace('T', ' ').slice(0, -5)
  const updatedAt = createdAt

  const query = `INSERT INTO posts (title, content, category, tags, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)`
  db.execute(query, [postTitle, postContent, postCategory, postTags, createdAt, updatedAt], 
    (err, results) => {
    if(err) {
      console.error(err)
      res.status(400).json({ error: err.message})
    }
    const postId = results.insertId

    res.status(201).json({
      id: postId,
      title: postTitle,
      content: postContent,
      category: postCategory,
      tags: JSON.parse(postTags),
      createdAt: createdAt,
      updatedAt: updatedAt
    })
  })
})

app.put('/posts/:id', (req, res) => {
  const { id } = req.params
  const { title, content, category, tags } = req.body
  
  if (!title && !content && !category && !tags) {
    return res
      .status(400)
      .json({ error: 'At least one field must be provided to update.' });
  }

  const query = `UPDATE posts SET title = ?, content = ?, category = ?, tags = ?, updatedAt = ? WHERE id = ?`
  const updatedAt = new Date().toISOString().replace('T', ' ').slice(0, -5)
  const postTags = tags ? JSON.stringify(tags) : null


  db.execute(query, 
    [ title, content, category, postTags, updatedAt, id], 
    (err, results) => {
      if(err) {
        console.error(err, 'undefined?')
        return res.status(400).json({ error: err.message })
      }

      if(results.affectedRows === 0) {
        return res.status(404).json({ error: 'Post not found'})
      }

      const selectQuery = `SELECT id, title, content, category, tags, createdAt, updatedAt FROM posts WHERE id = ?`
      db.execute(selectQuery, [id], (err, rows) => {
        if(err) {
          console.error(err, 'undefined?')
          return res.status(400).json({ error: err.message })
        }

        if(rows.length === 0) {
          return res.status(404).json({ error: 'Post not found' })
        }

        const updatedPost = rows[0]

        res.status(200).json(updatedPost)
      })
  })
})

app.delete('/posts/:id', (req, res) => {
  const { id } = req.params

  const deleteQuery = `DELETE FROM posts WHERE id = ?`

  db.execute(deleteQuery, [id], (err, results) => {
    if(err) {
      console.error(err)
      return res.status(400).json({ error: err.message })
    }

    if(results.affectedRows === 0) {
      return res.status(404).json({ error: 'Post not found' })
    }

    res.status(204).json({ message: `Post with id:${id} deleted successfully` })
  })
})

app.get('/posts', (req, res) => {
  const selectQuery = `SELECT id, title, content, category, tags, createdAt, updatedAt FROM posts`

  db.execute(selectQuery, (err, results) => {
    if(err) {
      console.error(err)
      return res.status(400).json({ error: err.message })
    }

    if(results.length === 0) {
      return res.status(404).json({ error: 'No posts found' })
    }

    res.status(200).json(results)
  })
})

app.get('/posts/search', (req, res) => {
  const { term } = req.query

  if(!term) {
    return res.status(400).json({ error: 'Search term is required' });
  }
  
  const filterQuery = `
  SELECT id, title, content, category, tags, createdAt, updatedAt FROM posts
  WHERE LOWER(title) LIKE ? OR LOWER(content) LIKE ? OR LOWER(category) LIKE ?
  `
  
  const searchTerm = `%${term.toLowerCase()}%`

  db.execute(filterQuery, [searchTerm, searchTerm, searchTerm], (err, results) => {
    if(err) {
      console.error(err)
      return res.status(400).json({ error: err.message })
    }

    if(results.length === 0) {
      return res.status(404).json({ error: 'No posts found' })
    }

    res.status(200).json(results)
  })
})

app.get('/posts/:id', (req, res) => {
  const { id } = req.params

  const selectQuery = `SELECT id, title, content, category, tags, createdAt, updatedAt FROM posts WHERE id = ?`

  db.execute(selectQuery, [id], (err, results) => {
    if(err) {
      console.error(err)
      return res.status(400).json({ error: err.message })
    }

    if(results.length === 0) {
      return res.status(404).json({ error: 'Post not found' })
    }

    const post = results[0]

    res.status(200).json(post)
  })
})


const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})