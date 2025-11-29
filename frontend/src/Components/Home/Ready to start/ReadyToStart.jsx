import { Link } from "react-router-dom";


const ReadyToStart = () => {
    return (
        <div className="bgorg py-[30px] w-[95%] md:w-[750px] lg:w-[1100px] mx-auto rounded-[5px] px-[20px] md:px-0">
            <h1 className="text-white font-semibold text-[20px] text-center">Ready to Start Your DineSmart Journey?</h1>
            <p className="text-white text-[13px] text-center md:w-[35%] mx-auto">Join thousands of food lovers who have discovered the perfect way to dine. Create your account today and start building your ideal meals.</p>

            <div className="flex items-center justify-center gap-[20px] mt-[10px]">
                <Link to={"/signup"}><button className="bg-white text-black px-[10px] py-[5px] rounded-[5px] font-bold">Sign Up Now</button></Link>
                <button className="border-2 border-white text-white px-[10px] py-[5px] rounded-[5px] font-bold">Browse Menu</button>
            </div>
        </div>
    );
};

export default ReadyToStart;