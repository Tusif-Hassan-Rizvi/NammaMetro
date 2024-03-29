import React, { useState, useEffect, useRef } from 'react'
import Stations from '../local-json/station.json'
import Routes from '../local-json/route.json'
import { useNavigate } from 'react-router-dom';
import sortpng from '../sort.svg'




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
    const [language, setLanguage] = useState(localStorage.getItem('prefrence'));
    const stationSortArray = [];
    let routecolor = "";
    let Alphabetcolor = "";
    let MixCircle="none";
    const navigate = useNavigate();
    const data = { "from": from, "to": to, "fromstationcode": fromstationcode, "tostationcode": tostationcode };
    useEffect(() => {
        props.stationinfo(data);

        if (from && to !== "") {
            if (from === to) {
                alert("both stations should be not the same! click on another station name")
                setTo("")
            }
            else {


                setTimeout(() => {

                    navigate('/')
                }, 200);
            }
        }
    }, [to]);



    for (let key in station) {
        stationSortArray.push([station[key]["englishName"], station[key]["kannadaName"], station[key]["stationCode"]])
    }


    stationSortArray.sort();


    const handleClick = (event, key, id) => {
        event.target.style.color = 'gray';
        event.target.style['pointer-events'] = 'none';
        event.target.style.cursor = 'default';
        setClickid(event.target.id)
        // console.log("Hello tusif")
    };
    localStorage.setItem("prefrence", language);
    const prefrence = localStorage.getItem('prefrence');
    console.log(props.changestation);
    return (

        <>
<section className='StationListPage'>
            {/* input area  */}
            <section id='inputbox-section'>
                <section id='language-section'>
                    <div className='english-box'>
                        <input
                            type="radio"
                            value="english"
                            id='english'
                            name='language'
                            onClick={() => setLanguage("english")}
                            onChange={(e) => e.target.value}
                        />
                        <label htmlFor="english">English</label>
                    </div>

                    <div className="kannada-box">
                        <input
                            type="radio"
                            value="kannada"
                            id='kannada'
                            name='language'
                            onClick={() => setLanguage("kannada")}
                            onChange={(e) => e.target.value}
                        />
                        <label htmlFor="kannada">ಕನ್ನಡ</label>

                    </div>

                </section>
                <input type="text" className='input-station' id="fromstation" onChange={(e) => setFrom(e.target.value)} value={from} placeholder='Enter From Station' onInput={(e) => setTargetvalue(e.target.value)} /><br />
                <input type="text" style={inputstyle} className='input-station' id='tostation' onChange={(e) => setTo(e.target.value)} value={to}
                    placeholder='Enter To Station' onInput={(e) => setTargetvalue(e.target.value)} />
                <div className='infobox'>
                    <span >AVAILABLE STATIONS</span>
                    <label className='selectlabel' htmlFor="sort"> <img src={sortpng} alt="sortpng" /> Order By</label>
                    <select
                        id='sort'
                        className='select'
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
                        { route[0].stop_list.includes(val.stationCode) && route[1].stop_list.includes(val.stationCode) ? routecolor = "red" : route[0].stop_list.includes(val.stationCode) ? routecolor = "#A020F0" : routecolor = "#00FF00" }

                        return <ul className='station-name' key={index}  >
                            <div className="mix-circle" style={{display:MixCircle}}>
                                <div className="purple"></div>
                                <div className="green"></div>
                            </div>
                            <li

                                style={{ color: routecolor }}
                            ><span
                                className='StaionsNames'
                                onClick={(e) => {
                                    setFrom(props.changestation === "" ? val.englishName : props.changestation)
                                    setInputstyle({ display: "block" })
                                    setFromstationcode(val.stationCode)
                                    if (from !== "") {
                                        setFrom(from)
                                        setTo(val.englishName)

                                        setFromstationcode(fromstationcode)
                                        setTostationcode(val.stationCode)
                                    }
                                    // handleClick(e, index, val.stationCode);

                                }}

                                id={val.stationCode}>
                                    {prefrence === "kannada" ? val.kannadaName : val.englishName}
                                </span></li>
                        </ul>
                    }))}

                </section> :
                <section className='station-list-box' id="showinfo">

                    {(stationSortArray.map((val, index) => {
                        { route[0].stop_list.includes(val[2]) && route[1].stop_list.includes(val[2]) ? Alphabetcolor = "red" : route[0].stop_list.includes(val[2]) ? Alphabetcolor = "#A020F0" : Alphabetcolor = "#00FF00" }


                        return <ul className='station-name' key={index}  >
                             <div className="mix-circle" style={{display:MixCircle}}>
                                <div className="purple"></div>
                                <div className="green"></div>
                            </div>
                            <li

                                style={{ color: Alphabetcolor }}
                            ><span
                                className='StaionsNames'
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
                                    // handleClick(e, index, val[2]);

                                }}
                                id={val[2]}>
                                    {prefrence === "kannada" ? val[1] : val[0]}
                                </span></li>
                        </ul>
                    }))}

                </section>
            }
            </section>
        </>

    )
}
