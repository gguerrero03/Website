// server-express.js include global variables 
const express = require('express');
const app = express(); // initialize app
const port = 3000;
let counter = 0;

// GET callback function returns a response message
app.get('/', (req, res) => {
    res.send('Hello World! Welcome to Node.js');
});

// GET function that returns the number of visits for this node session
app.get('/visits', (req, res) => { // at the '/vists' route
	counter += 1 // increase our counter variable by 1
      // Text formatting from ‘text formatting’ JavaScript prelab section
	res.send(`There have been ${counter} visits to this session`); 
});

// Rock Paper Scissors game, each route is the option the user select. The 'bot' will randomly select one of three options (1 for rock, 2 for paper, 3 for scissors)

// IF the user picks rock
app.get('/rock', (req, res) => {
    const rndInt = Math.floor(Math.random() * 3) + 1 //Generates a random number from 0 to 1, then multiplies it by 3 and adds 1
    console.log(rndInt) //print out the choice of the not (great for troubleshooting)
    if (rndInt === 3){
        res.send("Bot picked Scissors. You Win!!!")
    }   else if (rndInt === 1){
            res.send("Bot picked Rock. Tie! Try again!")
    }else if (rndInt === 2){
            res.send("Bot picked Paper. You Lost!!!")
    }
});

// IF the user picks paper
app.get('/paper', (req, res) => {
    const rndInt = Math.floor(Math.random() * 3) + 1
    console.log(rndInt)
    if (rndInt === 3){
        res.send("Bot picked Scissors. You Lost!!!")
    }   else if (rndInt === 1){
            res.send("Bot picked Rock. You Win!!!")
     }else if (rndInt === 2){
            res.send("Bot picked Paper. Tie! Try again!")
     }
});

// IF the user picks scissors
app.get('/scissors', (req, res) => {
    const rndInt = Math.floor(Math.random() * 3) + 1
    console.log(rndInt)
    if (rndInt === 3){
        res.send("Bot picked Scissors. Tie! Try again!")
    }   else if (rndInt === 1)
            res.send("Bot picked Rock. You Lost!!!")
        else if (rndInt === 2)
            res.send("Bot picked Paper. You Win!!!")
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});