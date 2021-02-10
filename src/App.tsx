import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import PaginationNpm from './components/PaginationNpm';
import Pagination from './components/Pagination';

function App() {
  var exampleItems = [...Array(150).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));
  const [pageOfItems,setPageOfItems]=useState([{id:0,name:''}]);
 const onChangePage=(pageOfItems:any[])=> {
    // update state with new page of items
    setPageOfItems(pageOfItems)
}
  return (
    <div className="App">
     <PaginationNpm perPage={5} />

     <hr/>
     <div className="container">
                    <div className="text-center">
                        <h1>React - Pagination Example with logic like Google</h1>
                        {pageOfItems.map(item =>
                            <div key={item.id}>{item.name}</div>
                        )}
                         <Pagination items={exampleItems} onChangePage={onChangePage} />
                    </div>
                </div>
    
    </div>
  );
}

export default App;
