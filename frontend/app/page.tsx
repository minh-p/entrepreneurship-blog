import { getClient } from "@/lib/apolloClient";
import { gql } from "@/__generated__/gql";
import type { PortableTextBlock } from "@portabletext/types";
import {
  PortableText,
  PortableTextComponents,
  PortableTextMarkComponentProps,
} from "@portabletext/react";
import Image from "next/image";

const query = gql(`
  query GetAboutProjectPage($current: String!) {
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
    variables: { current: "about-project" },
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
      <div className="content mb-10 p-5">
        <Image
          src={imageLink}
          alt={altImageText}
          width="600"
          height="315"
          className="m-auto max-h-[50vh]"
          style={{ padding: "20px", height: "auto" }}
        />
        <h1>{postData?.title}</h1>
        <div className="text-left max-w-[1000px] m-auto">
          <PortableText value={bodyRaw} components={components} />
        </div>
      </div>
    </section>
  );
};

export default Home;
