import { getClient } from "@/lib/apolloClient";
import { convertToSimpleDate } from "@/lib/convertToSimpleDate";
import Link from "next/link";
import Image from "next/image";
import { gql } from "@/__generated__/gql";
import { Post } from "@/__generated__/graphql";

const feedQuery = gql(`query Feed {
  allPost(sort: [ { publishedAt: DESC } ]){
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
    },
    mainImage {
      asset {
        url
        altText
      }
    }
  }
}`);

type PostData = {
  allPost: Array<Post>;
};

const Feed = async () => {
  const { data }: { data: PostData } = await getClient().query({
    query: feedQuery,
    context: {
      fetchOptions: {
        next: { revalidate: 120 },
      },
    },
  });
  const posts = data.allPost;

  return (
    <div className="text-center py-8 m-auto max-w-[1000px]">
      <h1>Feed</h1>
      <ul className="text-left p-0 py-8 grid grid-cols-1 md:p-8 md:grid-cols-2 gap-5">
        {posts.map((post: Post, postIndex: number) => {
          const link: string = post.slug?.current || "not-found";
          const imageLink: string = post.mainImage?.asset?.url || "";
          const altImageText: string =
            post.mainImage?.asset?.altText ||
            `No image for "${post.title ? post.title : "Blog"}"`;
          const authorName: string = post.author?.name || "";

          return (
            <li
              className="border-solid border-2 feed_li p-2 max-w-[480px] m-auto md:m-0"
              key={postIndex}
            >
              <Link
                className="font-medium"
                href={`/posts/${encodeURIComponent(link)}`}
              >
                <Image
                  src={imageLink}
                  width="480"
                  height="270"
                  alt={altImageText}
                />
                <h1>{post.title}</h1>
              </Link>
              <div>
                <p>Author: {authorName}</p>
                <p>
                  Published: {convertToSimpleDate(String(post.publishedAt))}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Feed;
