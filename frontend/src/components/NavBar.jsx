import { Link } from "react-router"
function NavBar() {
    return (
        <ul>
            <Link to={'/'}>Home</Link>
            <Link to={'/create'}>Create Polls</Link>
        </ul>
    )
}

export default NavBar