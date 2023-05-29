import { getOffersWithSkills } from '@/app/components/getOffers'
import ListOfSkills from '@/app/components/ListOfSkills'
import Link from 'next/link'

export default async function Home () {
  const data = await getOffersWithSkills(false)

  const { pagePosition, totalPages } = data

  const prevPage = Number(pagePosition) - 1 !== 0
  const nextPage = Number(pagePosition) + 1 <= totalPages

  return (
    <main className='w-5/6 m-auto'>
      <h1>Listado de las ofertas más recientes.</h1>

      <div className='flex gap-5 '>
        {prevPage && <Link href={`/offers/${Number(pagePosition) - 1}`} className='text-infojobs hover:underline'>Anterior</Link>}
        <h2>Página {pagePosition} de {totalPages}</h2>
        {nextPage && <Link href={`/offers/${Number(pagePosition) + 1}`} className='text-infojobs hover:underline' disabled>Siguiente</Link>}
      </div>

      {data.offers.length > 0
        ? data.offers.map((el, index) => {
          const offersSkills = data.skills.find(skill => skill.offerId === el.id)

          return (
            <div className='p-5 bg-white my-4 flex flex-col items-start' key={index}>
              <p><label className='text-infojobs2 font-bold'>Título</label></p>
              <h1 className=' text-3xl mb-4'>{el.title}</h1>

              <p className='text-infojobs2 font-bold'>Skills</p>
              <ListOfSkills skills={offersSkills ? offersSkills.skills : []} />

              <Link href={`/offers/info/${el.id}`} className=' p-3 bg-infojobsOrange text-white my-4'>SABER MÁS</Link>

            </div>
          )
        })

        : <h1>No hay más resultados.</h1>}

      <div className='flex gap-5 '>
        {prevPage && <Link href={`/offers/${Number(pagePosition) - 1}`} className='text-infojobs hover:underline'>Anterior</Link>}
        <h2>Página {pagePosition} de {totalPages}</h2>
        {nextPage && <Link href={`/offers/${Number(pagePosition) + 1}`} className='text-infojobs hover:underline' disabled>Siguiente</Link>}
      </div>

    </main>
  )
}
