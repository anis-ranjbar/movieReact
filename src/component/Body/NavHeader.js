import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
import useWindowDimensions from '../windowSize'

export default function NavHeader() {

    const {user , setUser , setSearch} = useContext(UserContext)
    const[scrollY , setScrollY] = useState(() => window.scrollY)

    const {width} = useWindowDimensions()

    console.log(width);
    useEffect(()=>{
        window.addEventListener('scroll',()=>{
            setScrollY(window.scrollY)
        })
    },[])
    
    function handleLogout(){
        localStorage.removeItem('session')
        setUser(null)
    }

    return (
    <nav className={scrollY > 200 && 'navFix'} > 
            <NavLink to='/' style={{width:"fit-content"}}>
                <h2>Night Movies</h2>
            </NavLink>
           {width > 800 ?  (
            <div className='listDetails'>
                <div className='list'>
                    <NavLink> <h4>  Popular Movie</h4> </NavLink>
                    <NavLink> <h4>  Imdb Movies  </h4> </NavLink>
                    <NavLink> <h4>  Imdb Series  </h4> </NavLink>
                    <NavLink> <h4>  Genres       </h4> </NavLink>
                    <button className='search-btn' onClick={()=>setSearch(true)} > Search </button>   
                    <NavLink> <h4>  About us     </h4> </NavLink>
                </div> 
                <div>
                {user ? ( <div className='LogIn-out'> 
                            <h3 style={{color:'#2d2b2b'}}> {user.username} </h3>
                            <button className='button' onClick={handleLogout}>Log out</button>
                        </div> ) 
                : ( <NavLink className='Login' to='/LogIn'>Log In</NavLink> )
                }
                </div>
            </div>
             ) : (
                <div class="hamburger-lines">
                    <span class="line line1">.</span>
                    <span class="line line2">.</span>
                    <span class="line line3">.</span>
                </div> 
             ) }
    </nav>
  )
}
