import { useSubredditQuery } from './Types'
import { Column, Row } from './Util'

interface SubredditProps { sub: string }
export function Subreddit({ sub }: SubredditProps) {
    let [res] = useSubredditQuery({ sub })
    let { data, fetching, error } = res
    if (fetching) return <> loading... </>
    if (error) return <> {error.message} </>
    return <>
        {data?.subreddit?.data?.children?.map(({ data }, i) =>
            <Row key={i}>
                {data?.preview?.enabled && <Column>
                    <img src={data?.preview.images?.[0].source?.url} className='' alt="" />
                </Column>}
                <Column>
                    <div> r/{data?.subreddit} </div>
                    <div> {data?.title} </div>
                </Column>
            </Row>
        )}
    </>
}
