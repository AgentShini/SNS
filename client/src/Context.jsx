import { createContext, useEffect, useState } from "react";
import axios from "axios"
const DataContext = createContext();
const DataContextProvider = ({children}) =>{
    const [users,setUsers] = useState([])



    useEffect(() => {
     
    axios.get('http://127.0.0.1:5000/chat/usernames')
    .then((response) => {
      setUsers(response.data);

    })
    .catch((error) => {
      console.error('Error fetching usernames:', error);
    });
      }, []);
      
    return(
        <DataContext.Provider value={{users}}>
            {children}
        </DataContext.Provider>
    )
}

export {DataContext,DataContextProvider}