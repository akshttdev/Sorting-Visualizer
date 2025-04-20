import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ArrayBar from './Components/ArrayBars/ArrayBar.jsx'

function App() {

  const array = [50 , 40 , 60, 30, 70, 20 , 80, 90 , 35, 45, 23, 47, 12, 65 ,46, 29, 12, 10 ,89, 70];

  return (
    <>
      <ArrayBar array = {array}/>
    </> 
  )
}

export default App
