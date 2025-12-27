import NavBar from "./nav-bar";

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden p-4 text-white">
      <div className="shrink-0">
        <NavBar />
      </div>
      <div>{children}</div>
    </div>
  );
}

export default MainLayout;
