import Input from "../../components/Input"
import {Formik, Form} from 'formik'
import { TextField, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { actionFetchCreateNewPost } from "../../reducers";
import ButtonToMainPage from "../../components/ButtonToMainPage";
import { Link } from "react-router-dom";
import { selectorToken } from '../../selectors';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { actionFetchLoginUser } from "../../reducers";



const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const token = useSelector(selectorToken)

    useEffect(()=>{
        if(token){
            navigate('/posts');
          }
    },[token])

    return(
        <section className="container">
              <Link to={'/registration'}>
        <button>Registration</button>
        </Link>
        <div className="container__form">
        <Formik 
        initialValues={{ email: '', password: '' }} 
        onSubmit={(values, { resetForm }) => {
          console.log(values, '3333333');
          for (const key in values) {
            if (values[key] === '') {
              delete values[key];
            }
          }
           dispatch(actionFetchLoginUser(values)) 
          resetForm();
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
          
            <button type="submit">Submit</button>
        
          </Form>
        )}
      </Formik>
      </div>
      </section>
    )
}

export default Login