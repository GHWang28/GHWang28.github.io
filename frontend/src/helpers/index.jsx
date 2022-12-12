import getVideoId from 'get-video-id';
import config from '../config.json'

/**
 * Generates a random integer between min and max inclusively
 * @param {Number} min 
 * @param {Number} max 
 * @returns {Number}
 */
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
export function convertToEmbedYoutubeVid (url) {
  const id = getVideoId(url).id;
  return `https://www.youtube.com/embed/${id}`;
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
  const id = getVideoId(url).id;
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
  return (getVideoId(url).service === 'youtube')
}

export function getLowResImg (filename) {
  const extensionIndex = getFileExtension(filename).index - 1;
  return filename.slice(0, extensionIndex) + "_lowres" + filename.slice(extensionIndex);
}

/**
 * https://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript
 * @param {String} filename 
 * @returns {Array}
 */
export function getFileExtension (filename) {
  return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined
}

export function mod (value, mod) {
  return ((value % mod) + mod) % mod;
};

const images = []
export function preloadImgs(imgs) {
  for (const index in imgs) {
    images[index] = new Image();
    images[index].src = imgs[index];
  }
}