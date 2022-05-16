import axios from 'axios'
import all from './all.json'
import post from './post.json'

const Reddit = {
    getPosts: async function (sub) {
        let x = await axios.get(`https://www.reddit.com/r/${sub}.json`, { params: { raw_json: 1 } })
        return x.data
    },
    getPost: async function (url) {
        let x = await axios.get(`https://www.reddit.com/${url}.json`, { params: { raw_json: 1 } })
        return x.data
    }
}

export function App() {
    return <>
        <div className='row'>
            <div className='col'>
                <Kind data={all.data} kind={all.kind} />
            </div>
            <div className='col'>
                <Kind kind={post?.[1]?.kind} data={post?.[1]?.data} />
            </div>
        </div>
    </>
}

function Kind({ kind, data }) {
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

function Listing({ data }) {
    return <>
        {data?.children?.map(x => <Kind data={x?.data} kind={x?.kind} />)}
    </>
}

function Post({ data }) {
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

function Comment({ data }) {
    return <>
        <div>
            <div> u/{data?.author} </div>
            <div> {data?.body} </div>
            {data?.replies && <Kind data={data?.replies?.data} kind={data?.replies?.kind} />}
        </div>
    </>
}
