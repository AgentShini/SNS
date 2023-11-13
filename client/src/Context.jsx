import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
const DataContext = createContext();
const DataContextProvider = ({children}) =>{
    const [users,setUsers] = useState([])
    const [groups,setGroups] = useState([])
    const [events,setEvents] = useState([])
    const [activeDropdowns, setActiveDropdowns] = useState({});
    const [SearchData,SetSearch] = useState('')
    const [SearchResult,SetSearchResult] = useState([])
    const [activeUser, setActiveUser] = useState("")


    
  
      const FetchAllUsers =async()=>{
        if(users.length === 0){
            try {
        await axios.get('http://127.0.0.1:5000/chat/usernames')
        .then((response) => {
          setUsers(response.data);
            SetSearchResult(response.data)
        })
        .catch((error) => {
          console.error('Error fetching usernames:', error);
        });
    } catch (error) {
        console.log(error.response)
        
    }
}
      }


      const FetchGroups =async()=>{
        try {
    await axios.get('http://127.0.0.1:5000/chat/groups')
    .then((response) => {
      setGroups(response.data);
    })
    .catch((error) => {
      console.error('Error fetching groups:', error);
    });
} catch (error) {
    console.log(error.response)
    
}
}

const FetchEvents =async ()=>{
  try {
await axios.get('http://127.0.0.1:5000/chat/events')
.then((response) => {
setEvents(response.data);
})
.catch((error) => {
console.error('Error fetching events:', error);
});
} catch (error) {
console.log(error.response)

}
}


      

      const Refresh =()=>{
            try {
        axios.get('http://127.0.0.1:5000/chat/usernames')
        .then((response) => {
          setUsers(response.data);
            SetSearchResult(response.data)
        })
        .catch((error) => {
          console.error('Error fetching usernames:', error);
        });
    } catch (error) {
        console.log(error.response)
        
    }
}

    const FetchUsers= async(e) =>{
        const username = e.target.value;
        console.log(username)
        SetSearch(username)
        const data = users;
       console.log(username)
        const documents = data.filter((documents)=> documents.username.toLowerCase().includes(username));
        SetSearchResult(documents);
    }

      
  const toggleDropdown = (index) => {
    setActiveDropdowns((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
 



      useEffect(() => {
        FetchAllUsers();
        FetchGroups();
        FetchEvents();
         },[]);
   

    return(
        <DataContext.Provider value={{users,FetchAllUsers,setUsers,
            activeDropdowns, setActiveDropdowns, SearchData, SetSearch, SearchResult,
            toggleDropdown,FetchUsers,Refresh,groups,events,
             SetSearchResult}}>
            {children}
        </DataContext.Provider>
    )
}

export {DataContext,DataContextProvider}