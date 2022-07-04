import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-base-300 p-5 flex flex-col flex-grow text-center align-middle /*bg-[#1c1c1c]*/">
      <nav>
        <div className="inline mx-3">
          <Link href={"/"}>
            <a className="text-3xl no-underline hover:underline">HOME</a>
          </Link>
        </div>
        <div className="inline mx-3">
          <Link href={"/about"}>
            <a className="text-3xl no-underline hover:underline">ABOUT</a>
          </Link>
        </div>
      </nav>
    </div>
  );
}
