function Card(props) {
    return (
       <div className="card">
            <div className="favourite">
                <img src="/image/heart-unliked.svg" alt="unliked" />
            </div>
            <img width={133} height={112} src={props.imageUrl} alt="Sneakers"/>
            <h5>{props.name}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{props.price} руб.</b>
                </div>
                <button className="button">
                    <img width={11} height={11} src="/image/plus.svg" alt="Plus"/>
                </button>
            </div>
        </div> 
    )
} 
export default Card;
