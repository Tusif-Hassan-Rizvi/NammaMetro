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
    const [sortoperation, setSortoperation] = useState("OrderByRoute")
    const [targetvalue, setTargetvalue] = useState("");
    const stationNameArray = [];
    const stationcodeArray=[];
    let color = "";
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
        stationNameArray.push([`${station[key]["englishName"]} ${station[key]["kannadaName"]}`,station[key]["stationCode"]])
        
    }

    stationNameArray.sort();
    stationcodeArray.sort();
    console.log(stationNameArray)
   


    const handleClick = (event, key) => {
        event.target.style.color = 'gray';
        event.target.style['pointer-events'] = 'none';
        event.target.style.cursor = 'default'
        // console.log(event.target);
        // console.log('key index: ', key);
        
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
                    <select id='sort' onChange={(e) => setSortoperation(e.target.value)}>
                        <option value="OrderByRoute">Route</option>
                        <option value="OrderByAlphabet">Alphabet</option>
                    </select>
                </div>
            </section>

            {/* output area  */}
            <section className='station-list-box' id="showinfo">
                {(station.map((val, index) => {
                    {route[0].stop_list.includes(stationNameArray[index][1])?color="#A020F0":color = "#00FF00"}
                    {
        
                        if (route[0].stop_list.includes(val.stationCode)) {

                            color = "#A020F0";
                        }
                        else if (route[1].stop_list.includes(val.stationCode)) {
                            color = "#00FF00"
                        }
                    }
                    return <ul className='station-name' key={index}  >
                        <li

                            style={{ color: color }}
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
                            style={{ color: "black" }}>{sortoperation === "OrderByRoute" ? val.englishName + " " + val.kannadaName :
                           stationNameArray[index][0]}
                            </span></li>
                    </ul>
                }))}

            </section>
        </>
    )
}
 