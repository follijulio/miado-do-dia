"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { oxigen } from "@/fonts/oxygen";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  email: z.string(),
  senha: z.string(),
});

export default function Page() {
  const [visibility, setVisibility] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const toogleVisibility = () => {
    setVisibility(!visibility);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    esperar();
  };

  function esperar() {
    setTimeout(() => {
      redirect("/");
    }, 1000);
  }

  return (
    <main
      className={`${oxigen.className} h-screen w-screen flex justify-center items-center bg-black`}
    >
      {loading ? (
        <div>
          <Spinner color="#ffffff" className="size-20" />
        </div>
      ) : (
        <section className="h-3/5 w-1/4 text-white border-2 border-white rounded-xl flex flex-col items-center justify-center p-6 gap-6">
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
                          className="bg-white text-black"
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
                            className="text-2xl bg-white text-black h-10"
                          />
                        </FormControl>
                        <button
                          className="h-10 w-10 flex justify-center items-center"
                          type="button"
                          onClick={toogleVisibility}
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
        </section>
      )}
    </main>
  );
}
