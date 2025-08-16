import React, { useState } from 'react'
import { AppBar, Avatar, Box, Button, Container, formControlClasses, IconButton, Paper, Stack, TextField, Toolbar, Tooltip, Typography } from '@mui/material'
import { Email as EmailIcon, Password as PasswordIcon, ArrowBack as ArrowBackIcon, CameraAlt as CameraAltIcon } from '@mui/icons-material'
import { VisuallyHiddenInput } from '../components/styles/styleComponents';
import { useFileHandler, useInputValidation, useStrongPassword } from '6pp';
import { usernameValidator } from '../utils/validators';
import axios from 'axios';
import { API_URL } from '../constants/config';
import { useDispatch } from 'react-redux';
import { userExists } from '../redux/reducers/auth';
import { clearChatState } from '../redux/reducers/chat';
import toast from 'react-hot-toast';
import { assets } from '../assets/assets';
import { Link, useLocation } from 'react-router-dom';



function login() {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    const toggleLogin = () => setIsLogin((prev => !prev));

    // Initialize the hook with a rule (for example, the field cannot be empty)
    const name = useInputValidation("");
    const bio = useInputValidation("");
    const username = useInputValidation("", usernameValidator);
    const password = useStrongPassword();

    const avatar = useFileHandler("single")

    const dispatch = useDispatch();

    // LogIn
    const handleLogin = async (e) => {
        e.preventDefault();

        const toastId = toast.loading('Wait...');


        setIsLoading(true)

        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const { data } = await axios.post(`${API_URL}/api/v1/user/login`,
                
                {
                    username: username.value,
                    password: password.value,
                },
                config
            );
            dispatch(clearChatState());
            dispatch(userExists(data.user));
            toast.success(data.message, { id: toastId, })
        }
        catch (error) {
            console.error("Login error details:", error);
            const message = error.response?.data?.message || "Something went wrong";
            toast.error(String(message), { id: toastId });
        }
        finally {
            setIsLoading(false)
        }
    }

    // Sign up
    // const handleSignUp = async (e) => {
    //     e.preventDefault();

    //     const toastId = toast.loading('Wait...');

    //     setIsLoading(true)

    //     const formData = new FormData();
    //     formData.append("avatar", avatar.file);
    //     formData.append("name", name.value);
    //     formData.append("bio", bio.value);
    //     formData.append("username", username.value);
    //     formData.append("password", password.value);

    //     const config = {
    //         withCredentials: true,
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     }

    //     try {
    //         const { data } = await axios.post(`${API_URL}/api/v1/user/new`,
    //             formData,
    //             config,
    //         )
    //         // dispatch(userExists(true));
    //         dispatch(userExists(data.user));
    //         toast.success(data.message, {
    //             id: toastId
    //         });
    //     } catch (error) {
    //         const message = (error.response?.data?.message || "Something went wrong").toString();
    //         if (message.includes("username")) {
    //             username.setError("Username already exists");
    //         }
    //         toast.error(String(message), { id: toastId });
    //     }
    //     finally {
    //         setIsLoading(false)
    //     }

    // }
    // Sign up
    const handleSignUp = async (e) => {
        e.preventDefault();

        const toastId = toast.loading("Wait...");
        setIsLoading(true);

        // Ensure avatar.file is a File object
        let avatarFile = avatar.file;
        if (Array.isArray(avatarFile)) {
            avatarFile = avatarFile[0]; // take the first file
        }

        if (!avatarFile) {
            toast.error("Please select an avatar image", { id: toastId });
            setIsLoading(false);
            return;
        }

        // Prepare form data
        const formData = new FormData();
        formData.append("avatar", avatarFile); // matches backend multer.single("avatar")
        formData.append("name", name.value);
        formData.append("bio", bio.value);
        formData.append("username", username.value);
        formData.append("password", password.value);

        const config = {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        try {
            const { data } = await axios.post(
                `${API_URL}/api/v1/user/new`,
                formData,
                config
            );

            dispatch(userExists(data.user));
            toast.success(data.message, { id: toastId });
        } catch (error) {
            const message =
                (error.response?.data?.message || "Something went wrong").toString();

            if (message.includes("username")) {
                username.setError("Username already exists");
            }
            toast.error(message, { id: toastId });
        } finally {
            setIsLoading(false);
        }
    };


    return (

        <div
            style={{
                // background: 'rgba(0, 0, 0, 0.9)',
                background: '#2E3135',
                // backgroundImage: `url(${assets.bg_login1})`,
                backgroundSize: 'cover',
                // backgroundPosition: 'center',
                // backgroundRepeat: 'no-repeat',
                // height: '100vh',
                width: '100%',

            }}
        >

            <Container component={"main"} maxWidth="xs"
                sx={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >

                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: '1px solid gray',
                        borderRadius: '1rem',
                        color: 'white',
                        // height: '100vh',
                        // background: 'rgba(0, 0, 0, 0.5)',

                        backgroundColor: 'rgba(0,0,0,0.2)', // Transparent background color

                        // backdropFilter: 'blur(3px)', // Apply blur effect
                    }}
                >

                    {isLogin ? (
                        <Box> {/* <> </> This Symbole is known as fargments*/}
                            {/* <img src={assets.chat_icon2} /> */}
                            <Typography color='white' variant='h4' textAlign={'center'} fontWeight={'600'}>Welcome Back</Typography>
                            <form
                                style={{
                                    marginTop: '1rem',
                                    // backgroundColor: 'red'
                                }}
                                onSubmit={handleLogin}

                            >
                                {/* <EmailIcon sx={{ margin: '2rem 0 0 0', position: 'absolute' }} /> */}

                                <TextField
                                    required
                                    fullWidth
                                    label="Username"
                                    margin='normal'
                                    variant='outlined'
                                    value={username.value}
                                    onChange={username.changeHandler}
                                    sx={{
                                        border: 'none',
                                        borderBottom: '1px solid gray',
                                        outline: "none",
                                        input: { color: 'white' },
                                        label: { color: 'white', },
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "12px", // Adjust the border radius
                                            "& fieldset": {
                                                borderRadius: "0.5rem",
                                                border: 'none',
                                                label: { color: 'white' },

                                            },
                                        },
                                    }}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    label="Password"
                                    type='password'
                                    margin='normal'
                                    variant='outlined'
                                    value={password.value}
                                    onChange={password.changeHandler}
                                    sx={{
                                        border: 'none',
                                        borderBottom: '1px solid gray',
                                        outline: "none",
                                        // border: '1px solid gray',
                                        // borderRadius: '1rem',
                                        input: { color: 'white' },
                                        label: { color: 'white' },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                border: 'none',

                                            },
                                        },
                                    }}
                                />

                                <Button sx={{ marginTop: '1rem' }} variant='contained' color='primary' type='submit' fullWidth disabled={isLoading}>Login</Button>


                                <Box textAlign={'end'} marginTop={'0.7rem'}>
                                    <Typography sx={{ display: 'inline', fontSize: '14px' }}>
                                        Don't have an account?
                                    </Typography>
                                    <Typography sx={{ display: 'inline', color: '#318CE7', cursor: 'pointer', fontWeight: '600' }} onClick={toggleLogin}> Register</Typography>
                                </Box>

                            </form>
                        </Box>

                    ) : (


                        // Sign Up 
                        <> {/* This Symbole is known as fargments*/}

                            <Typography sx={{ marginBottom: '1rem', fontWeight: '600' }} variant='h4' textAlign={'center'}>Sign Up</Typography>
                            <form
                                style={{
                                    width: '100%',
                                    // height: '100vh'
                                    // marginTop: '1rem',
                                }}

                                onSubmit={handleSignUp}
                            >
                                <Stack position={'relative'} width={'10rem'} margin={'auto'}>

                                    <Avatar sx={{ bgcolor: 'rgba(0,0,0,0.4)', border: '2px solid blue ', width: '10rem', height: '10rem', objectFit: 'contain' }} src={avatar.preview} />

                                    <IconButton sx={{ position: 'absolute', bottom: '0', right: '1.8rem', color: 'white', backgroundColor: 'white', bgcolor: 'rgba(0,0,0,0.5)', ':hover': { bgcolor: 'rgba(0,0,0,0.7)' } }} component='label'>
                                        <>
                                            <CameraAltIcon />
                                            <VisuallyHiddenInput type='file' onChange={avatar.changeHandler} />
                                        </>
                                    </IconButton>
                                </Stack>

                                {
                                    avatar.error && (
                                        <Typography m={'1rem auto'} width={'fit-content'} display={'block'} color={'error'} variant='caption'>
                                            {avatar.error}
                                        </Typography>
                                    )
                                }


                                <TextField
                                    required
                                    fullWidth
                                    label="Name"
                                    margin='normal'
                                    variant='outlined'
                                    value={name.value}
                                    onChange={name.changeHandler}
                                    sx={{
                                        border: 'none',
                                        borderBottom: '1px solid gray',
                                        outline: "none",
                                        // border: '1px solid gray',
                                        // borderRadius: '1rem',
                                        input: { color: 'white' },
                                        label: { color: 'white' },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                border: 'none',

                                            },
                                        },
                                    }}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    label="Bio"
                                    margin='normal'
                                    variant='outlined'
                                    value={bio.value}
                                    onChange={bio.changeHandler}
                                    sx={{
                                        border: 'none',
                                        borderBottom: '1px solid gray',
                                        outline: "none",
                                        // border: '1px solid gray',
                                        // borderRadius: '1rem',
                                        input: { color: 'white' },
                                        label: { color: 'white' },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                border: 'none',

                                            },
                                        },
                                    }}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    label="Username"
                                    margin='normal'
                                    variant='outlined'
                                    value={username.value}
                                    onChange={username.changeHandler}
                                    sx={{
                                        border: 'none',
                                        borderBottom: '1px solid gray',
                                        outline: "none",
                                        // border: '1px solid gray',
                                        // borderRadius: '1rem',
                                        input: { color: 'white' },
                                        label: { color: 'white' },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                border: 'none',

                                            },
                                        },
                                    }}
                                />

                                {
                                    username.error && (
                                        <Typography color='error' variant='caption'>
                                            {username.error}
                                        </Typography>
                                    )
                                }

                                <TextField
                                    required
                                    fullWidth
                                    label="Password"
                                    type='password'
                                    margin='normal'
                                    variant='outlined'
                                    value={password.value}
                                    onChange={password.changeHandler}
                                    sx={{
                                        border: 'none',
                                        borderBottom: '1px solid gray',
                                        outline: "none",
                                        // border: '1px solid gray',
                                        // borderRadius: '1rem',
                                        input: { color: 'white' },
                                        label: { color: 'white' },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                border: 'none',

                                            },
                                        },
                                    }}
                                />

                                {
                                    password.error && (
                                        <Typography color='error' variant='caption'>
                                            {password.error}
                                        </Typography>
                                    )
                                }

                                <Button sx={{ marginTop: '1rem' }} variant='contained' color='primary' type='submit' fullWidth disabled={isLoading}>Sign Up</Button>

                                <Box textAlign={'end'} marginTop={'0.7rem'}>
                                    <Typography sx={{ display: 'inline', fontSize: '14px', marginTop: '1rem' }}>
                                        Have an Account?
                                    </Typography>
                                    <Typography sx={{ display: 'inline', color: '#318CE7', cursor: 'pointer', fontWeight: '600' }} onClick={toggleLogin}> Login Here</Typography>
                                </Box>

                            </form>
                        </>
                    )}
                </Paper>
            </Container>
        </div >
    )
}

export default login

