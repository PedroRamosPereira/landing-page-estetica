type CountUpValueOptions = {
  elapsed: number;
  duration: number;
  target: number;
};

const ptBrIntegerFormatter = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 0,
});

export function countUpValue({ elapsed, duration, target }: CountUpValueOptions) {
  if (duration <= 0) return target;

  const progress = Math.min(Math.max(elapsed / duration, 0), 1);
  const easedProgress = 1 - (1 - progress) ** 3;
  return Math.floor(target * easedProgress);
}

export function formatCountUpValue(value: number) {
  return `+${ptBrIntegerFormatter.format(value)}`;
}
