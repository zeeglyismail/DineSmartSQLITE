import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { FaLocationDot } from "react-icons/fa6";
const base_api = import.meta.env.VITE_BACKEND_BASE_API;


const Profile = () => {

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

    setUserData(data.find(item => item));
    
    })
    
    
    } ,[setUserData,Atoken]);


 

    const {id , email , name , phone_number , date_of_birth } = userData;


    // Here we update the user data

    const handleUpdate = e => {
        
           e.preventDefault();
        
        const name = e.target.usname.value;
        const phone_number = e.target.number.value;
        const date_of_birth = e.target.birth.value;

        const updatedData = {name , phone_number , date_of_birth};
        
        console.log(updatedData);


               fetch(`${base_api}/api/customer/profile/${id}/`,{
                  method:"PATCH",
                  credentials: "include",
                  headers: {
                      "content-type":"application/json",
                      "Authorization": `Bearer ${Atoken}`
                  },
                  body: JSON.stringify(updatedData)
              })
              .then(res => res.json())
              .then(data => {
    
                console.log(data);

                 document.getElementById("my_modal_3").close();
   
        
         if (data.message === "Profile updated successfully.") {
          Swal.fire({
            title: "Successful",
            text: "Your Profile updated successfully.",
            icon: "success",
            confirmButtonText: "OK"
          }).then((result) => {
            if (result.isConfirmed) {
              // This runs after clicking OK
              window.location.reload(); // Refresh the page
            }
          });
        }
                    
              })
    }


    // For address 

    const [address , setAddress] = useState([]);

    const [isDefault , setIsDefault] = useState(false);

