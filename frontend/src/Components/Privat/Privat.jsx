import { Navigate } from "react-router-dom";



const Privat = ({children}) => {

    const Atoken = localStorage.getItem('Access token');


  

     if(Atoken === null ){
        return <Navigate state={location.pathname} to = {'/signin'}></Navigate>;
     }

     if(Atoken){
        return children;
     }

    return (
        <div>
            
        </div>
    );
};

export default Privat;