import { IoIosStar } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { TfiStar } from "react-icons/tfi";
import { useState } from "react";

import image1 from "../Image/FreeFastDelivery.png";
import image2 from "../Image/QualifiedFoods.png";
import image3 from "../Image/ChatWithUs.png";
import image4 from "../Image/CustomOrdering.png";
import image5 from "../Image/SaveYourCustomMenu.png";
import image6 from "../Image/Reservation.png";


const AboutUs = () => {

const [star ,setStar] = useState(0);
    
    return (
        
       <div className="dark:text-black">
         
         {/* Upper part of the about paage  */}

         {/* upper part main parent div */}
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[10px] shadow-[0_0_15px_rgba(0,0,0,0.2)] w-[90%] mx-auto px-[20px] py-[20px] rounded-[15px] mt-[20px] mb-[30px]">
            {/* sub divs */}

            <div className="flex items-center gap-[10px] mx-auto">
                <img className="w-[100px]" src={image1} alt="" />
                <div>
                    <h1 className="text-[14px] font-semibold ">Fast & Free Delivery</h1>
                <p className="w-[172px] text-[12px]">Lorem ipsum dolor sit amet,consectetur adipiscing elit.Sed at pellentesque libero.</p>
                </div>
            </div>

              
              {/* sub divs */}

              <div className="flex items-center gap-[10px] mx-auto">
                <img className="w-[100px]" src={image2} alt="" />
                <div>
                    <h1 className="text-[14px] font-semibold ">Qualified Foods</h1>
                <p className="w-[172px] text-[12px]">Lorem ipsum dolor sit amet,consectetur adipiscing elit.Sed at pellentesque libero.</p>
                </div>
            </div>
               
               {/* sub divs */} 

              <div className="flex items-center gap-[10px] mx-auto">
                <img className="w-[100px]" src={image3} alt="" />
                <div>
                    <h1 className="text-[14px] font-semibold ">Chat With Us</h1>
                <p className="w-[172px] text-[12px]">Directly chat with usin our website</p>
                </div>
            </div>

              {/* sub divs */}

              <div className="flex items-center gap-[10px] mx-auto">
                <img className="w-[100px]" src={image4} alt="" />
                <div>
                    <h1 className="text-[14px] font-semibold ">Custom Ordering</h1>
                <p className="w-[172px] text-[12px]">Order your food just as you Like</p>
                </div>
            </div>
                  

                  {/* sub divs */}

              <div className="flex items-center gap-[10px] mx-auto">
                <img className="w-[100px]" src={image5} alt="" />
                <div>
                    <h1 className="text-[14px] font-semibold ">Save Your Custom Menu</h1>
                <p className="w-[172px] text-[12px]">Save your menu for future order</p>
                </div>
            </div>

              {/* sub divs */}

             <div className="flex items-center gap-[10px] mx-auto">
                <img className="w-[100px]" src={image6} alt="" />
                <div>
                    <h1 className="text-[14px] font-semibold ">Reservation</h1>
                <p className="w-[172px] text-[12px]">Directly reserver table in our website</p>
                </div>
            </div>

                {/* Upper part finish  */}
        </div>

         {/* Lower part of the about page  */}

         <div className="w-[80%] mx-auto">
           <h1 className="text-[25px] font-bold ">Our clients know best</h1>
            <div className="flex items-center justify-between">
                <p className="w-[200px] text-[14px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

            <h1 className="font-semibold">View more...</h1>
            </div>

             </div>
             {/* lower part finish */}


            {/* card start from here */}
           
           {/* All card parent div */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 w-[80%] mx-auto  ">

                {/* each one card div */}
                <div   className="shadow-[0_0_15px_rgba(0,0,0,0.2)] w-[250px] mx-auto  mt-[20px] rounded-[5px]">

                    {/* card upper part */}
                    
              <div className="flex items-center gap-[10px] justify-center pt-[20px]">
                   <img className="w-[50px] h-[50px] rounded-[50%]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9FKvV2vt3otTUnhnrrCKP-hYKKsRuFLTSsZ6f5buBye7-x7hbDkqlhgQygXSYrJAZo5I&usqp=CAU" alt="" />
                   
                     <div>
                    <h1 className="text-[12px] font-semibold ">Lorem ipsum dolor</h1>
                <p className=" text-[10px] ">Lorem ipsum</p>
                </div>

                <div className="text-[14px] flex gap-[5px] ml-[10px]"><IoIosStar className="text-yellow-400"></IoIosStar><h1>4.5/5</h1></div>
              </div>

              <p className="border-b-[2px] border-[#9c97b8] w-[90%] mx-auto mt-[10px]"></p>

              {/* card lower part  */}

              <div className="pb-[10px]">
                <p className="text-[10px] w-[88%] mx-auto mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eros ex, egestas ut arcu vel, faucibus interdum elit. Sed suscipit metus urna, non lobortis urna faucibus nec. Integer mollis lacus feugiat, luctus mauris ut, lacinia tortor.</p>

               <div className="flex items-center gap-[30px] mt-[15px] justify-end w-[90%]">
                 <h1 className="flex items-center gap-[1px] text-[12px] text-[#9c97b8]"><FaHeart></FaHeart>10</h1>

                 <h1 className="flex items-center gap-[1px] text-[12px] text-[#9c97b8]"><BiSolidMessageRoundedDetail></BiSolidMessageRoundedDetail>9</h1>
               </div>


              </div>

                </div>

                {/* each one card div */}
                <div   className="shadow-[0_0_15px_rgba(0,0,0,0.2)] w-[250px] mx-auto  mt-[20px] rounded-[5px]">

                    {/* card upper part */}
                    
              <div className="flex items-center gap-[10px] justify-center pt-[20px]">
                   <img className="w-[50px] h-[50px] rounded-[50%]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9FKvV2vt3otTUnhnrrCKP-hYKKsRuFLTSsZ6f5buBye7-x7hbDkqlhgQygXSYrJAZo5I&usqp=CAU" alt="" />
                   
                     <div>
                    <h1 className="text-[12px] font-semibold ">Lorem ipsum dolor</h1>
                <p className=" text-[10px] ">Lorem ipsum</p>
                </div>

                <div className="text-[14px] flex gap-[5px] ml-[10px]"><IoIosStar className="text-yellow-400"></IoIosStar><h1>4.5/5</h1></div>
              </div>

              <p className="border-b-[2px] border-[#9c97b8] w-[90%] mx-auto mt-[10px]"></p>

              {/* card lower part  */}

              <div className="pb-[10px]">
                <p className="text-[10px] w-[88%] mx-auto mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eros ex, egestas ut arcu vel, faucibus interdum elit. Sed suscipit metus urna, non lobortis urna faucibus nec. Integer mollis lacus feugiat, luctus mauris ut, lacinia tortor.</p>

               <div className="flex items-center gap-[30px] mt-[15px] justify-end w-[90%]">
                 <h1 className="flex items-center gap-[1px] text-[12px] text-[#9c97b8]"><FaHeart></FaHeart>10</h1>

                 <h1 className="flex items-center gap-[1px] text-[12px] text-[#9c97b8]"><BiSolidMessageRoundedDetail></BiSolidMessageRoundedDetail>9</h1>
               </div>


              </div>

                </div>


                {/* each one card div */}
                <div   className="shadow-[0_0_15px_rgba(0,0,0,0.2)] w-[250px] mx-auto  mt-[20px] rounded-[5px]">

                    {/* card upper part */}
                    
              <div className="flex items-center gap-[10px] justify-center pt-[20px]">
                   <img className="w-[50px] h-[50px] rounded-[50%]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9FKvV2vt3otTUnhnrrCKP-hYKKsRuFLTSsZ6f5buBye7-x7hbDkqlhgQygXSYrJAZo5I&usqp=CAU" alt="" />
                   
                     <div>
                    <h1 className="text-[12px] font-semibold ">Lorem ipsum dolor</h1>
                <p className=" text-[10px] ">Lorem ipsum</p>
                </div>

                <div className="text-[14px] flex gap-[5px] ml-[10px]"><IoIosStar className="text-yellow-400"></IoIosStar><h1>4.5/5</h1></div>
              </div>

              <p className="border-b-[2px] border-[#9c97b8] w-[90%] mx-auto mt-[10px]"></p>

              {/* card lower part  */}

              <div className="pb-[10px]">
                <p className="text-[10px] w-[88%] mx-auto mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eros ex, egestas ut arcu vel, faucibus interdum elit. Sed suscipit metus urna, non lobortis urna faucibus nec. Integer mollis lacus feugiat, luctus mauris ut, lacinia tortor.</p>

               <div className="flex items-center gap-[30px] mt-[15px] justify-end w-[90%]">
                 <h1 className="flex items-center gap-[1px] text-[12px] text-[#9c97b8]"><FaHeart></FaHeart>10</h1>

                 <h1 className="flex items-center gap-[1px] text-[12px] text-[#9c97b8]"><BiSolidMessageRoundedDetail></BiSolidMessageRoundedDetail>9</h1>
               </div>


              </div>

                </div> 

                {/* card part finish here */}

                
            </div>

            <h1 className="text-[30px] font-bold text-center mt-[20px]">How was your experience <br />with our restaurant?</h1>

            <div className="flex justify-center gap-[3px]">
              <TfiStar  onClick={() => setStar(star === 1 ? 0 : 1)} className={`text-[30px] ${star > 0 ? "text-yellow-400" : "" }`}></TfiStar>
              <TfiStar onClick={() => setStar(star === 2 ? 1 : 2)} className={`text-[30px] ${star > 1 ? "text-yellow-400" : "" }`}></TfiStar>
              <TfiStar onClick={() => setStar(star === 3 ? 2 : 3)} className={`text-[30px] ${star > 2 ? "text-yellow-400" : "" }`}></TfiStar>
              <TfiStar onClick={() => setStar(star === 
                4 ? 3 : 4)} className={`text-[30px] ${star > 3 ? "text-yellow-400" : "" }`}></TfiStar>
            </div>

            <div className=" flex justify-center mt-[20px]"><button className="bg-orange-600 text-white py-[8px] px-[60px] rounded-[5px] ">Continue</button></div>
        

       </div>
    );
};

export default AboutUs;