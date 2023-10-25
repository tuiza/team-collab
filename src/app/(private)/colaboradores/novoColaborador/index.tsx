'use client'
import {
    Typography,
    MenuItem,
    Grid,
    TextField,
    styled,
    Box,
    Select

} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';

import useFormColaborador from './useFormColaborador';
import { regimeContratacao } from "@/public/mocks/regimeDeContratacao";
import { useResponsive } from '@/hooks/useResponsive';
import { projetos } from '@/public/mocks/projetos';

type NovoColaboradorProps = {
    setNovo: (novo: boolean) => void;
}
const NovoColaborador = ({ setNovo }: NovoColaboradorProps) => {
    const { handleSubmit, handleFormSubimit, errors, register, getValues} = useFormColaborador();
    const isMobile = useResponsive('down', 'sm')

    const MyGrid = styled(Grid)(() => ({
        width: isMobile ? '100%' : '50%',
    }));


    const renderForm = (
        <Grid onSubmit={handleSubmit(handleFormSubimit)} container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">
                    Dados Pessoais
                </Typography>
            </Grid>
            {}
            <MyGrid item >
                <TextField
                    {...register('nome', { required: true })}
                    name="nome"
                    label="Nome"
                    error={Boolean(errors?.nome)}
                    helperText={errors?.nome?.message}
                    fullWidth
                />
            </MyGrid>
            <MyGrid item >
                <TextField
                    {...register('email', { required: true })}
                    name="email"
                    label="Email"
                    error={Boolean(errors?.email)}
                    helperText={errors?.email?.message}
                    fullWidth
                />
            </MyGrid>
            <MyGrid item>
                <TextField
                    {...register('idade', { required: true, setValueAs: (value: string) => parseInt(value, 10) })}
                    name="idade"
                    type="number"
                    label="Idade"
                    error={Boolean(errors?.idade)}
                    helperText={errors?.idade?.message}
                />
            </MyGrid>
            <MyGrid item xs={6}>
                <TextField
                    {...register('regimeContratacao', { required: true })}
                    name="regimeContratacao"
                    select
                    label="Regime de Contratação"
                    error={Boolean(errors?.regimeContratacao)}
                    helperText={errors?.regimeContratacao?.message}
                    fullWidth
                >
                    
                    {regimeContratacao.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}

                </TextField>
            </MyGrid>

            <MyGrid item xs={6}>
                <Select
                    {...register('areas', {
                        required: false,
                    })}
                    name="areas"
                    multiple
                    fullWidth
                    value={getValues('areas')}
                    label="Tecnologias"
                    error={Boolean(errors?.areas)}
                >
                    <MenuItem value={'a'}>
                        a
                    </MenuItem>
                    <MenuItem value={'b'}>
                        b
                    </MenuItem>
                </Select>
            </MyGrid>
            <Grid container sx={{my: 8, mx: 2}}>
                <Grid item xs={6}>
                    <LoadingButton
                        loading={false}
                        size="large"
                        type='submit'
                        variant="contained"
                        color="inherit"
                        onClick={() => setNovo(false)}
                    >
                        Voltar
                    </LoadingButton>
                </Grid>
                <Grid item xs={6}>
                    <LoadingButton
                        loading={false}
                        size="large"
                        type='submit'
                        variant="contained"
                        color="inherit"
                        onClick={() => setNovo(true)}
                    >
                        Criar Colaborador
                    </LoadingButton>
                </Grid>
            </Grid>
        </Grid>
    );
    return (
        <Box>
            <Typography variant="h4" sx={{ mt: 2, mb: 5 }}>
                Criar novo Colaborador
            </Typography>
            {renderForm}
        </Box>
    )
}

export default NovoColaborador