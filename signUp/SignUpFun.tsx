import { Box, Paper, InputLabel, TextField, Button } from '@mui/material'
import React, { SyntheticEvent, useState } from 'react'
import { styles } from './SignUpStyles'

export default function SignUpFun() {
    const [fields, setFields] = useState({ name: '', mobile: '', email: '', password: '' })

    const handleSubmitSignup = (event: SyntheticEvent) => {
        event.preventDefault()
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFields({ ...fields, [name]: value })
    }




    return (
        <>
            <Box sx={styles.signUpPage}>
                <Paper sx={styles.signUpCard}>
                    <Box component={'h1'} data-testid='funSignUpHeading'>Sign Up</Box>
                    <Box component={'form'} sx={styles.formBox} onSubmit={handleSubmitSignup}>
                        <Box sx={styles.labelInputBox}>
                            <InputLabel sx={styles.lableText}>Name</InputLabel>
                            <TextField
                                type='text'
                                name='name'
                                InputProps={{ placeholder: 'Enter your name' }}
                                sx={styles.inputField}
                                onChange={handleChange}
                                value={fields.name}
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
                                value={fields.mobile}
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
                                value={fields.email}
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
                                value={fields.password}
                            />
                        </Box>
                        <Box sx={styles.buttonsBox} textTransform={'capitalize'}>
                            <Button variant='outlined'>Cancel</Button>
                            <Button variant='contained' type='submit' data-testid='funSignupBtn'>Sign up</Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </>
    )
}
