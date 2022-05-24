function Drawer({onClose, items = []}) {
    return (
        <div className="overlay">
            <div className="drawer">
              <h2 className="d-flex mb-30 justify-between">Корзина
              <img onClick={onClose} className="removeBtn cu-p" src="/image/btn-remove.svg" alt="Close" /></h2>

              <div className="items">
                {items.map((obj) => (
                  <div className="cartItem d-flex align-center mb-20">
                  <div style={{backgroundImage: `url(${obj.imageUrl})`}} className="cartItemImg"></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.name}</p>
                    <b>{obj.price}</b>
                  </div>
                  <img className="removeBtn" src="/image/btn-remove.svg" alt="Remove" />
                </div>
                ))}
              </div>

              <div className="cartTotalBlock">
                <ul>
                  <li className="d-flex">
                    <span>Итого:</span>
                    <div></div>
                    <b>21 498 руб.</b>
                  </li>
                  <li className="d-flex">
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>1074 руб.</b>
                  </li>
                </ul>
                <button className="greenButton">Оформить заказ <img src="/image/arrow.svg" alt="Arrow" /></button>
              </div>

            </div>
        </div>
    )
}
export default Drawer;