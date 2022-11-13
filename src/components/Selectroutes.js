import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../namma.png'
import swap from '../updown.png'
import fare from '../local-json/fare_list.json'
import station from '../local-json/station.json'

export default function SelectRoutes(props) {
  const [fromstation, setFromstation] = useState(props.from);
  const [tostation, setTostation] = useState(props.to);
  const[ varshikfare, setVarshikfare]=useState(0);
  const [tokenfare, setTokenfare]=useState(0);
  const [ticketstyle, setTicketstyle]=useState({"display":"none"});
  const Fromstationcode = props.fromstationcode;
  const TostationCode = props.tostationcode;
  

  function CheckFare(){
    setVarshikfare(fare[Fromstationcode][TostationCode]["cscFare"])
    setTokenfare(fare[Fromstationcode][TostationCode]["tokenFare"])
    setTicketstyle({"display":"block"})
  }

  function SwapInputs(){
    setFromstation(tostation);
    setTostation(fromstation)
  }

  return (
    <>
      <div className="inputfield">
        {/* from  */}
        <div className='frominput'>
          <label htmlFor="from">From Station</label>
          <Link to="/selectstation"><input type="text" id='from' value={fromstation} onChange={(e) => setFromstation(e.target.value)} placeholder='Enter From Station' /></Link>
        </div>
       <span className='swapbutton' onClick={SwapInputs}><img  src={swap}  alt="swap"/></span>
        {/* to */}
        <div className='toinput'>
          <label htmlFor="to">To Station</label>
          <Link to="/selectstation"> <input type="text" id='to' value={tostation} onChange={(e) => setTostation(e.target.value)} placeholder='Enter To station' /></Link>
        </div>
        <button className='btn' onClick={CheckFare}>CHECK FARE</button>
      </div>

      <section className='output-secton'>
        <div className="ticket-info-box" style={ticketstyle}>
          <div className="logo-box">
            <img src={logo} alt="image" draggable="false" className='metro-logo' />
          </div>
          <div className='first-text'>Stored Value Ticket-Varshik</div>
          <div className="varshik-fare">₹ {varshikfare}</div>
          <div className='second-text'>Token Fare</div>
          <div className='token-fare'>₹ {tokenfare}</div>

        </div>
      </section>
    </>
  )
}
