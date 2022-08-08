
export async function getAllTransactions(stdate,enddate) {

    try{
       
        const endpoint = 'http://localhost:8005/apicall/transactions?stdate='+ stdate +'&enddate='+ enddate;
        console.log('end point is ' + endpoint);
        const response = await fetch(endpoint);
        return await response.json();
               
    }catch(error) {
        return [];
    }
    
}

