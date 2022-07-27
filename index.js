//require in express
const express = require("express");

const app = express();

//when user makes a request to root route and a method of GET(get('/'))
//want to run callback function  and take the string 'hi there' and send it back to whoever just made the request

//tells our web server what it should do when it receives a network request from our browswer
//object req - request  res - response
//will find info from user in this req object
//send info back to browser - interact with res object
app.get("/", (req, res) => {
  res.send(`
    <div>
      <form>
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordConfirmation" placeholder="password confirmation" />
        <button>Sign-up</button>
      </form>
    </div>  
  `);
});

//listen for incoming network traffic on port 3000
app.listen(3000, () => {
  console.log("listening");
});
