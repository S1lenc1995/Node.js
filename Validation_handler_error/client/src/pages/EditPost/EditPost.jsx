import React from 'react';
import {useParams, useNavigate} from "react-router-dom";
import { useEffect } from 'react';
import {Formik, Form} from 'formik'
import { useSelector, useDispatch } from 'react-redux';
import { selectorCurentPost } from '../../selectors';
import { actionFetchCurentPost, actionFetchUpdatePost,actionFetchAllPosts } from '../../reducers';
import { TextField } from '@mui/material';



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
        {curentPost?.map(({title, text, author})=>(
            <Formik 
            initialValues={{ title: title, text: text, author: author}}  
            onSubmit={ async (values)  => {
            console.log(values);
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
            ))}
      </div>
      </section>
    )
}

export default EditPost