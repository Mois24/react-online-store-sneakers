import React from 'react';
import ContentLoader from "react-content-loader";

import AppContext from '../../context';
import styles from './Card.module.scss';

function Card({ 
    id, 
    title, 
    imageUrl, 
    price, 
    onFavorite, 
    onPlus, 
    favorited = false, 
    loading = false,
}) {
    const { isItemAdded } = React.useContext(AppContext);// из объекта AppContext вытягиваем функцию isItemAdded
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    const handleOnClick = () => {
        onPlus({id, title, imageUrl, price});
    };

    const onClickFavorite = () => {
        onFavorite({id, title, imageUrl, price});
        setIsFavorite(!isFavorite);
    };

    return (
       <div className={styles.card}>
        {
            loading ?  (<ContentLoader 
                speed={2}
                width={165}
                height={250}
                viewBox="0 0 155 265"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="1" y="0" rx="10" ry="10" width="155" height="155" /> 
                <rect x="0" y="165" rx="3" ry="3" width="155" height="15" /> 
                <rect x="0" y="190" rx="3" ry="3" width="100" height="15" /> 
                <rect x="1" y="230" rx="3" ry="3" width="80" height="25" /> 
                <rect x="115" y="225" rx="10" ry="10" width="35" height="32" />
            </ContentLoader>) : (
                <>
                    <div className={styles.favorite} onClick={onClickFavorite}>
                    <img src={isFavorite ? '/image/heart-liked.svg' : "/image/heart-unliked.svg"} alt="unliked" />
                    </div>
                    <img width='100%' height={135} src={imageUrl} alt="Sneakers"/>
                    <h5>{title}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <span>Цена:</span>
                            <b>{price} руб.</b>
                        </div>
                        <img className={styles.plus} 
                        onClick={handleOnClick} 
                        // Здесь проверяем, если id есть в cartItems - тогда true, если нет id - false
                        src={isItemAdded(id) ? "/image/btn-checked.svg" : "/image/btn-plus.svg"} alt="Plus"/>
                    </div>
                </>
                )
            } 
        </div>
    )
} 
export default Card;
