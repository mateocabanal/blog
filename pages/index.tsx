import Entry, { EntryWithHref } from "../components/Entry";
import { useEffect } from "react";
import { themeChange } from 'theme-change';
import Head from "next/head";

export default function Home() {
  useEffect(() => {
    themeChange(false)
    // 👆 false parameter is required for react project
  }, [])
  return (
    <div className="flex flex-col items-center justify-center text-center align-middle align-self-center">
      <Head>
        <title>{"Mateo's Blog"}</title>
      </Head>
      <EntryWithHref
        nicename="Intro to Rust"
        name="rust_tutorial"
        desc="The first step into learning Rust"
        url="/series/intro_to_programming"
      />
      <Entry
        nicename="Tinyhttp"
        name="tinyhttp"
        desc="A HTTP library written in Rust"
      ></Entry>
      <Entry
        nicename="Tiny Binaries"
        name="tiny_binaries"
        desc="Making tiny binaries with TCC"
      ></Entry>

    </div>
  );
}
