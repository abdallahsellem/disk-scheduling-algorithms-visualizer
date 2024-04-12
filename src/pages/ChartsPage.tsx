import React from 'react'
import LineChart from '../components/LineChart'
import InputData from '../components/InputData'
import styling from "./HomePage.module.scss"
import { useState } from 'react';
import { MyContext, useMyContext } from '../context/TracksData'
function ChartsPage() {
  const Context=useMyContext()
  return (
    <div id={styling.Page}><InputData></InputData><LineChart contextData={Context}></LineChart></div>
  )
}

export default ChartsPage