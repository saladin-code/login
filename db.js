const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const mongodb_uri = "mongodb+srv://saladin_code:uGW57mywTNWrmqjX@cluster0.dhcaihc.mongodb.net/?retryWrites=true&w=majority"//process.env.MONGODB_URI;

const client = new MongoClient(mongodb_uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });



  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);



// const users = [
//     {
//         "email": "john.doe@example.com",
//         "password": "password123",
//         "group": "Moderator"
//     },
//     {
//         "email": "jane.doe@example.com",
//         "password": "password456",
//         "group": "Student"
//     },
//     {
//         "email": "test@example.com",
//         "password": "test123",
//         "group": "Student"
//     },
//     {
//         "email": "user@example.com",
//         "password": "user123",
//         "group": "Student"
//     },
//     {
//         "email": "test7@gmail.com",
//         "password": "$2b$10$9tnJ.MnyZAfy3sIMM5JPYO/ZXEbkj5qsxTaejMTsGcBUHP0SlT/k6",
//         "group": "Student"
//     }
// ];

// const publicPosts = [
//     {
//         "title": "Post 1",
//         "content": "Content 1"
//     },
//     {
//         "title": "Post 2",
//         "content": "Content 2"
//     },
//     {
//         "title": "Post 3",
//         "content": "Content 3"
//     },
//     {
//         "title": "Post 4",
//         "content": "Content 4"
//     },
//     {
//         "title": "Post 5",
//         "content": "Content 5"
//     }
// ];

// const privatePosts = [


//     {
//         "title": "Private Post 1",
//         "content": "Private Content 1"
//     },
//     {
//         "title": "Private Post 2",
//         "content": "Private Content 2"
//     },
//     {
//         "title": "Private Post 3",
//         "content": "Private Content 3"
//     },
//     {
//         "title": "Private Post 4",
//         "content": "Private Content 4"
//     },
//     {
//         "title": "Private Post 5",
//         "content": "Private Content 5"
//     }
// ];

// module.exports = {
//     users,
//     publicPosts,
//     privatePosts
// }