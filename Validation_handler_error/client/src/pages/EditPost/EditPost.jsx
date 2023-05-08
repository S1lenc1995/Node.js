import React from 'react';
import {useParams, useNavigate} from "react-router-dom";
import { useEffect } from 'react';
import {Formik, Form} from 'formik'
import { useSelector, useDispatch } from 'react-redux';
import { selectorCurentPost } from '../../selectors';
import { actionFetchCurentPost, actionFetchUpdatePost,actionFetchAllPosts } from '../../reducers';
import { TextField, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox } from '@mui/material';



const EditPost = () => {
    let {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let curentPost = useSelector(selectorCurentPost)
    console.log(id, 'aaaaa')

    useEffect(()=>{
        dispatch(actionFetchCurentPost(id))
    },[])
    console.log(curentPost[0], '2222222222')
    
    return(
       
        <section className="container">
        <div className="container__form"> 
        {curentPost?.map(({title, content, author, genre, isPrivate})=>(
            <Formik 
            initialValues={{ title: title, content: content, author: author, genre: genre, isPrivate: isPrivate}}  
            onSubmit={ async (values)  => {
            console.log(values, 'ddddddd');
            for (const key in values) {
                if (values[key] === '') {
                  delete values[key];
                }
              }
            await dispatch(actionFetchUpdatePost(id, values))
            await dispatch(actionFetchAllPosts())
            navigate('/');

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
                label="content" 
                name="content"
                value={values.content}
                onChange={handleChange}
            />
            <TextField 
                id="outlined-controlled" 
                label="author" 
                name="author"
                value={values.author}
                onChange={handleChange}
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
            name="isPrivate" checked={values.isPrivate}/> 
            <button type="submit">Submit</button>

            </Form>
            )}
            </Formik>
            ))}
      </div>
      </section>
    )
}

export default EditPost