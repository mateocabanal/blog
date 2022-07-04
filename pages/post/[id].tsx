import ReactMarkdown from "react-markdown";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import one_dark from "../../styles/custom-theme";
import remarkGfm from "remark-gfm";

import { readdir } from "fs/promises";

export async function getStaticPaths() {
  const files = await readdir("./public/md/");
  const paths = files.map((f) => ({
    params: { id: f.substring(0, f.length - 3) },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://mateocabanal.ca/md/${params.id}.md`);

  return {
    props: {
      data: await res.text(),
    },
    revalidate: 60,
  };
}

const Post = ({ data }) => {
  /*  const router = useRouter();
  const { id } = router.query;

  if (!router.isReady) {
    return null;
  }*/

  // eslint-disable-next-line react-hooks/rules-of-hooks
  //  const { data, error } = useSWR(`/md/${id}.md`, fetcher);

  //  if (error) return <div>{error}</div>;
  if (!data) return <div> Loading... </div>;

  return (
    <div className="items-center h-full px-2 ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                // eslint-disable-next-line react/no-children-prop
                children={String(children).replace(/\n$/, "")}
                // @ts-ignore
                style={one_dark}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          h1: ({ node, ...props }) => (
            <h1
              className="py-8 font-sans text-6xl text-center align-middle "
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="py-8 font-sans text-5xl text-center align-middle"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              className="py-8 font-sans text-3xl text-center align-middle"
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            <p
              className="px-2 text-lg text-left /*text-gray-100*/ font-body"
              {...props}
            />
          ),
          a: ({ node, ...props }) => (
            <a
              href={props.href}
              className="mx-5 link-hover link-secondary hover:cursor-pointer"
            >
              {props.children}
            </a>
          ),
        }}
      >
        {data}
      </ReactMarkdown>
    </div>
  );
};

export default Post;
