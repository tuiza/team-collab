import { getColaboradores, postColaborador } from "@/app/api/service/colaboradoresService"
import { NextResponse } from "next/server"

export const GET = async (req: Request, res: Response) => {
    try {
        const colaboradores = getColaboradores()
        return NextResponse.json({ message: 'Success', colaboradores }, { status: 200 })
        
    }
    catch (error) {
        return NextResponse.json({ message: 'Error', error }, { status: 500 })  
    }
}

export const POST = async (req: Request, res: Response) => {
    const colaborador = await req.json()
    try { 
        const novoColaborador = { ...colaborador, id: Math.random().toString(36).substr(2, 9) }
        postColaborador([novoColaborador])
        return NextResponse.json({ message: 'Success', colaborador: novoColaborador }, { status: 201 })
    }
    catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}