import { useState, useEffect } from "react";
import './App.css';



const App = () => {
  const [nasaData, setNasaData] = useState('')
  const [error, setError] = useState({ error: false, message: undefined })
  const [show, setShow] = useState(false)


  const handler = async () => {
    setError({ error: false, message: undefined })

    try {
      
      let key = process.env.REACT_APP_APIKEY
      let response = await fetch("https://api.nasa.gov/planetary/apod?api_key=" + key)
      

      if (!response.ok) {
        throw new Error(response.status)

      }
      let data = await response.json()
      setNasaData(data)
    } catch (error) {
      setError({ error: true, message: error.message })
      console.log(error.messgae)
    }
  }

  useEffect(() => {
    handler()
  }, [])
  if (error.error) {
    return (
      <div>
        <h1>Sorry</h1>
        <h1>There has been an error, please come back later. </h1>
      </div>
    )
  }
  if (!nasaData) {
    return <h1>loading...</h1>
  }

  return (
    <div>
      <h1>Astronomy picture of the day from Nasa</h1>
      <h2>Today's date: {nasaData.date}</h2>
      <h2>Title: {nasaData.title}</h2>
      {
        show && <img src={nasaData.hdurl} />

      }
      <button type="button" onClick={() => setShow(!show)}>
        {show === true ? "Hide picture" : "Click to See picture"}
      </button>
      <h2>Created by: {nasaData.copyright}</h2>
      <h2>Explanation: {nasaData.explanation}</h2>
    </div>
  )
}

export default App
