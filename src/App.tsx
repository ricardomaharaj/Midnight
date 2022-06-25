import axios from 'axios'
import { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Routes, useParams } from 'react-router-dom'

const Reddit = {
    getPosts: async function (sub: string) {
        let x = await axios.get(`https://www.reddit.com/r/${sub}/top.json`, { params: { raw_json: 1 } })
        return x.data
    },
    getPost: async function (url: string) {
        let x = await axios.get(`https://www.reddit.com/${url}.json`, { params: { raw_json: 1, sort: 'top' } })
        return x.data
    }
}

export function App() {
    return <>
        <BrowserRouter>
            <div className='container mx-auto'>
                <div className='p-8 text-center text-2xl'>
                    <div> Rapid Reddit </div>
                </div>
                <Routes>
                    <Route path='/' element={<Subreddit />} />
                    <Route path='/r/:sub' element={<Subreddit />} />
                    <Route path='/r/:sub/comments/:id/:path' element={<ViewPost />} />
                </Routes>
            </div>
        </BrowserRouter>
    </>
}

function ViewPost() {

    let { sub, id, path } = useParams()
    let [post, setPost] = useState<any>()

    useEffect(() => {
        Reddit.getPost(`r/${sub}/comments/${id}/${path}`).then(x => setPost(x))
    }, [])

    return <>
        <div className='col'>
            <Kind kind={post?.[0]?.kind} data={post?.[0]?.data} />
            <Kind kind={post?.[1]?.kind} data={post?.[1]?.data} />
        </div>
    </>
}

function Subreddit() {

    let { sub } = useParams()
    let [posts, setPosts] = useState<any>()

    useEffect(() => {
        Reddit.getPosts(sub || 'all').then(x => setPosts(x))
    }, [sub])

    return <>
        <div className='col space-y-2'>
            <Kind data={posts?.data} kind={posts?.kind} />
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
        {data?.children?.map((x: any, i: number) => <Kind key={i} data={x?.data} kind={x?.kind} />)}
    </>
}

function Post({ data }: any) {
    return <>
        <div className='row bg-stone-800 rounded-xl p-4 space-x-2'>
            <div className='col'>
                <img src={data?.thumbnail} alt='' />
            </div>
            <div className='col'>
                <div className='row'>
                    <Link to={`${data?.permalink}`}> {data?.title} </Link>
                </div>
                <div className='row space-x-2'>
                    <Link to={`/r/${data?.subreddit}`}> r/{data?.subreddit} </Link>
                    <div> u/{data?.author} </div>
                </div>
            </div>
        </div>
    </>
}

function Comment({ data }: any) {

    let [fold, setFold] = useState<boolean>(false)

    return <>
        <div className='m-2 border-l-[0.5px] border-white pl-2 '>
            <div className='row space-x-2'>
                <div> u/{data?.author} </div>
                <div className='text-sm'> {data?.score} </div>
            </div>
            <div onClick={() => setFold(!fold)}> {data?.body} </div>
            {(data?.replies && !fold) && <Kind data={data?.replies?.data} kind={data?.replies?.kind} />}
        </div>
    </>
}
