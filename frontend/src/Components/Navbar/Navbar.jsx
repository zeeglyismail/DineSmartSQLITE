import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { ImSpoonKnife } from "react-icons/im";
import { FaUser } from "react-icons/fa";
import { BiSolidUserPin } from "react-icons/bi";
import Swal from "sweetalert2";
const base_api = import.meta.env.VITE_BACKEND_BASE_API;


const Navbar = () => {

const [userData , setUserData] = useState([]);


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

setUserData(data);

})


} ,[setUserData,Atoken]);


// To get the user name from data
let userName = "";

if(userData.length > 0) {
   userName = userData.map(item => item.name).join(", ");
}


const handleSignOut = () => {

   Swal.fire({
          title: "Alert!",
          text: "Are you sure you want to sign out",
          icon: "question",
          showDenyButton: true,
          confirmButtonText: "Yes",
          denyButtonText: `No`
           }).then((result) => {
 
  if (result.isConfirmed) {
      
    Swal.fire({ title: "Successful",
        text: "You are successfully sign out",
        icon: "success",
      confirmButtonText: "OK",}).then((result) => {
        if(result.isConfirmed) {
             localStorage.removeItem('Refresh token');
  localStorage.removeItem('Access token');

  location.reload();
        }
      });
      
  
  } else if (result.isDenied) {
    
  }
});;
 
}




    return (
        <div className="dark:text-black">
        <div className="drawer">
  <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col ">
    {/* Navbar */}
    <div className="navbar bgorg  mt-[5px] lg:w-[1500px] xl:w-[100%] h-[40px]">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
      </div>

      {/* this part is for the desktop  */}

     <Link to={"/"}><div className=" px-2 text-[25px] text-white font-semibold flex items-center gap-[10px] lg:ml-[50px]"><ImSpoonKnife></ImSpoonKnife>DineSmart</div></Link>
      <div className="hidden flex-none lg:block pl-[50%]">
        <ul className=" flex gap-[50px]">
          {/* Navbar menu content here */}
          <Link to={"/"}><li className="text-white text-[20px] focus:text-black" tabIndex={0}>Home</li></Link>
          <Link to={"/about"}><li className="text-white text-[20px] focus:text-black" tabIndex={1}>About</li></Link>
          {
            userData.length > 0 ? <div className="dropdown">
  <div tabIndex={0} role="button" className="text-white text-[20px] focus:text-black flex items-center gap-[10px]"><FaUser></FaUser> {userName}</div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <Link to={"/user/profile"}><h1 className="bg-white hover:bg-[#FF6440] py-[5px] pl-[10px] rounded-[8px] font-bold flex items-center gap-[5px]"><BiSolidUserPin className="text-black size-[20px]"></BiSolidUserPin>Profile</h1></Link>
    <li onClick={handleSignOut} className="bg-white hover:bg-[#FF6440] py-[5px] pl-[10px] rounded-[8px] font-bold">Sign Out</li> 
  </ul>
</div> : <div className="flex items-center gap-[30px]">
  
  <Link to={"/signin"}><li className="text-white text-[20px] focus:text-black" tabIndex={3}>Sign In</li></Link>


  <Link to={"/signup/active_account"}><li className="text-white text-[20px] focus:text-black" tabIndex={4}>Activate</li></Link>


</div>

          }
          <Link to={"/cart"}><li className="text-white text-[20px] focus:text-black flex items-center gap-[10px]" tabIndex={4}><TiShoppingCart className="size-[30px]"></TiShoppingCart>Cart</li></Link>
        </ul>
      </div>
    </div>
  
  </div>

  {/* this part is the drawer part for mobile and laptop   */}
  <div className="drawer-side">
    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bgorg  w-[200px] md:w-80 p-4 mt-[55px]">
      {/* Sidebar content here */}
      <Link to={"/"}><li className="text-[25px] text-white font-semibold focus:bg-black pl-[20px]" tabIndex={0}>Home</li></Link>
      <Link to={"/about"}><li className="text-[25px] text-white font-semibold mt-[10px] focus:bg-black pl-[20px]" tabIndex={1}>About</li></Link>

      {
            userData.length > 0 ? <div className="dropdown ">
  <div tabIndex={0} role="button" className="text-[25px] text-white font-semibold mt-[10px] focus:bg-black pl-[20px] flex items-center gap-[10px]"><FaUser></FaUser>{userName}</div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100  rounded-box  w-52 p-2 shadow ">
    <Link to={"/user/profile"}><h1 className="bg-white hover:bg-[#FF6440] py-[5px] pl-[10px] rounded-[8px] font-bold flex items-center gap-[5px]"><BiSolidUserPin className="text-black size-[20px]"></BiSolidUserPin>Profile</h1></Link>
    <li onClick={handleSignOut} className="bg-white hover:bg-[#FF6440] py-[5px] pl-[10px] rounded-[8px] font-bold ">Sign Out</li> 
  </ul>
</div> :<div>
   <Link to={"/signin"}><li className="text-[25px] text-white font-semibold focus:bg-black pl-[20px] mt-[10px]" tabIndex={3}>Sign In</li></Link> 

    <Link to={"/signup/active_account"}><li className="text-[25px] text-white font-semibold focus:bg-black pl-[20px] mt-[10px]" tabIndex={4}>Activate</li></Link> 
</div>


          }
      
      <Link to={"/cart"}><h1 className="text-[25px]  text-white font-semibold mt-[10px] focus:bg-black pl-[20px] flex items-center gap-[10px]" tabIndex={3}><TiShoppingCart className="size-[30px]"></TiShoppingCart> Cart</h1></Link>
    </ul>
  </div>
</div>
        </div>
    );
};

export default Navbar;


//  className="text-white text-[20px] focus:text-black"

{/* */}