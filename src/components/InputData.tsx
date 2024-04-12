import React, { useState } from 'react'
import styling from "../pages/HomePage.module.scss"
import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { CssTextField, CssSelect, CssInputLabel } from "../pages/MatrielUiStyles"
import { useMyContext } from '../context/TracksData';
function InputData() {
  const [algorithm, setAlgorithm] = useState('fcfs');
  const [algorithmDirection, setAlgorithmDirection] = useState('');

  const [tracksData, setTracksData] = useState<number[]>([]);
  const [reqData, setReqData] = useState({ initial: 0, mintrack: 0, maxtrack: 200 });
  const [visualizedTracks, setVisualizedTracks] = useState<number[]>(tracksData);

  const contextData = useMyContext()

  const handleAlgorithmChange = (event: any) => {
    setAlgorithm(event.target.value);
  };
  const handleSetAlgorithmDirection = (event: any) => {
    setAlgorithmDirection(event.target.value);
  };


  const handleDataChange = (event: any) => {

    let unprocessedData = event.target.value;
    let processedData = unprocessedData.split(",");
    processedData = processedData.map((item: string) => Number(item))
    setTracksData(processedData);
    setVisualizedTracks(processedData)
  };
  const handleRegDataChange = (event: any) => {
    if (event.target.id == "req1") {
      setReqData({ ...reqData, initial: event.target.value })
    }
    else {
      setReqData({ ...reqData, maxtrack: event.target.value })
    }
  };

  const calculateSeekTime = (tracks: {time:string,value:number}[]) => {
   let ans =0 ;
   for(let index =0 ;index+1<tracks.length;index++)
    {
      ans+=Math.abs(tracks[index].value-tracks[index+1].value)
    }
    return ans ;
  }
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Here you can handle form submission, such as calling an API
    let TracksAfterProcessed: { time: string, value: number }[] = []
    let TracksBeforeProcessed: number[] = [...tracksData];
    let initial = Number(reqData["initial"])
    let counter = 0
    TracksAfterProcessed.push({ time: String(counter), value: Number(initial) })

    if (algorithm === 'sstf') {
      while (TracksBeforeProcessed.length != 0) {
        let minValue = 1000000;
        let minIndex = 0;
        for (let i = 0; i < TracksBeforeProcessed.length; i++) {
          if (Math.abs(TracksBeforeProcessed[i] - initial) < minValue) {
            minIndex = i;
            minValue = Math.abs(TracksBeforeProcessed[i] - initial);
          }
        }
        TracksAfterProcessed.push({ time: String(counter), value: Number(TracksBeforeProcessed[minIndex]) })
        initial = TracksBeforeProcessed[minIndex]
        TracksBeforeProcessed.splice(minIndex, 1)
        counter += 1

      }
    }
    else if (algorithm === 'fcfs') {

      TracksBeforeProcessed.map((item) => {
        TracksAfterProcessed.push({ time: String(counter), value: Number(item) });
        counter++
      })
    }
    else if (algorithm == "c-scan") {
      if (algorithmDirection == 'forward') {

        for (let track = initial + 1; track <= Number(reqData.maxtrack); track++) {

          if (TracksBeforeProcessed.indexOf(track) > -1) {

            TracksAfterProcessed.push({ time: String(counter), value: track })
            TracksBeforeProcessed.splice(TracksBeforeProcessed.indexOf(track), 1)

            counter++;
          }
        }
        if (TracksBeforeProcessed.length != 0) {
          TracksAfterProcessed.push({ time: String(counter), value: Number(reqData.maxtrack) })
          counter++;
          TracksAfterProcessed.push({ time: String(counter), value: 0 })
          counter++;
          for (let track = 0; track <= Number(reqData.maxtrack); track++) {
            if (TracksBeforeProcessed.includes(track)) {
              TracksAfterProcessed.push({ time: String(counter), value: track })
              TracksBeforeProcessed.splice(TracksBeforeProcessed.indexOf(track), 1)
              counter++;
            }
          }
        }
      }
      else {
        for (let track = initial - 1; track >= 0; track--) {
          if (TracksBeforeProcessed.indexOf(track) > -1) {

            TracksAfterProcessed.push({ time: String(counter), value: track })
            TracksBeforeProcessed.splice(TracksBeforeProcessed.indexOf(track), 1)
            counter++;

          }
        }

      

        if (TracksBeforeProcessed.length != 0) {
          TracksAfterProcessed.push({ time: String(counter), value: 0 })
          counter++;
          TracksAfterProcessed.push({ time: String(counter), value: Number(reqData.maxtrack) })
          counter++;
          for (let track = Number(reqData.maxtrack); track >= 0; track--) {
            if (TracksBeforeProcessed.indexOf(track) > -1) {

              TracksAfterProcessed.push({ time: String(counter), value: track })
              TracksBeforeProcessed.splice(TracksBeforeProcessed.indexOf(track), 1)

              counter++;

            }
          }
        }

      }
    }
    else if (algorithm == "c-look") {
      if (algorithmDirection == 'forward') {

        for (let track = initial + 1; track <= Math.max(...TracksBeforeProcessed); track++) {

          if (TracksBeforeProcessed.indexOf(track) > -1) {

            TracksAfterProcessed.push({ time: String(counter), value: track })
            TracksBeforeProcessed.splice(TracksBeforeProcessed.indexOf(track), 1)
            counter++;
          }
        }
        if (TracksBeforeProcessed.length != 0) {

          for (let track = Math.min(...TracksBeforeProcessed); track <= Math.max(...TracksBeforeProcessed); track++) {
            if (TracksBeforeProcessed.includes(track)) {
              TracksAfterProcessed.push({ time: String(counter), value: track })
              TracksBeforeProcessed.splice(TracksBeforeProcessed.indexOf(track), 1)
              counter++;
            }
          }
        }
      }
      else {
        for (let track = initial - 1; track >= Math.min(...TracksBeforeProcessed); track--) {
          if (TracksBeforeProcessed.indexOf(track) > -1) {

            TracksAfterProcessed.push({ time: String(counter), value: track })
            TracksBeforeProcessed.splice(TracksBeforeProcessed.indexOf(track), 1)
            counter++;

          }
        }

        if (TracksBeforeProcessed.length != 0) {

          for (let track = Number(reqData.maxtrack); track >= Math.min(...TracksBeforeProcessed); track--) {
            if (TracksBeforeProcessed.indexOf(track) > -1) {

              TracksAfterProcessed.push({ time: String(counter), value: track })
              TracksBeforeProcessed.splice(TracksBeforeProcessed.indexOf(track), 1)

              counter++;

            }
          }
        }

      }
    }
    else if (algorithm == "look") {
      if (algorithmDirection == 'forward') {

        for (let track = initial + 1; track <= Math.max(...TracksBeforeProcessed); track++) {

          if (TracksBeforeProcessed.indexOf(track) > -1) {

            TracksAfterProcessed.push({ time: String(counter), value: track })
            TracksBeforeProcessed.splice(TracksBeforeProcessed.indexOf(track), 1)
            counter++;
          }
        }
        if (TracksBeforeProcessed.length != 0) {
          for (let track = Math.max(...TracksBeforeProcessed); track >=Math.min(...TracksBeforeProcessed); track--) {
            if (TracksBeforeProcessed.includes(track)) {
              TracksAfterProcessed.push({ time: String(counter), value: track })
              TracksBeforeProcessed.splice(TracksBeforeProcessed.indexOf(track), 1)
              counter++;
            }
          }
        }
      }
      else {
        for (let track = initial - 1; track >= Math.min(...TracksBeforeProcessed); track--) {
          if (TracksBeforeProcessed.indexOf(track) > -1) {

            TracksAfterProcessed.push({ time: String(counter), value: track })
            TracksBeforeProcessed.splice(TracksBeforeProcessed.indexOf(track), 1)
            counter++;

          }
        }
        if (TracksBeforeProcessed.length != 0) {

          for (let track = Math.min(...TracksBeforeProcessed); track >= Math.max(...TracksBeforeProcessed); track++) {
            if (TracksBeforeProcessed.indexOf(track) > -1) {

              TracksAfterProcessed.push({ time: String(counter), value: track })
              TracksBeforeProcessed.splice(TracksBeforeProcessed.indexOf(track), 1)

              counter++;

            }
          }
        }

      }
    }
    else if (algorithm == "scan") {
      if (algorithmDirection == 'forward') {

        for (let track = initial + 1; track <= Math.max(...TracksBeforeProcessed); track++) {

          if (TracksBeforeProcessed.indexOf(track) > -1) {

            TracksAfterProcessed.push({ time: String(counter), value: track })
            TracksBeforeProcessed.splice(TracksBeforeProcessed.indexOf(track), 1)
            counter++;
          }
        }
        if (TracksBeforeProcessed.length != 0) {
          TracksAfterProcessed.push({ time: String(counter), value: Number(reqData.maxtrack) })
          counter++;
          for (let track = Math.max(...TracksBeforeProcessed); track >=Math.min(...TracksBeforeProcessed); track--) {
            if (TracksBeforeProcessed.includes(track)) {
              TracksAfterProcessed.push({ time: String(counter), value: track })
              TracksBeforeProcessed.splice(TracksBeforeProcessed.indexOf(track), 1)
              counter++;
            }
          }
        }
      }
      else {
        for (let track = initial - 1; track >= Math.min(...TracksBeforeProcessed); track--) {
          if (TracksBeforeProcessed.indexOf(track) > -1) {

            TracksAfterProcessed.push({ time: String(counter), value: track })
            TracksBeforeProcessed.splice(TracksBeforeProcessed.indexOf(track), 1)
            counter++;

          }
        }
        if (TracksBeforeProcessed.length != 0) {
          TracksAfterProcessed.push({ time: String(counter), value: Number(0) })
          counter++;
          for (let track = Math.min(...TracksBeforeProcessed); track >= Math.max(...TracksBeforeProcessed); track++) {
            if (TracksBeforeProcessed.indexOf(track) > -1) {

              TracksAfterProcessed.push({ time: String(counter), value: track })
              TracksBeforeProcessed.splice(TracksBeforeProcessed.indexOf(track), 1)

              counter++;

            }
          }
        }

      }
    }


    console.log('Algorithm:', algorithm);
    console.log('Data:', reqData, tracksData, visualizedTracks);
    console.log(TracksAfterProcessed);
    contextData.setTracks(TracksAfterProcessed)
    console.log(calculateSeekTime(TracksAfterProcessed))

  };
  return (
    <div >
      <Container className={styling.pageContent} maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <FormControl >
            <p>Select Alogrithm</p>
            <CssSelect
              labelId="algorithm-select-label"
              id="algorithm-select"
              placeholder='Select Algorithm'
              sx={{ color: 'white', minWidth: "200px" }}
              value={algorithm}
              onChange={handleAlgorithmChange}

            >
              <MenuItem value="fcfs">First-Come, First-Served (FCFS)</MenuItem>
              <MenuItem value="sstf">Shortest Seek Time First (SSTF)</MenuItem>
              <MenuItem value="c-scan">C-SCAN</MenuItem>
              <MenuItem value="c-look">C-LOOK</MenuItem>
              <MenuItem value="scan">SCAN</MenuItem>
              <MenuItem value="look">LOOK</MenuItem>


              {/* Add more algorithms here */}
            </CssSelect>

          </FormControl>
          {
            (algorithm == "fcfs" || algorithm == "sstf") ? <></> :
              <FormControl >
                <p>Select Direction</p>
                <CssSelect
                  labelId="direction-select-label"
                  id="direction-select"
                  placeholder='Select Direction'
                  sx={{ color: 'white', minWidth: "150px" }}
                  value={algorithmDirection}
                  onChange={handleSetAlgorithmDirection}

                >
                  <MenuItem value="forward">Forward</MenuItem>
                  <MenuItem value="backward">Backward</MenuItem>


                  {/* Add more algorithms here */}
                </CssSelect>

              </FormControl>
          }

          <p>Enter the data separated by comma </p>
          <CssTextField
            label="Data"
            variant="outlined"
            fullWidth
            value={tracksData}
            sx={{ marginTop: '5px', marginBottom: "15px" }}
            onChange={handleDataChange}
          />
          <div className={styling.initialPosInput}>
            <CssTextField
              required
              id="req1"
              label="Initial Track"
              defaultValue="0"
              onChange={handleRegDataChange}

            />

            <CssTextField
              required
              id="req3"
              label="Max Track"
              defaultValue="200"
              onChange={handleRegDataChange}

            />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: '20px' }}
          >
            Submit
          </Button>
        </form>
      </Container>

    </div>
  )
}

export default InputData