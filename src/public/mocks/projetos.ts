
import {  sampleSize } from "lodash";
import { faker } from "@faker-js/faker";
import { colaboradores } from "./colaboradores";
import { Projeto } from "@/types/Projeto";

export const projetos: Projeto[]= [...Array(24)].map((_, index) => ({
  id: faker.string.alphanumeric(10),
  nome: faker.company.name(),
  tecnologias: sampleSize(
    [
      'React',
      'Angular',
      'Vue',
      'Node',
      'Java',
      'PHP',
      'Python',
      'C#',
      'C++',
      'Ruby',
      'Go',
      'Swift',
      'Kotlin',
    ], 2
  ),
  colaboradores: sampleSize(
    colaboradores.map(
      (colaborador) => colaborador.nome),2 
  ),
  descricao: faker.lorem.paragraph(),
}));
