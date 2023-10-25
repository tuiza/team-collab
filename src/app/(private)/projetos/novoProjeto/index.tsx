'use client'
import {
    Typography,
    MenuItem,
    Grid,
    TextField,
    styled,
    Box,
    Select,
    InputLabel,
    OutlinedInput
} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';

import useFormColaborador from './useFormColaborador';
import { regimeContratacao } from "@/public/mocks/regimeDeContratacao";
import { useResponsive } from '@/hooks/useResponsive';
import { areas } from '@/public/mocks/areas';
import { colaboradores } from '@/public/mocks/colaboradores';
import { projetos } from '@/public/mocks/projetos';

type NovoProjetoProps = {
    setNovo: (novo: boolean) => void;
}
const NovoProjeto = ({ setNovo }: NovoProjetoProps) => {
    const { handleSubmit, handleFormSubimit, errors, register, getValues } = useFormColaborador();
    const isMobile = useResponsive('down', 'sm')

    const MyGrid = styled(Grid)(() => ({
        width: isMobile ? '100%' : '50%',
    }));


    const renderForm = (
        <Grid onSubmit={handleSubmit(handleFormSubimit)} container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">
                    Informações do Projeto
                </Typography>
            </Grid>
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
                <InputLabel id="demo-multiple-name-label">Colaboradores</InputLabel>
            <Select
                    {...register('areas', {
                        required: true,
                    })}
                    name="areas"
                    multiple
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    input={<OutlinedInput label="Name" />}
                    fullWidth
                    value={getValues('areas')}
                    label="Colaboradores"
                    error={Boolean(errors?.areas)}
                >
                    {colaboradores.map((c)=> c.nome).map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
                </MyGrid>
            <MyGrid item xs={6}>
            <Select
                    {...register('areas', {
                        required: true,
                    })}
                    name="areas"
                    multiple
                    fullWidth
                    value={getValues('areas')}
                    label="Tecnologias"
                    error={Boolean(errors?.areas)}
                >
                    {projetos.map((c)=> c.tecnologias).map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
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
                    >
                        Criar Projeto
                    </LoadingButton>
                </Grid>
            </Grid>
        </Grid>
    );
    return (
        <Box>
            <Typography variant="h4" sx={{ mt: 2, mb: 5 }}>
                Criar novo Projeto
            </Typography>
            {renderForm}
        </Box>
    )
}

export default NovoProjeto