import './App.css';
import {useState, useEffect,Ref, useRef} from "react";
import axios from 'axios';
import React from "react";
import { ReactDOM } from "react-dom";
import tapeimage from './resources/tape.jpg'
import { useForm } from 'react-hook-form';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'




function App() {

  const {register,
          handleSubmit,
          watch,
          formState:{errors}}=useForm( {
    defaultValues:{
      height:'',
      email:'',
      username:''
    }
  });
  // console.log(watch("height"));

  const resultSent=()=>{
    if(typeof alert !='undefined'){
      alert.foreach(function(error){
        return error.msg
      })
    }
  }

  console.log(resultSent);

  const [listIfUsers,setListOfUsers]= useState([ ]);

  const [units,setUnits]=useState("meters ");
  const [valNum,setVal]=useState(0);
  const [avg,setAvg]=useState(0);

  //useStates
  const [name,setName]=useState("");
  const [height,setHeight]=useState()
  const [email,setEmail]=useState("");

  const avgMeters=()=>{
    axios.get("http://localhost:5000/getUsers").then((response)=>{
      setAvg(response.data.avgVal)
      console.log(response.data.avgVal)
      console.log(avg);
    })
  }

 

  // useEffect(()=>{
  //   axios.get("http://localhost:5555/getUsers").then((response)=>{
  //     setListOfUsers(response.data);
  //     alert('working ???')
  //   })
  // },[]);

  const createUser=()=>{
    axios.post("http://localhost:5000/createUser",
    {   name,
        height,
        email,
        avg,
      }).then((response)=>{
          alert(`Hi ${name} you have successfully submitted your height. Your height and the average height of all previous submission is sent to ${email} Thank You.`)
        })
      }

  return (

    


    <div className="App">


 
      
    
       

        <h1>Please Fill Up The Form</h1>
        {valNum ?(<p>Height in meters: {valNum} m</p>):(<p>Height in meters</p>) }
       

        {valNum ?(<p>Height in centimeters: {valNum / 0.01} cm</p>):(<p>Height in centimeters</p>) }

        {valNum ?(<p>Height in inches: {valNum * 39.37} inche(s)</p>  ):(<p>Height in inches</p>) }
    

      <form className='form' onSubmit={handleSubmit((data)=>{
        console.log(data);
      })}>
      <section >
    
          <label> Height
            <input type="number" 
                {...register('height',{required:' ⚠ Your height is required',maxLength:{value:5,message:'⚠ Maximum lenght is 5'}})}
                placeholder='Please enter your height in meters...' 
                value={valNum}
                onChange={(event)=>{setVal(event.target.value);
                setHeight(event.target.value); avgMeters()} }
            
            />
            </label>
            <span>{errors.height?.message}</span>
            <br></br>
         <label> Name
          <input type="text" 
                 {...register('username',{required:'⚠ Your name is required'})}
                 placeholder='Please enter your name' 
                 onChange={(event)=>{setName(event.target.value)}} 
                 />
          </label>
          <span>{errors.username?.message}</span>
          <br></br>
          <label> Email
          <input type="text" 
                  {...register('email',{required:'⚠ Your email is required',pattern:{ value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message:'⚠ Please enter valid email'}})}
                  placeholder='Please enter your email' 
                  onChange={(event)=>{setEmail(event.target.value)}}
                  />
          </label>
          <span>{errors.email?.message}</span>

          
          
          <input type='submit' 
                  // onMouseEnter={avgMeters} 
                  onClick={createUser}
                  />
        </section>
      </form>
   
    </div>
  );
}

export default App;
