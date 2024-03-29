import getVideoId from 'get-video-id';
import { GenericFunction, Position } from '../types';
import colorConvert from 'color-convert';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    opera: any;
  }
}

/**
 * Generates a random integer between min and max inclusively
 * @param {Number} min 
 * @param {Number} max 
 * @returns {Number}
 */
export const rng = (min: number, max: number): number => {
  return Math.round(Math.random() * (max - min)) + min
}

/**
 * Randomises the given array
 * @param {Array} array 
 * @returns 
 */
export const randomiseArray = (array: Array<any>) : Array<any> => {
  const newArray = [...array];

  for (let index = array.length - 1; index > 0; index--) {
    const swapIndex = rng(0, array.length - 1);
    [newArray[index], newArray[swapIndex]] = [newArray[swapIndex], newArray[index]];
  }

  return newArray;
}

/**
 * Returns the formatted date from an ISO string
 * @param {String} iso 
 * @returns {String}
 */
export const ISOToDateStr = (iso: string, shorten: boolean = false): string => {
  const date = new Date(iso);
  let fullYear = date.getFullYear().toString();

  if (shorten) {
    fullYear = fullYear.slice(-2);
  }

  return `${date.getDate()}/${date.getMonth() + 1}/${fullYear}`
}

/**
 * Removes the video prefix from a YouTube URL
 * @param {string} url
 * @returns {string}
 */
export const convertToEmbedYoutubeVid = (url: string): string => {
  const id = getVideoId(url).id;
  return `https://www.youtube.com/embed/${id}`;
}

/**
 * Gets the url to the given video's thumbnail
 * @param {string} url
 * @returns {string}
 */
export const getYouTubeThumbnailImg = (url: string): string => {
  const id = getVideoId(url).id;
  if (!id) return url;
  return `https://img.youtube.com/vi/${id}/0.jpg`;
}

/**
 * Checks if the given url starts with the pre-decided
 * video prefix
 * @param {String} url
 * @returns {Boolean}
 */
export const isYouTubeURL = (url: string): boolean => {
  return (getVideoId(url).service === 'youtube')
}

export const mod = (value: number, mod: number): number => {
  return ((value % mod) + mod) % mod;
}

/**
 * Checks if browser is on mobile or tablet. Regex by mktgdept
 * http://detectmobilebrowsers.com/
 * @returns {Boolean}
 */
export const isMobileOrTablet = (): boolean => {
  const regexTest = (agent : string): boolean => {
    return (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i
      .test(agent) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i
      .test(agent.substr(0,4))
    )
  };
  return regexTest((navigator.userAgent || navigator.vendor || window?.opera));
}

/**
 * Checks if the array of numbers is sorted in ascending order
 */
export const isSorted = (array: number[]): boolean => {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i + 1] < array[i]) {
      return false;
    }
  }

  return true;
}

/**
 * Splits the array into odd and even arrays
 */
export const splitArray = (array: any[]): { odd: any[]; even: any[] } => {
  const odd = array.filter((_, index) => (
    (index % 2) !== 0
  ))

  const even = array.filter((_, index) => (
    (index % 2) === 0
  ))

  return { odd, even };
}

/**
 * Converts the given degree to radian value
 */
export const convertDegToRad = (deg: number): number => (
  deg * Math.PI / 180
)

export const calcDistance2D = (posA: Position | null, posB: Position | null): number => {
  if (posA == null || posB == null) return Infinity;

  return Math.sqrt(
    Math.pow(posA.x - posB.x, 2) +
    Math.pow(posA.y - posB.y, 2)
  )
}

function extractNumbers(inputString: string): [number, number, number] {
  const numbersMatch = inputString.match(/-?\d+(\.\d+)?/g);

  if (!numbersMatch) {
    return [0, 0, 0];
  }

  return [parseFloat(numbersMatch[0]), parseFloat(numbersMatch[1]), parseFloat(numbersMatch[2])];
}

export const colorToRGBA = (color: string, opacity: number): string => {
  let rgbValues: [number, number, number] = [0, 0, 0];

  if (color.startsWith('rgba')) {
    return color;
  } else if (color.startsWith('#')) {
    rgbValues = colorConvert.hex.rgb(color.slice(1));
  } else if (color.startsWith('hsl')) {
    rgbValues = colorConvert.hsl.rgb(extractNumbers(color));
  } else if (color.startsWith('rgb')) {
    rgbValues = extractNumbers(color);
  } else {
    // @ts-ignore
    rgbValues = colorConvert.keyword.rgb(color);
  }
  return `rgba(${rgbValues[0]},${rgbValues[1]},${rgbValues[2]},${Math.max(0, Math.min(1, opacity))})`;
}

// Checks if the first set has any overlapped valye with the second set
export const isSetOverlapping = <T>(setA: Set<T>, setB: Set<T>): boolean => {
  return [...setA].some(element => setB.has(element));
}

// Classic throttle function. Only allows the execution of a function every throttleDuration ms
export const throttle = (fn: GenericFunction, throttleDuration: number): GenericFunction => {
  let lastCallTimestamp = 0;

  return (...args) => {
    const time = Date.now();
    if (time - lastCallTimestamp <= throttleDuration) return;

    lastCallTimestamp = time;
    fn(...args);
  }
}

// Classic debounce function. Executes a function after a set duration passes. If evoked again
// before the duration passes, clear it and run with new arguments
export const debounce = (fn: GenericFunction, debounceDuration: number): GenericFunction => {
  let timerID: ReturnType<typeof setTimeout>;

  return (...args) => {
    clearTimeout(timerID);
    setTimeout(() => { fn(...args) }, debounceDuration);
  }
}
