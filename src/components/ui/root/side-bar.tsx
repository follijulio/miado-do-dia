import { HandDrawCard } from "../cards/hand-drawn-card";

function SideBar() {
  return (
    <HandDrawCard scribble={3} curvature={1} className="h-full w-full">
      <nav className="flex h-full items-center p-5">
        <p className="text-white">[] NAV BAR - TODO</p>
      </nav>
    </HandDrawCard>
  );
}

export default SideBar;
