import Link from 'next/link'
import { useCallback, useState } from 'react'
import { CiLight } from 'react-icons/ci'
import { FaChartBar, FaList } from 'react-icons/fa'
import { IoMdHome, IoMdSettings } from 'react-icons/io'
import { IoPersonCircleOutline } from 'react-icons/io5'
import {
  MdDarkMode,
  MdDashboard,
  MdOutlineWorkspacePremium,
} from 'react-icons/md'
import { HandDrawCard } from '../cards/hand-drawn-card'

interface NavigationItem {
  title: string
  icon: React.ReactNode
  href: string
}

const navigationItems: NavigationItem[] = [
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

const NavigationItem = ({
  title,
  icon,
  href,
  isExpanded,
}: NavigationItem & { isExpanded: boolean }) => {
  return (
    <li className="list-none">
      <Link href={href} className={`flex ${isExpanded ?? 'flex-row gap-4'}`}>
        {icon}
        {isExpanded && <span>{title}</span>}
      </Link>
    </li>
  )
}

function SideBar() {
  const name = 'Folli'
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const toggleSidebar = useCallback(() => {
    setIsExpanded((prev) => !prev)
  }, [])

  const handleCardClick = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest('a')) {
        return
      }
      toggleSidebar()
    },
    [toggleSidebar]
  )

  return (
    <HandDrawCard
      scribble={2}
      curvature={1}
      className={`h-full transition-all duration-300 ${
        isExpanded ? 'min-w-64' : 'w-24'
      }`}
      onClick={handleCardClick}
    >
      <div className="flex h-full w-full flex-col justify-between">
        <nav className="flex flex-col items-center text-xl">
          <div className="flex flex-col gap-8">
            {navigationItems.map((navItem) => (
              <NavigationItem
                key={navItem.href}
                title={navItem.title}
                icon={navItem.icon}
                href={navItem.href}
                isExpanded={isExpanded}
              />
            ))}
          </div>
        </nav>
        <div>
          <HandDrawCard
            padding={4}
            className={`transition-all duration-300 ${
              isExpanded ? 'min-w-64' : 'w-fit'
            }`}
          >
            <div
              className={`flex h-full w-full gap-2 transition-all duration-300 ${
                isExpanded ? 'flex-row justify-between' : 'flex-col'
              }`}
            >
              <button
                type="button"
                aria-label="Modo escuro"
                className="transition-opacity hover:opacity-70"
              >
                <MdDarkMode size={28} />
              </button>
              <button
                type="button"
                aria-label="Modo claro"
                className="transition-opacity hover:opacity-70"
              >
                <CiLight size={28} />
              </button>
            </div>
          </HandDrawCard>
          {isExpanded ? (
            <HandDrawCard className="">
              <div className="flex h-full items-center">
                <div className="flex flex-row items-center justify-center gap-2">
                  <IoPersonCircleOutline size={36} />
                  <p>Hello, {name}</p>
                </div>
              </div>
            </HandDrawCard>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </HandDrawCard>
  )
}

export default SideBar
