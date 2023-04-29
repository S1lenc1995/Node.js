import Input from "../../components/Input"
import { validationSchema } from "./Validation"
import {Formik, Form} from 'formik'
import { TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { actionFetchCreateNewPost } from "../../reducers";

import "./CreatePost.scss"

const CreatePost = () => {
    const dispatch = useDispatch()


 
    return(
        <section className="container">
         
        <div className="container__form">
        <Formik 
        initialValues={{ title: '', text: '' }} 
        onSubmit={(values) => {
          console.log(values);
          dispatch(actionFetchCreateNewPost(values))
          // очистити форму
        }}>
        {({values, handleChange}) => (
          <Form className="container__form--inputs">
         
            <TextField 
              id="outlined-controlled" 
              label="title" 
              name="title"
              value={values.title}
              onChange={handleChange}
            />
            <TextField 
              id="outlined-controlled" 
              label="text" 
              name="text"
              value={values.text}
              onChange={handleChange}
            />
            <TextField 
              id="outlined-controlled" 
              label="author" 
              name="author"
              value={values.author}
              onChange={handleChange}
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