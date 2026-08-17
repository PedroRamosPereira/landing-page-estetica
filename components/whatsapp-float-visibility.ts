export const WHATSAPP_FLOAT_THRESHOLD = 560;

export function isWhatsappFloatVisible(scrollY: number) {
  return scrollY > WHATSAPP_FLOAT_THRESHOLD;
}
