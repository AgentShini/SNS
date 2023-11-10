import { Avatar } from 'flowbite-react';
export default function UserAvatar(){
    return (
      <div className = "px-6 py-8 mx-auto xl:h-screen lg:py-4 col-span-2">
           <Avatar img="https://www.flowbite-react.com/images/people/profile-picture-5.jpg" rounded>
          <div className="space-y-1 font-medium dark:text-white">
            <div>Elon Musk</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Last Message at 08-01-2023:10:11 PM</div>
          </div>
        </Avatar>
      </div>
     
      );
}