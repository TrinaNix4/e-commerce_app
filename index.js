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
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordConfirmation" placeholder="password confirmation" />
        <button>Sign-up</button>
      </form>
    </div>  
  `);
});

app.post("/", (req, res) => {
  //get access to email, password, password confirmation
  //want to run a callback function when some event occurs (data)
  req.on("data", (data) => {
    //parsed is an array of strings where each string is email, pw, and pw conf.
    const parsed = data.toString("utf8").split("&");
    const formData = {};
    for (let pair of parsed) {
      const [key, value] = pair.split("=");
      formData[key] = value;
    }
    console.log(formData);
  });
  res.send("Account created!");
});

//listen for incoming network traffic on port 3000
app.listen(3000, () => {
  console.log("listening");
});
