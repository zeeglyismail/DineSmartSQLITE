import cardImage1 from "../../Image/Burger.png"
import ingredientImage1 from "../../Image/SesameBun.png"
import { MdOutlineLogin } from "react-icons/md";
import { FaPuzzlePiece } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import Swal from "sweetalert2";
import { FaPlay } from "react-icons/fa";
const base_api = import.meta.env.VITE_BACKEND_BASE_API;

const DemenuDetails = () => {
           const {Id} = useParams();

   

    // This part is for menu Details 

    const [menuDetails , setMenuDetails] = useState({});
   

   useEffect( () => {
        
          fetch(`${base_api}/api/menu/${Id}/`,{
            method:"GET",
            credentials: "include",
            headers: {
                "content-type":"application/json",
              
            },
            
        })
        .then(res => res.json())
        .then(data => {

          

     setMenuDetails(data);

        
        })
        
        
        } ,[setMenuDetails]);

 


        const {name , description , id ,saved_meals , picture } = menuDetails;




        // This part is for ingredients

        const [ingredients , setIngredients] = useState([])

          useEffect( () => {
        
          fetch(`${base_api}/api/used_ingredient/?menu_item_id=${Id}`,{
            method:"GET",
            credentials: "include",
            headers: {
                "content-type":"application/json",
              
            },
            
        })
        .then(res => res.json())
        .then(data => {

          

     setIngredients(data)
        
        })
        
        
        } ,[setIngredients]);


        // Add the Total amout of the order item in initial stage.

        const [totalAmout , setTotalAmout] = useState(0);

        const [quantityData , setQuantityData] = useState([]);

        useEffect( () => {

                         const simplifiedIngredients = ingredients.map(item => ({
           ingredient: item.ingredient_id,
           quantity: item.quantity
           }));
     
              const newQuantityData = { ingredients: simplifiedIngredients };
          setQuantityData(newQuantityData);


             fetch(`${base_api}/api/used_ingredient/calculate_amount/`,{
            method:"POST",
            credentials: "include",
            headers: {
                "content-type":"application/json",
              
            },
            body: JSON.stringify(newQuantityData)
            
        })
        .then(res => res.json())
        .then(data => {


     setTotalAmout(data.total_amount);

  

     
        })

        },[ingredients , setTotalAmout ,setQuantityData, ]);



// increase the ingrediant quantity

     const increment = (index) => {

      const updated = quantityData.ingredients.map((item, i) =>
    i === index
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );
const updatedData = { ingredients: updated };

 setQuantityData({ ingredients: updated });

  // console.log("Updated quantityData:", { ingredients: updated });

   localStorage.setItem('quantityData', JSON.stringify(updatedData));



          fetch(`${base_api}/api/used_ingredient/calculate_amount/`,{
            method:"POST",
            credentials: "include",
            headers: {
                "content-type":"application/json",
              
            },
            body: JSON.stringify(updatedData)
            
        })
        .then(res => res.json())
        .then(data => {

        
    

     setTotalAmout(data.total_amount);

        localStorage.setItem("total" , data.total_amount);

     
        })

  };


  
// decrease the ingrediant quantity

  const decrement = (index) => {
    
    if (quantityData.ingredients?.[index]?.quantity > 0) {

              const updated = quantityData.ingredients.map((item, i) =>
    i === index
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );

  const updatedData = { ingredients: updated };
 setQuantityData({ ingredients: updated }); 

  // console.log("Updated quantityData:", { ingredients: updated });

 localStorage.setItem('quantityData', JSON.stringify(updatedData));


     fetch(`${base_api}/api/used_ingredient/calculate_amount/`,{
            method:"POST",
            credentials: "include",
            headers: {
                "content-type":"application/json",
              
            },
            body: JSON.stringify(updatedData)
            
        })
        .then(res => res.json())
        .then(data => {

    

     setTotalAmout(data.total_amount);

     localStorage.setItem("total" , data.total_amount);

     
        })
    }

  };


  

// this part check that is the user login or not 


const Atoken = localStorage.getItem('Access token')




// This part is for save the combination in backend server

const [combinationName , setCombinationName] = useState('');



const handleSavecombination = () => {

  const combinationdata = { "custom_name" : combinationName , "amount" : totalAmout , "menu_item" : id , ingredients: quantityData.ingredients}

  // console.log(combinationdata);

   fetch(`${base_api}/api/saved_item/`,{
            method:"POST",
            credentials: "include",
            headers: {
                "content-type":"application/json",
                 "Authorization": `Bearer ${Atoken}`
              
            },
            body: JSON.stringify(combinationdata)
            
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
                 text: "Your Combination is Saved Successfully !",
                 icon: "success",
                 confirmButtonText: "OK"
               }).then((result) => {
                 if (result.isConfirmed) {
                   // This runs after clicking OK
                  setCombinationName('');
                   window.location.reload();
                 }
               });
             }


        })

}



