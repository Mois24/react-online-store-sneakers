import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './Components/Header';
import Drawer from './Components/Drawer';
import Home from './Pages/Home';
import Favorites from './Pages/Favorites';


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);


  React.useEffect(() => {
    // fetch('https://628bd4d3667aea3a3e36fc1d.mockapi.io/items').then(res => {
    //   return res.json();
    // }).then(json => {
    //   setItems(json);
    // });

    axios.get('https://628bd4d3667aea3a3e36fc1d.mockapi.io/items').then((res) => {
      setItems(res.data);
    });

    axios.get('https://628bd4d3667aea3a3e36fc1d.mockapi.io/Cart').then((res) => {
      setCartItems(res.data);
    });

    axios.get('https://628bd4d3667aea3a3e36fc1d.mockapi.io/favorites').then((res) => {
      setFavorites(res.data);
    });
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
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://628bd4d3667aea3a3e36fc1d.mockapi.io/favorites/${obj.id}`);
        // setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
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

  return (
    <div className="wrapper clear">
      {cartOpened ? <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} /> : null}
      <Header onClickCart={() => setCartOpened(true) }/>
      <Routes>
        <Route path="/" element={<Home 
        items={items} 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onChangeSearchInput={onChangeSearchInput}
        onAddToFavorite={onAddToFavorite}
        onAddToCart={onAddToCart}
        />}>
        </Route>

        <Route path="/favorites" element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite}/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
