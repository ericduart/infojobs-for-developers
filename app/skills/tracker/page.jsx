import { DB_HOST, DB_PASSWD, DB_USER } from '@/app/components/config'
import { MongoClient } from 'mongodb'
import Image from 'next/image'
import Link from 'next/link'

export default async function Tracker ({ searchParams }) {
  function NothingFound () {
    return (
      <div className='flex items-center flex-col mt-5'>
        <p className='font-bold text-infojobs2 text-2xl'>No se ha encontrado nada.</p>
        <Image src='/error.svg' alt='Error' width={300} height={300} />
      </div>

    )
  }

  let skills = {}

  if (searchParams.date) {
    const client = await MongoClient.connect(DB_HOST.replace('<username>', DB_USER).replace('<password>', DB_PASSWD))

    const db = await client.db('infojobs-hackaton')
    const collections = await db.collection('skills')

    const data = await collections.find({ time: searchParams.date })

    const arrSkills = await data.toArray()

    console.log(arrSkills)
    skills = arrSkills[0] || {}
  }

  const date = new Date()
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

  return (
    <>
      <h1 className='text-xl text-center mb-5'>Descubre las tecnologías/skills más demandadas por dia.</h1>
      <form action='' className='flex justify-center mb-5 items-center gap-5'>
        <label htmlFor='date'>Fecha:</label>
        <input type='date' name='date' id='date' defaultValue={searchParams.date || formattedDate} className='p-3' />
        <input type='submit' value='Enviar' className='bg-infojobsOrange text-white py-3 px-6' />
      </form>
      <table className=' bg-white mx-auto table-fixed border-collapse border-spacing-0 text-center'>
        <thead className='bg-infojobs text-white'>
          <tr>
            <td className='p-3 w-1/3'>Posición</td>
            <td className='p-3 w-1/3'>Skill</td>
            <td className='p-3 w-1/3'>Nº de ofertas que piden dicha skill.</td>
          </tr>
        </thead>
        <tbody>
          {skills.data?.map((el, index) => {
            return (
              <tr key={index} className={index % 2 === 0 ? 'bg-secundarytd' : ''}>
                <td className='py-3'>{index + 1}</td>
                <td className='py-3'><Link href={`/skills/${el.skill}`} className='text-infojobs hover:underline'>{el.skill}</Link></td>
                <td className='py-3'>{el.amount}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {searchParams.date && typeof skills.data === 'undefined' && <NothingFound />}

    </>
  )
}
