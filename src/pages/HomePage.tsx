import React from 'react'
import styling from "./HomePage.module.scss"
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
function HomePage() {
  const navigate = useNavigate();
  return (
    <div id={styling.HomePage}>
      <div className={styling.pageContent}>
        <div>
        <h1>Welcome to Disk Visualizer </h1>
        <h4>Here you can Visualize Most Disk Scheduling algorithms like FCFS , SCAN , ..etc </h4>
        </div>
      <Button onClick={()=>navigate("/charts")} className={styling.startingButton} variant="outlined">Get Started</Button>
      </div>
      
    </div>
  )
}

export default HomePage