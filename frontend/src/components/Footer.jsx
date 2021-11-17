import React from 'react'
import '../css/footer.css'
const Footer = () => {
    let curyear=new Date().getFullYear()
    return (
        <div className="footer">
            <p>Vet App Nako  ||  All Right Reserved</p>
            <p>Copyright © 2020-{curyear}</p>
        </div>
    )
}

export default Footer
