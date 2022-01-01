import type { NextPage } from 'next'
import { trpc } from '@/utils/trpc'
import Head from 'next/head'
import Image from 'next/image'
import { getOptionsForVote } from '@/utils/getRandomPokemon'
import { useState } from 'react'



const Home: NextPage = () => {
  
  
  

  const [ids,setIds] = useState(getOptionsForVote())
  const firstPokemon = trpc.useQuery(["get-pokemon-by-id",{id: ids[0]}])
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id",{id: ids[1]}])
  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center align-middle'>
      <div className="text-2xl text-center">which is rounder?</div>
      <div className='p-2'></div>
      <div className="border rounded-lg flex justify-between p-8 max-w-2xl items-center">
        <div className='w-64 h-64 flex flex-col'>
          <img 
          src={firstPokemon.data?.sprites.front_default}
          className='w-full'
          />
          <div className='text-xl text-center capitalize mt-[-2rem]' >
            {firstPokemon.data?.name}
            
            </div>
          </div>
        <div className='p-8 items-center'>vs</div>
        <div className='w-64 h-64 flex flex-col'>
        <img 
        src={secondPokemon.data?.sprites.front_default}
        className='w-full'
        /><div className='text-xl text-center capitalize mt-[-2rem]'>
        {secondPokemon.data?.name}
        
        </div></div>
      
      </div>
    </div>
  )}

export default Home
