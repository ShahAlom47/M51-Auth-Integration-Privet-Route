import { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import auth from "../firebase.config";

const Register = () => {
    const [logInError, setLogInError] = useState('');
    const [logInSuccess, setLogInSuccess] = useState('');
    const [showPass, setShowPass] = useState(false);
    const navigate =useNavigate();
    const {creaeUser}= useContext(AuthContext);

    const handelRegister = (e) => {
        setLogInError('');
        setLogInSuccess('');

        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.trams.checked;

        // console.log(email, password, accepted);
        if(password.length<6){
            setLogInError('password must be 6 character or longer')
            return;
        }
        else if(!accepted){
            setLogInError('Please Check Our Trams')
            
        }
        else if(!/[A-Z]/.test(password)){
            setLogInError('Please use upper case in your password  ')

        }

     
            creaeUser(email,password)

            .then((userCredential) => {
                const user = userCredential.user;
                setLogInSuccess('Create User Successfully')
                console.log(user);
                updateProfile(auth.currentUser, {
                    displayName: name , photoURL: "https://example.com/jane-q-user/profile.jpg"
                  }).then(() => {
                    console.log(" Profile updated!");
                    
                  }).catch((error) => {
                    setLogInError('Nam a  kuno  somossa ace ',error)
                  });
                  navigate('/')
            })
            .catch((error) => {
                 const errorMessage = error.message;
                 setLogInError(errorMessage)
            });


    }



    return (
        <div>
            <h1 className="text-2xl font-semibold text-center py-2 my-4 border-b-4 w-4/12 m-auto ">Please Register </h1>

            <div className="flex justify-center items-center ">


                <form onSubmit={handelRegister} className="bg-gray-200 rounded-lg p-5 m-auto w-6/12 space-y-2 flex flex-col justify-center ">
                    <input className="p-4 rounded-lg" type="text" name="name" id="" placeholder=" Your Name" required />
                    <br />
                    <input className="p-4 rounded-lg" type="email" name="email" id="" placeholder="Enter Your Email.." required />
                    <br />
                    <div className="flex relative">
                        <input className="p-4 rounded-lg w-full" type={showPass ? 'text' : "password"} name="password" id="" placeholder="Password" required />
                        <p onClick={() => { setShowPass(!showPass) }} className="absolute top-1/3 right-3" >{showPass ? <FaEye /> : <FaEyeSlash />}</p>
                    </div>
                    <br />
                    <div className=" flex items-center gap-3 ml-3 pb-2">
                        <input type="checkbox" name="trams" id="trams" />
                        <label htmlFor="trams"> <a href="#" target="blenk">Accept Our trams</a></label>
                    </div>
                    <input className="btn btn-secondary" type="submit" value="Register" />
                    {
                        logInError && <p className="text-red-600">{logInError}</p>
                    }
                    {
                        logInSuccess && <p className="text-green-600">{logInSuccess}</p>
                    }
                    <div className="flex justify-between">
                        <Link to={'/login'} className="text-green-900  btn btn-link font-semibold" >Already Have An Account</Link>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Register;