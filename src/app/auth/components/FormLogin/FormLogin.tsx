'use client'
import { useState } from "react"
import {
    Box,
    Card,
    Stack,
    TextField,
    Typography,
    IconButton,
    InputAdornment,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import useFormLogin from "./useFormLogin";

export const FormLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {handleSubmit, handleFormSubimit, errors, register} = useFormLogin();
    
    const renderForm = (
        <>
            <form onSubmit={handleSubmit(handleFormSubimit)}>
                <Stack spacing={3}>
                    <TextField
                        {...register('email', { required: true })}
                        name="email"
                        label="Email"
                        error={Boolean(errors?.email)}
                        helperText={errors?.email?.message}
                    />

                    <TextField
                        {...register('senha', { required: true })}
                        name="senha"
                        label="Senha"
                        error={Boolean(errors?.senha)}
                        helperText={errors?.senha?.message}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {/* <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} /> */}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>
                <LoadingButton
                    sx={{ my: 5 }}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="inherit"
                >
                    Entrar
                </LoadingButton>
            </form>
        </>
    );
    return (
        <Box
            sx={{
                height: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* <Logo
                sx={{
                    position: 'fixed',
                    top: { xs: 16, md: 24 },
                    left: { xs: 16, md: 24 },
                }}
            /> */}

            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
                <Card
                    sx={{
                        p: 5,
                        width: 1,
                        maxWidth: 420,
                    }}
                >
                    <Typography variant="h4" sx={{ mt: 2, mb: 5 }}>Entre no Team Collab</Typography>
                    {renderForm}
                </Card>
            </Stack>
        </Box>
    )
}