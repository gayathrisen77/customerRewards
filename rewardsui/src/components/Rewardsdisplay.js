import React, { useState } from 'react';
import '../styles/rewardstablestyle.css';

export const Rewardsdisplay = ({ getAllTransactions,startdate,Enddate}) => {    
    
    const[ stdate,setStDate]= useState(startdate);
    const[ enddate,setEndDate]= useState(Enddate);

    var currDate = new Date().toISOString().slice(0,10);
 
    return(
        <div style={{backgroundColor:'white'}} className="Fetch-transactions">
            <label> Select Start Date: </label>
            <input  data-testid="txtstdate" type = "date" value={stdate} onKeyDown={(e) => e.preventDefault()} onChange={e=> setStDate(e.target.value) } min="1990-01-01" max= {enddate}></input>
            <label> Select End Date: </label>
            <input data-testid= "txtenddate" type = "date" value={enddate} onKeyDown={(e) => e.preventDefault()} onChange={e=> setEndDate(e.target.value)} min="1990-01-01" max= {currDate}></input>
            <span></span>
            <button data-testid="btngetTransaction" type="button" onClick={(e) => getAllTransactions(stdate,enddate)} className="btnfetchtrans">Get all Transactions</button>
           
        </div>
    )
}