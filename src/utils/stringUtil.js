export function displayPluralOrSingular(data = 0, text = '') {
  let result = text;

  if (data > 2) return (result = `${text}s`);

  return result;
}
