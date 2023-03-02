import { Link } from 'react-router-dom'

import { appName } from '../consts'

export function Header() {
  return (
    <>
      <Link to='/' className='row mx-auto my-3'>
        <div className='text-2xl'>{appName}</div>
      </Link>
    </>
  )
}
