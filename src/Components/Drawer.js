import React from 'react';
import axios from 'axios';

import Info from './info';
import { useCart } from '../hooks/useCart';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({onClose, onRemove, items = []}) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      // Создаем заказ
      const { data } = await axios.post('https://628bd4d3667aea3a3e36fc1d.mockapi.io/orders', {
        items: cartItems,
      });
  
      setOrderId(data.id);
      //Заказ создан
      setIsOrderComplete(true);
      // Очищаем корзину в state
      setCartItems([]);

      // Очищаем корзину mockApi
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://628bd4d3667aea3a3e36fc1d.mockapi.io/Cart/' + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert('Ошибка при создании заказа :(')
    }
    setIsLoading(false);
  };

    return (
        <div className="overlay">
            <div className="drawer">
              <h2 className="d-flex mb-30 justify-between">
                Корзина <img onClick={onClose} className="removeBtn cu-p" src="/image/btn-remove.svg" alt="Close" />
              </h2>

              {
                items.length > 0 ? (
                <div className="d-flex flex-column flex">
                  <div className="items">
                    {items.map((obj) => (
                      <div key={obj.id} className="cartItem d-flex align-center mb-20">
                      <div style={{backgroundImage: `url(${obj.imageUrl})`}} className="cartItemImg"></div>
                      <div className="mr-20 flex">
                      <p className="mb-5">{obj.title}</p>
                      <b>{obj.price}</b>
                    </div>
                    <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/image/btn-remove.svg" alt="Remove" />
                  </div>
                  ))}
              </div>
              <div className="cartTotalBlock">
                <ul>
                  <li className="d-flex">
                    <span>Итого:</span>
                    <div></div>
                    <b>{totalPrice} руб.</b>
                  </li>
                  <li className="d-flex">
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>{Math.round(totalPrice  * 0.05)} руб.</b>
                  </li>
                </ul>
                <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ <img src="/image/arrow.svg" alt="Arrow" /></button>
              </div>
              </div>
                ) : (
                  <Info 
                  title={isOrderComplete ? 'Заказ формлен' : 'Корзина пустая'} 
                  description={isOrderComplete ? `Заказ оформлен! Ваш заказ #${orderId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'} 
                  image={isOrderComplete ? '/image/complete-order.jpg' : '/image/empty-cart.jpg'}
                  />
                )}

            </div>
        </div>
    )
}
export default Drawer;