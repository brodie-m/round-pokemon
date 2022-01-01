import type { NextPage } from 'next'
import { trpc } from '@/utils/trpc'
import Head from 'next/head'
import Image from 'next/image'
import { getOptionsForVote } from '@/utils/getRandomPokemon'



const Home: NextPage = () => {
  const {data, isLoading} = trpc.useQuery(["hello",{text: "Hello"}])
  if (isLoading) return <div>loading...</div>
  

  const [first, second] = getOptionsForVote();

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center align-middle'>
      <div className="text-2xl text-center">which is rounder?</div>
      <div className='p-2'></div>
      <div className="border rounded-lg flex justify-between p-8 max-w-2xl items-center">
        <div className='w-16 h-16 bg-red-200'>{first}</div>
        <div className='p-8 items-center'>vs</div>
        <div className='w-16 h-16 bg-red-200'>{second}</div>
      
      </div>
    </div>
  )}

export default Home
