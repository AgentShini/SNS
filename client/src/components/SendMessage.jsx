import {useState,useContext} from 'react'
import {DataContext} from "../Context"
import {socketIO} from "../App"
export default function SendMessage(){
    const [message, setMessage] = useState('');
    const { activeUser, room, reciever_username
       } = useContext(DataContext)

       const sendMessage = () => {
        if (message !== '') {
          const __createdtime__ = Date.now();
          // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
          socketIO.emit('send_message', { activeUser, room, message, __createdtime__ });
          setMessage('');
          console.log("Sender username is",activeUser);
          console.log("Reciever username is",reciever_username)
        }
      };

    return(
        <div className="flex flex-row items-center justify-center p-4">
        <input type="text" 
          onChange={(e) => setMessage(e.target.value)}
          value={message}  placeholder="Type here" name = "message" className="input input-bordered input-success w-full max-w-xs" />
        <button onClick={sendMessage} className="btn glass mx-4">Send</button>
        </div>
    )
}