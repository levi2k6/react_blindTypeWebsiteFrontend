export function capitalizeFirstLetter(s: string): string {
      const [first, ...rest] = [...s]
      return first ? first.toLocaleUpperCase() + rest.join("") : s
}
