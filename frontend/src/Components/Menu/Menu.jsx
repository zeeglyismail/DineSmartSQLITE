import cardImage1 from "../Image/Burger.png"
import { FaPuzzlePiece } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { TbSettingsCog } from "react-icons/tb";
import Build_Meels from "./How to Build you Meels/Build_Meels";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const base_api = import.meta.env.VITE_BACKEND_BASE_API;

const Menu = () => {


const table_number = JSON.parse(localStorage.getItem('table_number')) || [];
const available_seats = JSON.parse(localStorage.getItem('available_seats')) || [];


  const [menudata , setmenuData] = useState([]);
    


        useEffect( () => {
        
          fetch(`${base_api}/api/menu/?list_type=table_menu`,{
            method:"GET",
            credentials: "include",
            headers: {
                "content-type":"application/json",
              
            },
            
        })
        .then(res => res.json())
        .then(data => {



       setmenuData(data);
        
        })
        
        
        } ,[setmenuData]);

        

    return (
        <div className="dark:text-black">
             <h1 className="text-[30px] text-center mt-[30px]">Order Type : Dine In</h1>

{/* This part show the table no and seats no */}
           <h1 className="text-[30px]  w-[200px] mx-auto  mt-[10px] org">
  <span className="text-black">Choosed : <br /></span> {" "}
  {table_number.map((item, index) => (
    <span key={index}>
      Table {item} seats {available_seats[index]}
      {index < table_number.length - 1 ? <br /> : ""}
    </span>
  ))}
</h1>


{/* card part */}

<div className="mt-[20px] grid md:grid-cols-2 lg:grid-cols-3 gap-[20px] md:w-[95%] lg:w-[1080px]  mx-auto">

    {
        menudata.map(item =>  <div key={item.id} className=" w-[350px] px-[10px] py-[8px] rounded-[5px] shadow-[0_0_15px_rgba(0,0,0,0.2)] mx-auto">
        <img className="w-[250px] h-[250px]  mx-auto " src={item.picture} alt="" />

        <h1 className="text-[20px] pl-[10px] font-semibold">{item.name}</h1>
        <h1 className="text-[16px] pl-[10px] ">{item.description}</h1>

        <div className="mt-[30px] flex items-center justify-between">
            <h1 className="flex items-center gap-[5px] text-[14px]"><FaPuzzlePiece ></FaPuzzlePiece> {item.count_ingredient} ingredients available</h1>
            <h1 className="flex items-center gap-[5px] text-[14px]"><FaClock ></FaClock>Custom pricing</h1>
        </div>

       <Link to={`/menu/${item.id}`}><button className="text-white bgorg w-full rounded-[5px] flex gap-[5px] items-center justify-center py-[4px] mt-[10px]"><TbSettingsCog></TbSettingsCog> Customize & Order</button></Link>

        <p className="border-b-[1px] border-red-600 w-[100%] mt-[20px]"></p>

        <h1 className="mt-[10px]"><span className="font-semibold">Feature ingredients</span> : {item.used_ingredient.join(', ')}</h1>
    </div>)
    }


   



    
</div>


<Build_Meels></Build_Meels>

            </div>
    );
};

export default Menu;