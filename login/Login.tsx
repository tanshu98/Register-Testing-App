import { Box, Paper, InputLabel, TextField, Button } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Component } from 'react'
import { styles } from '../signUp/SignUpStyles';
import WithRouter from '../navigation/NavigationHOC';

interface IProps {
  navigate: (value: string) => void;
}

class Login extends Component<IProps, {}> {

  validationSchema = Yup.object().shape({
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

  storedList = JSON.parse(localStorage.getItem('userList')!) ?? []

  render() {
    const { navigate } = this.props;

    return (
      <Box sx={styles.signUpPage}>
        <Paper sx={styles.signUpCard}>
          <Box component={'h1'} data-testid='loginHeading'>Login</Box>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={this.validationSchema}

            onSubmit={(values, actions) => {
              const existedUser = this.storedList.length > 0 &&
                this.storedList.find((eachUser: any) => eachUser?.email === values?.email);

              if (existedUser) {
                if (values.password === existedUser.password) {
                  localStorage.setItem('user', JSON.stringify({ ...existedUser }));
                  navigate('/Home')
                } else {
                  actions.setErrors({ password: 'Incorrect password' });
                }
              } else {
                actions.setErrors({ email: 'Your not registered with us please sign up first' });
              }
            }}
          >

            {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
              <Box component={'form'} sx={styles.formBox} onSubmit={handleSubmit}>
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
                  <Button variant='outlined' onClick={() => navigate('/')} data-testid='navigateToSignUp'>Sign Up</Button>
                  <Button variant='contained' type='submit' data-testid='loginToHome'>Login</Button>
                </Box>
              </Box>)
            }
          </Formik>
        </Paper>
      </Box >
    )
  }
}
export default WithRouter(Login)