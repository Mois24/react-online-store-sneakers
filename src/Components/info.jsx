import React from 'react'
import AppContext from '../context';

export const Info = ({ title, image, description }) => {
    const { setCartOpened } = React.useContext(AppContext);
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
        <img className="mb-20" width="120px"  src={image} alt="Empty Cart" />
        <h2>{title}</h2>
        <p className="opacity-6 text-center">{description}</p>
        <button onClick= {() => setCartOpened(false)} className="greenButton">
        <img className="mr-20" src="/image/arrow_left.svg" alt="Arrow"/>
        Вернуть назад
        </button>
    </div>
  )
}

export default Info;
