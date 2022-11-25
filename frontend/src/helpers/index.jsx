import getVideoId from 'get-video-id';
import config from '../config.json'

export function rng(min, max) {
  return Math.round(Math.random() * (max - min)) + min
}

export function ISOToDateStr (iso) {
  const date = new Date(iso);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

/**
 * Removes the video prefix from a YouTube URL
 * @param {string} url
 * @returns {string}
 */
 export function trimYouTubeThumbnailURL (url) {
  if (!url.includes(config.VID_PREFIX)) return url;
  if (url === '' || url === ' ') return '';

  return url.split(config.VID_PREFIX).slice(-1)[0];
}

/**
 * Converts the given YouTube id into an embedded url
 * @param {number} vid
 * @returns {string}
 */
export function convertIdToYouTubeURL (vid) {
  return `${config.VID_URL}${vid}`
}

/**
 * Gets the url to the given video's thumbnail
 * @param {string} url
 * @returns {string}
 */
export function getYouTubeThumbnailImg (url) {
  const id = getVideoId(trimYouTubeThumbnailURL(url)).id;
  if (!id) return url;
  return `https://img.youtube.com/vi/${id}/0.jpg`;
}

/**
 * Checks if the given url starts with the pre-decided
 * video prefix
 * @param {string} url
 * @returns
 */
export function isYouTubeURL (url) {
  return url.startsWith(config.VID_PREFIX);
}

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
