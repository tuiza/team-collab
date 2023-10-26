import * as z from "zod";

const schemaLogin = z.object({
  nome: z
    .string()
    .min(1, "Nome é obrigatório")
    .transform((nome) => {
      return nome
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  tecnologias: z.string().min(1, "Por favor, Selecione uma tecnologia"),
  colaboradores: z.string().min(1, "Por favor, Selecione uma tecnologia"),
  descricao: z.string().min(1, "Por favor, digite uma descrição"),
});

export default schemaLogin;

export type FormLoginType = z.infer<typeof schemaLogin>;
