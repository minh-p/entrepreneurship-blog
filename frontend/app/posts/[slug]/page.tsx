import { getClient } from "@/lib/apolloClient";
import { gql } from "@/__generated__/gql";
import { Post } from "@/__generated__/graphql";
import {
  PortableText,
  PortableTextComponents,
  PortableTextMarkComponentProps,
} from "@portabletext/react";
import { convertToSimpleDate } from "@/lib/convertToSimpleDate";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import React from "react";
import SanityImage from "@/components/SanityImage";

const allPostsQuery = gql(`query Posts {
  allPost {
    title,
    author {
      name
    },
    publishedAt
    categories {
      title
    },
    slug {
      current
    }
  }
}`);

const postQuery = gql(/* GraphQL */ `
  query Post($current: String!) {
    allPost(where: { slug: { current: { eq: $current } } }) {
      title
      author {
        name
      }
      publishedAt
      categories {
        title
      }
      bodyRaw
      mainImage {
        asset {
          url
        }
      }
    }
  }
`);

type PostData = {
  allPost: Array<Post>;
};

type Props = {
  slug: string;
};

export const generateStaticParams = async () => {
  const { data }: { data: PostData } = await getClient().query({
    query: allPostsQuery,
    context: {
      fetchOptions: {
        next: { revalidate: 120 },
      },
    },
  });
  const posts = data.allPost;
  return posts
    .map((post: Post) => ({
      slug: post.slug?.current || "",
    }))
    .filter((eachPropField: Props) => eachPropField.slug != "");
};

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />;
    },
  },
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

const Page = async ({ params }: { params: Props }) => {
  const { data }: { data: PostData } = await getClient().query({
    query: postQuery,
    variables: { current: params.slug },
    context: {
      fetchOptions: {
        next: { revalidate: 120 },
      },
    },
  });

  if (!data) {
    return <h1>Invalid Article. Please Return.</h1>;
  }

  const post: Post = data.allPost[0];
  const date: string = convertToSimpleDate(String(post.publishedAt));
  const authorName: string = post.author?.name || "";
  const bodyRaw: PortableTextBlock[] = post.bodyRaw as PortableTextBlock[];

  const imageLink: string = post.mainImage?.asset?.url || "";
  const altImageText: string =
    post.mainImage?.asset?.altText ||
    `No image for "${post.title ? post.title : "Blog"}"`;

  const ImageDisplay = () => {
    if (!post.mainImage) return <></>;
    return (
      <Image
        src={imageLink}
        alt={altImageText}
        width="1200"
        height="630"
        style={{ padding: "20px", width: "100%", height: "auto" }}
      />
    );
  };
  return (
    <div className="text-center py-8 m-auto max-w-4xl">
      <ImageDisplay />
      <h1 className="text-[26pt] md:text-[40pt]">{post.title}</h1>
      <p>By {authorName}</p>
      <p>Published {date}</p>
      <div className="text-left p-3 content">
        <PortableText value={bodyRaw} components={components} />
      </div>
    </div>
  );
};

export default Page;
