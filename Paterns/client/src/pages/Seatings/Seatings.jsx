
import React from 'react';
import {useParams, useNavigate} from "react-router-dom";
import { useEffect } from 'react';
import {Formik, Form} from 'formik'
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox } from '@mui/material';



const Seatings = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(()=>{
     
    },[])


    return(
        <section className="container">
        <div className="container__form"> 
  
            <Formik 
            initialValues={{ notificationSent: false, notificationChannel:""}}  
            onSubmit={ async (values)  => {
            console.log(values, 'ddddddd');
            for (const key in values) {
                if (values[key] === '') {
                  delete values[key];
                }
              }
        
            navigate('/');

            // очистити форму
            }}>
            {({values, handleChange}) => (
            <Form className="container__form--inputs">
               <FormControl   style={{ margin: "20px" }}>
  <InputLabel id="demo-simple-select-label">Genre</InputLabel>
              <Select
             labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.genre}
                label="genre"
               name="genre"
              onChange={handleChange}
            >
              <MenuItem value={'inapp'}>inapp</MenuItem>
              <MenuItem value={'email'}>email</MenuItem>
            </Select>
            </FormControl>
            <FormControlLabel control={<Checkbox  
       
            />} label="Private"      onChange={handleChange} 
            name="isPrivate" checked={values.isPrivate}/> 
            <button type="submit">Submit</button>

            </Form>
            )}
            </Formik>
      </div>
      </section>
    )
}