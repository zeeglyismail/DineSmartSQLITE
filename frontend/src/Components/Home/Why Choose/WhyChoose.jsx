import { FaPuzzlePiece } from "react-icons/fa6";
import { FaCalculator } from "react-icons/fa6";
import { MdPhoneIphone } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import { FaChair } from "react-icons/fa";

const WhyChoose = () => {
    return (
        <div className="mt-[100px] text-black dark:text-black">
            <h1 className="text-[30px] text-center font-bold ">Why Choose DineSmart ?</h1>

            <h1 className="text-[20px] text-center  text-gray-500">Experience dining like never before with our innovative feature</h1>

            {/* Card part start from here */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[20px] w-[92%] md:w-[95%] lg:w-[1100px] mx-auto mt-[30px]">

              {/* card 1 */}
               <div className="shadow-[0_0_15px_rgba(0,0,0,0.2)] w-[350px] px-[20px] py-[15px] rounded-[5px]">
                  <div className="flex justify-center">
                    <FaPuzzlePiece className="size-[45px] text-blue-600"></FaPuzzlePiece>
                  </div>
                  <h1 className="text-[21px] font-bold text-center mt-[10px]">Custom Meal Builder</h1>
                  <p className="text-center text-[17px]">Build your perfect meal by selecting from up to 50 custom ingredients for each menu item. Mix and match to create your ideal dish.</p>
               </div>


               {/* card 2 */}
                <div className="shadow-[0_0_15px_rgba(0,0,0,0.2)] w-[350px] px-[20px] py-[15px] rounded-[5px]">
                  <div className="flex justify-center">
                    <FaCalculator className="size-[45px] text-blue-600"></FaCalculator>
                  </div>
                  <h1 className="text-[21px] font-bold text-center mt-[10px]">Real-time Pricing</h1>
                  <p className="text-center text-[17px]">See the exact cost of your meal as you build it. No hidden fees, just transparent pricing based on your selected ingredients.</p>
               </div>


               {/* card 3 */}
                <div className="shadow-[0_0_15px_rgba(0,0,0,0.2)] w-[350px] px-[20px] py-[15px] rounded-[5px]">
                  <div className="flex justify-center">
                    <MdPhoneIphone className="size-[45px] text-blue-600"></MdPhoneIphone>
                  </div>
                  <h1 className="text-[21px] font-bold text-center mt-[10px]">Multiple Order Types</h1>
                  <p className="text-center text-[17px]">Choose from dine-in with table selection, delivery to your address, or convenient take-away options.</p>
               </div>

               {/* card 4 */}
                <div className="shadow-[0_0_15px_rgba(0,0,0,0.2)] w-[350px] px-[20px] py-[15px] rounded-[5px]">
                  <div className="flex justify-center">
                    <FaBookmark className="size-[45px] text-blue-600"></FaBookmark>
                  </div>
                  <h1 className="text-[21px] font-bold text-center mt-[10px]">Save Favorites</h1>
                  <p className="text-center text-[17px]">Save your custom meal combinations for future orders. Never lose track of that perfect combination you created.</p>
               </div>

               {/* card 5 */}
                <div className="shadow-[0_0_15px_rgba(0,0,0,0.2)] w-[350px] px-[20px] py-[15px] rounded-[5px]">
                  <div className="flex justify-center">
                    <FaCreditCard className="size-[45px] text-blue-600"></FaCreditCard>
                  </div>
                  <h1 className="text-[21px] font-bold text-center mt-[10px]">Easy Payment</h1>
                  <p className="text-center text-[17px]">Quick and secure payment options including card payments and QR code payments for your convenience.</p>
               </div>

               {/* card 5 */}
                <div className="shadow-[0_0_15px_rgba(0,0,0,0.2)] w-[350px] px-[20px] py-[15px] rounded-[5px]">
                  <div className="flex justify-center">
                    <FaChair className="size-[45px] text-blue-600"></FaChair>
                  </div>
                  <h1 className="text-[21px] font-bold text-center mt-[10px]">Smart Table Management</h1>
                  <p className="text-center text-[17px]">For dine-in orders, select your preferred tables and we'll ensure you have the right amount of food for your party size.</p>
               </div>


            </div>
        </div>
    );
};

export default WhyChoose;