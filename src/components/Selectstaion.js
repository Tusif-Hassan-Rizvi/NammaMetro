import React, { useState } from 'react'
import Stations from '../local-json/station.json'
import Routes from '../local-json/route.json'
// import Selectroutes from '../components/Selectroutes'


export default function Selectstaion() {
    const station = Stations.stations;
    const route = Routes.route_info;
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [inputstyle, setInputstyle]=useState({display:"none"})

    if(from && to!==""){
        setTimeout(() => {
            
            window.history.go(-1)
        }, 200);
    }
    return (
        <>
            <section id='inputbox-section'>
                <input type="text" className='input-station' id="fromstation" onChange={(e) => setFrom(e.target.value)} value={from} placeholder='Enter From Station' /><br />
                <input type="text" style={inputstyle} className='input-station' id='tostation' onChange={(e) => setTo(e.target.value)} value={to}
                    placeholder='Enter To Station' />
                <div className='infobox'><span>AVAILABLE STATIONS</span></div>
            </section>

            {station.map((val, index) => {

                return <ul className='station-name' key={index}>
                    <li onClick={() => {
                        setFrom(val.englishName)
                        setInputstyle({display:"block"})
                        if(from!==""){
                            setFrom(from)
                            setTo(val.englishName)
                        }

                    }}>{val.englishName}   {val.kannadaName}</li>
                </ul>
            })}
        </>
    )
}
