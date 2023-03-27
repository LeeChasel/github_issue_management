import './globals.css'
// import { SessionProvider } from "next-auth/react"
import AuthContext from './AA';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {

  return (
    // <AuthContext>
      <html lang="en" className='h-full'>
        {/*
          <head /> will contain the components returned by the nearest parent
          head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
        */}
        <head />
        <body className='h-full'>{children}</body>
      </html>
      // </AuthContext>
  )
}
