import Header from "../components/mainlayout/Header"
import UserDetails from "../components/mainlayout/UserDetails"

const MainLayout = ()=>{

    return (
       <div className="mainLayout">
        <Header company={'Employee Management'}  />
        <UserDetails />
       
       </div>
    )
}

export default MainLayout