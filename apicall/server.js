const express = require('express');
const fs = require('fs');
//const path = require('path');
const cors = require('cors');

const app = express(),
bodyParser = require("body-parser");
port = 8005;

// place holder for the data
const Transaction = [
  {
    transID: 1,
    customerID: 1,
    billamt: 245,
    transdate: "7/7/2022 13:00"
  },
  {
    transID: 2,
    customerID: 1,
    billamt: 55,
    transdate: "6/7/2022 04:00"
  },
  {
    transID: 3,
    customerID: 2,
    billamt: 123,
    transdate: "8/6/2022 11:00"
  },
  {
    transID: 4,
    customerID: 9,
    billamt: 178,
    transdate: "8/6/2022 13:00"
  },
  {
    transID: 5,
    customerID: 5,
    billamt: 67,
    transdate: "8/8/2022 03:00"
  },
  {
    transID: 6,
    customerID: 1,
    billamt: 123,
    transdate: "07/22/2022 08:00"
  },
  {
    transID: 7,
    customerID: 11,
    billamt: 50,
    transdate: "08/5/2022 23:00"
  },
  {
    transID: 8,
    customerID: 21,
    billamt: 100,
    transdate: "06/17/2022 10:00"
  },
  {
    transID: 9,
    customerID: 16,
    billamt: 789,
    transdate: "7/6/2022 09:00"
  },
  {
    transID: 10,
    customerID: 1,
    billamt: 69,
    transdate: "06/6/2022 23:00"
  },
  {
    transID: 11,
    customerID: 4,
    billamt: 80,
    transdate: "08/04/2022 13:00"
  },
  {
    transID: 12,
    customerID: 2,
    billamt: 140,
    transdate: "07/17/2022 18:00"
  },
  {
    transID: 13,
    customerID: 12,
    billamt: 185,
    transdate: "07/20/2022 18:00"
  },
  {
    transID: 14,
    customerID: 2,
    billamt: 99,
    transdate: "07/27/2022 18:00"
  },

{
  transID: 15,
  customerID: 4,
  billamt: 101,
  transdate: "06/22/2022 18:00"
},
{
  transID: 16,
  customerID: 2,
  billamt: 109,
  transdate: "05/27/2022 18:00"
}
];
/*
fs.writeFile('./data/transactions.json',JSON.stringify(Transaction), (err) => {
    if(err) {
        console.log('Error while saving data',err);
    }
    else {
        console.log('data saved');
    }
   
});  */



app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname, '../my-app/build')));
app.use(cors());
const corsOptions = {
    origin: "http://localhost:3000"
};

app.get('/apicall/transactions', cors(corsOptions), (req, res) => {
    const stdate = new Date(req.param('stdate'));
    const enddate = new Date(req.param('enddate'));
    //const stdate = req.params['stdate'];

  console.log('api/transactions called!');
  console.log("start date" ,stdate);
  console.log("end Date ",enddate);

  function GetsortOrder(prop){
    return function(a,b) {
        if(a[prop] > b[prop]){
            return 1;
        }
        else if(a[prop] < b[prop]){
            return -1;
        }
       
        return 0;
    }
    }
  

  fs.readFile('./data/transactions.json',function(err,transdata)
  {
    var filteredtransdata = JSON.parse(transdata);
    console.log(filteredtransdata);
    filteredtransdata = filteredtransdata.filter(x => {
        var date = new Date(x.transdate);
       return ( date >= stdate && date <= enddate);
    });
    filteredtransdata = filteredtransdata.sort(GetsortOrder("customerID"));
   // console.log(transdata);
    console.log(filteredtransdata);
    //filteredtransdata = JSON.parse(filteredtransdata);
      
  res.json(filteredtransdata);
  });
});

app.get('/', (req,res) => {
  res.json({message: 'Hello world'})
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});