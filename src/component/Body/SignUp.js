import React, { useState } from 'react'

import twitter from '../icon/twitter.png'
import google from '../icon/google.png'
import telegram from '../icon/telegram.png'

let icon = [
    { src : telegram },
    { src : google },
    { src : twitter },
]


export default function SignUp({setShowSignIn , setShowLogIn}) {
    
    const toggleSignIn = () => {
        setShowLogIn(false);
        setShowSignIn(true)
      };

    const [user , setUser ] = useState({
        username: "",
        email : "",
        password : "",
    })
    
    function handleChange (e) {

        setUser({...user , [e.target.name] : e.target.value })
        console.log(user.password);
    }

    const[showAlert ,setShowAlert ] = useState(false)

    const[hideAlert ,setHideAlert ] = useState(false)

    const[password , setPassword ] = useState({
        password : ""
    })


    function handleSubmit(e) {

        if(user.username.length < 4 ){
            setShowAlert(true)
            setHideAlert(false)
            e.preventDefault()
        }
        else if(!user.email){
            setShowAlert(true)
            setHideAlert(false)
            e.preventDefault()
        }
        else if(user.password.length < 8){
            setShowAlert(true)
            setHideAlert(false)
            e.preventDefault()
        }
        else if(user.password != password.password )
        {
            setShowAlert(true)
            setHideAlert(false)
            e.preventDefault()
        }
    }

    function handlePassword(e) {
        setPassword({...password , [e.target.name] : e.target.value })
        console.log(password)
    }

const SamePassword = [user.password == password.password]

  return (
    <section className='signup'>

        <div className={showAlert ? hideAlert ?  "hide-Alert alert" : "show-Alert alert" : 'alert'}>  
            <span className="closebtn" onClick={() => setHideAlert(true) } >&times;</span> 
            <strong>Danger!</strong>

            {user.username.length < 4 ? "username should be more than 4 character" : !user.email ? "Please Write your email" : 
            user.password.length  < 8 ? "your password more than 8 character" : 
            user.password != password.password ? "Your password NOT same" : "Done!" }

        </div>
    
        <div className='box-signup'>
        
            <h2 className='welcomeSignIN' > Welcome to <br /> <span style={{fontFamily:  "KanitBold" , color : "#fdc13b" }}>Night </span> Movie </h2>
            <h3> Watch and shars your best movie </h3>

            <form className='signinForm'>

                <input type="text" className='input' value={user.username} onChange={handleChange} name = 'username' placeholder='Username'  />
                <input type="email" className='input' value={user.email} onChange={handleChange} name='email' placeholder='Write your Email' />
                <input type="password" className='input' value={user.password} onChange={handleChange} name ="password" placeholder='Password' />
                
                <input type="password" className='input' value={password.password} onChange={handlePassword}  name ="password" placeholder='again Password' />
                
                <input type="submit" className='button' onClick={handleSubmit}   value='Create Account'
                style={{opacity: user.username.length > 3 &&  user.email && user.password.length > 7 && user.password == password.password ? "1" : "0.8" }} />
            </form>

            <h3> --Sign In with-- </h3>

            <div className='icon'>
            {
                icon.map((item) => <a href='#'> <img src = {item.src} /> </a> )
            }            
            </div>

            <h3>Do have an account? <button className='signupLink' onClick={toggleSignIn} >Log In</button> </h3>

        </div>
    
    </section>
  )
}
