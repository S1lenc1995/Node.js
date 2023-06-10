import { Link } from "react-router-dom";

const Header = ()=>{
    return(
        <Link to={'/seatings'}>
            <button>Setings</button>
        </Link>
        
    )
}
export default Header