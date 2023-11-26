import {useState,useContext} from 'react'
import {DataContext} from "../Context"
import {socketIO} from "../App"

export default function SendEventMessage(){

    const [chat, setChat] = useState('');
    const { activeUser, eventRoom, FetchEventMessages
       } = useContext(DataContext)

     


       const sendMessage= async () => {
      
        try {
          const response = await fetch(`${import.meta.env.VITE_SERVER}chat/eventmessage`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ chat, eventRoom }),
            credentials: 'include', // Include credentials in the request
          });
      
          if (response.status === 200) {
            // Successfully submitted the message to the server, now send via socket.io
            const __createdtime__ = Date.now();
            socketIO.emit('send_message', { activeUser, eventRoom, chat, __createdtime__ });
            setChat('');
            await FetchEventMessages();
          } else {
            // Error submitting the message to the server, handle the error response
            const errorData = await response.json();
            alert(errorData.message);
            console.error('Error submitting message:', errorData.message);
          }
        } catch (error) {
          console.error('Error submitting message:', error.message);
        }
      };

    return(
        <div className="flex flex-row items-center justify-center p-4">
        <input type="text" 
          onChange={(e) => setChat(e.target.value)}
          value={chat}  placeholder="Type here" name = "message" className="input input-bordered input-success w-full max-w-xs" />
        <button onClick={sendMessage} className="btn glass mx-4">Send</button>
        </div>
    )
}