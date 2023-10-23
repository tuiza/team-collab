'use client'
import { Colaborador } from "@/types/Colaborador";
import { createContext, useState, useContext, FC } from "react";
import { colaboradores as C } from "@/public/mocks/colaboradores";

interface Projeto {
  id: number;
  nome: string;
}

type ContextProviderProps = {
  children: React.ReactNode;
};

interface AppContextProps {
  colaboradores: Colaborador[];
  projetos: Projeto[];
  adicionarColaborador: (colaborador: Colaborador) => void;
  removerColaborador: (id: number) => void;
  adicionarProjeto: (projeto: Projeto) => void;
  removerProjeto: (id: number) => void;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }: ContextProviderProps) => {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>(C);
  const [projetos, setProjetos] = useState<Projeto[]>([]);

  const adicionarColaborador = (colaborador: Colaborador) => {
    setColaboradores((prevColaboradores) => [
      ...prevColaboradores,
      colaborador,
    ]);
  };

  const removerColaborador = (id: string) => {
    console.log('apagando')
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

  const value = {
    colaboradores,
    projetos,
    adicionarColaborador,
    removerColaborador,
    adicionarProjeto,
    removerProjeto,
  };

  return (
    <AppContext.Provider
      value={value} >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider;

