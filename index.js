import express from 'express';
import bodyParser from 'body-parser';
import auth from "./middleware/authenticate.js";

const app = express();
const port = 4000;

// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));


let posts = [
  {
    "title": "My First Blog Post",
    "content": "This is the content of the blog.",
    "author": "John Doe"
  },
  {
    "title": "Why I Love JavaScript",
    "content": "JavaScript is a powerful language that allows me to build interactive websites and dynamic applications.",
    "author": "Jane Smith"
  },
  {
    "title": "A Day in the Life of a Developer",
    "content": "From morning standups to late-night debugging, here's what a typical day looks like for a software developer.",
    "author": "Mike Ross"
  },
  {
    "title": "Tips for Learning Programming",
    "content": "Stay consistent, build projects, and never be afraid to ask questions. These tips helped me grow as a programmer.",
    "author": "Emily Clarke"
  },
  {
    "title": "The Future of Web Development",
    "content": "With technologies like WebAssembly, AI integrations, and progressive web apps, web development is rapidly evolving.",
    "author": "Liam Johnson"
  },
  {
    "title": "How I Built My Portfolio Website",
    "content": "Using HTML, CSS, and a bit of JavaScript magic, I created a sleek and responsive personal portfolio.",
    "author": "Sophie Lee"
  }
];

//Root
app.get('/', (req, res) => {
    res.send('<h1>WELCOME TO THE ROOT PAGE!</h1>');
});

//Retrieve all posts
app.get('/posts', auth, (req, res) => {
    res.json(posts);
});

//Get details of specific posts
app.get('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = posts.findIndex((element) => element.id === id);
    if (index < 0 || index >= posts.length) {
        return res.status(400).json({ message: "No book found in index " + id});
    }
    res.json(posts[index]);
});

//Add a new book
app.post('/posts', (req, res) => {
    const newBook = {
        id: posts.length + 1,
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher
    };
    posts.push(newBook);
    res.status(200).json({message: "Book successfully added at id " + (posts.length)});
});

//Modify book info
app.put('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = posts.findIndex((element) => element.id === id);
    if (index === -1) return res.status(404).json({error: "Book Not Found"});
    
    posts[index] = { ...posts[index], ...req.body};
    res.json({message: "Book Updated", book: posts[index]});
});

//Delete a certain book
app.delete('/posts/:id', (req, res) =>
    {
    const id = parseInt(req.params.id);
    const index = posts.findIndex((element) => element.id === id);
    if (index < 0 || index >= posts.length)
        {
        return res.status(400).json({ message: "No book found in index " + id});
        }
    posts.splice(index, 1);
    res.json({message: "Item deleted successfully!"});
    });

//Login
app.post('/posts/login', (req, res) => {
    const {username, password} = req.body;

    if (username === 'Alastair45' && password === 'ZinogreSlayer45')
    {
        res.json({message: "Login Success!"});
    }
    else
    {
        res.status(404).json({message: "Invalid Username or Password"});
    }
});

app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
})
