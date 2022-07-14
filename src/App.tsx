import { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Routes, useParams } from 'react-router-dom'
import { Reddit } from './Reddit'
import MarkDown from 'react-markdown'

type State = {
    selected_subreddit: string
    subreddit_sort: string
    subreddit_sort_range: string,
    post_sort: string,
    selected_subreddit_posts?: any[]
}

type Props = {
    state: State
    updateState: (update: Partial<State>) => void
}

export function App() {

    let [state, setState] = useState<State>({
        selected_subreddit: 'askreddit',
        post_sort: 'top',
        subreddit_sort: 'top',
        subreddit_sort_range: 'week'
    })

    let updateState = (update: Partial<State>) => { setState({ ...state, ...update }) }

    return <>
        <BrowserRouter>
            <div className='container mx-auto'>
                <Link to='/' className='p-2 text-center text-2xl'>
                    <div> Rapid Reddit </div>
                </Link>
                <Routes>
                    <Route path='/' element={<Subreddit state={state} updateState={updateState} />} />
                    <Route path='/:permalink' element={<ViewPost state={state} updateState={updateState} />} />
                </Routes>
            </div>
        </BrowserRouter>
    </>
}

function Subreddit({ state, updateState }: Props) {

    useEffect(() => {
        Reddit.subreddit(
            state.selected_subreddit,
            state.subreddit_sort,
            state.subreddit_sort_range
        ).then(x => updateState({ selected_subreddit_posts: x }))
    }, [
        state.selected_subreddit,
        state.subreddit_sort,
        state.subreddit_sort_range
    ])

    return <>
        <div className='col'>
            <div className='row'>
                <input type='text' defaultValue={state.selected_subreddit} onKeyDown={
                    e => e.key === 'Enter' ? updateState({ selected_subreddit: e.currentTarget.value }) : null
                } />
                <select defaultValue={state.subreddit_sort} onChange={e => updateState({ subreddit_sort: e.currentTarget.value })}>
                    {['hot', 'new', 'top'].map((x, i) => <option value={x} key={i}> {x} </option>)}
                </select>
                {state.subreddit_sort === 'top' && <>
                    <select defaultValue={state.subreddit_sort_range} onChange={e => updateState({ subreddit_sort_range: e.currentTarget.value })}>
                        {['hour', 'day', 'week', 'month', 'year'].map((x, i) => <option value={x} key={i}> {x} </option>)}
                    </select>
                </>}
            </div>
            {/* @ts-ignore */}
            <Kind data={state?.selected_subreddit_posts?.data} kind={state?.selected_subreddit_posts?.kind} />
        </div>
    </>
}

function ViewPost({ state, updateState }: Props) {

    let { permalink } = useParams()
    let [post, setPost] = useState<any>()
    let [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)
        Reddit.post(permalink!, state.post_sort).then(x => { setPost(x); setLoading(false) })
    }, [permalink, state.post_sort])

    return <>
        <div className='col'>
            <Kind kind={post?.[0]?.kind} data={post?.[0]?.data} />
            <div className='row'>
                <select defaultValue={state.post_sort} onChange={e => updateState({ post_sort: e.currentTarget.value })}>
                    {['best', 'top', 'new', 'controversial'].map((x, i) => <option value={x} key={i}> {x} </option>)}
                </select>
            </div>
            {loading ? <div className='spinner'></div> : <Kind kind={post?.[1]?.kind} data={post?.[1]?.data} />}
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
        <Link to={`/${data?.permalink?.replaceAll('/', '-')}`} className='row bg p-4'>
            <div className='col'>
                <div className='row subtext text-sm space-x-2'>
                    <div> {data?.score} </div>
                    <div> r/{data?.subreddit} </div>
                    <div> u/{data?.author} </div>
                    <div> {new Date(data?.created * 1000).toDateString().substring(4, 10)} </div>
                </div>
                <div className='row'>
                    <div> {data?.title} </div>
                </div>
            </div>
        </Link>
    </>
}

function Comment({ data }: any) {

    let [fold, setFold] = useState<boolean>(false)

    return <>
        <div className='bg border-l-[0.5px] border-stone-400 pl-2'>
            <div className='p-2'>
                <div onClick={() => setFold(!fold)} className='row subtext text-sm space-x-2'>
                    <div> u/{data?.author} </div>
                    <div> {data?.score} </div>
                    <div> {new Date(data?.created * 1000).toDateString().substring(4, 10)} </div>
                </div>
                {!fold && <MarkDown >{data?.body}</MarkDown>}
            </div>
            {(data?.replies && !fold) && <Kind data={data?.replies?.data} kind={data?.replies?.kind} />}
        </div>
    </>
}
