import Link from 'next/link'
import { useCallback, useState } from 'react'
import { CiLight } from 'react-icons/ci'
import { FaChartBar, FaList } from 'react-icons/fa'
import { IoMdHome, IoMdSettings } from 'react-icons/io'
import { IoLogOutOutline, IoPersonCircleOutline } from 'react-icons/io5'
import {
  MdDarkMode,
  MdDashboard,
  MdOutlineWorkspacePremium,
} from 'react-icons/md'

import { HandDrawCard } from '../cards/hand-drawn-card'

type NavigationLink = {
  title: string
  icon: React.ReactNode
  href: string
}

const NAV_ITEMS: NavigationLink[] = [
  { icon: <IoMdHome size={28} />, title: 'home', href: '/' },
  { icon: <MdDashboard size={28} />, title: 'dashboard', href: '/dashboard' },
  { icon: <FaList size={28} />, title: 'todos', href: '/todos' },
  { icon: <FaChartBar size={28} />, title: 'metrics', href: '/metrics' },
  { icon: <IoMdSettings size={28} />, title: 'settings', href: '/settings' },
  {
    icon: <MdOutlineWorkspacePremium size={28} />,
    title: 'premium',
    href: '/premium',
  },
]

type NavItemProps = NavigationLink & { isExpanded: boolean }

function NavItem({ title, icon, href, isExpanded }: NavItemProps) {
  return (
    <li className="list-none">
      <Link
        href={href}
        className={`flex items-center transition-colors hover:text-purple-500 ${
          isExpanded ? 'flex-row gap-4' : 'flex-col gap-1'
        }`}
      >
        {icon}
        {isExpanded && <span className="capitalize">{title}</span>}
      </Link>
    </li>
  )
}

type ThemeToggleProps = { isExpanded: boolean }

function ThemeToggle({ isExpanded }: ThemeToggleProps) {
  const iconSize = isExpanded ? 32 : 24

  return (
    <HandDrawCard
      className={`flex p-4 transition-all ${
        isExpanded ? 'h-20 min-w-64' : 'h-24 w-full items-center justify-center'
      }`}
    >
      <div
        className={`flex h-full w-full gap-2 ${
          isExpanded
            ? 'flex-row justify-between'
            : 'flex-col items-center justify-between'
        }`}
      >
        <button
          type="button"
          aria-label="Ativar modo escuro"
          className="transition-opacity hover:opacity-70"
        >
          <MdDarkMode size={iconSize} />
        </button>
        <button
          type="button"
          aria-label="Ativar modo claro"
          className="transition-opacity hover:opacity-70"
        >
          <CiLight size={iconSize} />
        </button>
      </div>
    </HandDrawCard>
  )
}

type UserSectionProps = { isExpanded: boolean; name: string }

function UserSection({ isExpanded, name }: UserSectionProps) {
  if (isExpanded) {
    return (
      <HandDrawCard className="h-20 w-full p-4">
        <div className="flex h-full w-full items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <IoPersonCircleOutline size={36} />
            <p className="truncate">Hello, {name}</p>
          </div>
          <IoLogOutOutline size={36} className="cursor-pointer" />
        </div>
      </HandDrawCard>
    )
  }

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <IoPersonCircleOutline size={42} />
      <IoLogOutOutline size={42} className="cursor-pointer" />
    </div>
  )
}

function SideBar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const userName = 'Folli'

  const toggleSidebar = useCallback(() => {
    setIsExpanded((prev) => !prev)
  }, [])

  const handleCardClick = useCallback(
    (event: React.MouseEvent) => {
      const target = event.target as HTMLElement
      const isLink = target.closest('a')
      if (!isLink) toggleSidebar()
    },
    [toggleSidebar]
  )

  return (
    <HandDrawCard
      scribble={2}
      curvature={1}
      className={`h-full px-2 py-6 transition-all duration-300 ${
        isExpanded ? 'min-w-64' : 'w-24'
      }`}
      onClick={handleCardClick}
    >
      <div className="flex h-full w-full flex-col items-center justify-between">
        <nav className="flex flex-col items-center text-xl">
          <ul className="flex flex-col gap-8">
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.href} {...item} isExpanded={isExpanded} />
            ))}
          </ul>
        </nav>

        <div className="flex w-full flex-col gap-4">
          <ThemeToggle isExpanded={isExpanded} />
          <UserSection isExpanded={isExpanded} name={userName} />
        </div>
      </div>
    </HandDrawCard>
  )
}

export default SideBar
