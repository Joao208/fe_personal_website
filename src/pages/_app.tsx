import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <meta name="theme-color" content="#1C2A34" media="(prefers-color-scheme: dark)" />
        <meta name="keywords" content="Full Stack, Dev, Programador, Backend, Web, Frontend" />
        <meta name="author" content="João Augusto (joao208)" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
