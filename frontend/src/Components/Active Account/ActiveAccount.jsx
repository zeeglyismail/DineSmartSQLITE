import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const base_api = import.meta.env.VITE_BACKEND_BASE_API;


const ActiveAccount = () => {



const navigate = useNavigate();

//   for submit OTP data

 const handleActiveAccount = e => {
        e.preventDefault();
        
        const email = e.target.email.value;
        const otp = e.target.otp.value;
    
        const ActiveId = {email,otp};

        console.log(ActiveId);

        fetch(`${base_api}/api/auth/customer-activate/`,{
          method:"PATCH",
          headers: {
              "content-type":"application/json"
          },
          body: JSON.stringify(ActiveId)
      })
      .then(res => res.json())
      .then(data => {
          
        if(data.message === "Account is already active."){
           Swal.fire({
              title: "Alert",
              text: "This account is already active.Please go to sign in page.",
              icon: "question",
              confirmButtonText: "OK"
            }).then((result) => {
              if(result.isConfirmed){
                navigate("/signin")
              }
            });
        }


            if(data.message === "Your account has been activated!"){
           Swal.fire({
              title: "Congratulation !",
              text: "Your account is active now.",
              icon: "success",
              confirmButtonText: "OK"
            }).then((result) => {
              if(result.isConfirmed){
                navigate("/signin")
              }
            });
        }

        console.log(data);
            
      })
 

    }


    // if opt not get then send new opt for this

    const [ReSendemail , setReSendEmail] = useState('');


      const handleReSendOTP = () => {

        const passEmail = {email : ReSendemail}

        console.log(passEmail);

        fetch(`${base_api}/api/auth/resend-otp/`,{
          method:"POST",
          headers: {
              "content-type":"application/json"
          },
          body: JSON.stringify(passEmail)
      })
      .then(res => res.json())
      .then(data => {


        console.log(data);

        if(data.message === "OTP resent successfully.") {
            Swal.fire({
              title: "Please check your email",
              text: "Your OTP are successfully resend to your email",
              icon: "success",
              confirmButtonText: "OK"
            }).then((result) => {
              if(result.isConfirmed){
                 setReSendEmail("");
              }
            });
        }

      
            
      })

      } 


    return (
        <div>
             <div className="dark:text-black">
            {/* Text part */}
            <h1 className="text-[30px] mt-[80px] font-bold text-center">Active Account</h1>

              
              {/* From part start */}

              <div>
                <form onSubmit={handleActiveAccount}  action="" className="border-2 border-[#FF6440] w-[90%] md:w-[50%] lg:w-[32%] mx-auto py-[10px] pl-[20px] pb-[30px] rounded-[10px] mt-[40px] mb-[40px] shadow-[0_0_15px_rgba(0,0,0,0.4)]">

                    <h1 className="text-[22px] font-bold mt-[10px]">Email</h1>

                    <input type="email" name="email" className="border-[2px] border-[#FF6440] w-[90%] rounded-[8px] mt-[10px] py-[5px] pl-[10px] focus:outline-none dark:bg-white" />
                   

                    <h1 className="text-[22px] font-bold mt-[15px]">OTP</h1>

                    <input type="text" name="otp" className="border-[2px] border-[#FF6440] w-[90%] rounded-[8px] mt-[10px] py-[5px] px-[10px] focus:outline-none dark:bg-white" />

                    <div className="">
                        <button className="bgorg text-white  w-[90%] py-[5px] text-[20px]  mt-[50px] rounded-[10px] font-bold">Active</button>
                    </div>

                    <h1 className="text-[16px] font-bold text-center mt-[20px]" >Didn't get the OTP?<span className="org underline" onClick={()=>document.getElementById('my_modal_1').showModal()}> Resend OTP</span></h1>
                   
                        </form>
                    <div className="">
<dialog id="my_modal_1" className="modal">
  <div className="modal-box dark:bg-white">

       <h1 className="text-[22px] font-bold mt-[10px]">Email</h1>

                    <input onChange={(e) => setReSendEmail(e.target.value)} type="email" value={ReSendemail} name="email" className="border-[2px] border-[#FF6440] w-[98%] rounded-[8px] mt-[10px] py-[5px] pl-[10px] focus:outline-none dark:bg-white" />
    
    <div className="">
      <form method="dialog" className="flex justify-between mt-[10px]">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn bgorg text-white " onClick={handleReSendOTP}>Submit</button>
        <button className="btn bgorg text-white ">Close</button>
      </form>
    </div>
  </div>
</dialog>
                    </div>

           
              </div>
        </div>
        </div>
    );
};

export default ActiveAccount;