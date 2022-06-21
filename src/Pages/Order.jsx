import axios from 'axios';
import React from 'react';
import Card from '../Components/Card';
import AppContext from '../context';

function Orders() {
    const {onAddToFavorite, onAddToCart} = React.useContext(AppContext);
    //Используем локальный state вместо глобального из контекста
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
        // Создаем анонимную ассинхронную функцию и сразу же ее вызываем
        (async () => {
           try {
                const { data } = await axios.get('https://628bd4d3667aea3a3e36fc1d.mockapi.io/orders');
                // console.log(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setOrders(data.map((obj) => obj.items).flat());
                setIsLoading(false);
            } catch(error) {
                alert('Ошибка при запросе заказов');
                console.log(error);
            }
        })();
    }, []);
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
            <h1>Мои Заказы</h1>
        </div>
        
        <div className="d-flex flex-wrap">

          {(isLoading ? [...Array(10)] : orders).map((item, index) => (
              <Card 
                key={index}
                loading={isLoading}
                {...item}
          />
          ))}
        </div>
      </div>
    )
}

export default Orders;