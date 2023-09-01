/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  query GetAboutMePage($current: String!) {\n    allPage(where: { slug: {current: { eq: $current } } }) {\n      title,\n      bodyRaw,\n      mainImage {\n        asset {\n          url,\n          altText\n        }\n      }\n    }\n  }\n":
    types.GetAboutMePageDocument,
  "\n  query GetAboutProjectPage($current: String!) {\n    allPage(where: { slug: {current: { eq: $current } } }) {\n      title,\n      bodyRaw,\n      mainImage {\n        asset {\n          url,\n          altText\n        }\n      }\n    }\n  }\n":
    types.GetAboutProjectPageDocument,
  "query Posts {\n  allPost {\n    title,\n    author {\n      name\n    },\n    publishedAt\n    categories {\n      title\n    },\n    slug {\n      current\n    }\n  }\n}":
    types.PostsDocument,
  "\n  query Post($current: String!) {\n    allPost(where: { slug: { current: { eq: $current } } }) {\n      title\n      author {\n        name\n      }\n      publishedAt\n      categories {\n        title\n      }\n      bodyRaw\n      mainImage {\n        asset {\n          url\n        }\n      }\n    }\n  }\n":
    types.PostDocument,
  "query Feed {\n  allPost(sort: [ { publishedAt: DESC } ]){\n    title,\n    author {\n      name\n    },\n    publishedAt\n    categories {\n      title\n    },\n    slug {\n      current\n    },\n    mainImage {\n      asset {\n        url\n        altText\n      }\n    }\n  }\n}":
    types.FeedDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetAboutMePage($current: String!) {\n    allPage(where: { slug: {current: { eq: $current } } }) {\n      title,\n      bodyRaw,\n      mainImage {\n        asset {\n          url,\n          altText\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query GetAboutMePage($current: String!) {\n    allPage(where: { slug: {current: { eq: $current } } }) {\n      title,\n      bodyRaw,\n      mainImage {\n        asset {\n          url,\n          altText\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetAboutProjectPage($current: String!) {\n    allPage(where: { slug: {current: { eq: $current } } }) {\n      title,\n      bodyRaw,\n      mainImage {\n        asset {\n          url,\n          altText\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query GetAboutProjectPage($current: String!) {\n    allPage(where: { slug: {current: { eq: $current } } }) {\n      title,\n      bodyRaw,\n      mainImage {\n        asset {\n          url,\n          altText\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Posts {\n  allPost {\n    title,\n    author {\n      name\n    },\n    publishedAt\n    categories {\n      title\n    },\n    slug {\n      current\n    }\n  }\n}",
): (typeof documents)["query Posts {\n  allPost {\n    title,\n    author {\n      name\n    },\n    publishedAt\n    categories {\n      title\n    },\n    slug {\n      current\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query Post($current: String!) {\n    allPost(where: { slug: { current: { eq: $current } } }) {\n      title\n      author {\n        name\n      }\n      publishedAt\n      categories {\n        title\n      }\n      bodyRaw\n      mainImage {\n        asset {\n          url\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query Post($current: String!) {\n    allPost(where: { slug: { current: { eq: $current } } }) {\n      title\n      author {\n        name\n      }\n      publishedAt\n      categories {\n        title\n      }\n      bodyRaw\n      mainImage {\n        asset {\n          url\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query Feed {\n  allPost(sort: [ { publishedAt: DESC } ]){\n    title,\n    author {\n      name\n    },\n    publishedAt\n    categories {\n      title\n    },\n    slug {\n      current\n    },\n    mainImage {\n      asset {\n        url\n        altText\n      }\n    }\n  }\n}",
): (typeof documents)["query Feed {\n  allPost(sort: [ { publishedAt: DESC } ]){\n    title,\n    author {\n      name\n    },\n    publishedAt\n    categories {\n      title\n    },\n    slug {\n      current\n    },\n    mainImage {\n      asset {\n        url\n        altText\n      }\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
