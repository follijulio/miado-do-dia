import z from "zod";

const formLoginSchema = z.object({
  email: z.string().email("Por favor, insira um e-mail válido."),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres."),
});

export { formLoginSchema };
