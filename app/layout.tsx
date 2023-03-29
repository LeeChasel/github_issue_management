import './globals.css'
import Providers from './providers';

export const metadata = {
  title: "Task Management",
  description: "Chasel's dcard intern homework",
}

export default function RootLayout({children}: {children: React.ReactNode}) 
{
  return (
      <html lang="en" className='h-full'>
        <body className='h-full'>
          <Providers>
            <main className='h-full'>
              {children}
            </main>
          </Providers>
        </body>
      </html>
  )
}
