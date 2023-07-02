import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
`;

const SignupFormContainer = styled.form`
  background-color: #ffffff;
  width: 300px;
  border-radius: 5px;
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
const ForgotPassword = styled.p``;

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!username || !email || !password){
        toast.error('Fill the every fields');
        return
    }


    try {
      const response = await axios.post("http://localhost:8000/users/register", {
        username,
        email,
        password,
      });

        toast.success("Registration Successful");
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        navigate('/login');

    } catch (error) {
      console.error(error);
      toast.error('User already exists')
    }
  };


  return (
    <PageContainer>
      <SignupFormContainer>
        <Title>Sign Up</Title>
        <Form>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="email"
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
          <Button onClick={handleSubmit}>Sign Up</Button>
          <ForgotPassword className="forgot-password text-right">
            Already have account <a href="/login">Login here?</a>
          </ForgotPassword>
        </Form>
      </SignupFormContainer>
    </PageContainer>
  );
};

export default SignupForm;
