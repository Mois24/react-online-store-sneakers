import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './Components/Header';
import Drawer from './Components/Drawer';
import Home from './Pages/Home';
import Favorites from './Pages/Favorites';
import AppContext from './context';


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

      const cartResponse = await axios.get('https://628bd4d3667aea3a3e36fc1d.mockapi.io/Cart');
      const favoritesResponse = await axios.get('https://628bd4d3667aea3a3e36fc1d.mockapi.io/favorites');
      const itemsResponse = await axios.get('https://628bd4d3667aea3a3e36fc1d.mockapi.io/items');
      
      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
    
  }, []);

  const onAddToCart = (obj) => {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://628bd4d3667aea3a3e36fc1d.mockapi.io/Cart/${obj.id}`);
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        axios.post('https://628bd4d3667aea3a3e36fc1d.mockapi.io/Cart', obj);
        setCartItems((prev) => [...prev, obj]);
      }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://628bd4d3667aea3a3e36fc1d.mockapi.io/Cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

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
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }
  // Проверяет - если хотя бы один id, который тебе передали, он есть в корзине, среди объектов - выдавай мне true
  // иначе выдавай false.
  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  }

  return (
    // Наше приложение понимает, что через хук useContext можно вытянуть значения переданные в value (cartItems, favorites, items, isItemAdded)
    <AppContext.Provider value={{cartItems, favorites, items, isItemAdded, onAddToFavorite, setCartOpened, setCartItems}}>
      <div className="wrapper clear">
        {cartOpened ? <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} /> : null}
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
        </Routes>
      
      </div>
    </AppContext.Provider>
  );
}

export default App;
