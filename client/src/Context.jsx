import { createContext, useEffect, useState } from "react";
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
    const [activeUserState, setActiveUserState] = useState(false)
    const [socket, setSocket] = useState("");
    const [room, setRoom] = useState("");
    const [receiver, setReceiver] = useState("");
    const [messagesReceived, setMessagesReceived] = useState([]);
    const [receiverID, setReceiverID] = useState("")





    


  
    const SetUsername=(username)=>{
      setActiveUser(username)
    }



    const SetUsernameState=()=>{
      setActiveUserState(!activeUserState)
    }

  
  
  
    const FetchAllUsers =async()=>{
        if(users.length === 0){
            try {
        await axios.get('http://localhost:5000/chat/usernames')
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
    await axios.get('http://localhost:5000/chat/groups')
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
await axios.get('http://localhost:5000/chat/events')
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
        axios.get('http://localhost:5000/chat/usernames')
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


   const FetchRoomMessages = async()=>{
    if (room !== ""){
    try {
      const roomID = room
      await axios.get(`http://localhost:5000/chat/room_messages?roomID=${encodeURIComponent(roomID)}`)
      .then((response) => {
        setMessagesReceived(response.data)

      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  } catch (error) {
      console.log(error.response)
      
  }
  }
  }   

  
  useEffect(() => {
    FetchRoomMessages();
  }, [room]);


      useEffect(() => {
        FetchAllUsers();
        FetchGroups();
        FetchEvents();
         },[]);

   console.log("ROom is",room)
   console.log("Messages are",messagesReceived)


    return(
        <DataContext.Provider value={{users,FetchAllUsers,setUsers,
            activeDropdowns, setActiveDropdowns, SearchData, SetSearch, SearchResult,
            toggleDropdown,FetchUsers,Refresh,groups,events, FetchGroups, FetchEvents,
             SetSearchResult, SetUsername, SetUsernameState, activeUserState, activeUser, setRoom, room,
              socket, setSocket,receiver, setReceiver,messagesReceived, setMessagesReceived
              ,receiverID, setReceiverID, FetchRoomMessages

            }}>
            {children}
        </DataContext.Provider>
    )
}

export {DataContext,DataContextProvider}