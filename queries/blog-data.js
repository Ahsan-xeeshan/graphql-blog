import { getClient } from "@/lib/graphQLClient";
import { gql } from "graphql-request";

export const getAllPosts = async (tags, after) => {
  const client = getClient();

  const data = await client.request(
    gql`
      query allPosts($tags: [ObjectId!], $after: String) {
        publication(host: "blog.greenroots.info") {
          posts(first: 20, filter: { tags: $tags }, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                author {
                  name
                  profilePicture
                }
                title
                subtitle
                brief
                slug
                coverImage {
                  url
                }
                tags {
                  name
                  slug
                  id
                }
                publishedAt
                readTimeInMinutes
              }
            }
          }
        }
      }
    `,
    { tags: tags, after: after }
  );

  // Return the complete posts object instead of just edges.
  return data.publication.posts;
};

export const getPost = async (slug) => {
  const client = getClient();

  const data = await client.request(
    gql`
      query postDetails($slug: String!) {
        publication(host: "blog.greenroots.info") {
          post(slug: $slug) {
            author {
              name
              profilePicture
            }
            publishedAt
            title
            subtitle
            readTimeInMinutes
            content {
              html
            }
            tags {
              name
              slug
              id
            }
            coverImage {
              url
            }
          }
        }
      }
    `,
    { slug: slug }
  );

  return data.publication.post;
};
