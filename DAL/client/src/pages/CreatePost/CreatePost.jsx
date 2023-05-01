import Input from "../../components/Input"
import { validationSchema } from "./Validation"
import {Formik, Form} from 'formik'
import { TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { actionFetchCreateNewPost } from "../../reducers";
import ButtonToMainPage from "../../components/ButtonToMainPage";

import "./CreatePost.scss"

const CreatePost = () => {
    const dispatch = useDispatch()


 
    return(
        <section className="container">
         <ButtonToMainPage/>
        <div className="container__form">
        <Formik 
        initialValues={{ title: '', text: '', author: '' }} 
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          for (const key in values) {
            if (values[key] === '') {
              delete values[key];
            }
          }
          dispatch(actionFetchCreateNewPost(values))
          resetForm();
        }}> 
       
        {({values, handleChange}) => (
          <Form className="container__form--inputs">
         
            <TextField 
              id="outlined-controlled" 
              label="title" 
              name="title"
              value={values.title}
              onChange={handleChange}
              style={{  margin: "20px" }} 
             
             
              
            />
            <TextField 
              id="outlined-controlled" 
              label="text" 
              name="text"
              value={values.text}
              onChange={handleChange}
              style={{ margin: "20px" }} 
              multiline
              rows={8}
              maxRows={8}
            />
            <TextField 
              id="outlined-controlled" 
              label="author" 
              name="author"
              value={values.author}
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

export default CreatePost