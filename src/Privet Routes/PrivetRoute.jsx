import { useContext } from "react";
import { AuthContext } from "../Auth Provider/AuthProvider";
import PropTypes from 'prop-types';
import { Navigate, useNavigate } from "react-router-dom";
import OrderList from "../Components/OrderList";



const PrivetRoute = ({children}) => {
    const useNavi = useNavigate();
    const {user,loading}=useContext(AuthContext);
    if(loading){

        return(
            <div className="flex justify-center py-10">
                <span className="loading loading-spinner loading-lg w-9"></span>
            </div>
        )
    }

    if(user){
        return (
            children
            // <OrderList></OrderList>
        )
    }
    return <Navigate to={'/login'}></Navigate>
   
};

export default PrivetRoute;
PrivetRoute.propTypes = {
    children: PropTypes.node.isRequired,
  }