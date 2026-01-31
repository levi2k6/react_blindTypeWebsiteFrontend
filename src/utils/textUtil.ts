export function capitalizeFirstLetter(text: string): string {
      const [first, ...rest] = [...text]
      return first ? first.toLocaleUpperCase() + rest.join("") : text
}


export function toCamelCase(text: string): string {
  return text
    .trim()                                  // remove leading/trailing spaces
    .split(/[\s-_]+/)                        // split by spaces, underscores, or hyphens
    .map((word, index) => {
      if (index === 0) return word.toLowerCase();      // first word lowercase
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');                               // join without spaces
}
 
