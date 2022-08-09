import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { usePost } from './Reddit'
import MarkDown from 'react-markdown'

export function Post() {
    let { id } = useParams()
    let [params, setParams] = useSearchParams()
    let sort = params.get('sort') || 'hot'

    let { post } = usePost({ id, sort })

    let header = post?.[0]?.data?.children?.[0]?.data
    let comments = post?.[1]

    return (
        <>
            {post ? (
                <>
                    <div className='col'>
                        <div className='row text-sm text-stone-300'>
                            <span>{header.score}</span>
                            <Link
                                className='hover:text-stone-400'
                                to={`/r/${header.subreddit}`}
                            >
                                r/{header.subreddit}
                            </Link>
                            <span>{header.author}</span>
                            <span>
                                {new Date(
                                    header.created_utc * 1000
                                ).toDateString()}
                            </span>
                        </div>
                        <div className='row'>
                            <a href={header?.url} target='_blank'>
                                <span>{header.title}</span>
                            </a>
                        </div>
                        {header?.is_self && (
                            <MarkDown children={header?.selftext} />
                        )}
                        <div className='row'>
                            {['new', 'hot', 'top', 'controversial'].map(
                                (x, i) => (
                                    <span
                                        className={`${
                                            x === sort && 'text-stone-400'
                                        }`}
                                        onClick={() => setParams({ sort: x })}
                                        key={i}
                                    >
                                        {x}
                                    </span>
                                )
                            )}
                        </div>
                        <hr />

                        <Kind data={comments?.data} kind={comments?.kind} />
                    </div>
                </>
            ) : (
                <div className='loader'></div>
            )}
        </>
    )
}

function Kind({ data, kind }: any) {
    if (kind === 'Listing') {
        return <Listing children={data?.children} />
    }

    if (kind === 't1') {
        return <Comment data={data} />
    }

    return <></>
}

function Listing({ children }: any) {
    return (
        <>
            {children?.map((x: any, i: number) => (
                <Kind data={x?.data} kind={x?.kind} key={i} />
            ))}
        </>
    )
}

function Comment({ data }: any) {
    let [fold, setFold] = useState(data?.stickied ? true : false)

    return (
        <>
            <div className='border-l-[0.5px] border-stone-400'>
                <div className='pl-2 my-2'>
                    <div
                        className='row text-sm text-stone-400'
                        onClick={() => setFold(!fold)}
                    >
                        <span>{data?.score}</span>
                        <span>u/{data?.author}</span>
                        <span>
                            {new Date(data?.created_utc * 1000).toDateString()}
                        </span>
                    </div>
                    {!fold && <MarkDown children={data?.body} />}
                    {!fold && data?.replies && (
                        <Kind
                            data={data?.replies?.data}
                            kind={data?.replies?.kind}
                        />
                    )}
                </div>
            </div>
        </>
    )
}
