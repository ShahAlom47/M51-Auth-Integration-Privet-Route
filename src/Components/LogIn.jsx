import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { AuthContext } from "../Auth Provider/AuthProvider";


const LogIn = () => {
    const [showPass, setShowPass] = useState(false)
    const [logInError, setLogInError] = useState(null)
    const [logInSuccess, setLogInSuccess] = useState(null)
    const navigate =useNavigate();


    const { loginUser } = useContext(AuthContext);

    const handelLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        // reset message 
        setLogInError(null);
        setLogInSuccess(null)
        // console.log(email, password);

        loginUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setLogInSuccess('Login  Successfully')
                e.target.reset();
                console.log(user);
                navigate('/')

            })
            .catch((error) => {
                const errorMessage = error.message;
                setLogInError(errorMessage)
            });



    }

    const forgetPassHandel = (e) => {
        e.preventDefault();
        //   forget ar kaj apadoto kora hoyni 
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold text-center py-2 my-4 border-b-4 w-4/12 m-auto ">Please LogIn </h1>

            <div className="flex justify-center items-center ">


                <form onSubmit={handelLogin} className="bg-gray-200 rounded-lg p-5 m-auto w-6/12 space-y-2 flex flex-col justify-center ">
                    <input
                        className="p-4 rounded-lg"
                        // ref={forgetRef}
                        type="email" name="email"
                        id=""
                        placeholder="Enter Your Email..."
                        required
                    />
                    <br />
                    <div className="flex relative">
                        <input className="p-4 rounded-lg w-full" type={showPass ? 'text' : "password"} name="password" id="" placeholder="Password" required />
                        <p onClick={() => { setShowPass(!showPass) }} className="absolute top-1/3 right-3" >{showPass ? <FaEye /> : <FaEyeSlash />}</p>
                    </div>
                    <br />
                    <input className="btn btn-primary" type="submit" value="LogIn" />
                    {
                        logInError && <p className="text-red-600">{logInError}</p>
                    }
                    {
                        logInSuccess && <p className="text-green-600">{logInSuccess}</p>
                    }

                    <div className="flex justify-between">
                        <button onClick={forgetPassHandel} className="text-green-900 btn btn-link  font-semibold" > Forget Password</button>
                        <Link to={'/register'} className="text-green-900  btn btn-link font-semibold" >Create a New Accoutnt</Link>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default LogIn;
