import Card from './Components/Card'
import Header from './Components/Header'
import Drawer from './Components/Drawer';

const array = [
  { 
    name: 'Мужские Кроссовки Nike Blazer Mid Suede', 
    price: '12999',
    imageUrl: '/image/sneakers/1.jpg'
  },
  { 
    name: 'Мужские Кроссовки Nike Air Max 270', 
    price: '13999',
    imageUrl: '/image/sneakers/2.jpg'
  },
  { 
    name: 'Мужские Кроссовки Nike Blazer Mid Suede', 
    price: '8499',
    imageUrl: '/image/sneakers/3.jpg'
  },
  { 
    name: 'Кроссовки Puma X Aka Boku Future Rider', 
    price: '8999',
    imageUrl: '/image/sneakers/4.jpg'
  }
]


function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="image/search.svg" alt="Search"/>
            <input placeholder="Поиск..."/>
          </div>
        </div>
        
        <div className="d-flex">

          {array.map((obj) => (
          <Card 
            name={obj.name}
            price={obj.price}
            imageUrl={obj.imageUrl}/>
          ))}
          
          
          
        </div>
      </div>
    </div>
  );
}

export default App;
