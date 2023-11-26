import {useContext} from "react";
import { useNavigate } from 'react-router-dom';
import {DataContext} from "../Context"
import {socketIO} from "../App"
import axios from "axios"



export default function GroupsIn(){

const navigate = useNavigate();


const { activeUser,groupRoom, setGroupRoom, groupUsersMap, setGroupUsersMap, groups } = useContext(DataContext)

const updateRoomID = async (access_code)=>{
  
  setGroupRoom(access_code)
  socketIO.emit('join_group', { activeUser, groupRoom });
}
const addUsersToGroup = async (groupRoom, activeUser) => {
  updateRoomID(groupRoom);

  try {
    // Check if the activeUser is already in the specified groupRoom
    if (!(groupUsersMap[groupRoom] || []).includes(activeUser)) {
      setGroupUsersMap((prevMap) => {
        // Create a new object with the existing mapping
        const newMap = { ...prevMap };

        // Add or update the array of users for the specified group
        newMap[groupRoom] = [...(newMap[groupRoom] || []), activeUser];
        return newMap;
      });
    } 

    const response = await axios.get(`${import.meta.env.VITE_SERVER}chat/group_member?access_code=${encodeURIComponent(groupRoom)}&username=${encodeURIComponent(activeUser)}`);
    if (response.status == 200) {
      navigate(`/GroupChat`);
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
      const response = await fetch(`${import.meta.env.VITE_SERVER}chat/joinGroup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_code:updatedAccessCode  }),
        credentials: 'include',
      });

      if (response.status === 200) {
        addUsersToGroup(updatedAccessCode,activeUser)
        alert("SUCCESS")
    } else {
      
        const errorData = await response.json();
        alert(errorData.message)
        console.error('Group Joining Error:', errorData.message);
      }
    } catch (error) {
      console.error('Group Joining Error:', error.message);
    }
  };



    return(
      <div style={{overflow:"scroll"}}>
        {groups.length !== 0 ?(
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Group Name</th>
            {/* <th>Date Created</th> */}
            <th></th>
          </tr>
        </thead>
        <tbody>
         { groups.map((groups,index)=>(
          <tr key={index}>
            <td>
              <div className="flex items-center space-x-3">
            
                <div>
                  <div className="font-bold">{groups.name}</div>
                </div>
              </div>
            </td>
            {/* <td>
              {formatDate(groups.creation_date)}
              <br/>
            </td> */}
            {/* <th>
            <div className="font-bold">{groups.access_code}</div>
            </th> */}
            <th>
              <button onClick={handleSubmit} value = {groups.access_code} className="btn btn-ghost btn-xs">Join Group</button>
            </th>
            <th>
              <button value = {groups.access_code}   onClick={() => addUsersToGroup(groups.access_code, activeUser)}  className="btn btn-ghost btn-xs">Chat Group</button>
            </th>
          </tr>
            ))}
        </tbody>
      
        
      </table>
):( <div className="flex justify-center items-center h-full">
<img
  src="https://freesvg.org/img/1489440855.png"
  alt="Placeholder Image"
  className="w-60 h-60"
/>
        
</div>)}
    </div>
    )

}
