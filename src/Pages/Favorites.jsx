import Card from '../Components/Card'

function Favorites({items, onAddToFavorite}) {
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
            <h1>Мои Закладки</h1>
        </div>
        
        <div className="d-flex flex-wrap">
          {items
            .map((item) => (
              <Card 
                key={item.name}
                // name={item.name}
                // price={item.price}
                // imageUrl={item.imageUrl}
                // id={item.id}
                favorited={true}
                onFavorite={onAddToFavorite}
                {...item}
              />
          ))}
        </div>
      </div>
    )
}

export default Favorites;