import * as yup from 'yup'


export const validationSchema = yup.object({
    title: yup
        .string('Enter your name')
        .required('Title is required')
        .min(2, 'Name is too short'),       
})