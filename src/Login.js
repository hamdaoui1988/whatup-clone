import React from "react"
import './login.css'
import { Button } from '@material-ui/core'
import { auth, provider } from "./firebase"
import { useStateValue } from "./StateProvider"
import { actionTypes } from "./reducer"


function Login() {


    const [state, dispatch] = useStateValue();
    const signIn = () => {
auth
.signInWithPopup(provider)
.then((result) => {
  console.log(result);  
dispatch({
type: actionTypes.SET_USER,
user: result.user,
})
})
.catch((error) => {
alert(error.message);
});
    };

    return (
        <div className="login">
           <div className="login__container">
             <img src="https://cdn.freelogovectors.net/wp-content/uploads/2016/12/wechat-logo.png" alt="" />
               <div className="login__text">
                 <h1>Sign in to Noureddine's Chat</h1>
               </div>

               <Button onClick={signIn}>
                   Sign In Via Google
               </Button>
           </div>
        </div>
    )
}

export default Login