// This part it to get the save meals data 

  const [saveMeals , setSaveMeals] = useState([]);

 



          useEffect( () => {
        
          fetch(`${base_api}/api/saved_item/?menu_item_id=${id}`,{
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
        
        
        } ,[id , setSaveMeals]);

        const handleLoadDetailsNewData = (SaveMealsId) => {

          // for Menu Api

           fetch(`${base_api}/api/menu/${Id}/?saved_meals=${SaveMealsId}&&access=${Atoken}`,{
            method:"GET",
            credentials: "include",
            headers: {
                "content-type":"application/json",
              
            },
            
        })
        .then(res => res.json())
        .then(data => {


        console.log(data);

    //  window.location.reload();

      setMenuDetails(data);
        
        })

        // For Ingredient Api

        fetch(`${base_api}/api/used_ingredient/?menu_item_id=${Id}&&saved_meals=${SaveMealsId}&&access=${Atoken}`,{
            method:"GET",
            credentials: "include",
            headers: {
                "content-type":"application/json",
              
            },
            
        })
        .then(res => res.json())
        .then(data => {

  console.log(data);

     setIngredients(data)
        
        })
 


        }

       

    
// This part is to save the in cart by the add to card button

let Table_id = JSON.parse(localStorage.getItem("table_id")) || [];

const handleAddtoCart = () => {

  let addToCart = {};

  if(saved_meals === undefined) {
  addToCart = { "order_type" : "delivery" , "menu_item" : id , ingredients: quantityData.ingredients}
  }

  else {
   addToCart = { "order_type" : "delivery" ,  "saved_meals" : saved_meals , "menu_item" : id , ingredients: quantityData.ingredients}
  }

console.log(addToCart);

  // console.log(combinationdata);

   fetch(`${base_api}/api/cart/`,{
            method:"POST",
            credentials: "include",
            headers: {
                "content-type":"application/json",
                 "Authorization": `Bearer ${Atoken}`
              
            },
            body: JSON.stringify(addToCart)
            
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
                 text: "Your Saved Meals are added Successfully to the Cart !",
                 icon: "success",
                 confirmButtonText: "OK"
               }).then((result) => {
                 if (result.isConfirmed) {
                   // This runs after clicking OK
                
                 }
               });
             }


        })


}

    return (
        <div className="dark:text-black">

            <h1 className="text-[20px] font-semibold mt-[30px] ml-[30px]" ><span className="text-blue-600 underline">Home</span> / <span className={`text-blue-600 underline`}>Menu</span> / <span >Burger</span></h1>

            {/* main item Card like burger / pizza part */}

            <div className=" pt-[20px] flex flex-col md:flex-row  gap-[10px] md:w-[95%] lg:w-[1100px] mx-auto justify-center">

                {/* the save meals show here */}
  <div className="shadow-[0_0_15px_rgba(0,0,0,0.2)] pt-[10px] w-[98%] lg:w-[100%]">
                       <img className=" lg:w-[450px] lg:h-[450px] rounded-[5px] mx-auto " src={picture} alt="" />

                       <h1 className="text-[25px] flex gap-[10px] items-center ml-[20px]"><FaBookmark className="text-blue-600"></FaBookmark> Your Save Meals</h1>

                       <p className="picture-b-[2px] w-full"></p>

                       {
                        Atoken === null ? "" :  <div className="">
                           {
              saveMeals.map(item =>  <div key={item.id} className="flex justify-between px-[10px] items-center py-[10px] border-b-2">
          <div>
            <h1 className="text-[20px] pl-[10px] font-semibold">{item.custom_name}</h1>
            

         <h1 className="text-[16px] pl-[10px]">
  {item.ingredients
    .map(data => `${data.ingredient_name} (${data.quantity})`)
    .join(", ")}
</h1>

            </div>

            <button onClick={() => handleLoadDetailsNewData(item.id)} className="border-2 border-[#FF6440] px-[10px] py-[3px] org flex items-center gap-[5px] rounded-[3px] "><FaPlay></FaPlay> Load</button>
            
           </div>
          )
          
            }
            
                    </div>
                       }



  </div>


                 {/* The information of the item show here */}
                     <div className="">

            <h1 className="text-[20px] pl-[10px] font-semibold">{name}</h1>
           <h1 className="text-[16px] pl-[10px] ">{description}</h1>

                 <div className="bg-[#E0F7FA] w-[350px] md:w-[320px] lg:w-[450px] px-[10px] py-[10px] rounded-[5px]">
                    
                    <h1 className="text-[16px] text-[#00838F]  "><span className="font-bold">ⓘ How it works:</span> Select ingredients below to build your custom burger.Each ingredient can be added multiple times, and the price updates in realtime.</h1>
                 </div>

                  <div className="w-[350px] md:w-[320px] lg:w-[450px] shadow-[0_0_15px_rgba(0,0,0,0.2)] mt-[10px] rounded-[5px] py-[10px]">
                    <h1 className="text-[25px] text-center ">Current total</h1>
                  
                        <h1 className="text-[25px] text-center org font-semibold">BDT {totalAmout}</h1>

                    <h1 className="text-[14px] text-center">price based on selected ingredients</h1>
                  </div>

                  {/* showing the button according to the user status */}

                  {
                    Atoken === null ? <Link to={"/signin"}><button className="bgorg flex items-center gap-[5px] text-white font-semibold py-[5px] w-[350px] md:w-[320px] lg:w-[450px] justify-center mt-[10px] rounded-[5px]"><MdOutlineLogin></MdOutlineLogin> Login to Order </button></Link>
                    : <div>
                      <button onClick={handleAddtoCart} className="bgorg flex items-center gap-[5px] text-white font-semibold py-[5px] w-[350px] md:w-[320px] lg:w-[450px] justify-center mt-[10px] rounded-[5px]"><FaCartPlus></FaCartPlus>Add to Cart</button>
                      <button onClick={()=>document.getElementById('my_modal_1').showModal()} className=" flex items-center gap-[5px] border-2 border-[#FF6440] org font-semibold py-[5px] w-[350px] md:w-[320px] lg:w-[450px] justify-center mt-[10px] rounded-[5px]"><FaBookmark></FaBookmark>Save This Combination </button>
                    </div>
                    
                  }

                  {/* pop of part that open when click save this combination  */}

<dialog id="my_modal_1" className="modal">
  <div className="modal-box dark:bg-white">
     <h3 className="font-bold text-lg text-center">Enter  the Combination Name</h3>
               <input onChange={(e) => setCombinationName(e.target.value)} value={combinationName} className=" border-2 dark:bg-white border-[#FF6440] mt-[10px] w-[100%] mx-auto rounded-[5px] py-[3px] px-[10px] outline-none" type="text" />
    <div className="mt-[10px] ">
      <form className="flex justify-center gap-[10px]" method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button onClick={handleSavecombination} className="bgorg text-white font-semibold py-[5px] px-[20px]  mt-[10px] rounded-[5px]">Save</button>

        <button  className="border-2 border-[#FF6440] org font-semibold py-[4px] px-[18px]  mt-[10px] rounded-[5px]">Cancel</button>
      </form>
    </div>
  </div>
</dialog>

 
                  
                     </div>
            </div>


         {/* Ingredients card part  */}

         <h1 className="text-[25px] flex gap-[10px] w-[90%] md:w-[95%] lg:w-[850px] mx-auto mt-[30px]"><FaPuzzlePiece className="text-blue-600"></FaPuzzlePiece> Customize Your {name}</h1>

         <div className="md:w-[95%] lg:w-[850px] mx-auto grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-[10px] mt-[10px]"> 
                
                {
                    ingredients.map((item,index) => 
                <div key={item.id} className="border-2 w-[130px] pb-[15px] rounded-[5px] mx-auto">
                     <img className="h-[50px] w-[50px] mx-auto" src={item.picture} alt="" />

                     <h1 className=" text-center font-semibold">{item.food}</h1>
                    <h1 className=" text-center org font-semibold">BDT {item.price}</h1>

                    <div className="mt-[10px] flex justify-center gap-[10px]">
                        <h1 onClick={() => decrement(index)}  className="border-[1px] border-[#FF6440] org text-[15px]  text-center w-[25px]  rounded-[50%] font-semibold">-</h1>

            
                          <h1 className=" text-[15px]  font-semibold">{quantityData.ingredients?.[index]?.quantity ?? 0}</h1>
                        
                        
                        <h1 onClick={() => increment(index)} className="border-[1px] border-[#FF6440] org text-[15px]  text-center w-[25px]  rounded-[50%] font-semibold">+</h1>
                    </div>
                </div>)
                }


         </div>

                 <h1 className="mt-[30px] text-[12px] text-center">ⓘ Click the + and - button to add ingredients. You can add the same ingredient multiple times.</h1>

                 <p className="border-b-2 w-[90%] md:w-[95%] lg:w-[850px] mx-auto mt-[40px]"></p>

                 <h1 className="text-[25px] flex gap-[10px] w-[90%] md:w-[95%] lg:w-[850px] mx-auto mt-[30px]">Explore More Menu Items</h1>

                  <div className="flex justify-center mt-[20px]">
                     <button className="border-2 border-[#FF6440] flex items-center gap-[5px] org font-semibold py-[5px] px-[10px] justify-center mt-[10px] rounded-[5px]"><FaArrowLeft></FaArrowLeft> Back to Full Menu </button>
                  </div>
            
        </div>
    );
};

export default DemenuDetails;