import Input from "../../components/Input"
import { validationSchema } from "./Validation"
import {Formik, Form} from 'formik'
import { TextField, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox } from '@mui/material';
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
        initialValues={{ title: '', content: '', author: '', genre: '', isPrivate: false }} 
        onSubmit={(values, { resetForm }) => {
          console.log(values, '3333333');
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
              label="content" 
              name="content"
              value={values.content}
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
              <MenuItem value={'Politic'}>Politic</MenuItem>
              <MenuItem value={'Business'}>Business</MenuItem>
              <MenuItem value={'Sport'}>Sport</MenuItem>
              <MenuItem value={'Other'}>Other</MenuItem>
            </Select>
            </FormControl>
            <FormControlLabel control={<Checkbox  
       
            />} label="Private"      onChange={handleChange} 
            name="isPrivate" />
            <button type="submit">Submit</button>
        
          </Form>
        )}
      </Formik>
      </div>
      </section>
    )
}

export default CreatePost