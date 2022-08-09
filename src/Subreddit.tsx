import { useEffect } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { useSubreddit } from './Reddit'

export function Subreddit() {
    let { subreddit } = useParams()
    if (!subreddit) subreddit = 'all'
    let [params, setParams] = useSearchParams()

    let sort = params.get('sort')
    let t = params.get('t')

    useEffect(() => {
        if (!sort) {
            setParams({ sort: 'hot' })
        } else if (sort === 'top') {
            if (!t) {
                setParams({ sort: 'top', t: 'week' })
            }
        }
    }, [sort, t])

    let { posts } = useSubreddit({ subreddit, sort, t })

    return (
        <>
            <div className='col'>
                <div className='row text-lg justify-center'>r/{subreddit}</div>
                <div className='row'>
                    {['new', 'hot', 'top', 'controversial'].map((x, i) => (
                        <span
                            className={`${sort === x && 'text-stone-400'}`}
                            onClick={() => {
                                if (x === 'top' || x === 'controversial') {
                                    setParams({ sort: x, t: 'week' })
                                } else {
                                    setParams({ sort: x })
                                }
                            }}
                            key={i}
                        >
                            {x}
                        </span>
                    ))}
                </div>
                <div className='row'>
                    {(sort === 'top' || sort === 'controversial') && (
                        <>
                            {[
                                'hour',
                                'day',
                                'week',
                                'month',
                                'year',
                                'all'
                            ].map((x, i) => (
                                <span
                                    className={`${x === t && 'text-stone-400'}`}
                                    onClick={() =>
                                        setParams({ sort: sort!, t: x })
                                    }
                                    key={i}
                                >
                                    {x}
                                </span>
                            ))}
                        </>
                    )}
                </div>
                <hr />
                {posts ? (
                    <>
                        {posts?.map(({ data }: any, i: number) => (
                            <div className='row' key={i}>
                                <div className='col'>
                                    <div className='row text-sm text-stone-300'>
                                        <span>{data?.score}</span>
                                        <Link
                                            to={`/r/${data?.subreddit}`}
                                            className='hover:text-stone-400'
                                        >
                                            r/{data?.subreddit}
                                        </Link>
                                        <span>u/{data?.author}</span>
                                        <span>
                                            {new Date(
                                                data?.created_utc * 1000
                                            ).toDateString()}
                                        </span>
                                    </div>
                                    <div className='row'>
                                        <Link
                                            className='hover:text-stone-400'
                                            to={`/r/${data?.subreddit}/${data?.id}`}
                                        >
                                            {data?.title}
                                        </Link>
                                    </div>
                                    <div className='row'>
                                        {data?.thumbnail && (
                                            <Thumbnail data={data} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className='loader' />
                )}
            </div>
        </>
    )
}

function Thumbnail({ data }: any) {
    let { thumbnail } = data
    let url = getMediaUrl(data)
    if (thumbnail) {
        if (thumbnail === 'self') {
            return <></>
        }
        if (thumbnail === 'nsfw') {
            return <></>
        }
        if (thumbnail.startsWith('http')) {
            return (
                <>
                    <a href={url} target='_blank'>
                        <img src={thumbnail} />
                    </a>
                </>
            )
        }
    }
    return <></>
}

function getMediaUrl(data: any) {
    if (data?.is_video) {
        if (data?.media?.reddit_video) {
            return data?.media?.reddit_video?.fallback_url
        }
    }
    if (data?.preview?.reddit_video_preview?.fallback_url) {
        return data?.preview?.reddit_video_preview?.fallback_url
    }
    return data?.url
}
