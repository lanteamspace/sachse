import { Outlet } from "react-router-dom";

export default function Shell() {
  return (
    <div className="min-h-screen bg-[#070b12] text-white">
      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  );
}
