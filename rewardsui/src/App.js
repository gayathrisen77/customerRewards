import React, { useState, useEffect } from 'react';
import './styles/rewardstablestyle.css';
import { Transactions } from './components/Transactions'
import { Header } from './components/Header'
import {Rewardsdisplay} from './components/Rewardsdisplay'

import { getAllTransactions } from './services/rewardsService'
function App() {

  //get 3months priordate and current date 

  var currDate = new Date().toISOString().slice(0,10);
  var previousDate = new Date(currDate);
  previousDate.setMonth(previousDate.getMonth() -3);
  

  
  const [transactions, setTransactions] = useState([])
  const [stdate , setStdate]= useState(previousDate.toISOString().slice(0,10))
  const [enddate, setEnddate] = useState(currDate)



  const fetchAllTransactions = (stdate,enddate) => {
    
    getAllTransactions(stdate,enddate)
      .then(transactions => {
        console.log("calling from fetch all transactions ",transactions)
        setTransactions(transactions);        
        setStdate(stdate);
        setEnddate(enddate);
      });
  }

  useEffect(() => {
  
      getAllTransactions(stdate,enddate)
       .then(transactions => {
        console.log("calling from useEffect",transactions)
        setTransactions(transactions);       
        setStdate(stdate);
        setEnddate(enddate);
       });
    
  }, [])


  return (
    <div className="App">
          <Header></Header>
          <div className="CusRewardsfetch">
                  <Rewardsdisplay                    
                    getAllTransactions={fetchAllTransactions} 
                    startdate={stdate}
                    Enddate = {enddate}
                    >
                  </Rewardsdisplay>
              </div>
              <div className="custransactions">
              <Transactions transactions={transactions}></Transactions>
          </div>
          </div>
    
  );
}

export default App;
