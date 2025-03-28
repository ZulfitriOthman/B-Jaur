import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>Copyright © {new Date().getFullYear()} All rights reserved | Powered by <a href="https://360geoinfo.com">360GeoInfo</a></p>
      <p></p>
    </footer>
  );
};

export default Footer;
