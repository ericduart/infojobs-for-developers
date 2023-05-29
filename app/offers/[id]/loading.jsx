import Image from 'next/image'

export default function Loading () {
  return (
    <div className='flex justify-center items-center flex-col'>
      <h1>Cargando...</h1>
      <Image src='/time.svg' width={300} height={300} alt='Loading...' />
    </div>
  )
}
