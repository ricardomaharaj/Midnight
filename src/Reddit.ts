import useSWR from 'swr'
import axios from 'axios'

export function useSubreddit({ subreddit, sort, t }: any) {
    if (!sort) sort = 'hot'

    let url = `https://www.reddit.com/r/${subreddit}/${sort}.json?raw_json=1`

    if (sort === 'top' || sort === 'controversial') {
        url += `&t=${t}`
    }

    let { data } = useSWR<any>(url, (url) => axios.get(url).then((x) => x.data))
    return { posts: data?.data?.children }
}

export function usePost({ id, sort }: any) {
    if (!sort) sort = 'hot'

    let url = `https://www.reddit.com/${id}.json?sort=${sort}`

    let { data } = useSWR<any>(url, (url) => axios.get(url).then((x) => x.data))

    return { post: data }
}
