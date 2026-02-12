import SideBar from "./side-bar";

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-full w-full overflow-hidden bg-black px-4 py-2 gap-4 text-white">
      <aside className="h-full">
        <SideBar />
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default MainLayout;
