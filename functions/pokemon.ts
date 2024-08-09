export function getPokemonArtwork(url: string) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPokemonId(url)}.png`;
}

export function getPokemonId(url: string | number): number {
  if (typeof url === "number") {
    return url;
  }
  if (!url.includes("/")) {
    return parseInt(url, 10);
  }
  return parseInt(url.split("/").at(-2)!, 10);
}

export function getPokemonNumber(id: string | number) {
  return `#${id.toString().padStart(3, "0")}`;
}

export function formatWeight(weight?: number): string {
  if (weight === undefined) {
    return "";
  }
  return (weight / 10).toString().replace(".", ",") + " kg";
}

export function formatHeight(weight?: number): string {
  if (weight === undefined) {
    return "";
  }
  return (weight / 10).toString().replace(".", ",") + " m";
}
