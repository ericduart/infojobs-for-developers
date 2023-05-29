import { getOfferById } from '@/app/components/getOffers'
import ListOfSkills from '@/app/components/ListOfSkills'
import Image from 'next/image'

export default async function Home ({ params }) {
  function getTime (before, now) {
    const milisecs = Math.abs(now - before)
    const hours = Math.floor(milisecs / (60 * 60 * 1000))

    if (hours === 0) {
      const minutes = Math.floor((milisecs / (60 * 1000)))
      return `Hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}.`
    }

    if (hours > 24) return dateUpdated.toLocaleDateString()

    return `Hace ${hours} ${hours === 1 ? 'hora' : 'horas'}.`
  }

  function OfferBlocked () {
    return (
      <div className='flex mb-4 items-center gap-4'>
        <Image src='/block.svg' width={100} height={100} alt='Oferta bloqueada.' />
        <h1 className='font-bold text-red text-xl'>Oferta bloqueada</h1>
      </div>
    )
  }

  const { id } = params
  const offersData = await getOfferById(id)

  const skills = offersData.skillsList.map(skill => skill.skill)

  const dateUpdated = new Date(offersData.updateDate)
  const offerData = getTime(dateUpdated.getTime(), new Date().getTime())

  const { blocked } = offersData

  return (
    <>
      <main className='sm:w-4/6 w-full mx-auto flex flex-col bg-white p-8 relative text-justify'>
        <p className='absolute right-3 top-3'>Publicada: {offerData}</p>
        <div className='mb-7 mt-4'>
          <h1 className='text-4xl'>{offersData.title}</h1>
          <h2 className='text-xl text-infojobs hover:underline'><a target='_blank' href={`${offersData.profile.url}`} rel='noreferrer'>{offersData.profile.name}</a></h2>
        </div>

        {!blocked ? <a className='bg-infojobsOrange hover:bg-infojobsOrangeSecundary text-white py-3 px-10 mb-4 text-xl w-fit' href={offersData.link}>Ir a la oferta</a> : <OfferBlocked />}

        <section className='border-b-4 border-infojobs2 py-5'>
          <h1 className='text-3xl text-infojobs2 font-bold mb-2'>Requisitos</h1>

          <div className='mb-2'>
            <h2 className='text-2xl'>Skills</h2>
            <ListOfSkills skills={skills} />
          </div>

          <ul className='text-xl'>
            <li>Estudios mínimos: {offersData.studiesMin.value}</li>
            <li>Experiencia mínima: {offersData.experienceMin.value}</li>
          </ul>
        </section>

        <section className='py-5 text-xl'>
          <h1 className='text-3xl text-infojobs2 font-bold mb-2'>Descripción de la oferta</h1>
          <ul className='border-b-2 border-gray pb-3 mb-3'>
            <li>{offersData.city}</li>
            <li>{offersData.salaryDescription}</li>
            <li>Teletrabajo: {offersData.teleworking.value}</li>
            <li>Tipo de contrato: {offersData.journey.value}</li>
            <li>Vacantes: {offersData.vacancies}</li>
          </ul>
          <p>{offersData.description}</p>
        </section>
      </main>
      <footer className='bg-infojobs text-white mt-8 p-8 text-justify w-full sm:w-4/6 mx-auto'>
        <p>Los datos bancarios, de pago y datos personales (DNI, foto) nunca deben proporcionarse al solicitar un empleo. Consulta nuestros consejos para una búsqueda de empleo segura.</p>
      </footer>
    </>
  )
}
