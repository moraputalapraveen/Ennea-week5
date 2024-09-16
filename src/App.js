import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import { Page2 } from './components/Page2';
import styled from 'styled-components';
import { Table1 } from './components/Table1';
import { Table } from 'antd';

const Header=styled.div`
background-color: blanchedalmond;
height:70px;
color:black;
font-size: 30px;
font-style: inherit;
font-weight: bolder;
padding-top: 15px;
text-align: center;
`

const newQuery = new QueryClient();

function App() {
  return (
    <Router>
      
      
     <Header>My Products</Header>
      <QueryClientProvider client={newQuery}>
       
        <Routes>
          
          <Route path="/" element={<Table1 />} />
          <Route path="/page2" element={<Page2 />} />
        </Routes>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
