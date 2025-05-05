import Link from "next/link";

//Navbar Component
const Navbar = () => {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="h-16 flex justify-between items-center px-4 sm:px-6 lg:px-8">
          {/* left section -- logo */}
          <Link href={"/"} className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-primary">
              Event Management System
            </span>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Navbar;
