import Logo from "../../images/S.png";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Search from "./Search";


const Header = () => {
  return (
    <div className="header bg-light">
      <nav className="navbar navbar-expand-lg navbar-light 
        bg-light justify-content-between align-middle">
        <Link className="navbar-brand" to="/">
            <img src={Logo} alt="" style={{ width: "60px", height: "50px"}}
            onClick={()=>window.scrollTo({top:0})} />
            <h2>SAFE SPACE</h2>
        </Link>

        
        <Search />
        
        <Menu />
      </nav>
    </div>
  );
};

export default Header;
