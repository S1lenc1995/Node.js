import * as yup from 'yup'


export const validationSchema = yup.object({
    name: yup
        .string('Enter your name')
        .required('Name is required')
        .min(2, 'Name is too short'),       
})