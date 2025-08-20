import { NavbarLaw } from "./Navbar";
import { Profile1 } from "./Profile1";
import { Profile2Props } from "./Profile2Props";
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";
import { baseBookURL } from "../axios";

export function Profile(){
    const navigate = useNavigate()
    function handleLogout(){
        localStorage.setItem('loggedin',false)
        navigate('/choose')
    }
    async function handleDelete(){
        const id = localStorage.getItem('lawyerProfile')
        console.log(id);
        
        try{
        const {data} = await baseBookURL.delete(`/lawyerProfile/deleteLawyerProfile/${id}`)
        if(data?.Success){
            alert(data?.Message)
            navigate('/choose')
        }
        else{
            alert('Some error occurred')
        }
    }
    catch(error){
        alert(error)
        navigate('/error')
    }
    }
    return(<div style={{width:"100vw"}}>
    <NavbarLaw/>
    <Profile1/>
    <Profile2Props/>
    <button onClick={handleLogout}>LOGOUT</button>
    <button onClick={handleDelete}>DELETE</button>
    <Footer/>
    </div>)
}