'use client'
import {
    Typography,
    MenuItem,
    Grid,
    TextField,
    styled,
    Box,
    AutocompleteRenderInputParams,
    Autocomplete
} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';

import useFormColaborador from './useFormColaborador';
import { regimeContratacao } from "@/public/mocks/regimeDeContratacao";
import { useResponsive } from '@/hooks/useResponsive';
import { areas } from '@/public/mocks/areas';
import { Row } from '@/types/Row';

type NovoColaboradorProps = {
    setNovo: (novo: boolean) => void;
    setEdit?: (edit: boolean) => void;
    rowData?: Row
}

const NovoColaborador = ({ setNovo, rowData }: NovoColaboradorProps) => {
    const { handleSubmit, handleFormSubimit, errors, register, getValues } = useFormColaborador(rowData);
    const isMobile = useResponsive('down', 'sm')

    const MyGrid = styled(Grid)(() => ({
        width: isMobile ? '100%' : '50%',
    }));

    const handleConfirm = (data: Row) => {
        handleFormSubimit(data, rowData?.id)
        setNovo(false)
    }

    const renderForm = (
        <form onSubmit={handleSubmit(handleConfirm)} >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">
                        Dados Pessoais
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
                <Grid item xs={12}>
                    <Typography variant="h6">
                        Informações Profissionais
                    </Typography>
                </Grid>
                <MyGrid item xs={6}>
                    <TextField
                        {...register('regimeContratacao', { required: true })}
                        name="regimeContratacao"
                        select
                        
                        value={getValues('regimeContratacao')}
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
                    <label>
                        Áreas de atuação
                        <select
                            {...register('areas', {
                                required: true,
                            })}
                            name="areas"
                            
                            multiple={true}
                        >
                            {areas.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </label>
                </MyGrid>
                <Grid container sx={{ my: 8, mx: 2 }}>
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
                            size="large"
                            type='submit'
                            variant="contained"
                            color="inherit"
                            onClick={() => setNovo(true)}
                        >
                            {rowData ? 'Salvar Edição' : 'Criar Colaborador'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
    return (
        <Box>
            <Typography variant="h4" sx={{ mt: 2, mb: 5 }} >
                {rowData ? 'Editar Colaborador' : 'Novo Colaborador'}
            </Typography>
            {renderForm}
        </Box>
    )
}

export default NovoColaborador