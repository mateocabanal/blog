import Link from "next/link";

export default function Entry({ name, nicename, desc }) {
  return (
    <div className="max-sm:w-3/4 max-2xl:w-1/2 2xl:w-3/12 rotating-border--bland rotating-border m-4 rounded-lg hover:rotating-border--google text-neutral-content">
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


export function EntryWithHref({ name, nicename, desc, url }) {
  return (
    <div className="max-sm:w-3/4 max-2xl:w-1/2 2xl:w-3/12 rotating-border--bland rotating-border m-4 rounded-lg hover:rotating-border--google text-neutral-content">
      <Link className="no-underline hover:underline hover:cursor-pointer" href={url} passHref>
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
