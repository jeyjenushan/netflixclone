import React, { useEffect, useRef, useState } from 'react'
import "./TitleCards.css"
import cards_data from "../../assets/cards/Cards_data"





const TitleCards = ({title,category}) => {
 
  const[apiData,setApiData]=useState([]);

  const cardsRef=useRef()
const handleWheel=(event)=>{
  event.preventDefault()
  cardsRef.current.scrollLeft += event.deltaY;
}

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjQxNjI3OThhM2YyYjlmZmY0MDAyNTJiN2IzZTVkNSIsIm5iZiI6MTczNDg3MTQ0MC4yMTEsInN1YiI6IjY3NjgwOTkwZjkyNmJlMDNjYzc0ZmViOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XvhvVnQ5U8T1rPGqyOlqC2o4MMsYASYW1RC1hlygR9o'
  }
};





useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));




cardsRef.current.addEventListener('wheel',handleWheel);
},[])
  return (
    <div className='titlecards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {
         apiData.map((card,index)=>(
        <div className='card' key={index}>
          <img src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`}/>
          <p>{card.original_title}</p>

        </div>
          ))
        }
      </div>
      
    </div>
  )
}

export default TitleCards