// Get the address data

      useEffect( () => {
    
      fetch(`${base_api}/api/address/`,{
        method:"GET",
        credentials: "include",
        headers: {
            "content-type":"application/json",
            "Authorization": `Bearer ${Atoken}`,
        },
        
    })
    .then(res => res.json())
    .then(data => {

   

    setAddress(data.data);
    
    })
    
    
    } ,[setAddress,Atoken]);


  
    // post the address data
   const handlSubmitAddress = e => {

      e.preventDefault();
         
    const user = id ;
      const label = e.target.label.value;
        const address_line1 = e.target.address_line1.value;
        const address_line2 = e.target.address_line2.value;
        const city = e.target.city.value;
        const postal_code = e.target.postal_code.value;
        const is_default = isDefault;

        const newAddress = {user , label , address_line1 , address_line2 , city , postal_code , is_default};
        
       

     fetch(`${base_api}/api/address/`,{
                  method:"POST",
                  credentials: "include",
                  headers: {
                      "content-type":"application/json",
                      "Authorization": `Bearer ${Atoken}`
                  },
                  body: JSON.stringify(newAddress)
              })
              .then(res => res.json())
              .then(data => {

                document.getElementById("my_modal_4").close();
    
                Swal.fire({
            title: "Successful",
            text: "Your Address is added Successfully.",
            icon: "success",
            confirmButtonText: "OK"
          }).then((result) => {
            if (result.isConfirmed) {

               

              window.location.reload(); // Refresh the page
            }
          });

               

              })

   }


 


    return (
        <div className="dark:text-black">
             <div className="mt-[20px] mx-[10px] md:mx-0  shadow-[0_0_15px_rgba(0,0,0,0.6)] rounded-[5px] pb-[30px]">
                <h1 className="bgorg text-[25px] flex items-center gap-[5px] pl-[10px] py-[3px] rounded-t-[5px] text-white"><FaUser></FaUser>Profile Information</h1>

                {/* showing User information in profile */}

                  <form  className=" py-[10px] pl-[20px] pb-[30px] rounded-[10px]  md:w-[90%] lg:w-[80%] grid md:grid-cols-1 lg:grid-cols-2 mx-auto">

                  <div>
                      <h1 className="text-[22px] font-bold mt-[10px]">Email</h1>

                    <input type="email" className="border-[2px] border-[#FF6440] w-[90%] rounded-[8px] mt-[10px] py-[2px] pl-[10px] focus:outline-none text-center font-semibold dark:bg-white" value={email} />
                  </div>
                 

                   <div>
                    <h1 className="text-[22px] font-bold mt-[10px]">Name</h1>

                    <input type="text" value={name} className="border-[2px] border-[#FF6440] w-[90%] rounded-[8px] mt-[10px] py-[2px] pl-[10px] focus:outline-none text-center font-semibold dark:bg-white" />
                   </div>

                    <div>
                        <h1 className="text-[22px] font-bold mt-[15px]">Phone No</h1>

                    <input type="text" className="border-[2px] border-[#FF6440] w-[90%] rounded-[8px] mt-[10px] py-[2px] pl-[10px] focus:outline-none text-center font-semibold dark:bg-white" value={phone_number} />
                    </div>


                  <div>
                      <h1 className="text-[22px] font-bold mt-[15px]">Date of Birth</h1>

                    <input type="text" className="border-[2px] border-[#FF6440] w-[90%] rounded-[8px] mt-[10px] py-[2px] pl-[10px] focus:outline-none text-center font-semibold dark:bg-white" value={date_of_birth} />
                  </div>

                </form>

                {/* Edit the information part */}

                 <div className="flex justify-end w-[85%]">
                        <button  onClick={()=>document.getElementById('my_modal_3').showModal()} type="button" className="bgorg text-white py-[3px] px-[30px]  rounded-[5px] font-bold text-[20px] hover:bg-black">Edit</button>
                    </div>

                    {/* pop of form for edit the user information */}

     <dialog id="my_modal_3" className="modal">
      <div className="modal-box bgorg">
      <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white border-2 border-white">✕</button>
      </form>
      <h3 className="font-bold text-[25px] text-center  text-white ">Update your profile information</h3>
              
               <form onSubmit={handleUpdate}  className=" py-[10px] pl-[20px] pb-[30px] rounded-[10px] md:w-[90%] lg:w-[95%]">

                    <h1 className="text-[22px] font-bold mt-[10px] text-white">Email</h1>

                    <input type="email" value={email} className="border-[2px] border-[#FF6440] w-full rounded-[8px] mt-[10px] py-[2px] pl-[10px] focus:outline-none dark:bg-white" />


                   <h1 className="text-[22px] font-bold mt-[15px] text-white">Name</h1>

                    <input type="text" defaultValue={name} name="usname" className="border-[2px] border-[#FF6440] w-full rounded-[8px] mt-[10px] py-[2px] pl-[10px] focus:outline-none dark:bg-white" />

                    <h1 className="text-[22px] font-bold mt-[15px] text-white">Phone No</h1>

                    <input type="text" defaultValue={phone_number} name="number" className="border-[2px] border-[#FF6440] w-full rounded-[8px] mt-[10px] py-[2px] pl-[10px] focus:outline-none dark:bg-white" />


                    <h1 className="text-[22px] font-bold mt-[15px] text-white">Date of Birth</h1>

                    <input type="text" defaultValue={date_of_birth} name="birth" className="border-[2px] border-[#FF6440] w-full rounded-[8px] mt-[10px] py-[2px] pl-[10px] focus:outline-none dark:bg-white" placeholder="Year-Month-Day" />

                   
                   <div  className="flex justify-center">
                        <button className="bg-white org py-[3px] px-[30px] mt-[30px] rounded-[5px] font-bold text-[20px]">Update </button>
                    </div >

                </form>

      </div>
    </dialog>

      {/* edit information work finish here */} 




             </div>



                {/* now add address part start here */}
 
                <div className="mt-[50px] rounded-[5px] shadow-[0_0_15px_rgba(0,0,0,0.6)] pb-[40px] w-[95%] md:w-full mx-auto">
                    <div className="bgorg flex items-center justify-between px-[10px] py-[8px] rounded-t-[5px]">
                        <h1 className=" text-[20px] flex items-center gap-[5px] pl-[10px]  rounded-t-[5px] text-white"><FaLocationDot></FaLocationDot>DELIVERY ADDRESS</h1>

                        <button  onClick={()=>document.getElementById('my_modal_4').showModal()} className="bg-white py-[5px] px-[10px] rounded-[5px] font-bold">+ Add Address</button>
                    </div>

                    {/* this part so the address if their any */}
                    
                    {
                        address.length === 0 ?<h1 className="text-[25px] text-center pt-[30px]">No delivery address added yet. Add one to enable delivery orders.</h1> : 
                        <div>
                        {
                          address.map((item,index) => <div key={item.id} className="card bg-white text-primary-content w-[90%] lg:w-[80%] mx-auto org px-[10px] py-[10px] mt-[20px] pl-[30px] shadow-[0_0_15px_rgba(0,0,0,0.6)]">
                       <div className="flex justify-between">
                         <h1 className="text-[18px] font-bold ">Label : <span className="font-normal text-black">{item.label}</span></h1>
                         {item.is_default === true ? <h1 className="text-[18px] font-bold ">Default</h1> : <button className="text-[18px] font-bold bgorg text-white px-[8px] py-[3px] rounded-[5px]">Optional</button>}
                       </div>
                        <h1 className="text-[18px] font-bold mt-[10px]">Address_line1 : <span className="font-normal text-black">{item.address_line1}</span></h1>
                        <h1 className="text-[18px] font-bold mt-[10px]">Address_line2 : <span className="font-normal text-black">{item.address_line2}</span></h1>
                        <h1 className="text-[18px] font-bold mt-[10px]">City : <span className="font-normal text-black">{item.city}</span></h1>
                        <h1 className="text-[18px] font-bold mt-[10px]">Postail_code : <span className="font-normal text-black">{item.postal_code}</span></h1>

                    
</div>)
                        }
                        </div>
                    }

                      {/* this part show the form to add the address */}


<dialog id="my_modal_4" className="modal">
  <div className="modal-box bgorg">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-white border-2 text-white">✕</button>
    </form>
   
  

    <h3 className="font-bold text-[25px] text-center  text-white ">Add Delivery address</h3>

    <div className="flex items-center gap-[10px]">
       <h1 className="font-bold text-[15px]   text-white">Is Default</h1>
     <input onClick={() => setIsDefault(!isDefault)} type="checkbox" name="" id="" />
    </div>


<form onSubmit={handlSubmitAddress}>

      <div className="">
     <h1 className="text-[22px] font-bold mt-[15px] text-white">Label</h1>
          <input type="text" name="label" placeholder="e.g., Home , Work" className="border-[2px] border-[#FF6440] w-full   rounded-[8px]  py-[5px] pl-[10px] focus:outline-none dark:bg-white" />
                   </div>


                   <div className="">
     <h1 className="text-[22px] font-bold mt-[15px] text-white">Address 1</h1>
          <input type="text" name="address_line1" placeholder="street address" className="border-[2px] border-[#FF6440] w-full   rounded-[8px]  py-[5px] pl-[10px] focus:outline-none dark:bg-white" />
                   </div>

                   <div className="">
     <h1 className="text-[22px] font-bold mt-[15px] text-white">Address 2</h1>
          <input type="text" name="address_line2" placeholder="Apartment , suite, etc. (optional)" className="border-[2px] border-[#FF6440] w-full   rounded-[8px]  py-[5px] pl-[10px] focus:outline-none dark:bg-white" />
                   </div>

                   <div className="flex flex-col md:flex-row items-center md:gap-[20px] mr-[90px] md:mr-0 ">

                    <div>
                       <h1 className="text-[22px] font-bold mt-[15px] text-white ">City</h1>
                          <input type="text" name="city" className="border-[2px] border-[#FF6440]  rounded-[8px]  py-[5px] pl-[10px] focus:outline-none dark:bg-white" />
                    </div>

                    <div>
                       <h1 className="text-[22px] font-bold mt-[15px] text-white">Postal Code</h1>
                          <input type="text" name="postal_code" className="border-[2px] border-[#FF6440]  rounded-[8px]  py-[5px] pl-[10px] focus:outline-none dark:bg-white" />
                    </div>
                   </div>

                   <div className="flex justify-center">
                        <button  className="bg-white org py-[3px] px-[30px] mt-[20px] rounded-[5px] font-bold text-[20px] hover:bg-black">Submit</button>
                    </div>
</form>
  </div>
</dialog>

                  

                </div>
        </div>
    );
};

export default Profile;





