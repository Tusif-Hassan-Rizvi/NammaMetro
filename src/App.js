import React, { useState, useEffect, useRef } from 'react'
import Stations from './local-json/station.json'
import './App.css';
import './css/Station.css'
import logo from './namma.png'
import swap from './updown.png'
import fare from './local-json/fare_list.json'
import blackarrow from './blackarrow.png'
import sortpng from './sort.svg'
import Routes from './local-json/route.json'
import Swal from 'sweetalert2'
import { json } from 'react-router-dom';


function App() {
  const [tostationcode, setTostationcode] = useState("");
  const [fromstationcode, setFromstationcode] = useState("");
  const [changestation, setChangestation] = useState("")
  const station = Stations.stations;
  const route = Routes.route_info;
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [inputstyle, setInputstyle] = useState({ display: "none" })
  const [inputtostyle, setInputtostyle] = useState({ display: "none" })
  const [sortoperation, setSortoperation] = useState("OrderByRoute")
  const [targetvalue, setTargetvalue] = useState("");
  const [clickidroute, setClickidroute] = useState("")
  const [clickidalpha, setClickidalpha] = useState("")
  const [language, setLanguage] = useState(localStorage.getItem('prefrence'));
  const [varshikfare, setVarshikfare] = useState(0);
  const [tokenfare, setTokenfare] = useState(0);
  const [ticketstyle, setTicketstyle] = useState({ "display": "none" });
  const [frominputstate, setFrominputstate] = useState("")
  const [homedisplay, setHomedisplay] = useState("block");
  const [stationlistdisplay, setStationlistdisplay] = useState("none")
  const [searchvalue, setSearchvalue] = useState("")
  const [languagedisplay, setLanguagedisplay]=useState("flex")
  const [historystyle,setHistorystyle]=useState("block")
  
  const stationSortArray = [];
  let routecolor = "";
  let Alphabetcolor = "";
  let MixCircle = "block";
  const previoushistory=JSON.parse(localStorage.getItem("SearchHistory"))===null?"":JSON.parse(localStorage.getItem("SearchHistory"))

  useEffect(() => {

    if (from && to !== "") {
      if (from === to) {
        Swal.fire(
          prefrence === "kannada" ? "ಎಚ್ಚರಿಕೆ!" : "Warning!",
          prefrence === "kannada" ? "ಎರಡೂ ನಿಲ್ದಾಣಗಳು ಒಂದೇ ಆಗಿರಬಾರದು! ಮತ್ತೊಂದು ನಿಲ್ದಾಣದ ಹೆಸರನ್ನು ಆಯ್ಕೆಮಾಡಿ" : "both stations should be not the same! click on another station name",
          'warning'
        )
        setTo("")
      }
      else {
        setHomedisplay("block");
        setLanguagedisplay("flex")
        setStationlistdisplay("none");
        setTicketstyle({ "display": "none" })
      }
    }
  }, [to]);
  for (let key in station) {
    stationSortArray.push([station[key]["englishName"], station[key]["kannadaName"], station[key]["stationCode"]])
  }

  if (sortoperation === 'OrderByAlphabet') {

    stationSortArray.sort();
  }

  const handleClick = (event, index, id) => {
    let elem = document.getElementById(id);
    elem.style.color = 'gray';
    elem.style['pointer-events'] = 'none';
    elem.style.cursor = 'default';

  };

  localStorage.setItem("prefrence", language);
  const prefrence = localStorage.getItem('prefrence');


  function CheckFare() {

    if (from === "" && to === "") {
      Swal.fire(

        prefrence === "kannada" ? "ಎಚ್ಚರಿಕೆ!" : "Warning!",
        prefrence === "kannada" ? "ದಯವಿಟ್ಟು ನಿಲ್ದಾಣಗಳ ಹೆಸರನ್ನು ಆಯ್ಕೆಮಾಡಿ" : "Please select stations name",
        'warning'
      )
    }

    else {
      setVarshikfare(fare[fromstationcode][tostationcode]["cscFare"])
      setTokenfare(fare[fromstationcode][tostationcode]["tokenFare"])
      setTicketstyle({ "display": "block" })
      localStorage.setItem("SearchHistory", JSON.stringify({"fromstaionHistory":from, "tostationhistory":to, "fromcodehistory":fromstationcode, 'tocodehistory':tostationcode}))
      setHistorystyle("none")
    }
  }

  function SwapInputs() {
    setFrom(to);
    setTo(from)
  }


  function HandleOnChangeFrom(e) {
    setFrom("")
    setTo("")
    setHomedisplay("none")
    setLanguagedisplay("none")
    setStationlistdisplay("block")
    setInputstyle({ display: "none" })
  }
  function HandleOnChangeTo(e) {
    setTo("")
    setHomedisplay("none")
    setLanguagedisplay("none")
    setStationlistdisplay("block")
  }
  function HandleonInput(e) {

    let showinfo = document.getElementById("showinfo");
    let value = e.target.value;
    value = value.toUpperCase();

    for (let i = 0; i < showinfo.children.length; i++) {
      let child = showinfo.children[i];

      if (child.innerText.toUpperCase().includes(value)) {
        child.style.display = 'block';
      }
      else {
        child.style.display = "none"
      }
    }

  }

  function EnglishRadioClick() {
    setLanguage("english")
    setTo("")
    setFrom("")
    setTicketstyle({ "display": "none" })
  }
  function KannadaRadioClick() {
    setLanguage("kannada")
    setTo("")
    setFrom("")
    setTicketstyle({ "display": "none" })
  }
  return (

    <>
      {/* language section  */}
      <section id='language-section' style={{ display: languagedisplay }}>
        <div className='english-box'>
          <input
            type="radio"
            value="english"
            id='english'
            name='language'
            onClick={EnglishRadioClick}
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
            onClick={KannadaRadioClick}
            onChange={(e) => e.target.value}
          />
          <label htmlFor="kannada">ಕನ್ನಡ</label>

        </div>
      </section>
      {/* home page section  */}
      <section className='HomePage' style={{ display: homedisplay }}>
        <div className="inputfield">
          {/* from  */}
          <div className='frominput'>
            <label htmlFor="from">{prefrence === "kannada" ? " ಯಾವ ನಿಲ್ದಾಣದಿಂದ " : "From Station"}</label>
            <input type="text" id='from' value={from} onChange={(e) => setFrom(e.target.value)} placeholder={prefrence === "kannada" ? "ಹೊರಡುವ ನಿಲ್ದಾಣವನ್ನು ನಮೂದಿಸಿ" : "Enter From Station"} onClick={HandleOnChangeFrom} />
          </div>
          {/* <span className='swapbutton' onClick={SwapInputs}><img src={swap} draggable={false} alt="swap" /></span> */}
          {/* to */}
          <div className='toinput'>
            <label htmlFor="to">{prefrence === "kannada" ? "ಯಾವ ನಿಲ್ದಾಣಕ್ಕೆ" : "To Station"}</label>
            <input type="text" id='to' value={to} onChange={(e) => setTo(e.target.value)} placeholder={prefrence === "kannada" ? "ತಲಪುವಾ ನಿಲ್ದಾಣವನ್ನು ನಮೂದಿಸಿ" : "Enter To station"} onClick={HandleOnChangeTo} />
          </div>
          <button className='btn' onClick={CheckFare}>{prefrence === "kannada" ? "ದರವನ್ನು ಪರಿಶೀಲಿಸಿ" : "CHECK FARE"}</button>
        </div>

        {/* History section  */}
        <section className='previous-history' style={{display:historystyle}}>
          <div className='previous-history-heading'>Previous search</div>
          <div className='previous-history-station'
          onClick={()=>{
            setFrom(previoushistory.fromstaionHistory);
            setTo(previoushistory.tostationhistory);
            setFromstationcode(previoushistory.fromcodehistory);
            setTostationcode(previoushistory.tocodehistory)
          }}
          ><span>{previoushistory.fromstaionHistory}</span> <img className='history-logo' src={blackarrow} alt="arrowpng" /> <span>{previoushistory.tostationhistory}</span></div>
        </section>

{/* Ticket section  */}
        <section className='output-secton'>
          <div className="ticket-info-box" style={ticketstyle}>
            <div className='staion-name'>
              {/* <span>{from}</span>
              <img src={blackarrow} alt="arrowpng" />
              <span>{to}</span> */}
            </div>
            <div className="logo-box">
              <img src={logo} alt="image" draggable="false" className='metro-logo' />
            </div>
            <div className='first-text'>{prefrence === "kannada" ? "ಶೇಖರಿತ ಮೌಲ್ಯದ ಟಿಕೆಟ್-ವಾರ್ಷಿಕ್" : "Stored Value Ticket-Varshik"}</div>
            <div className="varshik-fare">₹ {varshikfare}</div>
            <div className='second-text'>{prefrence === "kannada" ? "ಟೋಕನ್ ಶುಲ್ಕ" : "Token Fare"}</div>
            <div className='token-fare'>₹ {tokenfare}</div>

          </div>
        </section>
      </section>


      {/* station list page  */}
      <section className='StationListPage' style={{ display: stationlistdisplay }}>
        {/* input area  */}
        <section id='inputbox-section'>
          {/* from station box  */}
          <input type="text" style={inputstyle} className='input-station' id="fromstation" value={from}
            placeholder={prefrence === "kannada" ? "ಹೊರಡುವ ನಿಲ್ದಾಣವನ್ನು ನಮೂದಿಸಿ" : "From Station"}
            onClick={(e)=>{
              setInputstyle({display:"none"}) 
              setSearchvalue(from)
            setFrom("")
            } } /><br />
          {/* to station box */}
          <input type="text" style={inputtostyle} className='input-station' id='tostation' value={to}
            placeholder={prefrence === "kannada" ? "ತಲಪುವಾ ನಿಲ್ದಾಣವನ್ನು ನಮೂದಿಸಿ" : "To station"} />
          {/* search box */}
          <input className='search-station' type="search" placeholder={prefrence === "kannada" ? "ನಿಲ್ದಾಣದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ" : "Enter Station Name"} value={searchvalue} onInput={HandleonInput} onChange={(e) => setSearchvalue(e.target.value)} />

          <div className='infobox'>
            <span >{prefrence === "kannada" ? "ಲಭ್ಯವಿರುವ ನಿಲ್ದಾಣಗಳು" : "AVAILABLE STATIONS"}</span>
            <label className='selectlabel' htmlFor="sort"> <img src={sortpng} alt="sortpng" /> {prefrence === "kannada" ? "ವಿಂಗಡಿಸು" : "Order By"}</label>
            <select
              id='sort'
              className='select'
              onChange={(e) => setSortoperation(e.target.value)}
            >
              <option value="OrderByRoute">({prefrence === "kannada" ? "ದಾರಿ" : "Route"})</option>
              <option value="OrderByAlphabet">({prefrence === "kannada" ? "ವರ್ಣಮಾಲೆ" : "Alphabet"})</option>
            </select>
          </div>
        </section>

        {/* output area  */}

        <section className='station-list-box' id="showinfo">

          {(stationSortArray.map((val, index) => {
            { route[0].stop_list.includes(val[2]) && route[1].stop_list.includes(val[2]) ? routecolor = "transparent" : route[0].stop_list.includes(val[2]) ? routecolor = "#A020F0" : routecolor = "#00FF00" }

            return <ul className='station-name' key={index} id="Station-Name" >
              {route[0].stop_list.includes(val[2]) && route[1].stop_list.includes(val[2]) ?
                <div className="mix-circle" style={{ display: "block" }}>
                </div> : <div className="mix-circle" style={{ display: "none" }}>
                </div>}
              <li
                id="station_name"
                style={{ color: routecolor }}
              ><span
                name={val[2]}
                className="StaionsNames"
                onClick={(e) => {
                  // setFrom(changestation === "" ? val.englishName : changestation)
                  setSearchvalue("")
                  setFrom(prefrence === "kannada" ? val[1] : val[0])
                  setInputstyle({ display: "block" })
                  setFromstationcode(val[2])
                  if (from !== "") {
                    setFrom(from)
                    setTo(prefrence === "kannada" ? val[1] : val[0])

                    setFromstationcode(fromstationcode)
                    setTostationcode(val[2])
                  }
                }}
                id={val[2]} >
                  {prefrence === "kannada" ? val[1] : val[0]}
                </span></li>
            </ul>
          }))}

        </section>
      </section>
    </>
  );
}

export default App;
