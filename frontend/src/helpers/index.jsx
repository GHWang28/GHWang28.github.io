export function rng(min, max) {
  return Math.round(Math.random() * (max - min)) + min
}

export function ISOToDateStr (iso) {
  const date = new Date(iso);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

/*
export async function cacheImages (arrayOfSrcs) {
  const promises = await arrayOfSrcs.map((src) => (
    new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve();
      img.onerror = reject();
    })
  ));

  await Promise.all(promises);

}
*/