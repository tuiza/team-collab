'use client'
import {
    Typography,
    MenuItem,
} from '@mui/material';

import useFormColaborador from './useFormColaborador';

import * as S from './styles';
import { regimeContratacao } from "@/public/mocks/regimeDeContratacao";

type NovoColaboradorProps = {
    setNovo: (novo: boolean) => void;
}
const NovoColaborador = ({ setNovo }: NovoColaboradorProps) => {
    const { handleSubmit, handleFormSubimit, errors, register } = useFormColaborador();

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

                {/* <S.InputSelect
                    {...register('areas', {
                        required: true,
                    })}
                    name="areas"
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={getValues('areas')}
                    label="Áreas de Atuação"
                    error={Boolean(errors?.areas)}
                >
                    {areas.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </S.InputSelect> */}
            <S.Button
                loading={false}
                size="large"
                type='submit'
                variant="contained"
                color="inherit"
            >
                Criar Colaborador
            </S.Button>
            </S.Form>
        </S.FormContainer>
    );
    return (
        <S.Container>
            <Typography variant="h4" sx={{ mt: 2, mb: 5 }}>
                Criar novo Colaborador
            </Typography>
            {renderForm}
        </S.Container>
    )
}

export default NovoColaborador