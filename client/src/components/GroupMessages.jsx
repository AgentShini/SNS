import SendGroupMessage from "./SendGroupMessages"
import { useEffect, useRef, useContext } from 'react';
import {socketIO} from "../App"
import {DataContext} from "../Context"


export default function GroupMessages(){
   const {groupmessagesReceived, setGroupMessagesReceived, activeUser} = useContext(DataContext)

   const messagesContainerRef = useRef(null);

   useEffect(() => {
    // Scroll to the bottom when messages change
    scrollToBottom();
  }, [groupmessagesReceived]);

  useEffect(() => {
    // Scroll to the bottom when the component mounts
    scrollToBottom();
  }, []);


  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  };
 
 useEffect(() => {
  socketIO.on('receive_message', (data) => {
    console.log(data);
    setGroupMessagesReceived((state) => [
      ...state,
      {
        message: data.message,
        username: data.username,
        __createdtime__: data.__createdtime__,
      },
    ]);
  });

// Remove event listener on component unmount
  return () => socketIO.off('receive_message');
}, [socketIO]);
  





    function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
 console.log("CHatss",groupmessagesReceived)


    return(
      <div ref={messagesContainerRef} className="row-span-2 col-span-4 overflow-auto">
  {groupmessagesReceived.length === 0 ? (
     // Display placeholder image when messagesReceived is empty
     <div> <div className="flex justify-center items-center h-full">
     <img
       src="https://freesvg.org/img/1489440855.png"
       alt="Placeholder Image"
       className="w-60 h-60"
     />
                

   </div>
   <SendGroupMessage/>
   
   </div>
  ) : (
    // Render messages when messagesReceived is not empty
    <div className="chat-grid">
      {groupmessagesReceived.map((msg, i) => (
        <div
          className={`chat chat-start ${msg.sender_username === activeUser ? 'right' : 'left'}`}
          key={i}
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src="https://freesvg.org/img/carita-ale-riendo.png" alt="avatar" />
            </div>
          </div>
          <div className="chat-content">
            <div className="chat-header">
              {msg.sender_username}
              <span className="text-xs opacity-50 p-2">{formatDateFromTimestamp(msg.date_sent)}</span>
            </div>
            <div className="chat-bubble">{msg.message}</div>
            <div className="chat-footer opacity-50">
              Delivered
            </div>
          </div>
        </div>
      ))}
      <SendGroupMessage />
    </div>
  )}

</div>

        
    )
}





