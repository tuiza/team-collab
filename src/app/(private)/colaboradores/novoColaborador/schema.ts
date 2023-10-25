import * as z from "zod";

const schemaLogin = z.object({
    nome: z.string()
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
    areas: z.array(z.string().min(1, "Selecione uma área")),
    idade: z.number().min(15, "Idade inválida"),
    regimeContratacao: z.string().min(1, "Selecione uma opção"),
    email: z.string().email("Email inválido"),
  })
  .refine((data) => data.regimeContratacao.length, {
    path: ["regimeContratacao"],
    message: "Selecione uma opção",
  });

export default schemaLogin;

export type FormLoginType = z.infer<typeof schemaLogin>;
