import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAppContext } from "@/contexts/appContext";
import { Colaborador } from "@/types/Colaborador";
import schemaLogin, { FormLoginType } from "./schema";

export default function useFormColaborador() {
  const { adicionarColaborador } = useAppContext();

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
      email: "",
      nome: "",
      areas: [""],
      idade: 0,
      regimeContratacao: "",
    },
  });

  const handleFormSubimit = async (data: any) => {
    adicionarColaborador({
      ...data,
      id: Math.random().toString(),
    } as Colaborador);
  };

  return {
    handleSubmit,
    handleFormSubimit,
    register,
    errors,
    getValues,
  };
}
