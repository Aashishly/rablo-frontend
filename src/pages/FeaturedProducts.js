import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/featured");
      setFeaturedProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
<Container>
  <h2>Featured List</h2>
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
          {featuredProducts &&
            featuredProducts.map((product, index) => {
              return (
                <tr key={product.productID}>
                  <td>{index + 1}</td>
                  <td>{product.productID}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.rating}</td>
                  <td>{product.company}</td>
                 
                </tr>
              );
            })}
        </tbody>
      </StyledTable>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
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



export default FeaturedProducts;
