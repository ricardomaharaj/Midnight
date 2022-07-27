import axios from 'axios'
import useSWR from 'swr'

export function useSubreddit(subName: string, sort: string, sortRange: string) {
    let url = 'https://www.reddit.com/r/' + subName
    if (sort != 'hot') {
        url += '/' + sort
    }
    url += '.json'
    let params: any
    if (sort === 'top') {
        params = {
            raw_json: 1,
            t: sortRange
        }
    } else {
        params = {
            raw_json: 1
        }
    }
    let { data, error } = useSWR(url, (url) =>
        axios.get(url, { params }).then((x) => x.data)
    )

    return {
        subreddit: data,
        subError: error
    }
}

export function usePost(id: string, sort: string) {
    let url = `https://www.reddit.com/${id}.json`
    let params: any
    if (sort !== 'best') {
        params = {
            raw_json: 1,
            sort
        }
    } else {
        params = {
            raw_json: 1
        }
    }
    let { data, error } = useSWR(url, (url) =>
        axios.get(url, { params }).then((x) => x.data)
    )

    return {
        post: data,
        postError: error
    }
}
