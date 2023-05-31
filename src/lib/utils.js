import { HiXMark } from 'react-icons/hi2'

export const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    if (date) {
        return new Date(date).toLocaleString('uk-UA', options)
    }
    return <HiXMark/>
}