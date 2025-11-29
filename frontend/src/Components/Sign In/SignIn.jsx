import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
const base_api = import.meta.env.VITE_BACKEND_BASE_API;

const SignIn = () => {


  const navi = useNavigate();

 const handleLogin = e => {
        e.preventDefault();
        
        const email = e.target.email.value;
        const password = e.target.password.value;
    
        const signInInfo = { email, password};
  
       


        fetch(`${base_api}/api/auth/customer-login/`,{
          method:"POST",
          headers: {
              "content-type":"application/json"
          },
          body: JSON.stringify(signInInfo)
      })
      .then(res => res.json())
      .then(data => {

          localStorage.setItem('Access token', data.data.access_token);
          localStorage.setItem('Refresh token', data.data.refresh_token);

        console.log(data);

     if(data.message === "User not found.") {

         Swal.fire({
        title: "Error!",
        text: "This user are not founded",
        icon: "error"
         });
     }

 if (data.message === "Login successful.") {
  Swal.fire({
    title: "Successful",
    text: "You are successfully login",
    icon: "success",
    confirmButtonText: "OK"
  }).then((result) => {
    if (result.isConfirmed) {
      // This runs after clicking OK
      e.target.reset();
      navi("/"); // Navigate if needed
      window.location.reload(); // Refresh the page
    }
  });
}
            
      })
 

     
      
      }


      const [seen , setSeen] = useState("password");

    return (
        <div className="dark:text-black">
            {/* Text part */}
            <h1 className="text-[30px] mt-[80px] font-bold text-center">Log In / Sign Up</h1>

              
              {/* From part start */}

              <div>
                <form onSubmit={handleLogin} action="" className="border-2 border-[#FF6440] w-[90%] md:w-[50%] lg:w-[32%] mx-auto py-[10px] pl-[20px] pb-[30px] rounded-[10px] mt-[40px] mb-[40px] shadow-[0_0_15px_rgba(0,0,0,0.4)]">

                    <h1 className="text-[22px] font-bold mt-[10px]">Email</h1>

                    <input type="email" name="email" className="border-[2px] border-[#FF6440] w-[90%] rounded-[8px] mt-[10px] py-[2px] pl-[10px] focus:outline-none dark:bg-white" />
                   

                    <h1 className="text-[22px] font-bold mt-[15px]">Password</h1>

                    <div className="flex items-center">
                      <input type={seen} name="password" className="border-[2px] border-[#FF6440] w-[90%] rounded-[8px] mt-[10px] py-[2px] px-[10px] focus:outline-none dark:bg-white" />

                      {
                        seen === "password" ?   <IoEye onClick={() => setSeen('text')} className="text-[25px] mt-[10px] ml-[-40px]"></IoEye> :   <IoEyeOff onClick={() => setSeen('password')} className="text-[25px] mt-[10px] ml-[-40px]"></IoEyeOff>
                      }

                  
                    </div>

                    <div className="flex justify-center">
                        <button className="border-[2px] border-[#FF6440] py-[3px] px-[30px] mt-[50px] rounded-[12px] font-bold">Sign In</button>
                    </div>

                    <h1 className="text-[16px] font-bold text-center mt-[20px]">Not an user? <Link to={"/signup"}><span className="org underline">Sign Up</span></Link></h1>

                </form>
              </div>
        </div>
    );
};

export default SignIn;