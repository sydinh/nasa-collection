import { IMG_REGEX, IMG_PLACEHOLDER } from './constants';

export function imgPlaceholder(src = '') {
  let imgUrl = IMG_PLACEHOLDER;

  if (IMG_REGEX.test(src)) return (imgUrl = src);

  return imgUrl;
}
