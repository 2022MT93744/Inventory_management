const express=require('express');
const app=express();
const port= 8002;
const {Pool,Client}= require('pg')
const bodyParser=require('body-parser'); 

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

///////////////////////////////////// Render the HTML form//////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/UI/ordfdetailsf.html");
});

/////////////////////////////////////////////////Creating Client////////////////////////////////////////////
const connectionString='postgressql://postgres:pg123@localhost:5432/orderManagement'

const client= new Client({
    connectionString:connectionString
})
//////////////////////////////////////////All user get////////////////////////////////////////////////////////
app.get('/ordfdetails', (req, res) => {
  if (client._connected) {
      // Nothing
  } else {
      client.connect();
  }

  client.query('SELECT * FROM invorder', (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).json({ error: 'An error occurred' });
      } else {
          datad3 = result.rows;
          console.log("Order displayed in UI");
          res.render('ordfdetails', { datad3 }); // Render the EJS template with the data
      }
      // Ensure the client is closed after the query
  });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
  });