const express=require('express');
const app=express();
const port= 8001;
const {Pool,Client}= require('pg')
const bodyParser=require('body-parser'); 

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

///////////////////////////////////// Render the HTML form//////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/UI/Home.html");
});

app.get("/styles", (req, res) => {
  res.sendFile(__dirname + "/UI/styles.css");
});

app.get('/invfdetailsf', (req, res) => {
  res.sendFile(__dirname + '/UI/invfdetailsf.html');
});
/////////////////////////////////////////////////Creating Client////////////////////////////////////////////
const connectionString='postgressql://postgres:pg123@localhost:5432/inventoryManagement'

const client= new Client({
    connectionString:connectionString
})
//////////////////////////////////////////All user get////////////////////////////////////////////////////////
app.get('/invfdetails', (req, res) => {
  if (client._connected) {
      // Nothing
  } else {
      client.connect();
  }

  client.query('SELECT * FROM inventory', (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).json({ error: 'An error occurred' });
      } else {
          datad3 = result.rows;
          console.log("inventory displayed in UI");
          res.render('invfdetails', { datad3 }); // Render the EJS template with the data
      }
      // Ensure the client is closed after the query
  });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
  });