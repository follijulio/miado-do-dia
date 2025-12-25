"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/shadcn-ui/form";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { z } from "zod";

import { Button } from "@/components/shadcn-ui/button";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
import { Input } from "@/components/shadcn-ui/input";
import { Spinner } from "@/components/shadcn-ui/spinner";
import { HandDrawCard } from "@/components/ui/hand-drawn-card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  email: z.string().email("Por favor, insira um e-mail válido."),
  senha: z.string().min(8, "A senha deve ter pelo menos 8 caracteres."),
});

export default function Page() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("valores: ");
    console.log(values);

    // - - -  Simulando requisição para API - - - o(*￣▽￣*)ブ
    setLoading(true);

    // Simulando espera
    await new Promise((resolve) => setTimeout(resolve, 1000));

    //redirecionando
    router.push("/");

    setLoading(false);
  };

  return (
    <main
      className={`h-screen w-screen flex justify-center items-center bg-black`}
    >
      {loading ? (
        <div className="text-white">
          <Spinner className="size-20" />
        </div>
      ) : (
        <LoginCard onSubmit={() => onSubmit} />
      )}
    </main>
  );
}

interface loginCardProps {
  onSubmit: () => void;
}

const LoginCard: React.FC<loginCardProps> = ({ onSubmit }) => {
  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const [visibility, setVisibility] = useState<boolean>(true);
  return (
    <HandDrawCard className="h-3/5 w-1/4 text-white flex flex-col items-center justify-center p-6 gap-6 z-0">
      <div className="z-50">
        <h2 className="text-3xl">Bem-vindo de volta!</h2>
        <section className="w-full gap-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-2xl">E-mail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={"fulano@email.com"}
                        {...field}
                        onChange={() => {}}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="senha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-2xl">Senha</FormLabel>
                    <div className="flex gap-1">
                      <FormControl>
                        <Input
                          type={visibility ? "password" : "text"}
                          placeholder={"*********"}
                          {...field}
                          onChange={() => {}}
                        />
                      </FormControl>
                      <button
                        className="h-10 w-10 flex justify-center items-center"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {visibility ? (
                          <IoMdEye size={24} />
                        ) : (
                          <IoMdEyeOff size={24} />
                        )}
                      </button>
                    </div>
                  </FormItem>
                )}
              />
              <article className="flex items-center gap-3">
                <Checkbox />
                Lembre de mim
              </article>
              <Button type="submit" className="h-14 text-lg">
                Entrar
              </Button>
            </form>
          </Form>
        </section>
      </div>
    </HandDrawCard>
  );
};
