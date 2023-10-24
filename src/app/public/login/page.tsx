import FormLogin from "../../components/FormLogin";

import { Container } from "@mui/material";

interface LoginProps { }

export default function Login(props: LoginProps) {
    return (
        <Container sx={{alignItems: 'center', justifyContent: 'center', display: 'flex'}} >
            <FormLogin />
        </Container>
    )
}