import { HandDrawCard } from "../cards/hand-drawn-card";

function NavBar() {
  return (
    <HandDrawCard scribble={3} curvature={1} className="w-full">
      <nav className="flex h-20 items-center p-5">
        <p className="text-white">[] NAV BAR - TODO</p>
      </nav>
    </HandDrawCard>
  );
}

export default NavBar;
