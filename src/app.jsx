import axios from 'axios'
import { useState, useEffect } from 'preact/hooks'

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

    let [sub, setSub] = useState('all')
    let [posts, setPosts] = useState()
    let [post, setPost] = useState()

    useEffect(() => {
        Reddit.getPosts(sub).then(x => setPosts(x))
    }, [sub])

    return <>
        <div className='row'>
            <div className='col'>
                <div className='row'>
                    <span>r/</span><input type='text' defaultValue={sub} onKeyDown={e => e.key == 'Enter' ? setSub(e.currentTarget.value) : null} />
                </div>
                {posts?.data?.children?.map(x =>
                    <div className='row' onClick={() => Reddit.getPost(x?.data?.permalink).then(x => setPost(x))} >
                        <div className='col'>
                            <img src={x?.data?.thumbnail} alt='' />
                        </div>
                        <div className='col'>
                            <div className='row'>
                                <div> {x?.data?.title} </div>
                            </div>
                            <div className='row'>
                                <div> r/{x?.data?.subreddit} </div>
                                <div> u/{x?.data?.author} </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='col'>
                {post?.[1]?.data?.children?.map(x =>
                    <Comment data={x?.data} indent={2} />
                )}
            </div>
        </div>
    </>
}

function Comment({ data, indent }) {
    return <>
        <div style={{ marginLeft: indent + 2 }}> {data?.body} </div>
        {data?.replies && <>
            <div>
                <Comment data={data?.replies?.data} indent={indent + 2} />
            </div>
        </>}
    </>
}
