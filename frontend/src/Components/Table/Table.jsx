import { Link, useLocation } from "react-router-dom";
import tableImage from "../Image/Table.png"
import { FaRegCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaRegCircleXmark } from "react-icons/fa6";
const base_api = import.meta.env.VITE_BACKEND_BASE_API;


const Table = () => {

  const lo = useLocation();

    const location = lo.pathname;

    const [tableData , setTableData] = useState([]);
    


        useEffect( () => {
        
          fetch(`${base_api}/api/table/`,{
            method:"GET",
            credentials: "include",
            headers: {
                "content-type":"application/json",
              
            },
            
        })
        .then(res => res.json())
        .then(data => {

         setTableData(data.data);
        
        })
        
        
        } ,[setTableData]);

        const [SelectedTable , setSelectedTable] = useState([]);



         let ids = JSON.parse(localStorage.getItem("table_id")) || [];

        


        // this part is for selecting multiple table and storing the data  for next pages

       const handleSelectTable = (index, data) => {
  // Load current values from localStorage
  let ids = JSON.parse(localStorage.getItem("table_id")) || [];
  let numbers = JSON.parse(localStorage.getItem("table_number")) || [];
  let seats = JSON.parse(localStorage.getItem("available_seats")) || [];

  const isSelected = ids.includes(data.table_id);

  console.log(isSelected);

  if (isSelected) {
    // 🔻 Remove table
    ids = ids.filter(id => id !== data.table_id);
    numbers = numbers.filter(num => num !== data.table_number);
    seats = seats.filter(seat => seat !== data.total_seats); // or data.available_seats if that's what you use
  } else {
    // 🔼 Add table
    ids.push(data.table_id);
    numbers.push(data.table_number);
    seats.push(data.total_seats); // or data.available_seats
  }

  // Save updated values
  localStorage.setItem("table_id", JSON.stringify(ids));
  localStorage.setItem("table_number", JSON.stringify(numbers));
  localStorage.setItem("available_seats", JSON.stringify(seats));

  window.location.reload();
};

        

        

          

    return (
        <div className="dark:text-black">
            <h1 className="text-[20px] font-semibold mt-[30px] ml-[30px]" ><span>Home</span> / <span className={`${location === "/table" ? "org underline" : ""}`}>Table</span></h1>

            <h1 className="text-[25px] text-center mt-[20px] ">Order Type : <span>Dine In</span> </h1>
            <h1 className="text-[30px] text-center mt-[20px] font-bold">Choose Your Table </h1>
            
            {/* Table card part start here */}
             
           {
            ids.length > 0 ?  <div className="flex justify-center">
                 <Link to={"/menu"}><button className="bgorg px-[10px] py-[7px] text-white font-semibold rounded-[5px] mt-[20px]">Go to Menu</button></Link>
            </div> : ""
           }
 
            <div className="grid md:grid-cols-2 gap-[50px] lg:w-[900px] mx-auto mt-[50px]">
               {
                tableData.map( (item , index) =>  <div onClick={() => item.table_status === "available" ?  handleSelectTable(index , item) : ""} key={item.table_id} className={`border-2 border-black  w-[270px] rounded-[10px] shadow-[0_0_15px_rgba(0,0,0,0.2)] mx-auto`}>
                <div className="flex justify-end px-[10px] pt-[10px]">
             

                    {
                        
                        ids.includes(item.table_id) ? <FaRegCircle className="text-[25px] org bgorg rounded-[50%] border-[2px] border-black"></FaRegCircle> :  item.table_status === "available" ? <FaRegCircle className="text-[25px]  rounded-[50%] "></FaRegCircle> :  <FaRegCircleXmark className="text-[25px] org"></FaRegCircleXmark>

                      
                    }
                </div>
                <img className="w-[150px] h-[180px] mx-auto mt-[-35px]" src={tableImage} alt="" />

                <div className="flex items-center gap-[30px] justify-center border-b-[3px] border-[#FF6440]">
                    <h1 className="text-[22px] font-semibold">Table {item.table_number}</h1>
                    <h1 className="text-[22px] font-semibold">Seats : {item.total_seats}</h1>
                </div>

                <h1 className="text-[25px] text-center org font-semibold">{item.table_status}</h1>
            </div>)
               }
            </div>

             {
            ids.length > 0 ?  <div className="flex justify-center">
                 <Link to={"/menu"}><button className="bgorg px-[10px] py-[7px] text-white font-semibold rounded-[5px] mt-[20px]">Go to Menu</button></Link>
            </div> : ""
           }
            
        </div>
    );
};

export default Table;