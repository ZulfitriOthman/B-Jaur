import { Link } from "react-router-dom";
import './CafeNavbar.css'; 
import BJaurRoundLogo from "../../../../assets/BJaurRoundLogo.png";


const CafeNavbar = () => {
  return (
    <nav className="cafeNav-background">
        <div className="cafeNav-logo">
            <img src={BJaurRoundLogo} alt="B-Jaur Logo" className="b-jaurRoundLogo" />
            <h1 className="cafeNav-title">B-Jaur</h1>
        </div>
        <div className="cafeNav-list">
            <Link to="/">Home</Link>
            <Link to="/cafes">Cafes</Link>
            <Link to="/lifestyle">Lifestyle</Link>
            <Link to="/ramadhan">Ramadhan</Link>
        </div>
    </nav>
  );
};

export default CafeNavbar;
