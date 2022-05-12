import * as Urql from 'urql'
import { Home } from './Home'
import * as Router from 'react-router-dom'
import { Post } from './Post'

let url = 'http://localhost:4000/gql'
if (process.env.NODE_ENV === 'production') url = '/gql'
const UrqlClient = Urql.createClient({ url })

export function App() {
    return <>
        <Router.BrowserRouter>
            <Urql.Provider value={UrqlClient}>
                <Router.Routes>
                    <Router.Route path='/' element={<Home />} />
                    <Router.Route path='/post/:sub/:postID' element={<Post />} />
                </Router.Routes>
            </Urql.Provider>
        </Router.BrowserRouter>
    </>
}
