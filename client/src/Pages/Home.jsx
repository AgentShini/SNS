import SideNav from "../components/SideNav"
import Users from "../components/Users";

export default function Home(){
    return(
        <div style={{ height: '100vh',width:'100vw',overflow:"hidden"}} className="flex flex-row ">
        <SideNav/>
        <Users/>
        </div>
       

    )
}