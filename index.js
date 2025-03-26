import express from 'express';
import bodyParser from 'body-parser';
import auth from "./middleware/authenticate.js";

const app = express();
const port = 4000;

// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));



let books = [
    {
        id: 1,
        title: "Call of Cthulhu",
        author: "H.P. Lovecraft",
        publisher: "England Publishers Inc."
    },
    {
        id: 2,
        title: "The Shadow over Innsmouth",
        author: "H.P. Lovecraft",
        publisher: "Arkham House"
    },
    {
        id: 3,
        title: "At the Mountains of Madness",
        author: "H.P. Lovecraft",
        publisher: "Doubleday"
    },
    {
        id: 4,
        title: "The Dunwich Horror",
        author: "H.P. Lovecraft",
        publisher: "Weird Tales Press"
    },
    {
        id: 5,
        title: "The Colour Out of Space",
        author: "H.P. Lovecraft",
        publisher: "Century Publications"
    },
    {
        id: 6,
        title: "The Whisperer in Darkness",
        author: "H.P. Lovecraft",
        publisher: "Visionary Press"
    },
    {
        id: 7,
        title: "The Haunter of the Dark",
        author: "H.P. Lovecraft",
        publisher: "Strange Horizons"
    },
    {
        id: 8,
        title: "The Shadow Out of Time",
        author: "H.P. Lovecraft",
        publisher: "Horror House"
    },
    {
        id: 9,
        title: "The Dreams in the Witch House",
        author: "H.P. Lovecraft",
        publisher: "Gothic Press"
    },
    {
        id: 10,
        title: "The Case of Charles Dexter Ward",
        author: "H.P. Lovecraft",
        publisher: "Cthulhu Press"
    }
];

//Root
app.get('/', (req, res) => {
    res.send('<h1>WELCOME TO THE ROOT PAGE!</h1>');
});

//Retrieve all books
app.get('/books', auth, (req, res) => {
    res.json(books);
});

//Get details of specific books
app.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex((element) => element.id === id);
    if (index < 0 || index >= books.length) {
        return res.status(400).json({ message: "No book found in index " + id});
    }
    res.json(books[index]);
});

//Add a new book
app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher
    };
    books.push(newBook);
    res.status(200).json({message: "Book successfully added at id " + (books.length)});
});

//Modify book info
app.patch('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex((element) => element.id === id);
    if (index === -1) return res.status(404).json({error: "Book Not Found"});
    
    books[index] = { ...books[index], ...req.body};
    res.json({message: "Book Updated", book: books[index]});
});

//Delete a certain book
app.delete('/books/:id', (req, res) =>
    {
    const id = parseInt(req.params.id);
    const index = books.findIndex((element) => element.id === id);
    if (index < 0 || index >= books.length)
        {
        return res.status(400).json({ message: "No book found in index " + id});
        }
    books.splice(index, 1);
    res.json({message: "Item deleted successfully!"});
    });

//Login
app.post('/books/login', (req, res) => {
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
