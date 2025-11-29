import { FaBookmark } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { BiFoodMenu } from "react-icons/bi";
import { Link } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";
const base_api = import.meta.env.VITE_BACKEND_BASE_API;


const SaveMeals = () => {

  const [saveMeals , setSaveMeals] = useState([]);

  const Atoken = localStorage.getItem('Access token')

          useEffect( () => {
        
          fetch(`${base_api}/api/saved_item/`,{
            method:"GET",
            credentials: "include",
            headers: {
                "content-type":"application/json",
                "Authorization": `Bearer ${Atoken}`
              
            },
            
        })
        .then(res => res.json())
        .then(data => {


  setSaveMeals(data)
     
        
        })
        
        
        } ,[ setSaveMeals]);


        const handleDelete = (id) => {


          
           fetch(`${base_api}/api/saved_item/${id}/`, {
    method: "DELETE",
    credentials: "include",
    headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${Atoken}`
    },
})
.then(res => {
    if (res.status === 204) {
        // No content returned
        return { message: "Deleted successfully" };
    }
    return res.json();
})
.then(data => {
    

    window.location.reload();
})
.catch(err => console.error("Error:", err));
        

        }



    return (
        <div className=" shadow-[0_0_15px_rgba(0,0,0,0.5)] pb-[30px] rounded-[5px] w-[95%] md:w-full mx-auto dark:text-black">
            <h1 className="text-[25px] pl-[20px] bgorg py-[5px] flex items-center gap-[10px] rounded-t-[5px] text-white"><FaBookmark></FaBookmark>Saved Meals</h1>


          {/* Main div */}
            <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2  gap-[30px] mt-[30px] px-[20px] ">

                {/* Sub div */}

                {
                    saveMeals.map(item => <div key={item.id} className="  mx-auto md:w-[400px] lg:w-[400px]  px-[10px] py-[10px] shadow-[0_0_15px_rgba(0,0,0,0.5)] rounded-[5px]">
                    <div className="flex items-center justify-between ">
                        <h1 className=" org text-[20px] font-semibold">{item.custom_name}</h1>

                        <div className="flex gap-[15px]">
                            <Link to={`/menu/${item.menu_item}`}><BiFoodMenu className="text-[30px] org border-2  border-[#FF6440] p-[3px] rounded-l-[3px]"></BiFoodMenu></Link>

                           <RiDeleteBin5Fill onClick={() => handleDelete(item.id)} className="text-[30px] org border-2  border-[#FF6440] p-[3px] rounded-l-[3px]"></RiDeleteBin5Fill>
         
                        </div> 
                    </div>
                  
                  <h1 className="text-[20px] font-bold ">Base : <span className="org font-normal">{item.menu_item_name}</span></h1>
                  <h1 className="text-[20px] font-bold ">Ingredient : <span className="org font-normal">{item.ingredients?.map(data => `${data.ingredient_name} (${data.quantity})`).join(", ")}</span></h1>
                  <h1 className="text-[17px] mt-[10px]"> Amount :<span className="org font-normal">{item.amount} BDT</span></h1>
                    
                </div>)
                }

                 
                
            
             



            </div>
        </div>
    );
};

export default SaveMeals;