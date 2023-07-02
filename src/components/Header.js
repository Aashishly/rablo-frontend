import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from "styled-components";

const Header = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const handleToggleNavbar = () => {
    setIsSearchOpen(!isSearchOpen);
  }

  useEffect(() => {
    if (location.pathname === '/home') {
      setActiveTab('Home');
    }
    else if (location.pathname === '/add') {
      setActiveTab('AddProduct');
    }
    else if (location.pathname === '/search') {
      setActiveTab('By Name');
    }
    else if (location.pathname === '/featured') {
      setActiveTab('featuredProducts');
    }
    else if (location.pathname === '/price/:value') {
      setActiveTab('By Price');
    }
    else if (location.pathname === '/rating/:value') {
      setActiveTab('By Rating');
    }
  }, [location.pathname]);

  return (
    <HeaderComponent>
      <div className='logo'>Product Management System</div>
      <div className='NavmenuContainer'>
        <StyledLink to='/home' isActive={activeTab === 'Home'} onClick={() => setActiveTab('Home')}>
          Home
        </StyledLink>
        <StyledLink to='/add' isActive={activeTab === 'AddProduct'} onClick={() => setActiveTab('AddProduct')}>
          Add Product
        </StyledLink>
        <StyledLink to='/featured' isActive={activeTab === 'featuredProducts'} onClick={() => setActiveTab('featuredProducts')}>
          Featured Product
        </StyledLink>
        <div className='searchContainer' onClick={handleToggleNavbar}>
          <p className='searchBtn'>Search Product <span className='collapseIcon'> <i class="fa-solid fa-caret-down"></i> </span> </p>
          <div className={`collapseMenu ${isSearchOpen ? 'open' : ''}`}>
            <StyledLink to='/search' isActive={activeTab === 'By Name'} onClick={() => setActiveTab('By Name')}>
              <p>By Name</p>
            </StyledLink>
            <StyledLink to='/price' isActive={activeTab === 'By Price'} onClick={() => setActiveTab('By Price')}>
              <p>By Price</p>
            </StyledLink>
            <StyledLink to='/rating' isActive={activeTab === 'By Rating'} onClick={() => setActiveTab('By Rating')}>
              <p>By Rating</p>
            </StyledLink>
          </div>
        </div>
      </div>
    </HeaderComponent>
  )
}

const HeaderComponent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;

    .logo {
        font-weight: 600;
        font-size: 24px;
        text-transform: uppercase;
    }

    .NavmenuContainer {
        display: flex;
        gap: 2rem;
        align-items: center;
        
        .searchContainer {
            cursor: pointer;
            position: relative;
            
            .searchBtn{
                background-color: blue;
                color: white;
                font-weight: 500;
                padding: 8px 18px;
                border-radius: 8px;
            }
            
            .collapseMenu {
                position: absolute;
                width: 100%;
                height: 0px;
                background-color: white;
                overflow: hidden;
                
                p {
                    padding-block: 4px;
                    text-align: center;
                }

                &.open{
                    height: fit-content;
                }
            }
        }
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${({ isActive }) => isActive ? 'blue' : 'black'};
    cursor: pointer;
    font-weight: 500;

    &:hover{
        color: blue;
    }
`;

export default Header;
