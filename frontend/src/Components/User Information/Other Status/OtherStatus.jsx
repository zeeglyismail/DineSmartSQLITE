import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const base_api = import.meta.env.VITE_BACKEND_BASE_API;


const OtherStatus = () => {

  const Atoken = localStorage.getItem('Access token');

  const [orderStatus , setOrderStatus] = useState([])

            useEffect( () => {
          
            fetch(`${base_api}/api/order/`,{
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
  
      setOrderStatus(data)
          
          })
          
          
          } ,[setOrderStatus ]);

    return (
        <div className="dark:text-black">
            <div>
                <div className=" overflow-y-auto  md:h-[520px] overflow-x-hidden  md:px-0 w-[370px] md:w-[500px] lg:w-[780px] xl:w-[900px]  relative right-[16px] md:right-0 ">

                    {/* Table no 1 */}

                    {
                      orderStatus.map(item =>  <table key={item.id} className="table border-2  border-[#FF6440] mt-[10px] ">
    {/* head */}
    <thead>
      <tr className=" border-b-2 border-[#FF6440]">
        <th className="text-[15px] md:text-[20px] text-black relative lg:left-[80px]">Order Name</th>
        <th className="text-[15px] md:text-[20px] text-black relative lg:left-[80px]">Amount</th>
        <th className="text-[15px] md:text-[20px] text-black relative lg:left-[80px]">Order Status</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr className="border-none ">
        <td className="text-[12px] md:text-[18px] relative bottom-[15px] lg:left-[80px]">{item.order_id}</td>
        <td className="text-[12px] md:text-[18px] relative bottom-[15px] lg:left-[80px]">{item.amount} BDT</td>
        <td className="text-[12px] md:text-[18px] relative lg:left-[80px]">{item.order_status} <Link to={`/user/order-status/${item.id}`}><h1 className="org underline mt-[5px]">See Details</h1></Link></td>
      </tr>
    </tbody>
  </table>)
                    }
 


  


</div>
            </div>
        </div>
    );
};

export default OtherStatus;