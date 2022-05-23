import axios from 'axios'
import { useEffect, useState } from 'react'

const Reddit = {
    getPosts: async function (sub: string) {
        let x = await axios.get(`https://www.reddit.com/r/${sub}.json`, { params: { raw_json: 1 } })
        return x.data
    },
    getPost: async function (url: string) {
        let x = await axios.get(`https://www.reddit.com/${url}.json`, { params: { raw_json: 1 } })
        return x.data
    }
}

export function App() {

    let [posts, setPosts] = useState<any>()

    let [post, setPost] = useState<any>()

    useEffect(() => {
        Reddit.getPosts('all').then(x => setPosts(x))
    })
    
    return <>
        <div className='row'>
            <div className='col'>
                <Kind data={posts.data} kind={posts.kind} />
            </div>
            <div className='col'>
                <Kind kind={post?.[1]?.kind} data={post?.[1]?.data} />
            </div>
        </div>
    </>
}

function Kind({ kind, data }: any) {
    switch (kind) {
        case 'Listing':
            return <Listing data={data} />
        case 't1':
            return <Comment data={data} />
        case 't3':
            return <Post data={data} />
        default:
            return <></>
    }
}

function Listing({ data }: any) {
    return <>
        {data?.children?.map(x => <Kind data={x?.data} kind={x?.kind} />)}
    </>
}

function Post({ data }: any) {
    return <>
        <div className='row'>
            <div className='col'>
                <img src={data?.thumbnail} alt='' />
            </div>
            <div className='col'>
                <div className='row'>
                    <div> {data?.title} </div>
                </div>
                <div className='row'>
                    <div> r/{data?.subreddit} </div>
                    <div> u/{data?.author} </div>
                </div>
            </div>
        </div>
    </>
}

function Comment({ data }: any) {
    return <>
        <div>
            <div> u/{data?.author} </div>
            <div> {data?.body} </div>
            {data?.replies && <Kind data={data?.replies?.data} kind={data?.replies?.kind} />}
        </div>
    </>
}
