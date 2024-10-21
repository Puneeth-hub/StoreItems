import { useState, useEffect } from 'react';
import axios from 'axios'; 
import Form from './components/StoreForm/Store.jsx';

import './App.css';

const apiUrl = 'https://storeitems.onrender.com/api/store';

function App() {
  const [storeItem, setStoreItem] = useState([]); 
  const [storeStockAmount, setStoreStockAmount] = useState(1); 
  const [filterText, setFilterText] = useState('');
  const [message, setMessage] = useState('');
 
  useEffect(() => {
    async function storeItemGet() {
      const response = await axios.get(apiUrl); 
      setStoreItem(response.data);
      console.log('Fetched items:', response.data);
    }
    storeItemGet(); 
  }, []);

  //sell items 
  const sellItem = async (id, stockToSell = 1) => {
    try {
      const response = await axios.put(`${apiUrl}/sell/${id}`, { stock: stockToSell });
      const updateData = await axios.get(apiUrl);
      setStoreItem(updateData.data); 
      setMessage(`Successfully sold ${stockToSell} item(s). Available stock: ${response.data.stock}`);
      console.log('Updated store after selling:', response.data); 
    } catch (error) {
      console.error('Error selling item:', error.response ? error.response.data : error.message);
    }
  };

  //restock item   
  const restockItem = async(id) => {
    try {
      const response = await axios.put(`${apiUrl}/restock/${id}`, { stock: Number(storeStockAmount) });
      const updateData = await axios.get(apiUrl);
      setStoreItem(updateData.data); 
      setMessage(`Successfully restocked ${storeStockAmount} item(s).`);
    } catch (error) {
      console.error('Error restocking item:', error.response ? error.response.data : error.message);
      setMessage(error.response ? error.response.data.message : 'Error restocking item');
    }
  };

  //filter text 

  const filterItems = storeItem.filter(item => 
    item.name.toLowerCase().includes(filterText.toLowerCase()) || 
    item.stock.toString().includes(filterText) || 
    item.price.toString().includes(filterText)
  )

  return (
    <div className='container'>
      <div className='left-section'>
        <h1 className='heading'>Store Form</h1>
        <Form/>
      </div>
      
      <div className='right-section'>
        <h1 className='heading'>Auto mobile</h1>
        <input 
          type='text' 
          className='inputelment' 
          value={storeStockAmount} 
          onChange={(e) => setStoreStockAmount(Number(e.target.value))} 
          placeholder='Enter stock'
        />
        <input 
          type='text' 
          className='inputelment' 
          value={filterText} 
          onChange={(e) => setFilterText(e.target.value)} 
          placeholder='Enter stock'
        />
        <div className='item-container'>
            {filterItems.length > 0 ? (
              filterItems.map((item) => (
                <div key={item._id} className='item'>
                <h2>{item.name}</h2>
                <p>Price: {item.price}</p>
                <p>Stock: {item.stock}</p>
                <button 
                  onClick={() => sellItem(item._id, storeStockAmount)} 
                  className='btn'
                >
                  SELL
                </button>
                <button 
                  onClick={() => restockItem(item._id)} 
                  className='btn'
                >
                  RESTOCK
                </button>
              </div>

              ))

            ) : (
              <p>No items found matching the filter.</p>
            )}
          
        </div>
      </div>
    </div>
  );
}

export default App;
