import { useState } from 'react'
import { Subreddit } from './Subreddit'
import { Row, Column } from './Util'

export function Home() {

    let [sub, setSub] = useState('all')

    return <Column>
        <Row>
            <input type='text' onKeyDown={e => e.key === 'Enter' ? setSub(e.currentTarget.value) : null} />
        </Row>
        <Subreddit sub={sub} />
    </Column>
}
