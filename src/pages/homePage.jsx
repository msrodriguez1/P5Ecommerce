import './homePage.css'

import {Link} from 'react-router-dom'


export const HomePage = () => {
  return (
    <div className="mainPage">              
    <h4 className="title1">LE LABO</h4>

<Link to={`/catalogo`}>
  
    <img className="moai" src="src/assets/portada2.jpeg" ></img>
    </Link>
    <h6 className="title">perfumería artesanal</h6>
      </div>
  )
}


