import { Header } from './comps/header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import * as Urql from 'urql'
import { Home } from './comps/home'
import { Subreddit } from './comps/subreddit'
import { Post } from './comps/post'

const url =
  process.env.NODE_ENV === 'production'
    ? 'https://r8r-gql.herokuapp.com/'
    : 'http://localhost:4000/'

const urqlClient = Urql.createClient({ url })

export function App() {
  return (
    <>
      <BrowserRouter>
        <Urql.Provider value={urqlClient}>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/r/:subName' element={<Subreddit />} />
            <Route path='/r/:subName/:id' element={<Post />} />
          </Routes>
        </Urql.Provider>
      </BrowserRouter>
    </>
  )
}
