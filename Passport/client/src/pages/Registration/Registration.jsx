import {Formik, Form} from 'formik'
import { TextField, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { actionFetchCreateNewPost } from "../../reducers";
import ButtonToMainPage from "../../components/ButtonToMainPage";
import { actionFetchRegistrationUser } from "../../reducers";
import { useNavigate } from 'react-router-dom';
import { selectorToken } from '../../selectors';
import { useEffect } from 'react';



const Registration = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const token = useSelector(selectorToken)
    console.log(token, '1111')

    useEffect(()=>{
        if(token){
            navigate('/posts');
          }
    },[token])

 
    return(
        <section className="container">
        <div className="container__form">
        <Formik 
        initialValues={{ email: '', password: '', confirmPassword: '' }} 
        onSubmit={(values, { resetForm }) => {
          console.log(values, '3333333');
          for (const key in values) {
            if (values[key] === '') {
              delete values[key];
            }
          }
           dispatch(actionFetchRegistrationUser(values)) 
          resetForm();
          console.log(token, 'tok')
         
        
        }}> 
       
        {({values, handleChange}) => (
          <Form className="container__form--inputs">
         
            <TextField 
              id="outlined-controlled" 
              label="email" 
              name="email"
              value={values.email}
              onChange={handleChange}
              style={{  margin: "20px" }} 
            />
            <TextField 
              id="outlined-controlled" 
              label="password" 
              name="password"
              value={values.password}
              onChange={handleChange}
              style={{ margin: "20px" }} 
            />
            <TextField 
              id="outlined-controlled" 
              label="confirm password" 
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              style={{ margin: "20px" }} 
            />
          
            <button type="submit">Submit</button>
        
          </Form>
        )}
      </Formik>
      </div>
      </section>
    )
}

export default Registration