import React from 'react'
import '../styles/rewardstablestyle.css';

export const Transactions = ({transactions}) => {
   
    
    if(transactions !== undefined)
    {
    if (transactions.length === 0) {
        return(
            <div className="container">
                <h4>No Transactions for the date range provided</h4>
                </div>)
    }
   
    function calculaterewards(amt){
        if (amt >= 50 && amt < 100)
            return amt-50;
        else if(amt >100)
            return (2* (amt-100)+ 50)
        else
            return 0;
    }
      

    const TransactionRow = (transaction,index) => {

        return(
              <tr key = {index} className={index%2 === 0?'odd':'even'}>
                  <td>{index + 1}</td>
                  <td>{transaction.customerID}</td>
                  <td>{transaction.billamt}</td>
                  <td>{transaction.transdate}</td>
                  <td>{ calculaterewards(transaction.billamt)}</td>
              </tr>
          )
    }

   
    const RewardsRowMonthwise = (transaction,index) => {

        return(
              <tr key = {index} className={index%2 === 0?'odd':'even'}>
                 
                  <td>{transaction.customerID}</td>
                  <td>{transaction.Date}</td>
                  <td>{transaction.Totalrewards}</td>                
                  
              </tr>
          )
    }

    const CustomerTotalrewards = (transaction,index) => {

        return(
              <tr key = {index} className={index%2 === 0?'odd':'even'}>
                 
                  <td>{transaction.customerID}</td>                  
                  <td>{transaction.CustTotalrewards}</td>                 
                  
              </tr>
          )
    }

    const userTable = transactions.map((transaction,index) => TransactionRow(transaction,index))
   
    const rewardsresultMonthwise = transactions.reduce((res, curr) => {
        
        const date = new Date(curr.transdate).toLocaleString('en-EN',{month:'long'});
        const key = `${curr.customerID}_${date}`;
        res[key] = res[key] || {
            customerID: curr.customerID,
          Date: date,
          Totalrewards: "0"
        };
        
        res[key].Totalrewards = (+res[key].Totalrewards + +calculaterewards(curr.billamt)) + '';
        return res;
      }, {});

      const CustomertotalRewards = transactions.reduce((res, curr) => {
        
        
        const key = `${curr.customerID}`;
        res[key] = res[key] || {
            customerID: curr.customerID,         
            CustTotalrewards: "0"
        };
        
        res[key].CustTotalrewards = (+res[key].CustTotalrewards + +calculaterewards(curr.billamt)) + '';
        return res;
      }, {});
      
      // print only values
      //console.log(Object.values(rewardsresultMonthwise));
      const totalRewardsMonthwise = Object.values(rewardsresultMonthwise).map((transaction,index) => RewardsRowMonthwise(transaction,index))

      //console.log(Object.values(CustomertotalRewards));
      const TotalRewardsTable = Object.values(CustomertotalRewards).map((transaction,index) => CustomerTotalrewards(transaction,index))


    return(
        <div className="container">
            <h4>All Transactions </h4>
            <table data-testid="tsttblAlltransaction" className="tblAlltransaction">
                <thead>
                <tr>
                    <th>Trasaction</th>
                    <th>Customer ID</th>
                    <th>Bill Amount</th>
                    <th>Date</th>
                    <th>Rewards</th>
                </tr>
                </thead>
                <tbody>
                {userTable}
                </tbody>
            </table>
            <h4>Customer Rewards Monthwise </h4>
            <table className="tblmonthwise">
                <thead>
                <tr>
                   
                    <th>Customer ID</th>
                    <th>Month</th>                    
                    <th>Total Rewards</th>
                </tr>
                </thead>
                <tbody>
                {totalRewardsMonthwise}
                </tbody>
            </table>
            <h4>Customer Total rewards </h4>
            <table className="tbltotal">
                <thead>
                <tr>                   
                    <th>Customer ID</th>                                      
                    <th>Total Rewards</th>
                </tr>
                </thead>
                <tbody>
                {TotalRewardsTable}
                </tbody>
            </table>
        </div>
    )
    }
    else
    {
        return(
        <div data-testid="Emptytbl" className="container">
            <h4>select date range to fetch the transactions</h4>
            </div>)
    }
}