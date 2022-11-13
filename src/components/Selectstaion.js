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
    const [color, setColor] = useState("black");
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


    const handleClick = (event, key) => {
        event.target.style.color = 'gray';
        event.target.style['pointer-events'] = 'none';
        event.target.style.cursor= 'default';
        // console.log(event.target);
        // console.log('key index: ', key);
    };

    return (
        <>
            {/* input area  */}
            <section id='inputbox-section'>
                <input type="text" className='input-station' id="fromstation" onChange={(e) => setFrom(e.target.value)} value={from} placeholder='Enter From Station' /><br />
                <input type="text" style={inputstyle} className='input-station' id='tostation' onChange={(e) => setTo(e.target.value)} value={to}
                    placeholder='Enter To Station' />
            </section>

            <div className='infobox'>
                <span>AVAILABLE STATIONS</span>
                <label style={{marginLeft:"5rem", marginRight:"2px"}} for="sort">Order By</label><select id='sort' >
                    <option value="OrderByRoute">Route</option>
                    <option value="OrderByAlphabet">Alphabet</option>
                </select>
            </div>
            {/* output area  */}
            <section className='station-list-box'>
                {(station.map((val, index) => {
                    return <ul className='station-name' key={index} >
                        {route[0].stop_list.includes(val.stationCode) ? <li

                            style={{ color: "#A020F0" }}
                        ><span
                            onClick={(e) => {
                                setFrom(val.englishName)
                                setInputstyle({ display: "block" })
                                setFromstationcode(val.stationCode)
                                if (from !== "") {
                                    setFrom(from)
                                    setTo(val.englishName)

                                    setFromstationcode(fromstationcode)
                                    setTostationcode(val.stationCode)
                                }
                                handleClick(e, index)

                            }}
                            id={val.stationCode}
                            style={{ color: color }}>{val.englishName}   {val.kannadaName}</span></li> : <li

                                style={{ color: "#00FF00" }}
                            ><span
                                onClick={(e) => {
                                    setFrom(val.englishName)
                                    setInputstyle({ display: "block" })
                                    setFromstationcode(val.stationCode)
                                    if (from !== "") {
                                        setFrom(from)
                                        setTo(val.englishName)

                                        setFromstationcode(fromstationcode)
                                        setTostationcode(val.stationCode)
                                    }
                                    handleClick(e, index)
                                }}
                                id={val.stationCode}
                                style={{ color: color }}>{val.englishName}   {val.kannadaName}</span></li>}
                    </ul>
                }))}

            </section>
        </>
    )
}
