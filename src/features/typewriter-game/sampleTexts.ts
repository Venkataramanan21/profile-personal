export const DEFAULT_SAMPLE_TEXTS = [
  'The quick brown fox jumps over the lazy dog while practicing steady rhythm and calm focus.',
  'Programming is the art of telling another human what one wants the computer to do with clarity.',
  'Type each character carefully; speed will follow once accuracy becomes a quiet habit.',
  'Modular design keeps features small, testable, and easy to embed wherever the product needs them.',
  'A good typing test measures words per minute, accuracy, and the patience to reset and try again.',
];

export function pickRandomSampleText(texts: string[] = DEFAULT_SAMPLE_TEXTS): string {
  return texts[Math.floor(Math.random() * texts.length)];
}
