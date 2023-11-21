const express = require('express');
const bodyParser = require('body-parser');
const { faker } = require('@faker-js/faker');
const app = express();

app.use(bodyParser.json());

let blogPosts = [
  // Sample data remains here
  // ...
];

// GET all blog posts
app.get('/api/blogposts', (req, res) => {
  res.json(blogPosts);
});

// POST a new blog post
app.post('/api/blogposts', (req, res) => {
  const newPost = {
    id: blogPosts.length + 1,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image
  };

  blogPosts.push(newPost);
  res.status(201).json(newPost);
});

// Generate random blog posts endpoint using '@faker-js/faker' package
app.get('/api/generateRandomPosts', (req, res) => {
  const numPostsToGenerate = 10; // Change the number of posts as needed
  const generatedPosts = generateRandomBlogPosts(numPostsToGenerate);
  blogPosts = generatedPosts; // Replace existing blog posts with random ones
  res.json({ message: 'Random blog posts generated', posts: blogPosts });
});

// Function to generate random blog post data using '@faker-js/faker'
const generateRandomBlogPosts = (numPosts) => {
  const randomPosts = [];

  for (let i = 0; i < numPosts; i++) {
    const post = {
      id: i + 1,
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(5),
      image: faker.image.urlLoremFlickr({ category: 'nature' }) 
    };
    randomPosts.push(post);
  }

  return randomPosts;
};

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
