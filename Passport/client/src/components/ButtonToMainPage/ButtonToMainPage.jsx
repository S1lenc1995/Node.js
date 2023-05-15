import { Link } from "react-router-dom";

const ButtonToMainPage = () =>{

    return(
        <Link to={'/posts'}>
        <button>Main page</button>
        </Link>
    )
}
export default ButtonToMainPage