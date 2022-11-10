import React, { useState } from 'react'
import Stations from '../local-json/station.json'
import Routes from '../local-json/route.json'


export default function Selectstaion() {
    const station = Stations.stations;
    const route = Routes.route_info;
    const [selectstation, setSelectstaion] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [inputstyle, setInputstyle]=useState({display:"none"})
    return (
        <>
            <section id='inputbox-section'>
                <input type="text" className='input-station' id="fromstation" onChange={(e) => setSelectstaion(e.target.value)} value={selectstation} placeholder='Enter From Station' /><br />
                <input type="text" style={inputstyle} className='input-station' id='tostation' onChange={(e) => setSelectstaion(e.target.value)} value={selectstation}
                    placeholder='Enter To Station' />
                <div className='infobox'><span>AVAILABLE STATIONS</span></div>
            </section>

            {station.map((val, index) => {

                return <ul className='station-name' key={index}>
                    <li onClick={() => {
                        setSelectstaion(val.englishName)
                        setInputstyle({display:"block"})

                    }}>{val.englishName}   {val.kannadaName}</li>
                </ul>
            })}
        </>
    )
}
