import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './Components/Header';
import Drawer from './Components/Drawer';
import Home from './Pages/Home';
import Favorites from './Pages/Favorites';
import AppContext from './context';
import Orders from './Pages/Order';
import { getAllByAltText } from '@testing-library/react';


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);// данные корзины
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(() => {
    // fetch('https://628bd4d3667aea3a3e36fc1d.mockapi.io/items').then(res => {
    //   return res.json();
    // }).then(json => {
    //   setItems(json);
    // });

    async function fetchData() {
     try {
      // const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([xios.get('https://628bd4d3667aea3a3e36fc1d.mockapi.io/Cart'), axios.get('https://628bd4d3667aea3a3e36fc1d.mockapi.io/favorites'), axios.get('https://628bd4d3667aea3a3e36fc1d.mockapi.io/items')]);
      const cartResponse = await axios.get('https://628bd4d3667aea3a3e36fc1d.mockapi.io/Cart');
      const favoritesResponse = await axios.get('https://628bd4d3667aea3a3e36fc1d.mockapi.io/favorites');
      const itemsResponse = await axios.get('https://628bd4d3667aea3a3e36fc1d.mockapi.io/items');
      
      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
     } catch (error) {
      alert('Ошибка при запросе данных!');
     }
    }

    fetchData();
    
  }, []);

  const onAddToCart = async (obj) => {
      try {
        const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
        if (findItem) {
          setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
          await axios.delete(`https://628bd4d3667aea3a3e36fc1d.mockapi.io/Cart/${findItem.id}`);
        } else {
          setCartItems((prev) => [...prev, obj]);
          const { data } = await axios.post('https://628bd4d3667aea3a3e36fc1d.mockapi.io/Cart', obj);
          // после ответа с бэкенда, переобновляется массив
          setCartItems((prev) => prev.map(item => {
            //item.parentId в корзине равен data.parentID с бэкенда
            if (item.parentId === data.parentId) {
              //замени item, который найден по выше условию, замени на новый объект
              return {
                ...item,
                // заменяем id старого объекта, на тот который пришел с бэкенда
                id: data.id
              };
            }
            return item;
          }));
        }
      } catch(error) {
        alert('Ошибка при добавлении в корзину!')
      }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://628bd4d3667aea3a3e36fc1d.mockapi.io/Cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении из корзины');
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://628bd4d3667aea3a3e36fc1d.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post('https://628bd4d3667aea3a3e36fc1d.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты!')
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };
  // Проверяет - если хотя бы один id, который тебе передали, он есть в корзине, среди объектов - выдавай мне true
  // иначе выдавай false.
  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    // Наше приложение понимает, что через хук useContext можно вытянуть значения переданные в value (cartItems, favorites, items, isItemAdded)
    <AppContext.Provider value={{
      cartItems, 
      favorites, 
      items, 
      isItemAdded, 
      onAddToFavorite, 
      setCartOpened, 
      setCartItems, 
      onAddToCart,
      }}>
      <div className="wrapper clear">
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened}/>
        <Header onClickCart={() => setCartOpened(true) }/>
        <Routes>
          <Route path="/" element={
          <Home 
          items={items}
          cartItems={cartItems} 
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
          isLoading={isLoading}
          />}>
          </Route>

          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
        </Routes>
      
      </div>
    </AppContext.Provider>
  );
}

export default App;
