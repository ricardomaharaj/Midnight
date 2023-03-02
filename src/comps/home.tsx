import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { defaultSubs } from '../consts'
import { useLocalStorage } from '../hooks/ls'
import { setTitle } from '../util/setTitle'

export function Home() {
  const [subs, setSubs] = useLocalStorage<string[]>('subs', defaultSubs)
  const [editMode, setEditMode] = useState(false)
  const subRedditRef = useRef<HTMLInputElement>(null)

  setTitle()

  function removeSub(sub: string) {
    const i = subs.findIndex((x) => x === sub)
    subs.splice(i, 1)
    setSubs([...subs])
  }

  function addSub(sub: string) {
    if (!sub) return
    const i = subs.findIndex((x) => x === sub)
    if (i === -1) {
      subs.push(sub)
      setSubs([...subs])
    }
  }

  function addSubClicked() {
    const val = subRedditRef.current!.value
    if (!val) return
    addSub(val)
    subRedditRef.current!.value = ''
  }

  return (
    <>
      <div className='col space-y-3'>
        {subs.map((sub) => (
          <SubCard
            sub={sub}
            editMode={editMode}
            onDelete={() => removeSub(sub)}
            key={sub}
          />
        ))}

        <div className='col'>
          <div className='row justify-end'>
            <input
              type='text'
              id='subName'
              ref={subRedditRef}
              placeholder='subreddit'
              className='bg2 pr-2 text-right outline-none'
            />
            <button onClick={addSubClicked} className='bg1 px-2 py-1'>
              ADD SUB
            </button>
          </div>
        </div>
        <div className='row justify-end'>
          <button
            onClick={() => setEditMode(!editMode)}
            className='bg1 py-1 px-3'
          >
            {editMode ? 'DONE' : 'DELETE SUBS'}
          </button>
        </div>
      </div>
    </>
  )
}

function SubCard(props: {
  sub: string
  editMode: boolean
  onDelete: Function
}) {
  const { sub, editMode, onDelete } = props
  return (
    <>
      <div className='row bg1 justify-between p-2'>
        <Link className='w-full' to={`/r/${sub}`}>
          {sub}
        </Link>
        {editMode && <button onClick={() => onDelete()}>DELETE</button>}
      </div>
    </>
  )
}
