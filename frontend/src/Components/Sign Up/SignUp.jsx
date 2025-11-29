import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useState } from "react";
const base_api = import.meta.env.VITE_BACKEND_BASE_API;

const SignUp = () => {
  const navigate = useNavigate();
  const [seen, setSeen] = useState("password");

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;

    const signUpInfo = { email, password, name };

    console.log(signUpInfo);

    fetch(`${base_api}/api/auth/customer-register/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(signUpInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.message === "Registration successful.") {
          Swal.fire({
            title: "Successful",
            text: "Your registration is successfully done",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/signup/active_account");
            }
          });
        }

        if (data.message === "Invalid request.") {
          Swal.fire({
            title: "Error!",
            text: "This account is already registered",
            icon: "error",
          });
        }

        e.target.reset();
      });
  };

  return (
    <div className="dark:text-black">
      {/* Text part */}
      <h1 className="text-[30px] mt-[80px] font-bold text-center">
        Log In / Sign Up
      </h1>

      {/* Form part */}
      <div>
        <form
          onSubmit={handleSignUp}
          className="border-2 border-[#FF6440] w-[90%] md:w-[50%] lg:w-[32%] mx-auto py-[10px] pl-[20px] pb-[30px] rounded-[10px] mt-[40px] mb-[40px] shadow-[0_0_15px_rgba(0,0,0,0.4)]"
        >
          <h1 className="text-[22px] font-bold mt-[10px]">Email</h1>
          <input
            type="email"
            name="email"
            className="border-[2px] border-[#FF6440] w-[90%] rounded-[8px] mt-[10px] py-[2px] pl-[10px] focus:outline-none dark:bg-white"
            required
          />

          <h1 className="text-[22px] font-bold mt-[15px]">Name</h1>
          <input
            type="text"
            name="name"
            className="border-[2px] border-[#FF6440] w-[90%] rounded-[8px] mt-[10px] py-[2px] pl-[10px] focus:outline-none dark:bg-white"
            required
          />

          <h1 className="text-[22px] font-bold mt-[15px]">Password</h1>
          <div className="flex">
            <input
              type={seen}
              name="password"
              className="border-[2px] border-[#FF6440] w-[90%] rounded-[8px] mt-[10px] py-[2px] px-[10px] focus:outline-none dark:bg-white"
              required
            />

            {seen === "password" ? (
              <IoEye
                onClick={() => setSeen("text")}
                className="text-[25px] mt-[13px] ml-[-40px] cursor-pointer"
              />
            ) : (
              <IoEyeOff
                onClick={() => setSeen("password")}
                className="text-[25px] mt-[13px] ml-[-40px] cursor-pointer"
              />
            )}
          </div>

          <div className="flex justify-center">
            <button className="border-[2px] border-[#FF6440] py-[3px] px-[30px] mt-[50px] rounded-[12px] font-bold">
              Sign Up
            </button>
          </div>

          <h1 className="text-[16px] font-bold text-center mt-[20px]">
            Already a user?{" "}
            <Link to={"/signin"}>
              <span className="org underline">Sign In</span>
            </Link>
          </h1>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
