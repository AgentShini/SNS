import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {DataContext} from "../Context"


const MyMenu = ({ data }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(false);


  const { setRoom} = useContext(DataContext)

  const updateRoomID = (e)=>{
    setRoom(e.target.value)
    navigate(`/Chat`)
  } 
  return (
    <>
      <li
        className={`link ${pathname.includes(data.name) && "text-blue-600"}`}
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        <data.icon size={23} className="min-w-max" />
        <p className="flex-1 capitalize">{data.name}</p>
        <IoIosArrowDown
          className={` ${subMenuOpen && "rotate-180"} duration-200 `}
        />
      </li>
      <motion.ul
        animate={
          subMenuOpen
            ? {
                height: "fit-content",
              }
            : {
                height: 0,
              }
        }
        className="flex h-0 flex-col pl-14 text-[0.8rem] font-normal overflow-hidden"
      >
       {data.menus?.map((menu, index) => (
        <li key={index} className="mb-2">
          <button
            onClick={(e) => {
              updateRoomID(e);
            }}
            value={menu}
            className="bg-gray-500 text-white rounded-full p-2 hover:bg-blue-600 hover:font-medium"
          >
            {menu}
          </button>
        </li>
      ))}
      </motion.ul>
    </>
  );
};

export default MyMenu;