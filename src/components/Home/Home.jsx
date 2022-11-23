import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import './home.css'

export default function Home() {
  const [allGames, setallGames] = useState([]);
  let navigate = useNavigate()
  function getDetails(id)
  {
    navigate(`/gamedetails/${id}`)
  }
  async function getGames() {
    let { data } = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games',
      {
        params: {'sort-by': 'popularity'},
        headers: {
          'X-RapidAPI-Key': 'fc42eedff7msh1176cf883aee197p199b36jsn12e2a3062d67',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
      })
    setallGames(data);
  }
  useEffect(() => {
    getGames();


  }, [])

  return <>
  <div className='bg-games text-center'>
    <h1 className='text-white-50'>Find & track the best <span className='text-info'>free-to-play </span>games!</h1>
    <p className='text-muted'>Track what you've played and search for what to play next! Plus get free premium loot!</p>
    <Link to={"/allgames"}><button className='btn btn-games'>Browser Games</button></Link>
  </div>
    <section className='container mt-4'>
<h3 className='text-white-50 mb-4'><i className="fa-solid fa-robot"></i> Personalized Recommendations</h3>
  <div className="row">
   {allGames.length > 0? allGames.slice(0,3).map((game , idx)=>   <div key={idx} onClick={()=> getDetails(game.id)} className="col-md-4">
    <img className='w-100' src={game.thumbnail} alt="" />
    <div className='d-flex justify-content-between align-items-center gameBody shadow p-3'>
      <h4>{game.title}</h4>
      <span className='free p-2'>FREE</span>
    </div>
    </div> ) :<Loading/>} 
  </div>
</section>
  </>
}

