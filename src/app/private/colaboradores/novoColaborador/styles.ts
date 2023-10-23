import styled from "styled-components";
import { TextField, Select } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export const Container = styled.div`
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  -webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  padding: 40px;
  width: 100%;
  max-width: 70vw;

  display: flex;
  flex-direction: column;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;

`;

export const InputText = styled(TextField)`
  width: 40%;
`;

export const InputSelect = styled(Select)`
    width: 40%;
    color: red;
`;

export const Button = styled(LoadingButton)`
    align-self: flex-end;
    justify-self: flex-end;
    justify-content: flex-end;
    align-items: flex-end;
`
