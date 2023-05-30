import { getTopNewestOffers } from '@/app/components/getOffers.js'
import Link from 'next/link'

export default async function SkillInfo ({ params }) {
  const salaryPeriodsCheatSheet = {
    año: 3,
    mes: 2,
    hora: 1
  }

  let { id } = params

  id = decodeURIComponent(id)

  const latestOffersData = await getTopNewestOffers(2)

  const skillsById = latestOffersData.skills.filter(skill => skill.skills.some(el => el.toLowerCase() === id.toLowerCase()))
  const filteredOffers = latestOffersData.offers.filter(offer => typeof skillsById.find(skill => offer.id === skill.offerId) !== 'undefined')

  /* Salario */
  let total = 0
  let salaryCounter = 0

  filteredOffers.forEach(offer => {
    if (offer.salaryMin.id === 0 && offer.salaryMax.id === 0) return

    let salary = Number(offer.salaryMin.value.replace(/\.|€|\s/g, ''))

    if (offer.salaryPeriod.id === salaryPeriodsCheatSheet.año) {
      salary = salary / 12
    } else if (offer.salaryPeriod.id === salaryPeriodsCheatSheet.hora) {
      salary = salary * 8 * 5 * 4
    }

    total += Math.floor(salary)
    salaryCounter++
  })

  /* Experience */
  const arrExperience = []

  filteredOffers.forEach(offer => {
    const index = arrExperience.findIndex(el => el.type === offer.experienceMin.id)

    if (index !== -1) {
      arrExperience[index].amount++
    } else {
      arrExperience.push({ type: offer.experienceMin.id, amount: 1, value: offer.experienceMin.value })
    }
  })

  const experience = arrExperience.sort((a, b) => a.amount - b.amount).reverse().shift()

  /* CONTRACT TYPE */

  const arrContracts = []

  filteredOffers.forEach(offer => {
    const index = arrContracts.findIndex(el => el.type === offer.contractType.id)

    if (index !== -1) {
      arrContracts[index].amount++
    } else {
      arrContracts.push({ type: offer.contractType.id, amount: 1, value: offer.contractType.value })
    }
  })

  const contract = arrContracts.sort((a, b) => a.amount - b.amount).reverse().shift()

  /* Study */
  const arrStudies = []

  filteredOffers.forEach(offer => {
    const index = arrStudies.findIndex(el => el.type === offer.study.id)

    if (index !== -1) {
      arrStudies[index].amount++
    } else {
      arrStudies.push({ type: offer.study.id, amount: 1, value: offer.study.value })
    }
  })

  const study = arrStudies.sort((a, b) => a.amount - b.amount).reverse().shift()

  /* Workday */
  const arrWorks = []

  filteredOffers.forEach(offer => {
    const index = arrWorks.findIndex(el => el.type === offer.workDay.id)

    if (index !== -1) {
      arrWorks[index].amount++
    } else {
      arrWorks.push({ type: offer.workDay.id, amount: 1, value: offer.workDay.value })
    }
  })

  const work = arrWorks.sort((a, b) => a.amount - b.amount).reverse().shift()

  /* City */

  const arrCities = []

  filteredOffers.forEach(offer => {
    const index = arrCities.findIndex(el => el.type === offer.province.id)

    if (index !== -1) {
      arrCities[index].amount++
    } else {
      arrCities.push({ type: offer.province.id, amount: 1, value: offer.province.value })
    }
  })

  const city = arrCities.sort((a, b) => a.amount - b.amount).reverse().shift()

  const averageSalary = !isNaN(Math.floor(total / salaryCounter)) ? Math.floor(total / salaryCounter) : 'No se han encontrado salarios para hacer el cálculo.'

  return (
    <>
      <main>
        <section className='flex mx-auto md:w-3/4 w-11/12 md:flex-row flex-col'>
          <div className='md:w-1/2 w-full flex items-center justify-center flex-col gap-4 my-2 mx-0 md:mx-2 bg-white p-5'>
            <div className='mt-4 md:mt-0'>
              <p className='text-infojobs2 font-bold'>Skill</p>
              <h1 className='text-6xl'>{id}</h1>
            </div>
            <h2 className='text-gray mb-4 md:mb-0'>{filteredOffers.length} ofertas de {latestOffersData.offers.length} precisan de conocimientos en {id}.</h2>
          </div>
          <div className='md:w-1/2 w-full bg-white my-2 mx-0 md:mx-2 p-5'>
            <div className='text-center'>
              <h1 className='text-infojobs2 font-bold'>Media de salario</h1>
              <h1 className='text-4xl'>{averageSalary}</h1>
            </div>
            <div className='flex flex-wrap justify-center'>
              <div className='p-3 w-80'>
                <h1 className='text-infojobs2'>Experiencia mínima más pedida.</h1>
                <h1>{experience?.value}</h1>
              </div>
              <div className='p-3 w-80'>
                <h1 className='text-infojobs2'>Tipo de contrato más pedido para la skill.</h1>
                <h1>{contract?.value}</h1>
              </div>
              <div className='p-3 w-80'>
                <h1 className='text-infojobs2'>Tipo de estudios más pedido</h1>
                <h1>{study?.value}</h1>
              </div>
              <div className='p-3 w-80'>
                <h1 className='text-infojobs2'>Tipo de jornada más pedida.</h1>
                <h1>{work?.value}</h1>
              </div>
              <div className='p-3 w-80'>
                <h1 className='text-infojobs2'>Provincia com más ofertas de {id}.</h1>
                <h1>{city?.value}</h1>
              </div>
            </div>
          </div>
        </section>
        <section className='mt-5 flex flex-wrap mx-auto md:w-3/4 w-11/12'>
          <h1 className='text-3xl w-full'>Ofertas que requieren conocimientos de {id}.</h1>
          {filteredOffers.map((offer, index) => {
            return (
              <div key={index} className='md:w-1/3 w-full p-2'>
                <div className='bg-white h-full p-2'>
                  <p className=''>Título de la oferta</p>
                  <Link href={`/offers/info/${offer.id}`} className='text-xl hover:underline text-infojobs'>{offer.title}</Link>
                </div>
              </div>
            )
          })}
        </section>
      </main>
    </>
  )
}
