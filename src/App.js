import React from 'react';
import Card from './Components/Card'
import Header from './Components/Header'
import Drawer from './Components/Drawer';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);


  React.useEffect(() => {
    fetch('https://628bd4d3667aea3a3e36fc1d.mockapi.io/items').then(res => {
      return res.json();
    }).then(json => {
      setItems(json);
    });
  }, []);

  const onAddToCart = (obj) => {
    setCartItems((prev) => [...prev, obj]);
  };

  return (
    <div className="wrapper clear">
      {cartOpened ? <Drawer items={cartItems} onClose={() => setCartOpened(false)}/> : null}
      <Header onClickCart={() => setCartOpened(true) }/>
      
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="image/search.svg" alt="Search"/>
            <input placeholder="Поиск..."/>
          </div>
        </div>
        
        <div className="d-flex flex-wrap">

          {items.map((item) => (
            <Card 
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
              onClickFavorite={() => console.log('Added bookmarks')}
              onClickPlus={(obj) => onAddToCart(obj)}/>
            ))}
          
        </div>
      </div>
    </div>
  );
}

export default App;
