import { getTopNewestOffers } from '@/app/components/getOffers.js'
import Link from 'next/link'

export default async function Skills () {
  const latestOffersData = await getTopNewestOffers(10)
  const arrSkills = []

  latestOffersData.skills.forEach(skillsByOffer => {
    skillsByOffer.skills.forEach(skill => {
      const index = arrSkills.findIndex(el => el.type === skill)

      if (index !== -1) {
        arrSkills[index].amount += 1
      } else {
        arrSkills.push({ type: skill, amount: 1, salaries: [] })
      }
    })
  })

  arrSkills.sort((a, b) => a.amount - b.amount).reverse()

  return (
    <main>
      <div className='flex flex-col items-center mb-5 px-4'>
        <h1 className='text-2xl sm:text-4xl'>Ranking de las skills más demandadas.</h1>
        <h1 className='sm:text-xl text-lg text-gray'>Estadísitcas sacadas de {latestOffersData.offers.length} ofertas más recientes.</h1>
        <Link href='/skills/tracker' className='text-center text-infojobs hover:underline text-lg'>Tracker de skills más demandadas por dia.</Link>
      </div>
      <table className='table-fixed border-collapse border-spacing-0 mx-auto'>
        <thead className=''>
          <tr className='bg-infojobs text-white'>
            <td className='p-4'>Nº</td>
            <td className='p-4'>Skill</td>
            <td className='p-4'>Nº de ofertas</td>
          </tr>
        </thead>
        <tbody>
          {arrSkills.map((el, index) => {
            return (

              <tr key={index} className={index % 2 === 0 ? 'bg-secundarytd' : ''}>
                <td className='p-4 '>{index + 1}</td>
                <td className='p-4 '><Link href={`/skills/${encodeURIComponent(el.type)}`} className='font-bold text-infojobs hover:underline'>{el.type}</Link></td>
                <td className='p-4 '>{el.amount}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className='px-5' />
    </main>
  )
}
