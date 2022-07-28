//require in express
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
//parsing done automatically, no need to manually parse it
app.use(bodyParser.urlencoded({ extended: true }));
//when user makes a request to root route and a method of GET(get('/'))
//want to run callback function  and take the string 'hi there' and send it back to whoever just made the request

//tells our web server what it should do when it receives a network request from our browswer
//object req - request  res - response
//will find info from user in this req object
//send info back to browser - interact with res object
app.get("/", (req, res) => {
  res.send(`
    <div>
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordConfirmation" placeholder="password confirmation" />
        <button>Sign-up</button>
      </form>
    </div>  
  `);
});

//middleware function; functions in the middle of a request handler
//takes incoming request, receives the body of the request bit by bit, parses it, and put all info together in the req.body property (using outside library)
app.post("/", (req, res) => {
  //get access to email, password, password confirmation
  console.log(req.body);
  res.send("Account created!");
});

//listen for incoming network traffic on port 3000
app.listen(3000, () => {
  console.log("listening");
});
