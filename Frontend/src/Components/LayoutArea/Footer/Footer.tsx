import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <div className="Footer">
			<p>&copy; Rachel Rozental All right reserved {(new Date()).getFullYear()}</p> 
        </div>
    );
}

export default Footer;
