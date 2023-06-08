import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [numberOfseats, setNumberOfseats] = useState("");
  const [seatsMap, setSeatsMap] = useState([{}]);
  const [seatNumbers, setseatNumbers] = useState([])

  async function handleSumbit(e) {
    e.preventDefault();

    //sending API request to backend with Number of Seats(User Entered)
    const response = await axios.post('https://backendtrainseat.onrender.com/api/seatBook',{numberOfseats})
    console.log(response.data)
    
    setNumberOfseats("")

    //It will give Booked Seat Number 
    if(response.data.seatsTobeBooked){
      //seating data of booked Seat
      setseatNumbers([...response.data.seatsTobeBooked])


      //for notification
      toast.success(`Ticked Booked Successfully`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }else{
      toast.warn(`${response.data.message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }


    
    setTimeout(() => {
      fetchData()
    }, 1500);
    
  }

// fetching latest data updated in database


  async function fetchData() {
    try {
      const response= await axios.get('https://backendtrainseat.onrender.com/api/getData')
      setSeatsMap(response.data)
    //  console.log(response.data)
    } catch (error) {
      console.log(error)
    }

  }

  const handleReset =async(e)=>{
    e.preventDefault();
      console.log("reset called")
  
      //This is just to reset DB with initial value.
     
    await axios.delete('https://backendtrainseat.onrender.com/api/resetData')
   
      setseatNumbers([])
       window.location.reload(false)

      
     
  }
  


  useEffect(() => {
    // setSeatsMap(seats)

    console.log('inside useEffect')
    fetchData()
  }, [])
  

  return (
    <div className="App">
        <ToastContainer/>
      <div id="inputForm">
        <h2>Train Seat Book</h2>

        {/* Form for input */}
        <form onSubmit={handleSumbit}>
          <input
            type="number"
         
            value={numberOfseats}
            placeholder="Enter Number of Seats"
            onChange={(e) => setNumberOfseats(e.target.value)}
            style={{width:'150px'}}
          />
          <br />
          <button type="submit">Submit</button>
          <button onClick={handleReset}>Reset</button>
        </form>
      </div>

      <div>
        {
          seatNumbers.length===0 ? "" :" Your booked Seat are : "
        }
        {
          
          seatNumbers.map((seat)=>{
            return (
              <span style={{fontWeight:'bold'}}>{seat.seatNumber}, </span>
            )
          })
        }
      </div>

      <h3>Seat Map </h3>
      <div className="seatMaps">
        {/* To Generate Seat Map */}
        {
          seatsMap?.map((seat, idx)=>{
            return (
               <div key={seat.seatNumber} className={seat.booked?"Booked" :"notBooked" } >{seat.seatNumber}</div>
              
          )})
        }
      </div>

    </div>
  );
}

export default App;
