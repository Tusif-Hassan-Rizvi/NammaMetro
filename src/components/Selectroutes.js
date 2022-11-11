import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../namma.png'
import fare from '../local-json/fare_list.json'
import station from '../local-json/station.json'

export default function SelectRoutes(props) {
  const [fromstation, setFromstation]=useState(props.from);
  const [tostation, setTostation]=useState(props.to);

  console.log(fare.AGPP)
  console.log(station.stations)
  return (
    <>
    <div className="inputfield">
    {/* from  */}
    <div className='frominput'>
    <label htmlFor="from">From Station</label>
   <Link to="/selectstation"><input type="text" id='from' value={fromstation} onChange={(e)=>setFromstation(e.target.value)} placeholder='Enter From Station' /></Link> 
    </div>
    {/* to */}
    <div className='toinput'>
    <label htmlFor="to">To Station</label>
    <Link to="/selectstation"> <input type="text" id='to' value={tostation} onChange={(e)=>setTostation(e.target.value)} placeholder='Enter To station' /></Link>
    </div>
    <button className='btn'>CHECK FARE</button>
  </div>

  <section className='output-secton'>
    <div className="ticket-info-box"> 
      <div className="logo-box">
      <img src={logo} alt="image" draggable="false" className='metro-logo'/>
      </div>
      <div className='first-text'>Stored Value Ticket-Varshik</div>
      <div className="varshik-fare">₹ 00</div>
      <div className='second-text'>Token Fare</div>
      <div className='token-fare'>₹ 00</div>

    </div>
  </section>
  </>
  )
}
