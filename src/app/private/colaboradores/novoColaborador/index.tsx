'use client'
import {
    Typography,
    MenuItem,
    Box
} from '@mui/material';

import useFormColaborador from './useFormColaborador';

import * as S from './styles';
import { areas } from "@/public/mocks/areas";
import { regimeContratacao } from "@/public/mocks/regimeDeContratacao";

type NovoColaboradorProps = {
    setNovo: (novo: boolean) => void;
}
const NovoColaborador = ({ setNovo }: NovoColaboradorProps) => {
    const { handleSubmit, handleFormSubimit, errors, register, getValues } = useFormColaborador();

    const renderForm = (
        <S.FormContainer>
            <S.Form onSubmit={handleSubmit(handleFormSubimit)}>
                <S.InputText
                    {...register('nome', { required: true })}
                    name="nome"
                    label="Nome"
                    error={Boolean(errors?.nome)}
                    helperText={errors?.nome?.message}
                />
                <S.InputText
                    {...register('email', { required: true })}
                    name="email"
                    label="Email"
                    error={Boolean(errors?.email)}
                    helperText={errors?.email?.message}

                />
                <S.InputText
                    {...register('idade', { required: true, setValueAs: (value: string) => parseInt(value, 10) })}
                    name="idade"
                    type="number"
                    label="Idade"
                    error={Boolean(errors?.idade)}
                    helperText={errors?.idade?.message}
                />
                <S.InputText
                    {...register('regimeContratacao', { required: true })}
                    name="regimeContratacao"
                    select
                    
                    label="Regime de Contratação"
                    error={Boolean(errors?.regimeContratacao)}
                    helperText={errors?.regimeContratacao?.message}
                >
                    {regimeContratacao.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}

                </S.InputText>

                <S.InputSelect
                    {...register('areas', { required: true })}
                    name="areas"
                    value={[]}
                    multiple
                    label="Áreas de Atuação"
                    error={Boolean(errors?.areas)}
                >
                    {areas.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </S.InputSelect>
            </S.Form>
            <S.Button
                loading={false}
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
            >
                Criar Colaborador
            </S.Button>
        </S.FormContainer>
    );
    return (
        <Box spacing={3}>
            <Typography variant="h4" sx={{ mt: 2, mb: 5 }}>
                Criar novo Colaborador
            </Typography>
            {renderForm}
        </Box>
    )
}

export default NovoColaborador