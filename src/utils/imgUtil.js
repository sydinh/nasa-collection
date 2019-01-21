import { IMG_REGEX, IMG_PLACEHOLDER } from './constants';

export function imgPlaceholder(src = '') {
  let imgSrc = IMG_PLACEHOLDER;

  if (IMG_REGEX.test(src)) return (imgSrc = src);

  return imgSrc;
}
