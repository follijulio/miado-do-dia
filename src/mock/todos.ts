import Todo from "@/domain/dtos/todo.dto";

const todos: Todo[] = [
  {
    title: "Otimizar scripts do Hyprland",
    description:
      "Refatorar os arquivos de configuração para melhorar a performance.",
    creation: new Date("2025-12-25"),
    finished: false,
  },
  {
    title: "Explorar novas fontes para o terminal",
    creation: new Date("2025-12-25"),
    finished: true,
  },
  {
    title: "Organizar biblioteca do Obsidian",
    description: "Mover notas soltas para as pastas corretas.",
    creation: new Date("2025-12-25"),
    finished: false,
  },
  {
    title: "Limpar hardware do PC",
    creation: new Date("2025-12-25"),
    finished: false,
  },
  {
    title: "Ler documentação do Next.js",
    description: "Focar em Server Actions e novas funcionalidades.",
    creation: new Date("2025-12-25"),
    finished: false,
  },
  {
    title: "Finalizar feature de Auth",
    description: "Implementar login social e JWT.",
    deadline: new Date("2025-12-28"),
    creation: new Date("2025-12-25"),
    finished: false,
  },
  {
    title: "Pagar aluguel",
    deadline: new Date("2026-01-05"),
    creation: new Date("2025-12-25"),
    finished: false,
  },
  {
    title: "Reunião de alinhamento",
    description: "Sync com o time de design.",
    deadline: new Date("2025-12-26T10:00:00"),
    creation: new Date("2025-12-25"),
    finished: false,
  },
  {
    title: "Submeter relatório semestral",
    deadline: new Date("2025-12-30"),
    creation: new Date("2025-12-25"),
    finished: true,
  },
  {
    title: "Consulta Odontológica",
    deadline: new Date("2026-01-12T14:30:00"),
    creation: new Date("2025-12-25"),
    finished: false,
  },
  {
    title: "Comprar presente de aniversário",
    deadline: new Date("2026-01-02"),
    creation: new Date("2025-12-25"),
    finished: false,
  },
  {
    title: "Backup dos servidores",
    description: "Executar dump manual antes da manutenção.",
    deadline: new Date("2025-12-25T23:00:00"),
    creation: new Date("2025-12-25"),
    finished: true,
  },
  {
    title: "Renovar certificado SSL",
    deadline: new Date("2026-01-15"),
    creation: new Date("2025-12-25"),
    finished: false,
  },
  {
    title: "Estudar C# Generics",
    description: "Aprofundar em constraints e herança.",
    deadline: new Date("2025-12-29"),
    creation: new Date("2025-12-25"),
    finished: false,
  },
  {
    title: "Mercado do mês",
    deadline: new Date("2025-12-27"),
    creation: new Date("2025-12-25"),
    finished: false,
  },
  {
    title: "Lavar o carro",
    deadline: new Date("2025-12-26"),
    creation: new Date("2025-12-25"),
    finished: false,
  },
  {
    title: "Revisar PR #122",
    description: "Correção de bug no componente de tabelas.",
    deadline: new Date("2025-12-26"),
    creation: new Date("2025-12-25"),
    finished: true,
  },
  {
    title: "Treino de HIIT",
    deadline: new Date("2025-12-25T19:00:00"),
    creation: new Date("2025-12-25"),
    finished: false,
  },
  {
    title: "Atualizar antivírus",
    deadline: new Date("2025-12-31"),
    creation: new Date("2025-12-25"),
    finished: false,
  },
  {
    title: "Call com cliente",
    description: "Apresentação do protótipo de alta fidelidade.",
    deadline: new Date("2025-12-27T15:00:00"),
    creation: new Date("2025-12-25"),
    finished: false,
  },
  {
    title: "Consertar vazamento pia",
    deadline: new Date("2025-12-28"),
    creation: new Date("2025-12-25"),
    finished: false,
  },
  {
    title: "Renovar assinatura Spotify",
    deadline: new Date("2026-01-01"),
    creation: new Date("2025-12-25"),
    finished: false,
  },
  {
    title: "Postar artigo no blog",
    description: "Tema: Configurando Arch Linux do zero.",
    deadline: new Date("2025-12-30"),
    creation: new Date("2025-12-25"),
    finished: false,
  },
  {
    title: "Trocar lâmpada da cozinha",
    deadline: new Date("2025-12-26"),
    creation: new Date("2025-12-25"),
    finished: true,
  },
  {
    title: "Planejamento financeiro 2026",
    description: "Definir metas de investimento e economia.",
    deadline: new Date("2025-12-31"),
    creation: new Date("2025-12-25"),
    finished: false,
  },
];

export { todos };
