import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
`;

const LoginFormContainer = styled.div`
  background-color: #ffffff;
  border-radius: 5px;
  width: 300px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 3px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
`;

const ForgotPassword = styled.p`
    text-align: center;
`;

const LoginForm = () => {
  const isLoggedIn = localStorage.getItem("loggedIn");

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if(isLoggedIn){
      window.location.href = "./home";
    }
  }, []);


  const handleLogin = async (e) => {
    e.preventDefault();

    if(!email || !password){
      toast.error('Fill the every fields');
      return
    } 


    try {
      const response = await axios.post("http://localhost:8000/users/login", {
        email,
        password,
      });

        console.log(response.data.token, "userLogin");
        setTimeout(() => {
          toast.success('Login Successfull!');
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("loggedIn", true);
          window.location.href = "./home";
        }, 500);
        

      
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <PageContainer>
      <LoginFormContainer>
        <Title>Login</Title>
        <Form>
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin}>Login</Button>
          <ForgotPassword className="forgot-password text-right">
            Don't have account <a href="/register">register here?</a>
          </ForgotPassword>
        </Form>
      </LoginFormContainer>
    </PageContainer>
  );
};

export default LoginForm;
