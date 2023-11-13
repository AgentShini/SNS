
import { Sidebar, DarkThemeToggle, Flowbite, Avatar  } from 'flowbite-react';
import { Link } from 'react-router-dom';
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiOutlineMinusSm,
  HiOutlinePlusSm,
  HiShoppingBag,
  HiTable,
  HiUser
} from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';

export default function SideNav(){
    return (
        <Flowbite>
        <Sidebar aria-label="Sidebar with multi-level dropdown example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item icon={HiChartPie}>
                <Link to = "/profile">
                Profile
                </Link>
              </Sidebar.Item>
              <Sidebar.Collapse
                icon={HiShoppingBag}
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
                icon={HiShoppingBag}
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

                icon= {HiInbox}
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


            
              <Sidebar.Item icon={HiArrowSmRight}>
              <Link to = "/login">
                Login
                </Link>
              </Sidebar.Item>
              <Sidebar.Item icon={HiTable}>
              <Link to = "/signup">
                Signup
                </Link>
              </Sidebar.Item>


              <Sidebar.Item icon={HiUser}>
              <Link to = "/">
                Friends
                </Link>
              </Sidebar.Item>
              <Sidebar.Item icon={HiTable}>
              <Link to = "/signup">
                Signup
                </Link>
              </Sidebar.Item>

            <DarkThemeToggle />

            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
        </Flowbite>
      );
    }