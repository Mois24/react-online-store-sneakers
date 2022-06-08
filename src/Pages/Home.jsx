import Card from '../Components/Card';

function Home({ items, searchValue, 
    setSearchValue, onChangeSearchInput,
    onAddToFavorite, onAddToCart}) {
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
            <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
            <div className="search-block d-flex">
                {searchValue && (
                  <img 
                  onClick={() => {setSearchValue('')}} 
                  className="clear cu-p" 
                  src="/image/btn-remove.svg" 
                  alt="Clear" />
                )}
                <img src="image/search.svg" alt="Search"/>
                <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."/>
            </div>
        </div>
        
        <div className="d-flex flex-wrap">

          {items
          .filter((item) => item.name.toLowerCase()
          .includes(searchValue.toLowerCase()))
          .map((item) => (
            <Card 
              key={item.name}
            //   name={item.name}
            //   price={item.price}
            //   imageUrl={item.imageUrl}
              onFavorite={(obj) => onAddToFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
              {...item}/>
            ))}
          
        </div>
      </div>
    )
}

export default Home;