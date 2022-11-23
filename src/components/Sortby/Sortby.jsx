import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import '../Allgames/allgames.css'
import Loading from '../Loading/Loading';

export default function Sortby() {
    const [allGames, setallGames] = useState([]);
    const [count, setcount] = useState(20);
    let navigate = useNavigate()
    function getDetails(id)
    {
      navigate(`/gamedetails/${id}`)
    }
    let {path} = useParams();
    async function getGames() {
        let { data } = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games',
            {
                params: {'sort-by': path},
                headers: {
                    'X-RapidAPI-Key': 'fc42eedff7msh1176cf883aee197p199b36jsn12e2a3062d67',
                    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                }
            })
        setallGames(data);
    }
    function browseGames()
    {
        let newcount = count
        newcount+=20
        
        setcount(newcount)
    }
    useEffect(() => {
        getGames();


    }, [path])

    return <>
        <section className='container my-4  text-center'>
            <div className="row g-4 ">
                {allGames.length > 0? allGames.slice(0, count).map((game, idx) => <div key={idx} onClick={()=> getDetails(game.id)} className="col-md-3">
                    <img className='w-100' src={game.thumbnail} alt="" />
                    <div className='gameBody shadow p-3'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h4 className='text-truncate text-white-50'>{game.title}</h4>
                            <span className='free p-2'>FREE</span>
                        </div>
                        <p className='text-muted text-truncate'>{game.short_description}</p>
                            <div className="d-flex justify-content-between align-items-center"><i className="fa-solid fa-square-plus text-white-50"></i>
                                <div>
                                    <span className='category px-2 rounded-3 me-2'>{game.genre}</span>
                                    {game.platform === 'PC (Windows)' ? <i className="fa-brands fa-windows text-secondary"></i> : <i className="fa-brands fa-chrome text-secondary"></i>}
                                </div>
                            </div>
                    </div>
                  </div>) : <Loading/>}
                </div>
               {count>allGames.length? null : <><button className='btn btn-games mt-4' onClick={browseGames}>Browser Games</button></>} 
        </section>
    </>
}


