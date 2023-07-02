import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const AddProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    productID: '',
    name: '',
    price: '',
    featured: false,
    rating: '',
    company: '',
  });

  useEffect(() => {
    if (id) {
      getProduct(id);
    }
  }, [id]);

  const getProduct = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/products/${id}`);
      if (response.status === 200) {
        const fetchedProduct = response.data;
        setProduct((prevState) => ({
          ...prevState,
          productID: fetchedProduct.productID,
          name: fetchedProduct.name,
          price: fetchedProduct.price,
          featured: fetchedProduct.featured,
          rating: fetchedProduct.rating,
          company: fetchedProduct.company,
        }));
      }
    } catch (error) {
      console.error('Error retrieving product', error);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addProduct = async (data) => {
    try {
      const response = await axios.post('http://localhost:8000/api/products', data);
      if (response.status === 200) {
        toast.success('Product added successfully!');
        resetForm();
      } else {
        toast.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product', error);
    }
  };

  const updateProduct = async (data, id) => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/products/${id}`, data);
      if (response.status === 200) {
        toast.success('Product updated successfully!');
        resetForm();
      } else {
        toast.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { productID, name, price, company } = product;
    if (!productID || !name || !price || !company) {
      toast.error('Please provide a value for each input field');
    } else {
      if(!id){
        addProduct(product);
      }
      else{
        updateProduct(product, id)
      }
      
      setTimeout(() => {
        navigate('/home');
      }, 500);
    }
  };

  const resetForm = () => {
    setProduct({
      productID: '',
      name: '',
      price: '',
      featured: false,
      rating: '',
      company: '',
    });
  };

  return (
    <FormWrapper>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Product ID:</label>
          <input
            type="text"
            name="productID"
            value={product.productID}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            value={product.rating}
            onChange={handleChange}
            placeholder="0 - 5"
          />
        </FormGroup>
        <FormGroup>
          <label>Company:</label>
          <input
            type="text"
            name="company"
            value={product.company}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <input
            type="checkbox"
            name="featured"
            checked={product.featured}
            onChange={(e) =>
              setProduct((prevState) => ({
                ...prevState,
                featured: e.target.checked,
              }))
            }
          />
          <label style={{ display: 'inline' }}>Featured</label>
        </FormGroup>
        <SubmitButton type="submit">{id? 'Update Product': 'Add Product'}</SubmitButton>
      </form>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  width: 400px;
  margin: auto;
  padding: 2rem;
  border: 1px solid black;

  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 5px 12px;
  }

  input[type='checkbox'] {
    width: fit-content;
    margin-right: 12px;
  }
`;

const FormGroup = styled.div`
  margin-block: 1rem;
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #98eecc;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default AddProductForm;
