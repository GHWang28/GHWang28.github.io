export function rng(min, max) {
  return Math.round(Math.random() * (max - min)) + min
}

export function ISOToDateStr (iso) {
  const date = new Date(iso);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}