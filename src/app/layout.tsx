import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { AudioProvider } from "@/context/AudioContext"
import PersistentAudioPlayer from "@/components/PersistentAudioPlayer"


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Epikodi',
  description: 'Lecteur musical personnalisé basé sur Kodi',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AudioProvider>
      <html lang="fr">
        <body className={inter.className}>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 bg-gray-900 text-white">
              <Navbar />
              <div className="p-4">
                {children}
              </div>
            </main>
          </div>
          <PersistentAudioPlayer />
        </body>
      </html>
    </AudioProvider>
  )
}
