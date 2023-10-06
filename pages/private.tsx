import { GetStaticProps, InferGetStaticPropsType } from "next";
import Entry from "../components/Entry";

type AllPages = {
  pages: [string]
}

export const getStaticProps: GetStaticProps<{all_pages: AllPages}> = async () => {
  const res = await fetch("https://mateocabanal.ca/md/get_all_priv");
  const all_pages = await res.json();
  return { props: { all_pages } };
}

export default function Private({all_pages}: InferGetStaticPropsType<typeof getStaticProps>) {
  const items = all_pages.pages.map((page, index) => {
    return (

    <div key={index} className="flex flex-col items-center justify-center text-center align-middle align-self-center">
    <Entry name={`private:${page.substring(0, page.length - 3)}`} nicename={`${page.substring(0, page.length - 3)}`} desc={"private..."} />
    </div>
    )
  });
  return (
    <div>
    {items}
    </div>
  );
}
