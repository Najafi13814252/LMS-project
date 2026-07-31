import MobileSidebar from "./MobileSidebar"
import NavbarRotes from "./NavbarRotes"

function Navbar() {
  return (
    <div className="p-4 border-b h-full flex items-center shadow-sm bg-white">
      <MobileSidebar />
      <NavbarRotes />
    </div>
  )
}

export default Navbar
