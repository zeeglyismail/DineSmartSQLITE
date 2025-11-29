import { useEffect, useState } from "react";
import image1 from "../../Image/Cooking.png"
import { GoDotFill } from "react-icons/go";
import { useParams } from "react-router-dom";
const base_api = import.meta.env.VITE_BACKEND_BASE_API;


const OderDetails = () => {

    const {id} = useParams();

    console.log(id);

    const Atoken = localStorage.getItem('Access token');
    
      const [orderStatus , setOrderStatus] = useState({});

      const [orderItems , setOrderItems] = useState([]);

    useEffect( () => {
          
            fetch(`${base_api}/api/order/details/${id}/`,{
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

            setOrderStatus(data);

            setOrderItems(data.items);
          
          })
          } ,[ setOrderStatus , setOrderItems ]);

          console.log(orderItems);

          const {order_id , total_amount} = orderStatus;

    return (
        <div className="dark:text-black">

            <h1 className="text-[25px] font-bold text-black text-center">Total Amount : <span> {total_amount} BDT</span></h1>
            <h1 className="text-[25px] font-bold text-black text-center">Order id : <span>{order_id}</span></h1>
            
            {
                orderItems.map(item => <div className="border-2 border-[#FF6440] rounded-[20px] pb-[20px] mt-[10px]">

                     <h1 className="text-[14px] font-bold text-black text-end pr-[10px] pt-[10px] underline">{item.meals_from}</h1>
         

                <h1 className="text-[20px] font-bold text-black text-center">Order Type :  <span> {item.order_type}</span></h1>
            <h1 className="text-[20px] font-bold text-black text-center">{item.choosed}</h1>
                   <h1 className="mt-[10px] flex justify-between px-[20px] font-bold">Title :<span>{item.item_name}</span></h1>
                <h1 className="mt-[10px] flex justify-between px-[20px] font-semibold">Items Quantity: <span className="font-normal">3</span></h1>
                   <h1 className="mt-[10px] flex justify-between px-[20px] items-center font-semibold">Ingredients: <span className="font-normal">{item.ingredients} </span></h1>
            

                  <div>
                    <h1 className="mt-[20px] flex justify-between px-[20px] font-bold border-t-2 border-[#FF6440] pt-[20px]">Amount <span>{item.item_price} BDT</span></h1>
                  </div>

            </div>)
            }

            

            <img className="w-[350px] h-[350px] mx-auto mt-[40px]" src={image1} alt="" />

           <h1 className="text-[18px] flex items-center justify-center font-semibold"><GoDotFill className="org "></GoDotFill>Cooking</h1>
            <h1 className="text-[18px] text-center font-semibold">Estimated 5 Min 29 Sec</h1>
        </div>
    );
};

export default OderDetails;


    //    <h1 className="mt-[10px] flex justify-between px-[20px] ">Cheddar Cheese x1 <span>20 BDT</span></h1>
                   



    //                <div className="flex gap-[10px] mt-[10px] pl-[20px] pb-[10px] border-b-2  border-dashed border-black">
    //                 <h1>QTY</h1>
    //                 <h1 className="border-2 border-[#FF6440] w-[120px] flex items-center justify-center rounded-[20px] "><span className=" w-[25%] text-center">+</span> <span className="border-l-2 border-[#FF6440] w-[50%] text-center">1</span> <span className="border-l-2 border-[#FF6440] w-[25%] text-center">-</span></h1>
    //                </div>