import Link from "next/link";

export default function Entry({ name, nicename, desc }) {
  return (
    <div className="border-gray-200">
      <Link className="no-underline hover:underline hover:cursor-pointer" href={`/post/${name}`} passHref>
        <div className="mt-5">
          <h1 className="text-7xl"> {nicename} </h1>
          <p className="mt-10 text-2xl">
            <b>Description: </b> <br />
            {desc}
          </p>
        </div>
      </Link>
    </div>
  );
}
