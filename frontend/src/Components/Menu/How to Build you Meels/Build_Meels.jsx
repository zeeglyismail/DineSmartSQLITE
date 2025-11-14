import { FaMousePointer } from "react-icons/fa";
import { AiFillPlusCircle } from "react-icons/ai";
import { IoCalculator } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { FaInfinity } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { FaSave } from "react-icons/fa";

const Build_Meels = () => {
    return (
       <div>
        {/* How to build the meels */}
         <div className="mt-[100px] mb-[50px]  lg:w-[1200px] mx-auto">
             <h1 className="text-[30px] text-center font-bold ">How to Build Your Perfect Meal</h1>


            {/* Card start from here  */}

            <div className="flex flex-col md:flex-row items-center justify-center mt-[30px]">

                <div className=" lg:w-[420px] px-[10px] mt-[30px]">
                    <h1 className="bg-blue-500 w-[60px] h-[60px]  text-white text-[30px] font-bold flex items-center justify-center rounded-[50%] mx-auto"><FaMousePointer></FaMousePointer></h1>
                      
                      <h1 className="text-[21px] font-bold text-center mt-[10px]">1 Choose one item</h1>

                      <p className="text-center text-[17px]">Select any menu item as your base.</p>
                </div>

                 <div className=" lg:w-[420px] px-[10px] mt-[30px]">
                    <h1 className="bg-blue-500 w-[60px] h-[60px]  text-white text-[30px] font-bold flex items-center justify-center rounded-[50%] mx-auto"><AiFillPlusCircle></AiFillPlusCircle></h1>
                      
                      <h1 className="text-[21px] font-bold text-center mt-[10px]">2. Add Ingredients</h1>

                      <p className="text-center text-[17px]">Select and customize ingredients with quantities</p>
                </div>

                  <div className=" lg:w-[420px] px-[10px] mt-[30px]">
                    <h1 className="bg-blue-500 w-[60px] h-[60px]  text-white text-[30px] font-bold flex items-center justify-center rounded-[50%] mx-auto"><IoCalculator></IoCalculator></h1>
                      
                      <h1 className="text-[21px] font-bold text-center mt-[10px]">3. Real-time Pricing</h1>

                      <p className="text-center text-[17px]">See the total cost update as you build.</p>
                </div>

                  <div className=" lg:w-[420px] px-[10px] mt-[30px]">
                    <h1 className="bg-blue-500 w-[60px] h-[60px]  text-white text-[30px] font-bold flex items-center justify-center rounded-[50%] mx-auto"><FaShoppingCart></FaShoppingCart></h1>
                      
                      <h1 className="text-[21px] font-bold text-center mt-[10px]">4. Add to Cart</h1>

                      <p className="text-center text-[17px]">Add your custom creation to cart.</p>
                </div>

                 
            </div>
        </div>

        {/* Why you use dine smart part */}

         
         <div className="mt-[100px] mb-[50px]">
             <h1 className="text-[30px] text-center font-bold ">Why Choose DineSmart ?</h1>


            {/* Card start from here  */}

            <div className="flex flex-col md:flex-row items-center justify-center mt-[30px]">

                <div className=" lg:w-[420px] px-[10px] mt-[30px]">
                    <h1 className="  text-blue-500 text-[30px] font-bold flex items-center justify-center  mx-auto"><FaInfinity className="text-[45px]"></FaInfinity></h1>
                      
                      <h1 className="text-[21px] font-bold text-center mt-[10px]">Unlimited Customization</h1>

                      <p className="text-center text-[17px]">Mix and match ingredients to create your perfect meal.
                    Each menu item supports up to 50 different ingredients.</p>
                </div>

                 <div className=" lg:w-[420px] px-[10px] mt-[30px]">
                    <h1 className="  text-blue-500 text-[30px] font-bold flex items-center justify-center  mx-auto">BDT</h1>
                      
                      <h1 className="text-[21px] font-bold text-center mt-[10px]">Transparent Pricing</h1>

                      <p className="text-center text-[17px]">No hidden costs. The price you see is exactly what you
                     pay, calculated from your selected ingredients.</p>
                </div>

                 <div className=" lg:w-[420px] px-[10px] mt-[30px]">
                    <h1 className="  text-blue-500 text-[30px] font-bold flex items-center justify-center  mx-auto"><FaSave className="text-[45px]"></FaSave></h1>
                      
                      <h1 className="text-[21px] font-bold text-center mt-[10px]">Save Your Favorites</h1>

                      <p className="text-center text-[17px]">Created the perfect combination? Save it for quick
                      reordering in the future.</p>
                </div>

                

                
            </div>
        </div>

       </div>
    );
};

export default Build_Meels;