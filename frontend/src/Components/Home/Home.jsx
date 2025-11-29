import { useEffect, useState } from "react";
import image1 from "../Image/DineIn.png";
import image3 from "../Image/HomeDelivery.png";
import image2 from "../Image/TakeAway.png";
import Banner from "./Banner/Banner";
import HowItWork from "./How it Work/HowItWork";
import ReadyToStart from "./Ready to start/ReadyToStart";
import WhyChoose from "./Why Choose/WhyChoose";
import { Link } from "react-router-dom";
const base_api = import.meta.env.VITE_BACKEND_BASE_API;


const Home = () => {

     const [userData , setUserData] = useState({});
        
        
         const Atoken = localStorage.getItem('Access token');
          const Rtoken = localStorage.getItem('Refresh token');
        
          const token = {Access : Atoken,refresh : Rtoken};
        
        
          //use it to get the user data 
        useEffect( () => {
        
          fetch(`${base_api}/api/customer/profile/`,{
            method:"GET",
            credentials: "include",
            headers: {
                "content-type":"application/json",
                "Authorization": `Bearer ${Atoken}`,
            },
            
        })
        .then(res => res.json())
        .then(data => {
    
        setUserData(data.find(item => item));
        
        })
        
        
        } ,[setUserData,Atoken]);


    
    return (
        <div>
            <Banner></Banner>
            <h1 className="text-[30px] font-bold text-center mt-[70px] text-black dark:text-black">Choose Your Order Type</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 w-[80%] mx-auto gap-[30px] mt-[40px]">
                 <Link to={"/table"}><div>
                    <img className="h-[250px] w-[300px] mx-auto border-[2px] border-black rounded-[15px]" src={image1} alt="" />

                    <h1 className="text-[30px] font-semibold text-center mt-[20px] text-black dark:text-black">Dine In</h1>
                 </div></Link>

                 <Link to={"/TAmenu"}><div>
                    <img className="h-[250px] w-[300px] mx-auto border-[2px] border-black rounded-[15px]" src={image2} alt="" />

                    <h1 className="text-[30px] font-semibold text-center mt-[20px] text-black dark:text-black">Take Away</h1>

                 </div></Link>

                 <Link to={"/DEmenu"}><div>
                    <img className="h-[250px] w-[300px] mx-auto border-[2px] border-black rounded-[15px]" src={image3} alt="" />

                    <h1 className="text-[30px] font-semibold text-center mt-[20px] text-black dark:text-black">Delivery</h1>
                 </div></Link>

                 
            </div>

            <WhyChoose></WhyChoose>
            <HowItWork></HowItWork>
            {
                Object.keys(userData).length === 0? <ReadyToStart></ReadyToStart> : ""
            }
        </div>
    );
};

export default Home;