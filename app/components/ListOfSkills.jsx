import Link from 'next/link'

export default function ListOfSkills ({ skills }) {
  return (
    <>
      <ul className='flex gap-3 text-2xl flex-wrap'>
        {skills && skills.length > 0
          ? skills.map((el, index) => {
            return <li key={index}><Link href={`/skills/${el}`} className='text-infojobs hover:underline'>{el}</Link></li>
          })
          : <li>No hay skills</li>}
      </ul>
    </>
  )
}
