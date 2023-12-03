import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch} from "../../../hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/rootReducer";
import {loginTC} from "../../../store/reducers/auth-reducer/auth-reducer";
import {Navigate} from "react-router-dom";

type InputsType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {
    const dispatch = useAppDispatch()
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)
    const defaultValues = {
        email: '',
        password: '',
        rememberMe: false
    }
    const {
        formState,
        register,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm<InputsType>({
        defaultValues,
        mode: "onBlur"
    })
    const onSubmit: SubmitHandler<InputsType> = async (data, event) => {
        event?.preventDefault()
        await dispatch(loginTC(data))
    }

    return (
        <>
            {isAuth && <Navigate to={'/'}/>}
            <Grid container justifyContent={'center'}>
                <Grid item justifyContent={'center'}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl>
                            <FormGroup sx={{width: '350px'}}>
                                <TextField
                                    error={!!errors.email}
                                    helperText={errors.email && errors.email.message}
                                    label="Email"
                                    margin="normal"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Incorrect email",
                                        },
                                    })}
                                />
                                <TextField
                                    error={!!errors.password}
                                    helperText={errors.password && errors.password.message}
                                    type="password"
                                    label="Password"
                                    margin="normal"
                                    {...register("password", {
                                        required: "Password is required"
                                    })}
                                />
                                <FormControlLabel
                                    label={'Remember me'}
                                    control={<Checkbox
                                        {...register("rememberMe")}
                                    />}
                                />
                                <Button
                                    type={'submit'}
                                    variant={'contained'}
                                    color={'primary'}
                                    disabled={!isValid || formState.isSubmitting}
                                >
                                    Login
                                </Button>
                            </FormGroup>
                        </FormControl>
                    </form>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                </Grid>
            </Grid>
        </>
    )
}