import axios from 'axios'

export const Reddit = {
    subreddit: async function (subName: string, sort: string, sortRange: string) {
        let url = 'https://www.reddit.com/r/' + subName
        if (sort != 'hot') {
            url += '/' + sort
        }
        url += '.json'
        let params
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
        let x = await axios.get(url, { params })
        return x.data
    },
    post: async function (id: string, sort: string) {
        let params
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
        let x = await axios.get(`https://www.reddit.com/${id}.json`, { params })
        return x.data
    }
}
