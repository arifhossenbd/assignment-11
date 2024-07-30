const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    'https://blog-haven-7b7ae.web.app',
    'https://blog-haven-7b7ae.firebaseapp.com'
  ],
  credentials: true
}));

// middlewares 
const verifyToken = async (req, res, next) => {
  try {
    const token = await req.cookies.token;
    if (!token) {
      return res.status(401).send({ message: 'Unauthorized access' })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Unauthorized access' })
      }
      req.user = decoded;
      next();
    })
  } catch (error) {
    console.error(error.message);
  }
}

async function run() {
  try {
    const uri = process.env.URI
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    const blogCollection = client.db("blogHaven").collection("blogs");
    const wishlistCollection = client.db("blogHaven").collection("wishlists");
    const commentCollection = client.db("blogHaven").collection("comments");
    const newsletterCollection = client.db("blogHaven").collection("newsletters");

    // Auth related api
    app.post('/api/v1/jwt', async (req, res) => {
      try {
        const user = req.body;
        const token = await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 3600000,
        }).send({ success: true, message: 'Your token has been added successfully' });
      } catch (error) {
        console.error(error.message);
      }
    });

    // When user logout then token clear
    app.post('/api/v1/logOut', async (req, res) => {
      try {
        res.clearCookie('token', { maxAge: 0 }).send({ success: true, message: 'Your token has been cleared' })
      } catch (error) {
        console.error(error.message);
      }
    })

    //Create a blog
    app.post("/api/v1/create-blog", async (req, res) => {
      try {
        const createBlog = req.body;
        const result = await blogCollection.insertOne(createBlog);
        res.send(result);
      } catch (error) {
        console.error(error);
      }
    });

    // Get all blog with pagination and search functionality
    app.get("/api/v1/blogs", async (req, res) => {
      try {
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;
        const skip = (page - 1) * size;
        const searchQuery = req.query.query;
        const queryObj = {
          $or: [
            { title: { $regex: new RegExp(searchQuery, 'i') } }
          ]
        };
        const blogsData = await blogCollection.find(queryObj).skip(skip).limit(size).toArray();
        const totalCount = await blogCollection.estimatedDocumentCount();
        res.send({ blogsData, totalCount });
      } catch (error) {
        console.error(error);
      }
    });

    app.get("/api/v1/blogsData", async (req, res) => {
      try {
        const result = await blogCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
      }
    })

    //Get blog details
    app.get("/api/v1/blog/:detailsId", async (req, res) => {
      try {
        const id = req.params.detailsId;
        const queryObj = { _id: new ObjectId(id) };
        const result = await blogCollection.findOne(queryObj);
        res.send(result);
      } catch (error) {
        console.error(error);
      }
    });

    //update blog
    app.patch('/api/v1/blog/:blogUpdateId', verifyToken, async (req, res) => {
      try {
        const blog = req.body;
        const id = req.params.blogUpdateId;
        const filter = { _id: new ObjectId(id) }
        const updateBlog = {
          $set: {
            title: blog.title,
            category: blog.category,
            shortDesc: blog.shortDesc,
            fullDesc: blog.fullDesc,
            image: blog.image,
            date: new Date()
          }
        }
        const result = await blogCollection.updateOne(filter, updateBlog)
        res.send(result);
      } catch (error) {
        console.error(error);
      }
    })

    // Create a wishlist
    app.post("/api/v1/create-wishlist", async (req, res) => {
      try {
        const createWihlist = req.body;
        const result = await wishlistCollection.insertOne(createWihlist);
        res.send(result);
      } catch (error) {
        console.error(error);
      }
    });

    // Get the wishlist by email
    app.get("/api/v1/wishlists", verifyToken, async (req, res) => {
      try {

        let queryObj = {};
        const queryEmail = req.query.email;
        const tokenEmail = req.user.email;
        if (queryEmail) {
          queryObj = {
            email: queryEmail
          }
        }
        if (queryEmail !== tokenEmail) {
          return res.status(403).send({ message: "Forbidden access" });
        }
        const result = await wishlistCollection.find(queryObj).toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
      }
    });

    //Delete wishlist
    app.delete("/api/v1/wishlist/:wishlistDeleteId", verifyToken, async (req, res) => {
      try {
        const id = req.params.wishlistDeleteId;
        const queryObj = { _id: new ObjectId(id) };
        const result = await wishlistCollection.deleteOne(queryObj);
        res.send(result);
      } catch (error) {
        console.error(error);
      }
    });

    // Create a comment
    app.post("/api/v1/create-comment", async (req, res) => {
      try {
        const createComment = req.body;
        const result = await commentCollection.insertOne(createComment);
        res.send(result);
      } catch (error) {
        console.error(error);
      }
    });

    //Get all comment  
    app.get("/api/v1/comments", async (req, res) => {
      try {
        const result = await commentCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
      }
    });

    // Update Comment
    app.patch('/api/v1/comment/:commentUpdateId', async (req, res) => {
      try {
        const comment = req.body;
        const id = req.params.commentUpdateId;
        const filtered = { _id: new ObjectId(id) };
        const updateComment = {
          $set: {
            name: comment.name,
            email: comment.email,
            img: comment.img,
            comment: comment.comment,
            createdAt: new Date(),
          },
        };
        const result = await commentCollection.updateOne(filtered, updateComment);
        res.send(result)
      } catch (error) {
        console.error(error);
      }
    });

    // Delete a comment
    app.delete("/api/v1/comment/:commentDeleteId", async (req, res) => {
      const id = req.params.commentDeleteId;
      const queryObj = { _id: new ObjectId(id) };
      try {
        const result = await commentCollection.deleteOne(queryObj);
        res.send(result);
      } catch (error) {
        console.error(error)
      }
    });

    //Create newsletter
    app.post("/api/v1/create-newsletter", async (req, res) => {
      const createNewsletter = req.body;
      try {
        const result = await newsletterCollection.insertOne(createNewsletter);
        res.send(result);
      } catch (error) {
        console.error(error);
      }
    });

    //Get all newsletter
    app.get("/api/v1/newsletters", async (req, res) => {
      try {
        const result = await newsletterCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

app.get("/", (req, res) => {
  res.send("Blogs Content is Coming");
});

app.listen(port, () => {
  console.log(`Blogs server is running on the port, ${port}`);
});

run().catch(console.dir);
