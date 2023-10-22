let colaboradores: Colaborador[] = [
  {
    id: "1",
    nome: "John Smith",
    area: "Software Engineer",
    status: "Active",
    company: "Google",
    isVerified: true,
    password: "123456",
    email: "  ",
    acesso: " ",
  },
];

export const getColaboradores = () => {
  return colaboradores;
};

export const postColaborador = (colaborador: Colaborador[]) => {
  colaboradores.push(...colaborador);
};

export const deleteColaborador = (id: string) => {
  colaboradores = colaboradores.filter((colaborador) => colaborador.id !== id);
};

export const putColaborador = (id: string, colaborador: Colaborador) => {
  const index = colaboradores.findIndex((colaborador) => colaborador.id === id);
  if (index === -1) {
    throw new Error("Colaborador não encontrado");
  }

  return (colaboradores[index] = colaborador);
};

export const getColaborador = (id: string) => {
  const colaborador = colaboradores.find(
    (colaborador) => colaborador.id === id
  );
  if (!colaborador) {
    throw new Error("Colaborador não encontrado");
  }
  return colaborador;
};
