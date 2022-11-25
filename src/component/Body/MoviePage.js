import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useParams } from 'react-router-dom'
import { poster } from '../Apiconfig/ApiConfig';

import LoadingImg from '../../img/loading.gif'

import { UserContext } from '../Context/UserContext'

import { AiOutlineUnorderedList , AiOutlineHeart , AiOutlineEye , AiOutlineStar, AiOutlinePlayCircle } from "react-icons/ai";

import imdbpic from '../../img/imdb.png'
import SeriesCast, { useStateMovie } from './SeriesCast';
import { toast } from 'react-toastify';

// const WatchListState = {
//     movieId : [],
//     WatchList : [],
// }

// function AppReducer(state, action){
//     console.log(state);
//     switch(action.type){
//         case "AddWatchlist":
//             const findMovieId = state.find(o => o.id === action.payload.id )
//             const toggleMovieId = findMovieId ? true : false
//             console.log(toggleMovieId);
//             localStorage.setItem('WatchLists' , JSON.stringify(state))
//             if (!toggleMovieId) {
//                 return [...state , action.payload]
//             }
//             else{
//                 return state
//             }

            
//     }
// }
// function amin(){
//     return localStorage.getItem('WatchLists') ? JSON.parse(localStorage.getItem('WatchLists')) : []
// }

export default function MoviePage() {

    // const [state , dispatch] = useReducer(AppReducer , null , amin)

    const [Loading , setLoading] = useState(true)
    const {id} = useParams()
    
    const {user, session, favoriteList } = useContext(UserContext)

    const [WatchList, setWatchList] = useState(false)
    const [Movie, setMovie] = useState([])
    const [favorite, setFavorite] = useState(false)


    async function MovieData(){
        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=57309969f55d0b3d29084effa0d8081c&language=en-US&append_to_response=videos,images`).finally(() => setLoading(false))
        setMovie(data)
    }
    
    
    async function handleFavorite(){
        // console.log(favorite)
        const favoriteData = await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=57309969f55d0b3d29084effa0d8081c&session_id=${session}`,{
                media_type : "movie",
                media_id : Movie.id,
                favorite : favorite
            })
    }

    async function handleWatchList(){
        const data = await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=57309969f55d0b3d29084effa0d8081c&session_id=${session}`,{
            media_type : 'movie',
            media_id : Movie.id,
            watchlist : WatchList
        })
    }
    
    useEffect(()=>{
        MovieData()
        // amin()
        // handleFavorite()
        // handleWatchList()
    },[id])
    
    
  return (
    <section>

    {Loading &&
        <div className='LoadingMoviePage'> <img src={LoadingImg} className='LoadingMovie'/> </div>
    }  
    
    <div className='Movie' style={{backgroundImage: `linear-gradient(to bottom , rgba(0, 0, 0, 0.6) , rgba(0, 0, 0, 0.4) , rgba(0, 0, 0, 0.2)) , url(https://image.tmdb.org/t/p/original${Movie.backdrop_path})`}}>
        <img src={poster(Movie.poster_path)} className='MovieImg' />        
        <div className='MovieDetails'>
            <h1>{Movie.title}  ({parseInt(Movie.release_date)})</h1>

            <div className='MoviePageOption'>
                <div className='MoviePageImdb'>
                    <img src={imdbpic} style={{width:40}} />
                    <h3> 10 / {Movie.vote_average} </h3>
                </div>
                <div className='icons'>
                    <AiOutlineUnorderedList className='iconMovie'/>    
                    <AiOutlineHeart className='iconMovie'  />      
                    <AiOutlineEye className='iconMovie'  onClick={handleWatchList}  />        
                    <AiOutlineStar className='iconMovie' />   
                    <AiOutlinePlayCircle className='iconMovie' />   
                      
                </div>
            </div> 
            <h3 className='overview'>{Movie.overview}</h3>
        </div>
    </div>

        <SeriesCast />
    
    </section>
  
 )}
