import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Infojobs for developers',
  description: 'Buscador de ofertas centrado en developer + tracker de las skills con más demanda.'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <Head>
        <link rel='shortcut icon' href='/infojobs.ico' />
      </Head>
      <body className={inter.className}>
        <header className='flex flex-col justify-center items-center m-5'>
          <h1 className='text-5xl text-infojobs font-bold'>InfoJobs</h1>
          <h2 className='text-3xl'>For <span className='text-infojobs2 font-bold'>Developers</span></h2>
          <Link href='/offers'><img src='/infojobs.svg' alt='Infojobs developers' className='rounded-lg absolute top-5 left-5 w-10' /></Link>

          <nav className='flex gap-2 mt-2'>
            <Link href='/' className='text-infojobs hover:underline'>Ofertas</Link>
            <Link href='/offers/search' className='text-infojobs hover:underline'>Buscar</Link>
            <Link href='/skills' className='text-infojobs hover:underline'>Skills</Link>
          </nav>

        </header>
        {children}
      </body>
    </html>
  )
}
