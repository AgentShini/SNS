
import { Sidebar, DarkThemeToggle, Flowbite, Avatar  } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HiLogout,
  HiLogin,
  HiChatAlt,
  HiOutlineUserAdd,
  HiOutlineMinusSm,
  HiOutlinePlusSm,
  HiSpeakerphone,
  HiUser,
  HiUserGroup
} from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';

export default function SideNav(){
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/chat/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.status === 200) {
        alert("Logged Out")
        navigate(`/`)
    } else {
      
        const errorData = await response.json();
        alert(errorData.message)
        console.error('Error:', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
    return (
        <Flowbite>
        <Sidebar aria-label="Sidebar with multi-level dropdown example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
             
              <Sidebar.Collapse
                icon={HiUserGroup}
                label="Groups"
                renderChevronIcon={(theme, open) => {
                  const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;
    
                  return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />;
                }}
              >
                <Sidebar.Item >
                <Link to = "/createGroup">
                Create Group
                </Link>
                </Sidebar.Item>

                <Sidebar.Item>
                <Link to = "/Groups">
                 Groups
                </Link>
                </Sidebar.Item>
                
              </Sidebar.Collapse>

              <Sidebar.Collapse
                icon={HiSpeakerphone}
                label="Events"
                renderChevronIcon={(theme, open) => {
                  const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;
    
                  return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />;
                }}
              >
                <Sidebar.Item >
                <Link to = "/createEvent">
                Create Event
                </Link>
                </Sidebar.Item>
              
                <Sidebar.Item>
                <Link to = "/Events">
                Events
                </Link>
                </Sidebar.Item>
              </Sidebar.Collapse>

              <Sidebar.Collapse

                icon= {HiChatAlt}
                label="Messages"
                renderChevronIcon={(theme, open) => {
                  const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;
    
                  return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />;
                }}
              >
                <Sidebar.Item>
                <Avatar img="https://www.flowbite-react.com/images/people/profile-picture-5.jpg" rounded>
              <div className="space-y-1 font-medium dark:text-white"  style ={{pointer:"cursor"}}>
                <div>Elon Musk </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Hey there....!!</div>
              </div>
            </Avatar>
              </Sidebar.Item>
    
                
              </Sidebar.Collapse>


            
              <Sidebar.Item icon={HiLogin}>
              <Link to = "/login">
                Login
                </Link>
              </Sidebar.Item>
              <Sidebar.Item icon={HiOutlineUserAdd}>
              <Link to = "/signup">
                Signup
                </Link>
              </Sidebar.Item>


              <Sidebar.Item icon={HiUser}>
              <Link to = "/">
                Friends
                </Link>
              </Sidebar.Item>
             
              <Sidebar.Item icon={HiLogout}>
              <button onClick={handleSubmit} >
                Log out
                </button>
              </Sidebar.Item>

            <DarkThemeToggle />

            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
        </Flowbite>
      );
    }