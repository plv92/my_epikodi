import {
  Music,
  Video,
  Film,
  Tv,
  Settings,
  Home,
} from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#121212] text-gray-200 hidden md:block border-r border-gray-800">
      <div className="p-6 text-2xl font-bold text-white">🎬 My Epikodi</div>

      <nav className="px-4 space-y-2 text-sm">
        <SidebarItem icon={<Home size={20} />} label="Accueil" href="/" />
        <SidebarItem icon={<Music size={20} />} label="Musique" href="/musique" />
        <SidebarItem icon={<Film size={20} />} label="Films" href="/films" />
        <SidebarItem icon={<Tv size={20} />} label="Séries" href="/series" />
        <SidebarItem icon={<Video size={20} />} label="Vidéos personnelles" href="/videos" />


        <hr className="my-4 border-gray-700" />

        <SidebarItem icon={<Settings size={20} />} label="Paramètres" href="#" />
      </nav>
    </aside>
  );
}

import Link from 'next/link'

function SidebarItem({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-3 px-3 py-2 rounded hover:bg-gray-700 transition"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
