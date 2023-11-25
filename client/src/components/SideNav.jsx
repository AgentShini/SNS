import { useEffect, useState } from "react";
import { useRef } from "react";
import SubMenu from "../components/Submenu";
import MyMenu from "../components/MyMenu"
import { motion } from "framer-motion";


import { IoIosArrowBack } from "react-icons/io";
import{ HiUserGroup,HiLogout, HiLogin,  HiSpeakerphone, HiUser} from 'react-icons/hi';
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { Link, useNavigate , useLocation } from "react-router-dom";
import { useContext } from 'react';
import { DataContext } from '../Context';
import dotenv from 'dotenv';
dotenv.config();


const SideNav = () => {
  const SERVER = process.env.SERVER

  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();


  const {activeUserState,SetUsername,SetUsernameState, setReceiver,setReceiverID,activeUser,
     setRoom, UsersFriendsMap} = useContext(DataContext)

  const navigate = useNavigate()

  const retrievedArray = UsersFriendsMap[activeUser] || [];


  const handleSubmit = async (e) => {
    try {
      const response = await fetch(`${SERVER}/chat/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.status === 200) {
        const storedUserString = localStorage.getItem('userSession');

if (storedUserString) {
  localStorage.removeItem('userSession')
} 
        SetUsername("")
        SetUsernameState()
        setReceiver("")
        setRoom("")
        setReceiverID("")
        navigate(`/`)
         alert("Goodbye")
    } else {
      
        const errorData = await response.json();
        alert(errorData.message)
        console.error('Error:', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  const subMenusList = [
    {
      name: "Groups",
      icon: HiUserGroup,
      menus: ["createGroup", "Groups"],
    },
   
    {
      name: "Events",
      icon: HiSpeakerphone,
      menus: ["createEvent", "Events"],
    },
   
  ];


  const myMenusList = [
  
    {
      name: "Friends",
      icon: HiUserGroup,
      menus:retrievedArray
    },
  ];

  const subMenusListInactive = [
    {
      name: "Groups",
      icon: HiUserGroup,
    },
    {
      name: "Events",
      icon: HiSpeakerphone,
    },
  ];

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-white text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] 
            overflow-hidden md:relative fixed
         h-screen "
      >
        <div className="flex items-center gap-2.5">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            width={45}
            alt=""
          />
          <span className="text-xl whitespace-pre">Chatify</span>
        </div>

        <div className="flex flex-col  h-full">
        { activeUserState ?(
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%]">
            <li>
              <Link to={"/"} className="link">
              <HiUser size={23} className="min-w-max" />
              Users
              </Link>
            </li>
        

            {(open || isTabletMid) && (
              <div className="border-y py-5 border-slate-300 ">
                <small className="pl-3 text-slate-500 inline-block mb-2">
                  Communities
                </small>
                {subMenusList?.map((menu) => (
                  <div key={menu.name} className="flex flex-col gap-1">
                    <SubMenu data={menu} />
                  </div>
                ))}
              </div>
            )}


{(open || isTabletMid) && (
              <div>
                <small className="pl-3 text-slate-500 inline-block mb-2">
                  My Community
                </small>
                {myMenusList?.map((menu) => (
                  <div key={menu.name} className="flex flex-col gap-1">
              <MyMenu data= {menu}/>

                  </div>
                ))}
              </div>
            )}
              <li>
              <div className="link">
                <HiLogout size={23} className="min-w-max" />
                <button onClick={handleSubmit} >
                    Log out
                    </button>
              </div>
            </li>
          </ul>
          ) 
          
          //Logged Out
          :(
            <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%]">
            <li>
              <Link to={"/"} className="link">
              <HiUser size={23} className="min-w-max" />
              Friends
              </Link>
            </li>
            <li>
              <Link to={"/login"} className="link">
                <HiLogin size={23} className="min-w-max" />
                Login
              </Link>
            </li>
            <li>
              <Link to={"/signup"} className="link">
                <HiLogin size={23} className="min-w-max" />
                Signup
              </Link>
            </li>

            {(open || isTabletMid) && (
              <div className="border-y py-5 border-slate-300 ">
                <small className="pl-3 text-slate-500 inline-block mb-2">
                  Communities
                </small>
                {subMenusListInactive?.map((menu) => (
                  <div key={menu.name} className="flex flex-col gap-1">
                  <Link to={`/${menu.name}`} className="link">
                    <SubMenu data={menu} />
                    </Link>
                  </div>
                ))}
              </div>
            )}

          
              <li>
           
            </li>
          </ul>

          )
                }
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default SideNav;