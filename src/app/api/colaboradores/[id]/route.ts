import { deleteColaborador, getColaborador, putColaborador } from "@/app/api/service/colaboradoresService"
import { NextResponse } from "next/server"


const showNextError = (error: unknown) => {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
}

const getColaboradorById = (req: Request) => {
    const id = req.url.split("colaboradores/")[1];
    const colaborador = getColaborador(id)
    if(!colaborador) {
        return NextResponse.json({ message: 'Error', error: 'Colaborador não encontrado' }, { status: 404 })
    }
    return colaborador
}

export const GET = async (req: Request, res: Response) => {
    try {
        const colaborador = getColaboradorById(req)
        return NextResponse.json({ message: 'Success', colaborador }, { status: 200 })
    } catch (error) {
        return showNextError(error);
    }
}

export const PUT = async (req: Request, res: Response) => {
    try {
        const colaborador = await req.json()
        const id = req.url.split('colaboradores/')[1]
        const colaboradorAtulizado = { ...colaborador, id }
        putColaborador(id, colaboradorAtulizado);
        return NextResponse.json(
          { message: "Success", colaborador: colaboradorAtulizado },
          { status: 200 }
        );
    } catch (error) {
        return showNextError(error);
    }
}

export const DELETE = async (req: Request, res: Response) => {
    try {
        const id = req.url.split("colaboradores/")[1];
        deleteColaborador(id);
        return NextResponse.json(
          { message: "Success"},
          { status: 200 }
        );
    } catch (error) {
        return showNextError(error);
    }
}



