'use client'
import { Colaborador } from "@/types/Colaborador";
import { createContext, useState, useContext, useMemo } from "react";
import { colaboradores as mockColaboradores } from "@/public/mocks/colaboradores";
import { projetos as mockProjetos } from "@/public/mocks/projetos";
import { Projeto } from "@/types/Projeto";

type ContextProviderProps = {
  children: React.ReactNode;
};
interface AppContextProps {
  colaboradores: Colaborador[];
  projetos: Projeto[];
  adicionarColaborador: (colaborador: Colaborador) => void;
  removerColaborador: (id: string) => void;
  adicionarProjeto: (projeto: Projeto) => void;
  removerProjeto: (id: string) => void;
  editarColaborador: (id: string, data: Colaborador) => void;
  editarProjeto: (id: string, data: Projeto) => void;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext só pode ser usado dentro de um AppProvider");
  }
  return context;
};

const AppProvider = ({ children }: ContextProviderProps) => {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>(mockColaboradores);
  const [projetos, setProjetos] = useState<Projeto[]>(mockProjetos);

  const getColaborador = (id: string) => {
    return colaboradores.find((colaborador) => colaborador.id === id);
  }

  const adicionarColaborador = (colaborador: Colaborador) => {
  setColaboradores((prevColaboradores) => [
      ...prevColaboradores,
      colaborador,
    ]);
  };

  const editarColaborador = (id: string, data: Colaborador) => {
    const colaboradoresAtuais = colaboradores
    const index = colaboradoresAtuais.findIndex(colaborador => colaborador.id === id)
    const colaboradorModificado = { ...colaboradoresAtuais[index], ...data }
    colaboradoresAtuais[index] = colaboradorModificado
    setColaboradores(colaboradoresAtuais)
  }

  const editarProjeto = (id: string, data: Projeto) => {
    const colaboradoresAtuais = colaboradores
    const index = colaboradoresAtuais.findIndex(colaborador => colaborador.id === id)
    const colaboradorModificado = { ...colaboradoresAtuais[index], ...data }
    colaboradoresAtuais[index] = colaboradorModificado
    setColaboradores(colaboradoresAtuais)
  }

  const removerColaborador = (id: string) => {
    setColaboradores((prevColaboradores) =>
      prevColaboradores.filter((colaborador) => colaborador.id !== id)
    );
  };

  const adicionarProjeto = (projeto: Projeto) => {
    setProjetos((prevProjetos) => [...prevProjetos, projeto]);
  };

  const removerProjeto = (id: string) => {
    setProjetos((prevProjetos) =>
      prevProjetos.filter((projeto) => projeto.id !== id)
    );
  };



  const value = useMemo(() => ({
    colaboradores,
    projetos,
    adicionarColaborador,
    removerColaborador,
    adicionarProjeto,
    removerProjeto,
    editarColaborador,
    editarProjeto,
  }), [colaboradores, projetos]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );

}

export default AppProvider;

