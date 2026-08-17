/**
 * Configuração whitelabel.
 *
 * Este é o único arquivo que precisa ser editado para adaptar a landing page
 * a outra clínica. Todo o conteúdo abaixo é de DEMONSTRAÇÃO: nome, endereço,
 * números, registro profissional e handle do Instagram são fictícios e devem
 * ser substituídos pelos dados reais antes de publicar para um cliente.
 */

export const clinica = {
  nome: "Clínica Vismara",
  descricaoCurta: "Clínica de estética avançada e harmonização facial.",

  // Wordmark: a marca em serifa, com o descritor em caixa alta abaixo.
  logo: { marca: "Vismara", descritor: "clínica" },

  // WhatsApp: os três valores que montam o link wa.me
  whatsappPhone: "+55 11 97821-4460", // demo
  whatsappMessage: "Olá! Gostaria de agendar uma avaliação.",
  whatsappLabel: "WhatsApp",

  instagram: {
    handle: "@clinicavismara", // demo
    url: "https://instagram.com",
  },

  email: "contato@clinicavismara.com.br", // demo

  endereco: {
    linhas: ["Rua Bela Cintra, 1104 · Conj. 72", "Jardins · São Paulo/SP", "CEP 01415-000"], // demo
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Rua+Bela+Cintra+1104+Sao+Paulo",
  },

  atendimento: ["Segunda a sexta · 09h às 19h", "Sábado · 09h às 13h", "Agendamento prévio"],

  responsavelTecnica: "Dra. Marina Vismara", // demo
  registroProfissional: "CRM-SP 148.902", // demo

  // Métricas exibidas abaixo do hero. Valores de demonstração.
  numeros: [
    { valor: "+12", rotulo: "anos de atuação" },
    { contagemAte: 4000, rotulo: "procedimentos" },
    { valor: "5.0", rotulo: "avaliação pacientes" },
  ],
} as const;

/** Link wa.me montado a partir da configuração acima. */
export const waLink = `https://wa.me/${clinica.whatsappPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
  clinica.whatsappMessage,
)}`;
