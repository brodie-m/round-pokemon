import type { NextPage } from 'next'
import { inferQueryResponse, trpc } from '@/utils/trpc'
import Head from 'next/head'
import Image from 'next/image'
import { getOptionsForVote } from '@/utils/getRandomPokemon'
import React, { useState } from 'react'



const Home: NextPage = () => {
  
  
  

  const [ids,setIds] = useState(() => getOptionsForVote())
  const [first,second] = ids
  const firstPokemon = trpc.useQuery(["get-pokemon-by-id",{id: first}])
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id",{id:second}])
  
  const voteMutation = trpc.useMutation(['cast-vote'])
  
  
  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;
  
  const voteForRoundest = (selected: number) => {
    if (selected===first) {
      voteMutation.mutate({votedFor: first, votedAgainst:second})
    }
    else {
      voteMutation.mutate({votedFor: second, votedAgainst:first})
    }
    setIds(getOptionsForVote())
  }
  
  
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center align-middle'>
      <div className="text-2xl text-center">which is rounder?</div>
      <div className='p-2'></div>
      <div className="border rounded-lg flex justify-between p-8 max-w-2xl items-center">
        {!firstPokemon.isLoading && !secondPokemon.isLoading && firstPokemon.data && secondPokemon.data && (
          <>
          <PokemonListing pokemon={firstPokemon.data} vote={() => voteForRoundest(first)}/>
        <div className='p-8 items-center'>vs</div>
        <PokemonListing pokemon={secondPokemon.data} vote={() => voteForRoundest(second)}/>
          </>
        )}
        
      </div>
    </div>
  )}

type PokemonFromServer = inferQueryResponse<"get-pokemon-by-id">

const PokemonListing: React.FC<{pokemon: PokemonFromServer, vote: () => void}> = (props) => {
  return (<div className='w-64 h-64 flex flex-col'>
  <img 
  src={props.pokemon.sprites.front_default}
  className='w-full'
  />
  <div className='text-xl text-center capitalize mt-[-2rem]' >
    {props.pokemon.name}
    
    </div>
    <button onClick={() => props.vote()}>Rounder</button>
  </div>)
}

export default Home
