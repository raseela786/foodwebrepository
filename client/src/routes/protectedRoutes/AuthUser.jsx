import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
export const AuthUser = () => {
    //const [isUser,setIsUser]=useState(false); instad this saveuser updation
    const {isUserExist} =useSelector((state)=>state.user);
    console.log("ffffffffffff",isUserExist)
  const navigate =useNavigate();
  if(!isUserExist) navigate("/login"); 
  return isUserExist ? <Outlet/>:null;

  
}
