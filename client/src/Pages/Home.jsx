import SideNav from "../components/SideNav"
import Users from "../components/Users";

export default function Home(){
    return(
        <div style={{ height: '100vh',width:'100vw' }} className="flex flex-row ">
        <SideNav/>
        <Users/>
        </div>
       

    )
}