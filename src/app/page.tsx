import { HandDrawCard } from "@/components/ui/hand-drawn-card";

export default function Page() {
  return (
    <div className="h-screen w-screen p-4 text-white">
      <NavBar />
      <main className="pt-4 flex"></main>
    </div>
  );
}

const NavBar = () => {
  return (
    <HandDrawCard scribble={3} curvature={1}>
      <nav className="h-20 w-full flex items-center p-5">
        <p className="text-white">[] NAV BAR - TODO</p>
      </nav>
    </HandDrawCard>
  );
};
