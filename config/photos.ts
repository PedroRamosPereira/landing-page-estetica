type Credit = {
  photographer: string;
  photographerUrl: string;
  sourceUrl: string;
  pexelsId: number;
};

type ClinicPhoto = {
  src: `/images/clinic/${string}.webp`;
  alt: string;
  objectPosition: string;
  credit: Credit;
};

const credit = (
  pexelsId: number,
  photographer: string,
  photographerUrl: string,
  sourceUrl: string,
): Credit => ({ pexelsId, photographer, photographerUrl, sourceUrl });

export const clinicPhotos = {
  hero: {
    src: "/images/clinic/hero.webp",
    alt: "Retrato editorial de mulher com a mão apoiada no rosto",
    objectPosition: "50% 42%",
    credit: credit(3762764, "Shiny Diamond", "https://www.pexels.com/@shiny-diamond", "https://www.pexels.com/photo/woman-with-flawless-skin-3762764/"),
  },
  professional: {
    src: "/images/clinic/professional.webp",
    alt: "Profissional de saúde em uma clínica de estética",
    objectPosition: "50% 38%",
    credit: credit(33756693, "Jessica Keli Alves", "https://www.pexels.com/@jessica-keli-alves-2148649709", "https://www.pexels.com/photo/female-doctor-holding-medical-instrument-in-clinic-33756693/"),
  },
  comparison: {
    alt: "Simulação visual de tratamento usando duas versões da mesma fotografia",
    objectPosition: "50% 50%",
    before: { src: "/images/clinic/result-before.webp", alt: "" },
    after: { src: "/images/clinic/result-after.webp", alt: "" },
    credit: credit(13295348, "Büşranur Aydın", "https://www.pexels.com/@busranur-aydin-3800407", "https://www.pexels.com/photo/woman-s-face-in-close-up-photography-13295348/"),
  },
  posts: [
    {
      src: "/images/clinic/instagram-treatment.webp",
      alt: "Mulher recebendo uma massagem facial em um espaço de estética",
      objectPosition: "50% 50%",
      credit: credit(8460603, "Ornella Delfino", "https://www.pexels.com/@ornella-delfino-58862914", "https://www.pexels.com/photo/young-woman-at-beauticians-8460603/"),
    },
    {
      src: "/images/clinic/instagram-clinic.webp",
      alt: "Prateleiras de produtos em um ambiente contemporâneo de beleza",
      objectPosition: "50% 50%",
      credit: credit(27781696, "Ela De Pure", "https://www.pexels.com/@ela-de-pure-1402904686", "https://www.pexels.com/photo/ela-de-pure-skin-store-27781696/"),
    },
    {
      src: "/images/clinic/instagram-patient.webp",
      alt: "Retrato editorial de mulher com cabelo afro e sardas",
      objectPosition: "50% 45%",
      credit: credit(5253959, "Antonius Ferret", "https://www.pexels.com/@antonius-ferret", "https://www.pexels.com/photo/portrait-of-a-young-natural-woman-with-afro-and-freckles-5253959/"),
    },
    {
      src: "/images/clinic/instagram-result.webp",
      alt: "Retrato em close de mulher sob luz natural",
      objectPosition: "50% 50%",
      credit: credit(16069404, "Ran Lu", "https://www.pexels.com/@ran-lu-499464116", "https://www.pexels.com/photo/a-woman-with-her-eyes-closed-16069404/"),
    },
    {
      src: "/images/clinic/instagram-team.webp",
      alt: "Três mulheres reunidas em um ambiente profissional",
      objectPosition: "50% 50%",
      credit: credit(8837170, "Yan Krukau", "https://www.pexels.com/@yankrukov", "https://www.pexels.com/photo/woman-wearing-eyeglasses-extending-her-hand-8837170/"),
    },
    {
      src: "/images/clinic/instagram-detail.webp",
      alt: "Produtos de skincare organizados sobre tecido claro",
      objectPosition: "50% 50%",
      credit: credit(28482020, "Yana Romanovich", "https://www.pexels.com/@yana-romanovich-506648879", "https://www.pexels.com/photo/elegant-skincare-product-arrangement-on-fabric-28482020/"),
    },
  ] satisfies readonly ClinicPhoto[],
} as const;
