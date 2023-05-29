import skillsDictionary from '@/app/components/skillsDictionary.json'
import { getProvincesOfOffers, getOffersBySkillAndProvince } from '@/app/components/getOffers'
import Link from 'next/link'
import Image from 'next/image'

export default async function Search ({ searchParams }) {
  const provinces = await getProvincesOfOffers()

  const { skill, province, hardsearch } = searchParams

  const offersData = await getOffersBySkillAndProvince(skill || false, province || false, hardsearch || false)
  const { arrOffers, content } = offersData

  function Showemptycontent ({ skill, province }) {
    return (
      <>
        {skill && province ? <><h1 className='text-2xl text-center font-bold'>No se han encontrado resultados...</h1><Image src='/error.svg' alt='Error' width={50} height={50} className='w-96 mx-auto' /></> : ''}
      </>
    )
  }

  return (
    <>
      <main className='flex flex-col items-center mt-8 mx-10 lg:flex-row h-fit lg:h-screen/2'>
        <form method='get' action='' className='flex flex-col lg:w-1/2 w-full gap-5 align-middle bg-white justify-center h-fit p-5 '>
          <datalist id='skills'>
            {skillsDictionary.map((skill, index) => {
              return <option key={index} value={skill} />
            })}
          </datalist>
          <div className='mx-auto flex gap-5'>
            <label htmlFor='province' className='text-infojobs2'>Province</label>
            <select name='province' id='province' defaultValue={province || ''} className='w-full'>
              <option value={JSON.stringify({ id: null, key: null })}>Seleccionar</option>
              {provinces.map((province, index) => {
                const { id, key } = province

                return <option key={index} value={JSON.stringify({ id, key })}>{province.value}</option>
              })}
            </select>
          </div>

          <div className='mx-auto flex gap-5'>
            <label htmlFor='skills' className='text-infojobs2'>Skills</label>
            <input type='text' name='skill' id='skills' list='skills' defaultValue={skill || ''} placeholder='React...' className='w-full' />
          </div>
          <div className='mx-auto flex gap-5 items-center'>
            <input type='checkbox' name='hardsearch' id='hardsearch' /> <label htmlFor='hardsearch'>Búsqueda intensiva.</label>
          </div>
          <div className='flex gap-5 items-center flex-col sm:flex-row'>
            <Image src='/info.svg' width={100} height={100} alt='Info' />
            <div>
              <p className='text-justify'>La búsqueda contempla aproximádamente las 100 ofertas más recientes.</p>
              <p className='text-justify'>El rango de una búsqueda intensiva será mayor. Implica <label className='text-infojobs2 font-bold'>tiempos de espera mayor</label>.</p>
            </div>
          </div>
          <input type='submit' value='Buscar' className='text-infojobs2' />
        </form>

        <div className='lg:w-1/2 w-full h-full overflow-auto'>
          {content
            ? arrOffers.offers.map((offer, index) => {
              return (
                <div key={index} className='bg-white p-4 my-4 mx-0 lg:ml-4'>
                  <p className='text-infojobs2 font-bold'>Título</p>
                  <h1>{offer.title}</h1>
                  <Link href={`/offers/info/${offer.id}`} className='bg-infojobsOrange text-white my-4 p-4 block w-fit'>Saber más.</Link>
                </div>
              )
            })

            : <Showemptycontent skill={skill} province={province} />}
        </div>

      </main>
    </>
  )
}
