'use client'
import { useRouter } from 'next/navigation'

export default function InfoOffer () {
  const router = useRouter()

  router.push('/offers')

  return (
    <h1>Cargando...</h1>
  )
}
