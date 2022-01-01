const MAX_DEX_ID = 493;

export const getRandomPokemon: (dontSelect?: number) => number = (dontSelect) => {
    const numberToPick = Math.floor(Math.random() * (MAX_DEX_ID)+1)
    if (numberToPick !== dontSelect) return numberToPick
    return getRandomPokemon(dontSelect)
} 

export const getOptionsForVote = () => {
    const firstId = getRandomPokemon()
    return [firstId,getRandomPokemon(firstId)]
}