"use client";
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
  projetos: sampleSize(
    [
      "Projeto 1",
      "Projeto 2",
      "Projeto 3",
      "Projeto 4",
      "Projeto 5",
      "Projeto 6",
      "Projeto 7",
      "Projeto 8",
      "Projeto 9",
      "Projeto 10",
    ],
    2
  ),
  idade: 18,
  regimeContratacao: sample([
    "CLT",
    "PJ",
    "Estágio",
    "Aprendiz",
    "Temporário",
    "Terceirizado",
  ]),
  email: faker.internet.email(),
  phone: faker.phone.number(),
}));
