const express=require('express');
const app=express();
const port= 8003;
const {Pool,Client}= require('pg')
const bodyParser=require('body-parser'); 

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

///////////////////////////////////// Render the HTML form//////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/UI/paydetailsf.html");
});

/////////////////////////////////////////////////Creating Client////////////////////////////////////////////
const connectionString='postgressql://postgres:pg123@localhost:5432/paymentManagement'

const client= new Client({
    connectionString:connectionString
})
//////////////////////////////////////////All user get////////////////////////////////////////////////////////
app.get('/paydetails', (req, res) => {
  if (client._connected) {
      // Nothing
  } else {
      client.connect();
  }

  client.query('SELECT * FROM invapayment', (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).json({ error: 'An error occurred' });
      } else {
          datad3 = result.rows;
          console.log("Payment displayed in UI");
          res.render('paydetails', { datad3 }); // Render the EJS template with the data
      }
      // Ensure the client is closed after the query
  });
});


//////////////////////////////////////////All user get////////////////////////////////////////////////////////
app.get('/cretable', (req, res) => {
    if (client._connected) {
        // Nothing
    } else {
        client.connect();
    }
  
    client.query('CREATE TABLE IF NOT EXISTS public.invapayment("P_ID" character(10) COLLATE pg_catalog."default" NOT NULL,"P_Amount" numeric(8,0),"P_type" character(10) COLLATE pg_catalog."default","P_date" date,CONSTRAINT invapayment_pkey PRIMARY KEY ("P_ID"))', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            //datad3 = result.rows;
            console.log("table created in UI");
            //res.render('paydetails', { datad3 }); // Render the EJS template with the data
        }
        // Ensure the client is closed after the query
    });
    res.sendFile(__dirname + "/UI/paydetailsf.html");
  });
//////////////////////////////////////////All user get////////////////////////////////////////////////////////
app.get('/instdata', (req, res) => {

    const P_ID = 'I00121';
    const P_Amount = '457';
    const P_type = 'Online';
    const P_date = '01/01/2022';

    if (client._connected) {
        // Nothing
    } else {
        client.connect();
    }
  
    client.query('INSERT INTO "invapayment" VALUES ($1, $2, $3, $4)',[P_ID,P_Amount,P_type,P_date], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            //datad3 = result.rows;
            console.log("Payment displayed in UI");
            //res.render('paydetails', { datad3 }); // Render the EJS template with the data
        }
        // Ensure the client is closed after the query
    });
    res.sendFile(__dirname + "/UI/paydetailsf.html");
  });
  

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
  });
