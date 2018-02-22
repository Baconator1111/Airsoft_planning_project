import React from 'react'
import { Link } from 'react-router-dom'

import './donateBtn.css'

export default function DonateBtn (){
    return (
        <Link to='/donate'><button>Donate Here</button></Link>
    )
}