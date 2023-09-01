import { getClient } from "@/lib/apolloClient";
import { gql } from "@/__generated__/gql";
import {
  PortableText,
  PortableTextComponents,
  PortableTextMarkComponentProps,
} from "@portabletext/react"
import type { PortableTextBlock } from "@portabletext/types"
import Image from "next/image";

const query = gql(`
  query GetAboutMePage($current: String!) {
    allPage(where: { slug: {current: { eq: $current } } }) {
      title,
      bodyRaw,
      mainImage {
        asset {
          url,
          altText
        }
      }
    }
  }
`);

const components: PortableTextComponents = {
  marks: {
    link: ({ value, children }: PortableTextMarkComponentProps) => {
      const href: string = String(value?.href) || "";
      const target = href.startsWith("http") ? "_blank" : undefined;
      return (
        <a
          href={href}
          target={target}
          rel={target === "_blank" ? "noindex nofollow" : ""}
        >
          {children}
        </a>
      );
    },
  },
};

const Home = async () => {
  const { data } = await getClient().query({
    query,
    variables: { current: "about-me" },
    context: {
      fetchOptions: {
        next: { revalidate: 120 },
      },
    },
  });

  const postData = data.allPage[0];
  const bodyRaw: PortableTextBlock[] = postData.bodyRaw as PortableTextBlock[];

  const imageLink: string = postData.mainImage?.asset?.url || "";
  const altImageText: string =
    postData.mainImage?.asset?.altText ||
    `No image for "${postData.title ? postData.title : "Blog"}"`;

  return (
    <section className="text-center">
      <h1>{postData?.title}</h1>
      <div className="content md:flex justify-center">
        <Image
          src={imageLink}
          alt={altImageText}
          width="600"
          height="315"
          className="m-auto 2xl:mr-0"
          style={{ padding: "20px", height: "315px", width: "300px" }}
        />
        <div className="text-justify max-w-[1000px] m-auto p-10 py-0">
          <PortableText value={bodyRaw} components={components} />
        </div>
      </div>
    </section>
  );
};

export default Home;
