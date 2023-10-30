import * as z from "zod";

const schemaLogin = z
  .object({
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
    areas: z.string(),
    idade: z.number().min(15, "Por favor, Idade inválida"),
    regimeContratacao: z.string().min(1, "Por favor, Selecione uma opção"),
    email: z.string().email("Email inválido"),
  })
  .refine((data) => data.regimeContratacao.length, {
    path: ["regimeContratacao"],
    message: "Por favor, Selecione uma opção",
  });

export default schemaLogin;

export type FormLoginType = z.infer<typeof schemaLogin>;
