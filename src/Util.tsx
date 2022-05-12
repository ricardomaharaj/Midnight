export function Row(props: { children: any }) {
    return <div className='flex flex-row'>
        {props.children}
    </div>
}

export function Column(props: { children: any }) {
    return <div className='flex flex-col'>
        {props.children}
    </div>
}
