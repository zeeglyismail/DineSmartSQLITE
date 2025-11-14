

const HowItWork = () => {
    return (
        <div className="mt-[100px] mb-[50px]">
             <h1 className="text-[30px] text-center font-bold text-black dark:text-black ">How It Work</h1>

            <h1 className="text-[20px] text-center  text-gray-500">Getting your perfect meal is easy as 1-2-3</h1>

            {/* Card start from here  */}

            <div className="flex flex-col md:flex-row items-center justify-center mt-[30px] text-black dark:text-black">

                <div className=" lg:w-[420px] px-[10px] mt-[30px]">
                    <h1 className="bgorg w-[60px] h-[60px]  text-white text-[30px] font-bold flex items-center justify-center rounded-[50%] mx-auto">1</h1>
                      
                      <h1 className="text-[21px] font-bold text-center mt-[10px]">Choose Your Base</h1>

                      <p className="text-center text-[17px]">Select from our menu items like burgers, pizzas, salads,and more to start building your perfect meal.</p>
                </div>

                 <div className=" lg:w-[420px] px-[10px] mt-[30px]">
                    <h1 className="bgorg w-[60px] h-[60px]  text-white text-[30px] font-bold flex items-center justify-center rounded-[50%] mx-auto">2</h1>
                      
                      <h1 className="text-[21px] font-bold text-center mt-[10px]">Customize Ingredients</h1>

                      <p className="text-center text-[17px]">Add, remove, or multiply ingredients to create your ideal combination. Watch the price update in real-time.</p>
                </div>

                 <div className=" lg:w-[420px] px-[10px] mt-[30px]">
                    <h1 className="bgorg w-[60px] h-[60px]  text-white text-[30px] font-bold flex items-center justify-center rounded-[50%] mx-auto">3</h1>
                      
                      <h1 className="text-[21px] font-bold text-center mt-[10px]">Place Your Order</h1>

                      <p className="text-center text-[17px]">Choose dine-in, delivery, or take-away, then complete your
secure payment to enjoy your custom meal..</p>
                </div>
            </div>
        </div>
    );
};

export default HowItWork;