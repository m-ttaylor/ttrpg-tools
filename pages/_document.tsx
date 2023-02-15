import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="min-h-screen bg-gradient-to-t to-stone-100 via-teal-100/50 from-stone-400/50">
        <Main />
        <NextScript />
      </body>
      {/* <footer className="h-20 bg-red"></footer> */}
    </Html>
  )
}
