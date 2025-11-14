import { useEffect, useState } from "react";
import cartimage1 from "../Image/DineSmartSpecial1.png"
import { RiDeleteBin5Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import QRImage from "../Image/QR.png"
import { Link } from "react-router-dom";
const base_api = import.meta.env.VITE_BACKEND_BASE_API;

const Cart = () => {

 const [cartData , setCartData] = useState([]);



 const Atoken = localStorage.getItem('Access token')

          useEffect( () => {
        
            fetch(`${base_api}/api/cart/`,{
            method:"GET",
            credentials: "include",
            headers: {
              "content-type":"application/json",
              "Authorization": `Bearer ${Atoken}`
              
            },
            
          })
          .then(res => res.json())
          .then(data => {

          console.log(data);

     setCartData(data);
        
        })
        
        
        } ,[setCartData ]);

     

      


// For Showing the address this part do 

    const [address , setAddress] = useState([]);

    const [isSelect , setIsSelect] = useState(0);

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


    // This part is for increase and decrease the quantity

     const [allIngedient , setAllIngedient] = useState([]);

   
 useEffect(() => {
    setAllIngedient(new Array(cartData.length).fill(1));
  }, [cartData.length]);




 const increment = (index) => {
    const updated = [...allIngedient];
    updated[index]++;
    setAllIngedient(updated);
  };

  const decrement = (index) => {
    const updated = [...allIngedient];
    if (updated[index] > 0) updated[index]--;
    setAllIngedient(updated);
  };

  // This part is for getting the data of the cart when any cart select

  const [selectedIngredients , setSelectedIngredients] = useState([]);



 const handleSelectCart = (index, cart ,type) => {



  const newData = {
    cart: cart,
    quantity: allIngedient[index],
    order_type: type
  };

  

  // Check if this cart is already selected
  const isSelected = selectedIngredients.some(item => item.cart === cart);

  if (isSelected) {
    // Remove it
    const updated = selectedIngredients.filter(item => item.cart !== cart);
    setSelectedIngredients(updated);
  } else {
    // Add it
    setSelectedIngredients(prev => [...prev, newData]);
  }

     
 }




 const[addressId , setAddressId] = useState('');

 const [isAllTakeAway , setIsAllTakeAway] = useState(false);

 useEffect( () => {

  const takeAway = selectedIngredients.map(item => item.order_type);

if (takeAway.find(item => item === "delivery")) {
    setIsAllTakeAway(false);
  } else {
    setIsAllTakeAway(true);
  }

  

 } , [selectedIngredients , setIsAllTakeAway]);

const [paymentStatus , setPaymentStatus] = useState('paid')

 const handleSubmitAllData = () => {

 if(selectedIngredients.length > 0) {
 fetch(`${base_api}/api/order/?payment_status=${paymentStatus}&&address_id=${addressId}`,{
              method:"POST",
              credentials: "include",
              headers: {
                  "content-type":"application/json",
                   "Authorization": `Bearer ${Atoken}`
                
              },
              body: JSON.stringify(selectedIngredients)
              
          })
          .then(res => res.json())
          .then(data => {


            console.log(data);

      document.getElementById("my_modal_1").close();
  
           if(data.success === false) {
          
                   Swal.fire({
                  title: "Error!",
                  text: data.message ,
                  icon: "error"
                   });
               }
   
                if (data.success === true) {
   

                 Swal.fire({
                   title: "Successful",
                   text: data.message ,
                   icon: "success",
                   confirmButtonText: "OK"
                 }).then((result) => {
                   if (result.isConfirmed) {
                    // remove table-related localStorage keys on successful order
                    localStorage.removeItem('table_number');
                    localStorage.removeItem('table_id');
                    localStorage.removeItem('available_seats');
                    window.location.reload();
                   }
                 });
               }
  
  
  })
 }

  else {
     Swal.fire({
                  title: "Alert!",
                   text: "Please select any card for payment",
                   icon: "warning"
                   });
  }


 }


//  This part is use to Delete the cart 

const handleDelete = (cartId) => {
  


   fetch(`${base_api}/api/cart/${cartId}/`,{
            method:"DELETE",
            credentials: "include",
            headers: {
                "content-type":"application/json",
                "Authorization": `Bearer ${Atoken}`
              
            },
            
        })
        .then(res => res.json())
        .then(data => {

         if(data.success === false) {
          
                   Swal.fire({
                  title: "Error!",
                  icon: "error"
                   });
               }
   
                if (data.success === true) {
                 Swal.fire({
                   title: "Successful",
                   text: "Your cart is deleted successfully",
                   icon: "success",
                   confirmButtonText: "OK"
                 }).then((result) => {
                   if (result.isConfirmed) {

                    window.location.reload();
                    
                   }
                 });
               }
     

        })
 
}

// This part is for showing the amount of money that come from selected cart 

const [totalAmount , setTotalAmount] = useState('');
const [payableAmount , setPayableAmount] = useState('');

useEffect( () => {

    fetch(`${base_api}/api/cart/calculate-total/`,{
              method:"POST",
              credentials: "include",
              headers: {
                  "content-type":"application/json",
                   "Authorization": `Bearer ${Atoken}`
                
              },
              body: JSON.stringify(selectedIngredients)
              
          })
          .then(res => res.json())
          .then(data => {

  

          setPayableAmount(data.payable_amount);
          setTotalAmount(data.total_amount)
          

    })
} , [selectedIngredients , setPayableAmount , setTotalAmount ]);



// change the payment status

const handlePaymentStatus = () => {
  if(paymentStatus === "paid") {
    setPaymentStatus("cash");
  }

  if(paymentStatus === "cash") {
    setPaymentStatus("paid");
  }
}





    return (
        <div className="dark:text-black">
            <h1 className="text-[30px] font-bold text-center mt-[20px]">Your Carts</h1>

            {/* Main div */}

            <div className="flex flex-col md:flex-row md:w-[95%] lg:w-[85%] mx-auto md:gap-[10px] lg:gap-[30px]">

              {/* Left Side od the div */}

              <div className="  md:w-[92%] lg:w-[800px] py-[20px]">

                {
                  cartData.map((item ,index) =>  <div key={item.id} className="shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-[5px] mt-[10px] py-[10px] px-[15px] md:px-[20px] w-[97%] md:w-[100%] lg:w-[800px] mx-auto">

                  <div className="flex justify-end items-center gap-[10px]">
                    <h1 className="text-[20px] font-bold org">{item.order_type}</h1>
                    <input onChange={() => handleSelectCart (index , item.id , item.order_type) }  className="size-[18px] dark:bg-white" type="checkbox" name="" id="" />
                  </div>

                    <div className=" flex flex-col md:flex-row items-center justify-between  mt-[-10px] ">

                   <div className="flex gap-[10px] items-center">
                     <img className=" md:w-[60px] lg:w-[80px] h-[100px]" src={item.picture} alt="" />

                    <div className="mt-[10px]">
                        <h1 className="text-[20px] font-bold text-black">Item : <span className="org">{item.item_name}</span></h1>

                           <h1 className="text-[16px] pl-[10px]">
                      {item.all_set}

                      {/* {item.ingredients?.map(data => `${data.ingredient_name} (${data.quantity})`).join(", ")} */}
                   </h1>

                    </div>
                   </div>

                    <div className="mt-[5px] flex  gap-[10px] w-[80px] mr-0  lg:mr-[60px]">
                        <h1    onClick={() =>
      selectedIngredients.length > 0
        ? (
            decrement(index),
            setSelectedIngredients(prev =>
              prev.map(el =>
                el.cart === item.id // compare by unique ID instead of index
                  ? { ...el, quantity: el.quantity - 1 }
                  : el
              )
            )
          )
        : decrement(index)
    }  className="border-[1px] border-[#FF6440] org text-[15px]  text-center w-[25px]  rounded-[50%] font-semibold">-</h1>

            
                          <h1 className=" text-[15px]  font-semibold text-black">{allIngedient[index]}</h1>
                        
                        
                        <h1 onClick={() =>
      selectedIngredients.length > 0
        ? (
            increment(index),
            setSelectedIngredients(prev =>
              prev.map(el =>
                el.cart === item.id // compare by unique ID instead of index
                  ? { ...el, quantity: el.quantity + 1 }
                  : el
              )
            )
          )
        : increment(index)
    }
 className="border-[1px] border-[#FF6440] org text-[15px]  text-center w-[25px]  rounded-[50%] font-semibold">+</h1>

                    </div>

                   <div className="mt-[20px] md:mt-[0]">
                        
                     <h1 className="text-[20px] text-center font-bold org  ">{item.amount} BDT</h1>

                          <RiDeleteBin5Fill onClick={() => handleDelete(item.id)} className="org text-[25px] ml-[15px] mt-[3px]"></RiDeleteBin5Fill>
                   </div>

                </div>

                </div>)
                }

             

                 
                  
              </div>



              {/* Right side of the div */}

              <div className="border-2 w-[95%]  md:w-[45%] lg:w-[500px] h-[350px] rounded-[5px] shadow-[0_0_15px_rgba(0,0,0,0.2)] mx-auto mt-[30px]">

                <h1 className="text-[25px] text-center font-bold  py-[10px]">Payment Summery</h1>

                <h1 className="text-[20px] flex items-center gap-[10px] justify-end mr-[20px]">Cash on <input onChange={handlePaymentStatus} type="checkbox" className="size-[15px]" name="" id="" /></h1>

                <h1 className="border-y-2 py-[10px] text-[20px] font-semibold flex items-center justify-between px-[10px] mt-[20px]">Total Amount : <span className="org">{totalAmount} BDT</span></h1>

                <h1 className="border-y-2 py-[10px] text-[20px] font-semibold flex items-center justify-between px-[10px] mt-[30px]">Payable Amount : <span className="org">{payableAmount} BDT</span></h1>

                <div className="flex justify-center mt-[30px]">

                  {
                    selectedIngredients.length > 0 ?  <button onClick={()=>document.getElementById('my_modal_1').showModal()} className=" bgorg text-white py-[5px] px-[10px] rounded-[5px] ">Payment Confirm</button> :  <button  className=" bg-gray-300 opacity-50 py-[5px] px-[10px] rounded-[5px] cursor-not-allowed ">Payment Confirm</button>
                  }

                  
                   
                </div>

{/* Modal / pop of start from here */}

{
   selectedIngredients.length < 0 || isAllTakeAway === false ?   <dialog id="my_modal_1" className="modal">
  <div className="modal-box dark:bg-white">
    
      
    {
    paymentStatus === "paid" ? <div><h1 className="text-[20px] font-bold text-center "> First Payment</h1>
     <h1 className="text-[20px] font-bold text-center ">Scan me </h1> <img className="h-[200px] w-[200px] mx-auto" src={QRImage} alt="" /></div>  : <div><h1 className="text-[20px] font-bold text-center ">Pay in cash </h1></div>
   }

   
   

    {
      address.map((item , index) =>   <div onClick={() => {setAddressId(item.id); setIsSelect(index + 1);}} key={item.id} className={`${isSelect === index + 1 ? "bg-black" : "bgorg"} text-white px-[10px] rounded-[5px] py-[5px] mt-[10px]`}>
        <h3 className="font-bold text-[18px]">{item.label} , {item.address_line1} , {item.address_line2}</h3>
        <h3 className=" text-[16px]">{item.city} - {item.postal_code}</h3>
  </div>)
    }

    <div className="">
    
        {/* if there is a button in form, it will close the modal */}
        {
           address.length === 0 ?  <Link to={"/user/profile"}><button className="btn bgorg text-white absolute">Add address</button></Link>  : isSelect === 0  ? <button  className={`btn cursor-not-allowed opacity-60 absolute`}>Payment</button>
          : <button onClick={handleSubmitAllData}  className={`btn bgorg text-white absolute`}>Payment</button>

         
        }
          <form method="dialog" className=" flex justify-end mt-[20px]">
        <button className="btn ">Close</button>
      </form>
    </div>
  </div>
</dialog>


:

<dialog id="my_modal_1" className="modal">
  <div className="modal-box dark:bg-white">
    
    
    {
    paymentStatus === "paid" ? <div><h1 className="text-[20px] font-bold text-center "> First Payment</h1>
     <h1 className="text-[20px] font-bold text-center ">Scan me </h1> <img className="h-[200px] w-[200px] mx-auto" src={QRImage} alt="" /></div>  : <div><h1 className="text-[20px] font-bold text-center ">Pay paid in cash </h1></div>
   }

 
   
    <div className="">
      <form method="dialog" className=" flex justify-between mt-[20px]">
        {/* if there is a button in form, it will close the modal */}
        <button onClick={handleSubmitAllData} className="btn bgorg text-white">Payment</button>
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
}


              </div>

            </div>
        </div>
    );
};

export default Cart;