import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppContext } from "@/contexts/appContext";
import schemaLogin, { FormLoginType } from "./schema";
import { Projeto } from "@/types/Projeto";
import { Row } from "@/types/Row";
import { v4 as uuidv4 } from "uuid";

export default function useFormProjeto(defaultValues?: Row) {
  const { adicionarProjeto, editarProjeto } = useAppContext();

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<FormLoginType>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(schemaLogin),
    defaultValues: {
      nome: defaultValues?.nome || "",
      tecnologias: defaultValues?.tecnologias || [],
      colaboradores: defaultValues?.colaboradores || [],
      descricao: defaultValues?.descricao || "",
    },
  });


  const handleFormSubimit = async (data: any, id: string) => {
    console.log(data)
    if (id) {
      editarProjeto(id, data as Projeto);
    } else {
      adicionarProjeto({
        ...data,
        id: uuidv4(),
      } as Projeto);
    }
  };

  return {
    handleSubmit,
    handleFormSubimit,
    register,
    errors,
    getValues,
  };
}

