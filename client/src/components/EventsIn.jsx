import {useContext} from "react";
import { useNavigate } from 'react-router-dom';
import {DataContext} from "../Context"
import {socketIO} from "../App"
import axios from "axios"
require("dotenv").config()
export default function EventsIn(){
  const SERVER = process.env.SERVER

  const navigate = useNavigate();

const { activeUser,eventRoom, setEventRoom, eventUsersMap, setEventUsersMap, events } = useContext(DataContext)

const updateRoomID = async (access_code)=>{
  
  setEventRoom(access_code)
  socketIO.emit('join_event', { activeUser, eventRoom });
}

const addUsersToEvent = async (eventRoom, activeUser) => {
  updateRoomID(eventRoom);

  try {
    // Check if the activeUser is already in the specified groupRoom
    if (!(eventUsersMap[eventRoom] || []).includes(activeUser)) {
      setEventUsersMap((prevMap) => {
        // Create a new object with the existing mapping
        const newMap = { ...prevMap };

        // Add or update the array of users for the specified group
        newMap[eventRoom] = [...(newMap[eventRoom] || []), activeUser];
        return newMap;
      });
    } 
    

    const response = await axios.get(`${SERVER}/chat/event_member?access_code=${encodeURIComponent(eventRoom)}&username=${encodeURIComponent(activeUser)}`);
    if (response.status == 200) {
      navigate(`/EventChat`);
    }
    if(response.status === 201){
      alert("Not a member")
    }
  } catch (error) {
    alert(error.data);
  }
}


 
  function formatDate(dateString) {
    const rawDate = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    };
    return rawDate.toLocaleDateString('en-US', options);
  }





  const handleSubmit = async (e) => {
    const updatedAccessCode = e.target.value;


    try {
      const response = await fetch(`${SERVER}/chat/joinEvent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_code:updatedAccessCode }),
        credentials: 'include',
      });

      if (response.status === 200) {
        alert("SUCCESS")
    } else {
      
        const errorData = await response.json();
        alert(errorData.message)
        console.error('Event Joining Error:', errorData.message);
      }
    } catch (error) {
      console.error('Event Joining Error:', error.message);
    }
  };

    return(
      <div style={{overflow:"scroll"}}>
        {events.length !== 0 ?(
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Event Name</th>
            {/* <th>Date Created</th> */}
            <th>Start Date</th>
            <th>End Date</th>

            <th></th>
          </tr>
        </thead>
        <tbody>
         { events.map((events,index)=>(
          <tr key={index}>
          <td>
              <div className="flex items-center space-x-3">
            
                <div>
                  <div className="font-bold">{events.name}</div>
                </div>
              </div>
            </td>
            {/* <td>
              {formatDate(events.creation_date)}
              <br/>
            </td> */}
            <th>
            <div className="font-bold">{formatDate(events.start_date)}</div>
            </th>

            <th>
            <div className="font-bold">{formatDate(events.end_date)}</div>
            </th>

            {/* <th>
            <div className="font-bold">{events.access_code}</div>
            </th> */}
            <th>
              <button onClick={handleSubmit} value = {events.access_code} className="btn btn-ghost btn-xs">Join Event </button>
            </th>
            <th>
            <button value = {events.access_code}   onClick={() => addUsersToEvent(events.access_code, activeUser)}  className="btn btn-ghost btn-xs">Chat Event</button>
            </th>
          </tr>
            ))}
        </tbody>
      
        
      </table>
):(
  <div className="flex justify-center items-center h-full">
  <img
    src="https://freesvg.org/img/1489440855.png"
    alt="Placeholder Image"
    className="w-60 h-60"
  />
          
</div>
)}
    </div>
    )

}
