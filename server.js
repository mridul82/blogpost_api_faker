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

// Generate random user with avatar
app.get('/api/randomUsers', (req, res) => {
  const numUsersToGenerate = 10; // Change the number of users as needed
  const generatedUsers = generateRandomUsers(numUsersToGenerate);
  res.json({ message: 'Random users generated', users: generatedUsers });
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

// Function to generate random users with avatars
const generateRandomUsers = (numUsers) => {
  const randomUsers = [];

  for (let i = 0; i < numUsers; i++) {
    const user = {
      id: i + 1,
      name: faker.internet.displayName(),      
      email: faker.internet.email(),
      age : faker.number.int({ min: 18, max: 60 }),
      // gender: faker.helpers.arrayElement(['female', 'male']),
      avatar: faker.internet.avatar()// Generate random avatar URL
    };
    randomUsers.push(user);
  }

  return randomUsers;
};

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
