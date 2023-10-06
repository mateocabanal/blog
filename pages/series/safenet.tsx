
import Entry from "../../components/Entry";

export default function Home() {
    return (
        <>
            <div className="flex flex-col items-center justify-center text-center align-middle align-self-center">
                <div className="my-4 rotating-border rotating-border--ha">
                    <h1 className="text-7xl">
                        Safenet, an alternative to HTTPS
                    </h1>
                </div>

                <Entry
                    nicename={"Safenet: Part One"}
                    name={"safenet_part_one"}
                    desc={"First steps: planning, design, etc."}
                />
            </div>

        </>
    );
}
