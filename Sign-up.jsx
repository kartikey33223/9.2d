import { addDoc, collection } from "firebase/firestore"
import { useState } from "react"
import { db } from "../init-firebase"
import { useNavigate } from "react-router-dom"


function SignUp(){

    const userRef = collection(db, "User-data");
    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName : "",
        lastName : "",
        emailId : "",
        password : "",
    });
    
    const {firstName, lastName, emailId, password} = user;

    const handleChange = (event)=>{
        const {name, value} = event.target;
        setUser((preValue) => {
            return{
                ...preValue,
                [name] : value
            }
        })
    }

    const handleSubmit = async(event) =>{

        event.preventDefault();

    try{        

        //const salt = await bcrypt.genSalt(10);
        
        //const pass = await bcrypt.hash(user["password"], salt);
        
        /*
        await addDoc(userRef, { firstName,
                        lastName,
                        emailId,
                        password : pass
        }).then(response=>{
            console.log(response)
            navigate("/login")
        }).catch(error=>{
            console.log(error.message)
        })

        I commented the code for the bcrypt as it was showing error 
        this is the code for hashing the password

        */


        await addDoc(userRef, { user }).then(response=>{
            console.log(response)
            navigate("/login")
        }).catch(error=>{
            console.log(error.message)
        })
    }
    catch(err){
        console.log(err.message);
    }
}

    return(
        <div className="Login">

            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <div className="input-label">
                <label htmlFor="firstName">First Name</label>
                <input name="firstName" id="firstName" type="text" value={firstName} onChange={handleChange} placeholder="Input First Name" required/>
                </div>
                <div className="input-label">
                <label htmlFor="lastName">Last Name</label>
                <input name="lastName" id="lastName" type="text" value={lastName} onChange={handleChange} placeholder="Input Last Name" required/>
                </div>
                <div className="input-label">
                <label htmlFor="emailId">Email ID</label>
                <input name="emailId" id="emailId" type="email" value={emailId} onChange={handleChange} placeholder="Input email id" required/>
                </div>
                <div className="input-label">
                <label htmlFor="password">Password</label>
                <input name="password" id="password" type="password" value={password} onChange={handleChange} placeholder="Input Password" required/>
                </div>
                <button type="submit" className="login-button">Register</button>
            </form>

        </div>
    )
}



export default SignUp