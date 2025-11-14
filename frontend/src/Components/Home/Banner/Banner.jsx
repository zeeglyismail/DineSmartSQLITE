import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import banner2 from "../../Image/banner2.webp";
import banner4 from "../../Image/banner4.png";
import banner5 from "../../Image/banner5.png";
import banner6 from "../../Image/banner6.gif";


import slider1 from "../../Image/DineSmartSpecial1.png";
import slider2 from "../../Image/DineSmartSpecial2.png";
import slider3 from "../../Image/DineSmartSpecial3.png";
import slider4 from "../../Image/DineSmartSpecial4.png";

import { useEffect, useRef, useState } from "react";

import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
const base_api = import.meta.env.VITE_BACKEND_BASE_API;

const Banner = () => {


     let sliderRef1 = useRef(null);
  const next = () => {
    sliderRef1.slickNext();
  };
  const previous = () => {
    sliderRef1.slickPrev();
  };


     let sliderRef2 = useRef(null);
  const next2 = () => {
    sliderRef2.slickNext();
  };
  const previous2 = () => {
    sliderRef2.slickPrev();
  };

 var settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    arrows : false,
    

  };


var settings2 = {
  dots: false,
     className: "center",
  centerMode: false, 
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: false,
 

  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
    { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } }
  ]
};

  // This part is for get secial data from backend 

  
    const [menudata , setmenuData] = useState([]);
      
  
  
          useEffect( () => {
          
            fetch(`${base_api}/api/menu/?list_type=special_menu`, {
              method: "GET",
              credentials: "include",
              headers: {
                "content-type": "application/json",
              },
            })
              .then(async (res) => {
                const contentType = res.headers.get("content-type") || "";
                if (!res.ok) {
                  const text = await res.text();
                  console.error("Menu fetch failed (status:", res.status, "):", text);
                  throw new Error(`Menu fetch failed with status ${res.status}`);
                }

                // If server returned HTML (e.g. index.html) we'll see '<!doctype' — don't call res.json()
                if (contentType.includes("text/html")) {
                  const text = await res.text();
                  console.error("Expected JSON but received HTML. Response body:", text.slice(0, 200));
                  throw new Error("Expected JSON but received HTML response. Check base_api and server routes.");
                }

                if (contentType.includes("application/json")) {
                  return res.json();
                }

                // Fallback: try to parse JSON but guard against SyntaxError
                const text = await res.text();
                try {
                  return JSON.parse(text);
                } catch (err) {
                  console.error("Failed to parse response as JSON:", text.slice(0, 200));
                  throw err;
                }
              })
              .then((data) => {
                console.log(menudata);
                setmenuData(data);
              })
              .catch((err) => {
                console.error("Error fetching special_menu:", err);
              });
          } ,[setmenuData]);

          console.log(menudata);

          const nav = useNavigate();

          const handleNavigation = (id) => {

          console.log(id);

            nav(`/menu/${id}`);

          }

          const [dragged, setDragged] = useState(false);

    return (
        <div className=" md:w-[700px] lg:w-[1100px] mx-auto mt-[50px]">

           <div className="flex items-center justify-between px-[10px]">
             <FaCircleArrowLeft onClick={previous} className="size-[40px] org relative top-[170px] z-10"></FaCircleArrowLeft>
            <FaCircleArrowRight onClick={next} className="size-[40px] org relative top-[170px] z-10"></FaCircleArrowRight>
           </div>
            
       <Slider {...settings1} ref={slider => {
          sliderRef1 = slider;
        }}>
      <div>
        <img className="h-[300px] w-full  " src={banner2} alt="" />
      </div>

      <div>
       <img className="h-[300px] w-full " src={banner4} alt="" />
      </div>

      <div>
       <img className="h-[300px] w-full " src={banner5} alt="" />
      </div>

      <div>
       <img className="h-[300px] w-full " src={banner6} alt="" />
      </div>
    </Slider>

     
<section className="slider-container ">
 <Slider {...settings2} ref={slider => { sliderRef2 = slider; }}> 
  {menudata.map(item => (
    <div
      key={item.id}
      className="!w-[180px] md:!w-[220px] lg:!w-[210px]"
    >
      <Link
        to={`/menu/${item.id}`}
        className="border-2 border-[#FF6440] flex items-center gap-[10px] px-[10px] cursor-pointer"
      >
        <img
          className="h-[40px] w-[40px]"
          src={item.picture}
          alt={item.name}
        />
        <h1 className="text-black dark:text-black">{item.name}</h1>
      </Link>
    </div>
  ))}
</Slider>
</section>

<div className=" relative left-[340px] md:left-[675px] lg:left-[1075px] mt-[-47px] border-black w-[50px]">
    <IoIosArrowDroprightCircle onClick={next2} className="size-[40px] org z-10 "></IoIosArrowDroprightCircle>
   </div>

        </div>
    );
};

export default Banner;