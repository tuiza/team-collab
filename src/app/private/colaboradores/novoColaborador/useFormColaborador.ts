import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppContext } from "@/contexts/appContext";
import { Colaborador } from "@/types/Colaborador";
import schemaLogin, { FormLoginType } from "./schema";
import { v4 as uuidv4 } from "uuid";
import { Row } from "@/types/Row";

export default function useFormColaborador(defaultValues?: Row) {
  const { adicionarColaborador, editarColaborador } = useAppContext();

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors, isLoading },
  } = useForm<FormLoginType>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(schemaLogin),
    defaultValues: {
      email: defaultValues?.email || "",
      nome: defaultValues?.nome || "",
      areas: defaultValues?.areas || [],
      idade: defaultValues?.idade || 0,
      regimeContratacao: defaultValues?.regimeContratacao || "",
    },
  });

  const handleFormSubimit = async (data: Row, id?: string) => {
    if (id) {
      editarColaborador(id, data as Colaborador);
    } else {
      adicionarColaborador({
        ...data,
        id: uuidv4(),
      } as Colaborador);
    }
  };

  return {
    handleSubmit,
    handleFormSubimit,
    register,
    errors,
    getValues,
    setValue,
    isLoading
  };
}
