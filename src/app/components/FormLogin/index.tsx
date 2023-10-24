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
    Alert,
    useTheme
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useResponsive } from '@/hooks/useResponsive';

import useFormLogin from "./useFormLogin";

const FormLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { handleSubmit, handleFormSubimit, errors, register, errorAuth, loading } = useFormLogin();
    const [dark, setDark] = useState(false);
    const theme = useTheme();
    const r = useResponsive('up', 'md')
    
    const handleDarkMode = () => {
        theme.palette.mode = dark ? 'light' : 'dark';
        setDark((prev) => !prev);
    }

    const renderForm = (
        <>
            <form onSubmit={handleSubmit(handleFormSubimit)}>
                <Stack spacing={3}>
                    {errorAuth && <Alert severity="error">{errorAuth}</Alert>}
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
                    loading={loading}
                >
                    Entrar
                </LoadingButton>
                <LoadingButton
                    onClick={handleDarkMode}
                    loading={loading}
                >
                    dark
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
                mx: 2,
            }}
        >
                <Card
                    sx={{
                        p: 5,
                        width: 1,
                        maxWidth: 500,
                    }}
                >
                    <Typography variant="h4" sx={{ mt: 2, mb: 5 }}>Entre no Team Collab</Typography>
                    
                    {renderForm}
                </Card>
            
        </Box>
    )
}

export default FormLogin