import { sample, sampleSize } from "lodash";
import { faker } from "@faker-js/faker";
import { Colaborador } from "@/types/Colaborador";

export const colaboradores: Colaborador[] = [...Array(24)].map((_, index) => ({
  id: faker.string.alphanumeric(10),
  nome: faker.person.fullName(),
  areas: sampleSize(
    [
      "Leader",
      "Hr Manager",
      "UI Designer",
      "UX Designer",
      "UI/UX Designer",
      "Project Manager",
      "Backend Developer",
      "Full Stack Designer",
      "Front End Developer",
      "Full Stack Developer",
    ],
    2
  ),
  idade: faker.number.int({ min: 18, max: 65 }),
  regimeContratacao: sample([
    "CLT",
    "PJ",
    "Estágio",
    "Aprendiz",
    "Temporário",
    "Terceirizado",
  ]),
  email: faker.internet.email(),
}));
