import { useState } from 'react'
import { useParams } from 'react-router-dom'
import MarkDown from 'react-markdown'

import { useSubredditPost } from '../gql'
import { setTitle } from '../util/setTitle'

export function Post() {
  const params = useParams()
  const id = params.id || ''
  const { post, comments, fetching, error } = useSubredditPost({ id })

  setTitle(post?.title)

  if (fetching) return <div className='spinner' />

  if (error) return <div>{error.message}</div>

  return (
    <>
      <div className='col mb-2 p-2'>
        <div className='row mb-1'>
          <div className='subtext mr-2 text-sm'>r/{post?.subreddit}</div>
          <div className='subtext text-sm'>u/{post?.author}</div>
        </div>
        <div className='row'>
          <div>{post?.title}</div>
        </div>
      </div>
      <div className='col space-y-2'>
        {comments?.map(({ data }: any) => (
          <CommentCard data={data} key={data?.id} />
        ))}
      </div>
    </>
  )
}

function CommentCard(props: any) {
  const { data } = props
  const [fold, setFold] = useState(false)
  return (
    <>
      <div className='col bg1 p-2'>
        <div className='row mb-1 justify-between'>
          <div className='subtext text-sm'>u/{data?.author}</div>
          <div className='subtext text-sm'>{data?.score}</div>
        </div>
        <div onClick={() => setFold(!fold)} className='col space-y-2'>
          <MarkDown>{fold ? '...' : data?.body}</MarkDown>
        </div>
      </div>
    </>
  )
}
