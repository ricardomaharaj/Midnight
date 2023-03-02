import { useParams, Link } from 'react-router-dom'

import { useSubreddit } from '../gql'
import { setTitle } from '../util/setTitle'

export function Subreddit() {
  const params = useParams()
  const subName = params.subName || ''
  const { posts, fetching, error } = useSubreddit({ subName })

  setTitle(subName)

  if (fetching) return <div className='spinner' />

  if (error) return <div>{error.message}</div>

  return (
    <>
      <div className='col space-y-3'>
        {posts?.map(({ data }: any) => (
          <PostCard data={data} key={data?.id} />
        ))}
      </div>
    </>
  )
}

function PostCard(props: any) {
  const data = props.data
  return (
    <>
      <Link to={`${data?.id}`} className='col bg1 w-full p-2'>
        <div className='row w-full justify-between'>
          <div className='row mb-1'>
            <div className='subtext mr-2 text-sm'>r/{data?.subreddit}</div>
            <div className='subtext text-sm'>u/{data?.author}</div>
          </div>
          <div className='subtext text-sm'>{data?.score}</div>
        </div>
        <div className='row w-full'>
          <div>{data?.title}</div>
        </div>
      </Link>
    </>
  )
}
