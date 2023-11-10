
import { Sidebar,DarkThemeToggle, Flowbite  } from 'flowbite-react';
import { Link } from 'react-router-dom';
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiOutlineMinusSm,
  HiOutlinePlusSm,
  HiShoppingBag,
  HiTable,
  HiUser,
} from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';

export default function SideNav(){
    return (
        <Flowbite>
        <Sidebar aria-label="Sidebar with multi-level dropdown example" >
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
                <Link to = "/joinGroup">
                Join Group
                </Link>
                </Sidebar.Item>
                <Sidebar.Item>
                <Link to = "/leaveGroup">
                Leave Group
                </Link>
                </Sidebar.Item>
                <Sidebar.Item >
                <Link to = "/deleteGroup">
                Create Group
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
                <Link to = "/joinEvent">
                Join Event
                </Link>
                </Sidebar.Item>
                <Sidebar.Item>
                <Link to = "/leaveEvent">
                Leave Event
                </Link>
                </Sidebar.Item>
                <Sidebar.Item >
                <Link to = "/deleteEvent">
                Create Event
                </Link>
                </Sidebar.Item>
              </Sidebar.Collapse>


              <Sidebar.Item  icon={HiInbox}>
              <Link to = "/messages">
               Messages
                </Link>
              </Sidebar.Item>
              <Sidebar.Item icon={HiUser}>
              <Link to = "/friends">
                Friends
                </Link>
              </Sidebar.Item>
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

            <DarkThemeToggle />

            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
        </Flowbite>
      );
    }