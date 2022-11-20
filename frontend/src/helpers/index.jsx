export function rng(min, max) {
  return Math.round(Math.random() * (max - min)) + min
}