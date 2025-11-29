import imag1 from "../../Image/NoOffers.png";


const MyOffer = () => {
    return (
        <div>
            <img className="w-[400px] h-[400px] mx-auto" src={imag1} alt="" />

            <h1 className="text-[25px] font-semibold org text-center mt-[40px]">No Offers Right Now</h1>
        </div>
    );
};

export default MyOffer;