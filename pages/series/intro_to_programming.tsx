
import Entry from "../../components/Entry";

export default function Home() {
    return (
        <>
            <div className="flex flex-col items-center justify-center text-center align-middle align-self-center">
                <div className="my-4 rotating-border rotating-border--ha">
                    <h1 className="text-8xl">
                        Intro To Rust: Series
                    </h1>
                </div>
                <Entry
                    nicename="Intro to Rust"
                    name="rust_tutorial"
                    desc="The first step into learning Rust"
                ></Entry>

                <Entry
                    nicename="Intro to Rust: Variables"
                    name="rust_tutorial_var"
                    desc="A deep dive into variables"
                ></Entry>


                <Entry
                    nicename="Intro to Rust: Functions"
                    name="rust_tutorial_fn"
                    desc="A deep dive into functions"
                ></Entry>

                <Entry
                    nicename="Intro to Rust: Loops"
                    name="rust_tutorial_loops"
                    desc="A deep dive into loops!"
                ></Entry>

                <Entry
                    nicename="Intro to Rust: Classes"
                    name="rust_tutorial_class"
                    desc="A deep dive into classes"
                ></Entry>

                <Entry
                    nicename="Rust Project: Calculator"
                    name="rust_tutorial_calc"
                    desc="Creating a calculator from scratch!"
                ></Entry>
                <Entry
                    nicename="Rust Project: Rock Paper Scissors"
                    name="rust_tutorial_rps"
                    desc="Create a rock paper scissors game!"
                ></Entry>
            </div>

        </>
    );
}
