import React from 'react'
import { Link } from 'react-router-dom'

export default function SelectRoutes() {
  return (
    <>
    <div className="inputfield">
    {/* from  */}
    <div className='frominput'>
    <label htmlFor="from">From Station</label>
   <Link to="/selectstation"><input type="text" id='from' placeholder='Enter From Station' /></Link> 
    </div>
    {/* to */}
    <div className='toinput'>
    <label htmlFor="to">To Station</label>
    <Link to="/selectstation"> <input type="text" id='to' placeholder='Enter To station' /></Link>
    </div>
    <button className='btn'>CHECK FARE</button>
  </div>

  <section className='output-secton'>
    
  </section>
  </>
  )
}
