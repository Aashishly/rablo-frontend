import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products');
      const data = response.data;
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  const handleDelete = async (productID) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${productID}`);
      toast.success('Product delete successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  return (
    <HomeWrapper>
      <h2>Product List</h2>
      <StyledTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Company</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product, index) => {
              return (
                <tr key={product.productID}>
                  <td>{index + 1}</td>
                  <td>{product.productID}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.rating}</td>
                  <td>{product.company}</td>
                  <td>
                    <Link to={`/${product.productID}`}>
                      <Button>Edit</Button>
                    </Link>
                    <Button onClick={() => handleDelete(product.productID)}>Delete</Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </StyledTable>
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  h2 {
    text-align: center;
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

export default ProductList;
