import { Link } from "react-router"
function NavBar() {
    return (
        <ul>
            <Link to={'/'}>Home</Link>
            <Link to={'/create'}>Create Polls</Link>
            <Link to={'/polls/:id'}>Poll Page</Link>
            <Link to={'/results'}>Results</Link>
        </ul>
    )
}

export default NavBar