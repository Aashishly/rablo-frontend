import React, { useState } from 'react';
import axios from 'axios';
import styled from "styled-components";

const SearchProductByRating = () => {
  const [value, setValue] = useState('');
  const [products, setProducts] = useState([]);

  const handleInputChange = event => {
    setValue(event.target.value);
  };

  const searchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/products/rating/${value}`);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h2>Search Products with Rating Higher Than</h2>
      <input
        type="number"
        placeholder="Enter rating"
        value={value}
        onChange={handleInputChange}
      />
      <Button onClick={searchProducts}>Search</Button>
      {products.length > 0 ? (
        <>
          <h2>List of Products</h2>
          <StyledTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.productID}>
                  <td>{index + 1}</td>
                  <td>{product.productID}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.rating}</td>
                  <td>{product.company}</td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </>
      ) : (
        <p>Search for Product</p>
      )}
    </Container>
  );
};

const Container = styled.div`
  text-align: center;

  input {
    margin-top: 1rem;
    padding: 5px 12px;
    margin-bottom: 2rem;
  }
`;

const StyledTable = styled.table`
  width: fit-content;
  margin: auto;
  border-collapse: collapse;
  margin-top: 1rem;

  th,
  td {
    padding: 1rem;
    text-align: center;
    border: 1px solid #ddd;
  }

  th {
    background-color: #30475e;
    color: #fff;
  }

  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tbody tr:hover {
    background-color: #f5f5f5;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #30475e;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin-right: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #24344d;
  }
`;

export default SearchProductByRating;
