import {useContext} from "react";
import { useNavigate } from 'react-router-dom';
import {DataContext} from "../Context"
import {socketIO} from "../App"
import axios from "axios"


export default function MyGroups(){
const navigate = useNavigate();


const { activeUser,groupRoom, setGroupRoom, groupUsersMap, setGroupUsersMap, myGroups } = useContext(DataContext)
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
    } else {
      console.log(`${activeUser} already exists in group ${groupRoom}`);
    }

    const response = await axios.get(`http://localhost:5000/chat/group_member?access_code=${encodeURIComponent(groupRoom)}&username=${encodeURIComponent(activeUser)}`);
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







    return(
      
      <div style={{overflow:"scroll"}}>
        {myGroups.length !== 0 ?(
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Creator Name</th>
            <th>Access Code</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
         { myGroups.map((groups,index)=>(
          <tr key={index}>
            <td>
              <div className="flex items-center space-x-3">
                <div>
                  <div className="font-bold">{groups.name}</div>
                </div>                
              </div>
            </td>


            <td>
              <div className="flex items-center space-x-3">
                <div>
                  <div className="font-bold">{groups.creator_name}</div>
                </div>                
              </div>
            </td>


            <td>
              <div className="flex items-center space-x-3">
                <div>
                  <div className="font-bold">{groups.access_code}</div>
                </div>                
              </div>
            </td>


            <th>
              <button value = {groups.access_code}   onClick={() => addUsersToGroup(groups.access_code, activeUser)}  className="btn btn-ghost btn-xs">Chat Group</button>
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
