import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Post } from './Post'
import { Subreddit } from './Subreddit'

export function App() {
    return (
        <BrowserRouter>
            <div className='container mx-auto'>
                <div className='m-2'>
                    <div className='row m-2 text-xl justify-center'>
                        <Link to='/'>Rapid Reddit</Link>
                    </div>
                    <Routes>
                        <Route path='/' element={<Subreddit />} />
                        <Route path='/r/:subreddit' element={<Subreddit />} />
                        <Route path='/r/:subreddit/:id' element={<Post />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}
