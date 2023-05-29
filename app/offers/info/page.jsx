'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function InfoOffer () {
  const router = useRouter()

  useEffect(() => {
    router.push('/offers')
  }, [])

  return (
    <h1>Cargando...</h1>
  )
}
