import React from 'react';
import styles from './Card.module.scss';

function Card({ id, name, imageUrl, price, onFavorite, onPlus, favorited = false }) {
    const [isAdded, setIsAdded] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    const handleOnClick = () => {
        onPlus({id, name, imageUrl, price});
        setIsAdded(!isAdded);
    };

    const onClickFavorite = () => {
        onFavorite({id, name, imageUrl, price});
        setIsFavorite(!isFavorite);
    };

    return (
       <div className={styles.card}>
            <div className={styles.favorite} onClick={onClickFavorite}>
                <img src={isFavorite ? '/image/heart-liked.svg' : "/image/heart-unliked.svg"} alt="unliked" />
            </div>
            <img width={133} height={112} src={imageUrl} alt="Sneakers"/>
            <h5>{name}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <img className={styles.plus} onClick={handleOnClick} src={isAdded ? "/image/btn-checked.svg" : "/image/btn-plus.svg"} alt="Plus"/>
            </div>
        </div> 
    )
} 
export default Card;
