import { gql, useQuery } from 'urql'

export function useSubreddit(args: { subName: string }) {
  const { data, fetching, error } = useQuery({
    query: gql`
      query ($subName: String) {
        subreddit(subName: $subName)
      }
    `,
    variables: { ...args }
  })[0]

  return {
    posts: data?.subreddit?.data?.children,
    fetching,
    error
  }
}

export function useSubredditPost(args: { id: string }) {
  const { data, fetching, error } = useQuery({
    query: gql`
      query ($id: String) {
        subredditPost(id: $id)
      }
    `,
    variables: { ...args }
  })[0]

  return {
    post: data?.subredditPost?.[0]?.data?.children?.[0]?.data,
    comments: data?.subredditPost?.[1]?.data?.children,
    fetching,
    error
  }
}
