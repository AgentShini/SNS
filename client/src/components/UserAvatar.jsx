import { Avatar } from 'flowbite-react';
import { useContext } from 'react';
import { DataContext } from '../Context';
export default function UserAvatar(){
  const {activeUser,activeUserState} = useContext(DataContext)
  const date = new Date()
  

    return (
      <div className = "px-6 py-8 mx-auto xl:h-screen lg:py-4 col-span-2">
        {
          activeUserState ?(
           <Avatar img="https://freesvg.org/img/carita-ale-riendo.png" rounded>
          <div className="space-y-1 font-medium dark:text-white">
            <div>{activeUser}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Online @ {date.toUTCString()}</div>
          </div>
        </Avatar>
          ):(
            <Avatar img="https://freesvg.org/img/carita-ale-enojado.png" rounded>
            <div className="space-y-1 font-medium dark:text-white">
              <div>NOT LOGGED IN</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{date.toUTCString()}</div>
            </div>
          </Avatar>
          )
}
      </div>
     
      );
}