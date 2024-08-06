export function getPokemonArtwork(url: string) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPokemonId(url)}.png`;
}

export function getPokemonId(url: string) {
  return url.split("/").at(-2)!;
}
