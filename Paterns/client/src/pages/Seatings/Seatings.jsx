
import React from 'react';
import {useNavigate} from "react-router-dom";
import { useEffect } from 'react';
import {Formik, Form} from 'formik'
import { selectorUserEmail, selectorUserData} from '../../selectors';
import { useSelector, useDispatch } from 'react-redux';
import { actionFetchUserData, actionFetchUserDataUpdate } from '../../reducers';
import { TextField, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox } from '@mui/material';



const Seatings = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userEmail = useSelector(selectorUserEmail)
    const userData = useSelector(selectorUserData)
    


    const {notificationChannel, notificationSent} = userData

    useEffect(()=>{
        dispatch(actionFetchUserData(userEmail))
    },[])



    if (notificationChannel === undefined || notificationSent === undefined || userData == null) {
        // Поки дані не завантажені, повертаємо пусту розмітку або спіннер
        return null;
      }

   
    


 


    return(
        <>
      
        <section className="container">
        <div className="container__form"> 
  
            <Formik 
            initialValues={{ notificationSent: notificationSent, notificationChannel: notificationChannel}}  
            onSubmit={ async (values)  => {
            for (const key in values) {
                if (values[key] === '') {
                  delete values[key];
                }
              }
            dispatch(actionFetchUserDataUpdate({...values, email:userEmail}))
            navigate('/');

            // очистити форму
            }}>
            {({values, handleChange}) => (
            <Form className="container__form--inputs">
            <FormControl   style={{ margin: "20px" }}>
            <InputLabel id="demo-simple-select-label">notificationChannel</InputLabel>
              <Select
             labelId="demo-simple-select-label"
             id="demo-simple-select"
             value={values.notificationChannel}
             label="notificationChannel"
             name="notificationChannel"
             onChange={handleChange}
           >
             <MenuItem value={'inapp'}>inapp</MenuItem>
             <MenuItem value={'email'}>email</MenuItem>
            </Select>
            </FormControl>


            <FormControlLabel 
            control={<Checkbox />} 
            label="notificationSent"      
            onChange={handleChange}  
            name="notificationSent" 
            checked={values.notificationSent} /> 
            <button type="submit">Save</button>

            </Form>
            )}
            </Formik>
      </div>
      </section>
      
      </>
    )
}

export default Seatings