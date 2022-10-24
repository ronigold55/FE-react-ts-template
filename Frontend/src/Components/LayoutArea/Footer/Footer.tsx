import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <div className="Footer">
			<p>&copy; All right reserved Rachel Rozental {(new Date()).getFullYear()}</p> 
        </div>
    );
}

export default Footer;
