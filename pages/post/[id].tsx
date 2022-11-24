import dynamic from "next/dynamic";
import one_dark from "../../styles/custom-theme";
import remarkGfm from "remark-gfm";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import Head from "next/head";
import { readdir } from "fs/promises";
import { Suspense, useState } from "react";
import remarkDirective from "remark-directive";
import remarkDirectiveRehype from "remark-directive-rehype";
import useCollapse from "react-collapsed";

const ReactMarkdown = dynamic<any>(() => import("react-markdown") as any, {
  suspense: true,
});

/*const RemarkDirectivePlugin = dynamic<any>(() => import("remark-directive-rehype") as any, {
  suspense: true,
});*/

type MarkdownWithYamlFrontmatter<T> = {
  metadata: string;
} & {
    [K in keyof T]?: string;
  };

export const parseMarkdownWithYamlFrontmatter = <
  T extends Record<string, string>
>(
  markdown: string
): MarkdownWithYamlFrontmatter<T> => {
  const metaRegExp = new RegExp(/^---[\n\r](((?!---).|[\n\r])*)[\n\r]---$/m);

  // "rawYamlHeader" is the full matching string, including the --- and ---
  // "yamlVariables" is the first capturing group, which is the string content between the --- and ---
  const [rawYamlHeader, yamlVariables] = metaRegExp.exec(markdown) ?? [];

  if (!rawYamlHeader || !yamlVariables) {
    return { metadata: markdown };
  }

  const keyValues = yamlVariables.split("\n");

  const frontmatter = Object.fromEntries<string>(
    keyValues.map((keyValue) => {
      const splitted = keyValue.split(":");
      const [key, value] = splitted;

      return [key ?? keyValue, value?.trim() ?? ""];
    })
  ) as Record<keyof T, string>;

  return {
    ...frontmatter,
    metadata: markdown.replace(rawYamlHeader, "").trim(),
  };
};

type MarkdownFrontmatter = {
  title?: string;
  date?: string;
};

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
  const res = await fetch(`https://mateocabanal.ca/md/${params.id}.md`);
  const text = await res.text();

  const { title, metadata, date } =
    parseMarkdownWithYamlFrontmatter<MarkdownFrontmatter>(text);

  return {
    props: {
      data: metadata,
      title,
      date,
    },
    revalidate: 60,
  };
}

function Title(props, date) {
  return (
    <>
      <h1
        className="w-full py-16 font-sans text-6xl text-center align-middle "
        {...props}
      />
      <div className="pb-4 text-2xl text-center">
        <p className="font-medium"> Posted: {date} </p>
      </div>
    </>
  )
}

function LinksAtTop(props) {
  let collapsedClassName = props.className.replace(/\s+/g, '.');
  let properHref = props.id + '.' + collapsedClassName;
  return (
    <h2 className="text-3xl align-middle text-center py-4 link-hover link-secondary hover:cursor-pointer">
      <a href={properHref}>
        {props.children}
      </a>
    </h2>
  )
}

function CollapseCode(props, children, match) {
  const [isExpanded, setExpanded] = useState(false)
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  return (
    <div className="max-w-screen-md mx-auto flex flex-col">
      <button {...getToggleProps({
        onClick: () => setExpanded((prevExpanded) => !prevExpanded),
      })} className=" btn my-4 btn-secondary align-middle self-center ">
        {isExpanded ? 'Hide Code' : 'Show Code'}
      </button>
      <div  {...getCollapseProps()} className="mb-4">
        <SyntaxHighlighter
          // eslint-disable-next-line react/no-children-prop
          children={String(children).replace(/\n$/, "")}
          // @ts-ignore
          style={one_dark}
          language={match}
          PreTag="div"
          {...props}
        />
      </div>
    </div>
  )
}

const Post = ({ data, title, date }) => {
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
    <div className="max-w-screen-md mx-auto flex flex-col h-full px-4 ">
      <Head>
        <title> {title} </title>
      </Head>
      <Suspense fallback={"Loading..."}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkDirective, remarkDirectiveRehype]}
          components={{
            code({ node, inline, className, children, ...props }) {
              let match = /language-(\w+)(\x2b)(\w+)/.exec(className || "");
              if (match == undefined) {
                match = /language-(\w+)/.exec(className || "")
              }
              if (!inline && match && match[3] == "close") {
                return CollapseCode(props, children, match[1])
              } else if (!inline) {
                return (

                  <div className="max-w-screen-md mx-auto">
                    <SyntaxHighlighter
                      // eslint-disable-next-line react/no-children-prop
                      children={String(children).replace(/\n$/, "")}
                      // @ts-ignore
                      style={one_dark}
                      language={match[1]}
                      PreTag="div"
                      {...props}

                    />
                  </div>
                )
              }
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
            "title": ({ node, ...props }) => Title(props, date),
            "link-at-top": ({ node, ...props }) => LinksAtTop(props),
            "collapsed-code": ({ node, ...props }) => {
              return (
                CollapseCode(props, props.children, props.className)
              )
            },

            h2: ({ node, ...props }) => (
              <h2
                className="w-full py-8 mx-auto font-sans text-5xl text-center align-middle"
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <h3
                className="font-sans self-center px-4 align-middle text-3xl"
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p
                className=" px-2 text-lg text-left /*text-gray-100*/ font-body"
                {...props}
              />
            ),
            a: ({ node, ...props }) => (
              <a
                href={props.href}
                className="link-hover link-secondary hover:cursor-pointer"
              >
                {props.children}
              </a>
            ),
          }}
        >
          {data}
        </ReactMarkdown>
      </Suspense>
    </div >
  );
};

export default Post;
