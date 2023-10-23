'use client'
import { Colaborador } from "@/types/Colaborador";
import { createContext, useState, useContext, useEffect } from "react";
import { colaboradores as mockColaboradores } from "@/public/mocks/colaboradores";
import { projetos as mockProjetos } from "@/public/mocks/projetos";
import { Projeto } from "@/types/Projeto";
import { set } from "lodash";

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
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

const AppProvider = ({ children }: ContextProviderProps) => {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>(mockColaboradores);
  const [projetos, setProjetos] = useState<Projeto[]>(mockProjetos);

  useEffect(() => {
    setColaboradores(mockColaboradores)
    setProjetos(mockProjetos)
  }, [])

  const adicionarColaborador = (colaborador: Colaborador) => {
    setColaboradores((prevColaboradores) => [
      ...prevColaboradores,
      colaborador,
    ]);
  };

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

