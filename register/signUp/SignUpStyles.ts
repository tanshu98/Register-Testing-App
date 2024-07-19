import { SxProps } from "@mui/material";

export const styles = {
    signUpPage: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpCard: {
        width: '350px',
        p: 6,
        borderRadius: '15px',
    },
    formBox: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
    },
    labelInputBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    lableText: {
        color: 'black',
    },
    inputField: {
        width: '100%',
    },
    buttonsBox: {
        display: 'flex',
        justifyContent: 'center',
        gap: 4,
    }
} satisfies Record<string, SxProps>;