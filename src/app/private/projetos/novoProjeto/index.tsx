'use client'
import {
    Typography,
    MenuItem,
    Grid,
    TextField,
    styled,
    Box,
} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';

import useFormColaborador from './useFormProjeto';
import { regimeContratacao } from "@/public/mocks/regimeDeContratacao";
import { useResponsive } from '@/hooks/useResponsive';
import { Row } from '@/types/Row';
import { useAppContext } from '@/contexts/appContext';

type NovoProjetoProps = {
    setNovo: (novo: boolean) => void;
    setEdit?: (edit: boolean) => void;
    rowData?: Row
}
const NovoProjeto = ({ setNovo, rowData }: NovoProjetoProps) => {
    const { handleSubmit, handleFormSubimit, errors, register } = useFormColaborador(rowData);
    const isMobile = useResponsive('down', 'sm')
    const { colaboradores } = useAppContext()
    
    const nomeColaboradores = colaboradores.map(colaborador => colaborador.nome)

    const MyGrid = styled(Grid)(() => ({
        width: isMobile ? '100%' : '50%',
    }));

    const handleConfirm = (data: Row) => {
        handleFormSubimit(data, rowData?.id)
        setNovo(false)
    }

    const renderForm = (
        <form onSubmit={handleSubmit(handleConfirm)}>
        <Grid  container spacing={2}>
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
            <MyGrid item xs={6}>
                <TextField
                    {...register('tecnologias', { required: true })}
                    name="tecnologias"
                    select
                    label="Tecnologias"
                    error={Boolean(errors?.tecnologias)}
                    helperText={errors?.tecnologias?.message}
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
                <TextField
                    {...register('colaboradores', { required: true })}
                    name="colaboradores"
                    select
                    label="Colaboradores"
                    error={Boolean(errors?.colaboradores)}
                    helperText={errors?.colaboradores?.message}
                    fullWidth
                >
                    {nomeColaboradores.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}

                </TextField>
            </MyGrid>
            <MyGrid item >
                <TextField
                    {...register('descricao', { required: true })}
                    name="descricao"
                    label="Descrição"
                    multiline
                    error={Boolean(errors?.descricao)}
                    helperText={errors?.descricao?.message}
                    fullWidth
                />
            </MyGrid>
            <Grid container sx={{my: 8, mx: 2}} >
                <Grid item xs={6}>
                    <LoadingButton
                        loading={false}
                        size="large"
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
        </form>
    );
    return (
        <Box>
            <Typography variant="h4" sx={{ mt: 2, mb: 5 }}>
                {rowData ? 'Editar Projeto' : 'Novo Projeto'}
            </Typography>
            {renderForm}
        </Box>
    )
}

export default NovoProjeto