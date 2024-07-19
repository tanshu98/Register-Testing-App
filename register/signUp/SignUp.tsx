import { Box, Button, InputLabel, Paper, TextField, Typography } from '@mui/material'
import { Component } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { styles } from './SignUpStyles'
import WithRouter from '../navigation/NavigationHOC';

interface IState {
  isRegisted: boolean,
}

interface IProps {
  navigate: (value: string) => void;
}

class SignUp extends Component<IProps, IState> {
  state = { isRegisted: false };

  validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(6, '*Name must be at least 6 characters')
      .max(20, '*Name is too long!')
      .required('*Name is required'),
    mobile: Yup.string()
      .min(10, '*Mobile must be at least 10 characters')
      .max(10, '*Mobile must be most 10 characters')
      .matches(/\d/, "*Mobile must be numbers only")
      .required('*Mobile is required'),
    email: Yup.string()
      .matches(/^[a-z0-9]+@[a-z]+\.[a-z]{2,4}$/, '*Enter a valid email with (@, .)')
      .email('*Invalid email')
      .required('*Email is required'),
    password: Yup.string()
      .min(8, '*Password must be at least 8 characters')
      .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "*Password should contain at least one uppercase and lowercase character")
      .matches(/\d/, "*Password should contain at least one number")
      .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "*Password should contain at least one special character")
      .required('*Password is required'),
  });

  storedList = JSON.parse(localStorage.getItem('userList') || '[]')

  render() {
    const { isRegisted } = this.state
    const { navigate } = this.props
    return (
      <>
        <Box sx={styles.signUpPage}>
          <Paper sx={styles.signUpCard}>
            {isRegisted &&
              <Typography component={'span'} color={'green'} fontSize={20} fontWeight={600}>
                Successfully registered, please login
              </Typography>
            }
            <Box component={'h1'} data-testid='signupHeading'>Sign Up</Box>
            <Formik
              initialValues={{ name: '', mobile: '', email: '', password: '' }}
              validationSchema={this.validationSchema}
              onSubmit={(values, actions) => {
                const existedUser = this.storedList.find((eachUser: any) => eachUser.email === values.email)

                if (existedUser) {
                  actions.setErrors({ email: `Email already exists, please login` });
                } else {
                  this.setState({ isRegisted: true })
                  localStorage.setItem('userList', JSON.stringify([...this.storedList, { ...values }]))
                  actions.resetForm();
                }
              }}
            >
              {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                <Box component={'form'} sx={styles.formBox} onSubmit={handleSubmit}>
                  <Box sx={styles.labelInputBox}>
                    <InputLabel sx={styles.lableText}>Name</InputLabel>
                    <TextField
                      type='text'
                      name='name'
                      InputProps={{ placeholder: 'Enter your name' }}
                      sx={styles.inputField}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Box>
                  <Box sx={styles.labelInputBox}>
                    <InputLabel sx={styles.lableText}>Mobile</InputLabel>
                    <TextField
                      type='text'
                      name='mobile'
                      InputProps={{ placeholder: 'Enter your mobile number' }}
                      sx={styles.inputField}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.mobile}
                      error={touched.mobile && Boolean(errors.mobile)}
                      helperText={touched.mobile && errors.mobile}
                    />
                  </Box>
                  <Box sx={styles.labelInputBox}>
                    <InputLabel sx={styles.lableText}>Email</InputLabel>
                    <TextField
                      type='text'
                      name='email'
                      InputProps={{ placeholder: 'Enter your email id' }}
                      sx={styles.inputField}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Box>
                  <Box sx={styles.labelInputBox}>
                    <InputLabel sx={styles.lableText}>Password</InputLabel>
                    <TextField
                      type='password'
                      name='password'
                      InputProps={{ placeholder: 'Enter password' }}
                      sx={styles.inputField}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Box>
                  <Box sx={styles.buttonsBox} textTransform={'capitalize'}>
                    <Button variant='outlined' onClick={() => navigate('/login')}>Login</Button>
                    <Button variant='contained' type='submit' data-testid='signupBtn'>Sign up</Button>
                  </Box>
                </Box>)
              }
            </Formik>
          </Paper>
        </Box>
      </>
    )
  }
}
export default WithRouter(SignUp)
