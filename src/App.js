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


function App() {
  const [tostationcode, setTostationcode] = useState("");
  const [fromstationcode, setFromstationcode] = useState("");
  const [changestation, setChangestation] = useState("")
  const station = Stations.stations;
  const route = Routes.route_info;
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [inputstyle, setInputstyle] = useState({ display: "none" })
  const [sortoperation, setSortoperation] = useState("OrderByRoute")
  const [targetvalue, setTargetvalue] = useState("");
  const [clickid, setClickid] = useState("")
  const [language, setLanguage] = useState(localStorage.getItem('prefrence'));
  const [varshikfare, setVarshikfare] = useState(0);
  const [tokenfare, setTokenfare] = useState(0);
  const [ticketstyle, setTicketstyle] = useState({ "display": "none" });
  const [frominputstate, setFrominputstate] = useState("")
  const [homedisplay, setHomedisplay] = useState("block");
  const [stationlistdisplay, setStationlistdisplay] = useState("none")

  const stationSortArray = [];
  let routecolor = "";
  let Alphabetcolor = "";
  let MixCircle = "none";


  useEffect(() => {


    if (from && to !== "") {
      if (from === to) {
        alert(prefrence === "kannada" ? "ಎರಡೂ ನಿಲ್ದಾಣಗಳು ಒಂದೇ ಆಗಿರಬಾರದು! ಮತ್ತೊಂದು ನಿಲ್ದಾಣದ ಹೆಸರನ್ನು ಆಯ್ಕೆಮಾಡಿ" : "both stations should be not the same! click on another station name")
        setTo("")
      }
      else {


        setHomedisplay("block");
        setStationlistdisplay("none");
        setTicketstyle({ "display": "none" })
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


  function CheckFare() {

    if (from === "" && to === "") {
      alert(prefrence === "kannada" ? "ದಯವಿಟ್ಟು ನಿಲ್ದಾಣಗಳ ಹೆಸರನ್ನು ಆಯ್ಕೆಮಾಡಿ" : "Please select stations name");
    }

    else {
      setVarshikfare(fare[fromstationcode][tostationcode]["cscFare"])
      setTokenfare(fare[fromstationcode][tostationcode]["tokenFare"])
      setTicketstyle({ "display": "block" })
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
    setStationlistdisplay("block")
  }
  function HandleOnChangeTo(e) {
    setTo("")
    setHomedisplay("none")
    setStationlistdisplay("block")
  }
  function HandleonInput(e) {
  
    let showinfo=document.getElementById("Station-Name");
    let value = e.target.value;
   console.log(value, showinfo)
	
	// for (let i = 0; i < showinfo.children.length; i++) {
	// 	let child = showinfo.children[i];

	// 	if (child.innerText.includes(value)) {
	// 		child.style.display = 'flex';
	// 	}
	// 	else {
	// 		child.style.display = 'none';
	// 	}
	// }
  }


  return (

    <>
      {/* language section  */}
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
      {/* home page section  */}
      <section className='HomePage' style={{ display: homedisplay }}>
        <div className="inputfield">
          {/* from  */}
          <div className='frominput'>
            <label htmlFor="from">{prefrence === "kannada" ? " ಯಾವ ನಿಲ್ದಾಣದಿಂದ " : "From Station"}</label>
            <input type="text" id='from' value={from} onChange={(e) => setFrom(e.target.value)} placeholder={prefrence === "kannada" ? "ಹೊರಡುವ ನಿಲ್ದಾಣವನ್ನು ನಮೂದಿಸಿ" : "From Station"} onClick={HandleOnChangeFrom} />
          </div>
          <span className='swapbutton' onClick={SwapInputs}><img src={swap} draggable={false} alt="swap" /></span>
          {/* to */}
          <div className='toinput'>
            <label htmlFor="to">{prefrence === "kannada" ? "ಯಾವ ನಿಲ್ದಾಣಕ್ಕೆ" : "To Station"}</label>
            <input type="text" id='to' value={to} onChange={(e) => setTo(e.target.value)} placeholder={prefrence === "kannada" ? "ತಲಪುವಾ ನಿಲ್ದಾಣವನ್ನು ನಮೂದಿಸಿ" : "Enter To station"} onClick={HandleOnChangeTo} />
          </div>
          <button className='btn' onClick={CheckFare}>{prefrence === "kannada" ? "ದರವನ್ನು ಪರಿಶೀಲಿಸಿ" : "CHECK FARE"}</button>
        </div>

        <section className='output-secton'>
          <div className="ticket-info-box" style={ticketstyle}>
            <div className='staion-name'>
              <span>{from}</span>
              <img src={blackarrow} alt="arrowpng" />
              <span>{to}</span>
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
          <input type="text" className='input-station' id="fromstation" value={from} placeholder={prefrence === "kannada" ? "ಹೊರಡುವ ನಿಲ್ದಾಣವನ್ನು ನಮೂದಿಸಿ" : "From Station"} onInput={HandleonInput} /><br />
          <input type="text" style={inputstyle} className='input-station' id='tostation' value={to}
            placeholder={prefrence === "kannada" ? "ತಲಪುವಾ ನಿಲ್ದಾಣವನ್ನು ನಮೂದಿಸಿ" : "Enter To station"} onInput={HandleonInput} />
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
        {sortoperation === "OrderByRoute" ?
          <section className='station-list-box' id="showinfo">

            {(station.map((val, index) => {
              { route[0].stop_list.includes(val.stationCode) && route[1].stop_list.includes(val.stationCode) ? routecolor = "red" : route[0].stop_list.includes(val.stationCode) ? routecolor = "#A020F0" : routecolor = "#00FF00" }

              return <ul className='station-name' key={index} id="Station-Name" >
                <div className="mix-circle" style={{ display: MixCircle }}>
                  <div className="purple"></div>
                  <div className="green"></div>
                </div>
                <li

                  style={{ color: routecolor }}
                ><span
                  className='StaionsNames'
                  onClick={(e) => {
                    // setFrom(changestation === "" ? val.englishName : changestation)
                    setFrom(prefrence === "kannada" ? val.kannadaName : val.englishName)
                    setInputstyle({ display: "block" })
                    setFromstationcode(val.stationCode)
                    if (from !== "") {
                      setFrom(from)
                      setTo(prefrence === "kannada" ? val.kannadaName : val.englishName)

                      setFromstationcode(fromstationcode)
                      setTostationcode(val.stationCode)
                    }
                    // handleClick(e, index, val.stationCode);

                  }}
                  id={val.stationCode} >
                    {prefrence === "kannada" ? val.kannadaName : val.englishName}
                  </span></li>
              </ul>
            }))}

          </section> :
          <section className='station-list-box' id="showinfo">

            {(stationSortArray.map((val, index) => {
              { route[0].stop_list.includes(val[2]) && route[1].stop_list.includes(val[2]) ? Alphabetcolor = "red" : route[0].stop_list.includes(val[2]) ? Alphabetcolor = "#A020F0" : Alphabetcolor = "#00FF00" }


              return <ul className='station-name' key={index} id="Station-Name" >
                <div className="mix-circle" style={{ display: MixCircle }}>
                  <div className="purple"></div>
                  <div className="green"></div>
                </div>
                <li
                  id="Station-Name"
                  style={{ color: Alphabetcolor }}
                ><span
                  className='StaionsNames'
                  onClick={(e) => {
                    setFrom(prefrence === "kannada" ? val[1] : val[0])
                    setInputstyle({ display: "block" })
                    setFromstationcode(val[2])
                    if (from !== "") {
                      setFrom(from)
                      setTo(prefrence === "kannada" ? val[1] : val[0])

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
  );
}

export default App;
