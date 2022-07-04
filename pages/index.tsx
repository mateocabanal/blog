import Entry from "../components/Entry";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center align-middle align-self-center">
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
