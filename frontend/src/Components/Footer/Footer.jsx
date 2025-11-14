import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
import { ImSpoonKnife } from "react-icons/im";
import { TbTruckDelivery } from "react-icons/tb";
import { MdShoppingBag } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className="mt-[30px] min-w-full lg:w-[1500px] xl:w-[100%]">
            <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
  <aside>

    {/* website name and about website */}
    
    <h1 className="text-[35px] font-semibold org flex items-center gap-[10px]"><ImSpoonKnife></ImSpoonKnife>DineSmart</h1>
    <p className="md:w-[250px] lg:w-[350px] mt-[20px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Quisque convallis lobortis risus, sed varius elit laoreet eu.
Morbi vehicula nulla eu molestie egestas. Quisque interdum,
tellus eget vulputate lacinia, ligula arcu elementum tortor,
in blandit dolor odio et nibh. Sed ecitur nibus fermentum.
    </p>

    <div className="flex gap-[20px] mt-[20px] org">
        <FaTwitter className="text-[25px]"></FaTwitter>
       <AiOutlineInstagram className="text-[25px]"></AiOutlineInstagram>
      <FaFacebookF className="text-[25px]"></FaFacebookF>
    </div>
  </aside>

{/* About the company */}

  <nav className="text-[18px]  w-[120px]">
    <h6 className=" text-gray-700 text-[20px] font-semibold org">Quick Links</h6>
    <a className="link link-hover mt-[10px]">Home</a>
     <a className="link link-hover mt-[10px]">Menu</a>
    <a className="link link-hover mt-[10px]">Table</a>
  </nav>

  {/* about the services */}
  
  <nav className="text-[18px] w-[120px]">
    <h6 className=" text-gray-700 text-[20px] font-semibold org">Order Type</h6>
    <h1 className="flex items-center gap-[5px] mt-[10px] "><ImSpoonKnife className="org"></ImSpoonKnife>Dine In</h1>
     <h1 className="flex items-center gap-[5px] mt-[10px] "><TbTruckDelivery className="org"></TbTruckDelivery>Delivery</h1>
     <h1 className="flex items-center gap-[5px] mt-[10px] "><MdShoppingBag className="org"></MdShoppingBag>Take Away</h1>

  </nav>
   <nav className="text-[18px]">
    <h6 className=" text-gray-700 text-[20px] font-semibold org">Contact Info</h6>
    <h1 className="flex items-center gap-[5px] mt-[10px] "><MdEmail className="org"></MdEmail>info@dinesmart.com</h1>
     <h1 className="flex items-center gap-[5px] mt-[10px] "><FaPhone className="org"></FaPhone>{"+1(555)123-4567"}</h1>
     <h1 className="flex items-center gap-[5px] mt-[10px] "><FaLocationDot className="org"></FaLocationDot>123 Restaurant St, Food City</h1>

  </nav>
</footer>
        </div>
    );
};

export default Footer;