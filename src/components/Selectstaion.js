import React, { useState, useEffect } from 'react'
import Stations from '../local-json/station.json'
import Routes from '../local-json/route.json'
import { useNavigate } from 'react-router-dom';


export default function Selectstaion(props) {
    const station = Stations.stations;
    const route = Routes.route_info;
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [fromstationcode, setFromstationcode] = useState("");
    const [tostationcode, setTostationcode] = useState("");
    const [inputstyle, setInputstyle] = useState({ display: "none" })
    const navigate = useNavigate();
    const data = { "from": from, "to": to, "fromstationcode": fromstationcode, "tostationcode": tostationcode };
    useEffect(() => {
        props.stationinfo(data);
    }, [to]);

    if (from && to !== "") {
        setTimeout(() => {

            navigate('/')
        }, 200);
    }

    if(from===to){
        console.log("Yeh! both are same");  
    }

    return (
        <>
            {/* input area  */}
            <section id='inputbox-section'>
                <input type="text" className='input-station' id="fromstation" onChange={(e) => setFrom(e.target.value)} value={from} placeholder='Enter From Station' /><br />
                <input type="text" style={inputstyle} className='input-station' id='tostation' onChange={(e) => setTo(e.target.value)} value={to}
                    placeholder='Enter To Station' />
            </section>

            <div className='infobox'><span>AVAILABLE STATIONS</span></div>
            {/* output area  */}
            <section className='station-list-box'>
                {station.map((val, index) => {
                    return <ul className='station-name' key={index}>
                       {route[0].stop_list.includes(val.stationCode)? <li
                            onClick={() => {
                                setFrom(val.englishName)
                                setInputstyle({ display: "block" })
                                setFromstationcode(val.stationCode)
                                if (from !== "") {
                                    setFrom(from)
                                    setTo(val.englishName)

                                    setFromstationcode(fromstationcode)
                                    setTostationcode(val.stationCode)
                                }

                            }}
                            id={val.stationCode}
                            style={{color:"#A020F0"}}
                        ><span style={{color:"black"}}>{val.englishName}   {val.kannadaName}</span></li>:<li
                        onClick={() => {
                            setFrom(val.englishName)
                            setInputstyle({ display: "block" })
                            setFromstationcode(val.stationCode)
                            if (from !== "") {
                                setFrom(from)
                                setTo(val.englishName)

                                setFromstationcode(fromstationcode)
                                setTostationcode(val.stationCode)
                            }

                        }}
                        id={val.stationCode}
                        style={{color:"#00FF00"}}
                    ><span style={{color:"black"}}>{val.englishName}   {val.kannadaName}</span></li>}
                    </ul>
                })}
            </section>
        </>
    )
}
