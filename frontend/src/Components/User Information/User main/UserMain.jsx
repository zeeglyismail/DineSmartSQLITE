
import { Link, Outlet, useLocation } from "react-router-dom";

const UserMain = () => {


    const lo = useLocation();

    const location = lo.pathname;





    return (
        <div className="mt-[20px] flex flex-col md:flex-row  w-[90%] mx-auto gap-[50px]">
            <div className=" w-full md:w-[220px] md:h-[530px] lg:h-[630px] border-2 border-[#FF6440] rounded-[20px]">

                <Link to={"/user/profile"}><h1 className={`text-[28px] font-semibold text-center border-b border-[#FF6440] ${location === "/user/profile" ? "text-black" : "org"}`} tabIndex={0}>Profile</h1></Link>


                   <Link to={"/user/save-meals"}><h1 className={`text-[28px] font-semibold text-center border-b border-[#FF6440] ${location === "/user/save-meals" ? "text-black" : "org"}`} tabIndex={2}>Save Meals</h1></Link>
               

                <Link to={"/user/my-offer"}><h1 className={`text-[28px] font-semibold text-center border-b border-[#FF6440] ${location === "/user/my-offer" ? "text-black" : "org"}`} tabIndex={2}>My Offers</h1></Link>

                <Link to={"/user/order-status"}><h1 className={`text-[28px] font-semibold text-center border-b border-[#FF6440] ${location === "/user/order-status" ? "text-black" : "org"}`} tabIndex={3}>Order Status</h1></Link>
          </div>

          <div className=" md:w-[90%]">
       

            <Outlet></Outlet>
          </div>
        </div>
    );
};

export default UserMain;