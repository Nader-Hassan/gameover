import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { EffectCreative , Autoplay , Keyboard} from "swiper";
import PageNotFound from '../PageNotFound/PageNotFound';
import './gamedetails.css'

export default function Gamedetails() {
    let {path} = useParams();
    const [details, setdetails] = useState([])
    const [idError, setidError] = useState(null)
    console.log(idError);
    async function getDetails()
    {
        let { data } = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/game',
        {
            params: {id: path},
            headers: {
                'X-RapidAPI-Key': 'fc42eedff7msh1176cf883aee197p199b36jsn12e2a3062d67',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        }).catch((error)=>setidError(error.response.status))
        setdetails(data)
    }
    console.log(details)
    useEffect(() => {
        getDetails()
    
   
    }, [])
    
  return <>
 {idError === 404? <PageNotFound/> :  <div className="container mt-4 details">
    <div className="row">
        <div className="col-md-4">
            <img className='w-100' src={details.thumbnail} alt="" />
            <div className='d-flex justify-content-between p-2'><span className='free text-white-50 py-2 px-3 rounded-2'>FREE</span><a className='w-75 ' target={'_blank'} href={details.game_url} rel="noreferrer"><button className='btn text-white fw-bolder w-100'>PLAY NOW <i className="fa-solid fa-right-to-bracket"></i></button></a></div>
        </div>
        <div className="col-md-8 text-white-50">
            {<h2 className='h1'>{details.title}</h2>}
            <h5>About {details.title}</h5>
            {<p>{details.description}</p>}
          {details.minimum_system_requirements? <>
          <h5>Minimum System Requirements</h5>
          <ul className='p-0'>
            <li><span className='fw-bold'>Graphics : </span>{details.minimum_system_requirements.graphics}</li>
            <li><span className='fw-bold'>Memory : </span>{details.minimum_system_requirements.memory}</li>
            <li><span className='fw-bold'>Os : </span>{details.minimum_system_requirements.os}</li>
            <li><span className='fw-bold'>Processor : </span>{details.minimum_system_requirements.processor}</li>
            <li><span className='fw-bold'>storage : </span>{details.minimum_system_requirements.storage}</li>
            </ul>
          </>:null}








          {details.screenshots ?
            <><h3>{details.title} Screenshots</h3><Swiper
              effect={"creative"}
              spaceBetween={10}
              slidesPerView={"auto"}
              centeredSlides={true}
              grabCursor={true}
              loop={true}
              loopFillGroupWithBlank={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              keyboard={{
                enabled: true,
              }}
              creativeEffect={{
                prev: {
                  shadow: true,
                  translate: [0, 0, -400],
                },
                next: {
                  translate: ["100%", 0, 0],
                },
              }}
              modules={[Autoplay, EffectCreative, Keyboard]}
              className="mySwiper"
            >
              {details.screenshots.map((img, index) => <SwiperSlide key={index}><img className='img-fluid' src={img.image} alt="" /></SwiperSlide>)}
            </Swiper></> : null}




























          <div className="row">
            <h3 className='mt-5 mb-3'>Additional Information</h3>
            <div className="col-6 col-md-6 col-lg-4">
                <span className='text-secondary'>Title</span>
                <p>{details.title}</p>
            </div>
            <div className="col-6 col-md-6 col-lg-4">
                <span className='text-secondary'>Developer</span>
                <p>{details.developer}</p>
            </div>
            <div className="col-6 col-md-6 col-lg-4">
                <span className='text-secondary'>Publisher</span>
                <p>{details.publisher}</p>
            </div>
            <div className="col-6 col-md-6 col-lg-4">
                <span className='text-secondary'>Release-date</span>
                <p>{details.release_date}</p>
            </div>
            <div className="col-6 col-md-6 col-lg-4">
                <span className='text-secondary'>Genre</span>
                <p>{details.genre}</p>
            </div>
            <div className="col-6 col-md-6 col-lg-4"><span className='text-secondary'>Platform</span><p>{details.platform === 'Windows' ?<>
            <i className="fa-brands fa-windows text-secondary"></i><span> Windows</span></> : <><i className="fa-brands fa-chrome text-secondary"></i><span> Web Browser</span></>}
            </p></div>
          </div>
        </div>
    </div>
  </div>}
  </>
}
