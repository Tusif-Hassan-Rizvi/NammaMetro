import React, { useState, useEffect, useRef } from 'react'
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
    const [sortoperation, setSortoperation] = useState("OrderByRoute")
    const [targetvalue, setTargetvalue] = useState("");
    const [clickid, setClickid] = useState("")
    const stationSortArray = [];
    let routecolor = "";
    let Alphabetcolor = "";
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

    for (let key in station) {
        stationSortArray.push([station[key]["englishName"], station[key]["kannadaName"], station[key]["stationCode"]])
    }


    stationSortArray.sort();



    const handleClick = (event, key, id) => {
        event.target.style.color = 'gray';
        event.target.style['pointer-events'] = 'none';
        event.target.style.cursor = 'default';
        setClickid(event.target.id)
    };
   

    return (

        <>
            {/* input area  */}
            <section id='inputbox-section'>
                <input type="text" className='input-station' id="fromstation" onChange={(e) => setFrom(e.target.value)} value={from} placeholder='Enter From Station' onInput={(e) => setTargetvalue(e.target.value)} /><br />
                <input type="text" style={inputstyle} className='input-station' id='tostation' onChange={(e) => setTo(e.target.value)} value={to}
                    placeholder='Enter To Station' onInput={(e) => setTargetvalue(e.target.value)} />
                <div className='infobox'>
                    <span>AVAILABLE STATIONS</span>
                    <label style={{ marginLeft: "3rem", marginRight: "2px" }} htmlFor="sort">Order By</label>
                    <select
                        id='sort'
                        onChange={(e) => setSortoperation(e.target.value)}
                    >
                        <option value="OrderByRoute">Route</option>
                        <option value="OrderByAlphabet">Alphabet</option>
                    </select>
                </div>
            </section>

            {/* output area  */}
            {sortoperation === "OrderByRoute" ?
                <section className='station-list-box' id="showinfo">

                    {(station.map((val, index) => {
                        { route[0].stop_list.includes(val.stationCode) ? routecolor = "#A020F0" : routecolor = "#00FF00" }

                        return <ul className='station-name' key={index}  >
                            <li

                                style={{ color: routecolor }}
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
                                    handleClick(e, index, val.stationCode);

                                }}

                                id={val.stationCode}
                                style={{ color: "black" }}>{val.englishName + " " + val.kannadaName
                                    }
                                </span></li>
                        </ul>
                    }))}

                </section> :
                <section className='station-list-box' id="showinfo">

                    {(stationSortArray.map((val, index) => {
                        { route[0].stop_list.includes(val[2]) ? Alphabetcolor = "#A020F0" : Alphabetcolor = "#00FF00" }

                        return <ul className='station-name' key={index}  >
                            <li

                                style={{ color: Alphabetcolor }}
                            ><span
                                onClick={(e) => {
                                    setFrom(val[0])
                                    setInputstyle({ display: "block" })
                                    setFromstationcode(val[2])
                                    if (from !== "") {
                                        setFrom(from)
                                        setTo(val[0])

                                        setFromstationcode(fromstationcode)
                                        setTostationcode(val[2])
                                    }
                                    handleClick(e, index, val[2]);

                                }}
                                id={val[2]}
                                style={{ color: "black" }}>{val[0]
                                    } {val[1]}
                                </span></li>
                        </ul>
                    }))}

                </section>
            }
        </>

    )
}
