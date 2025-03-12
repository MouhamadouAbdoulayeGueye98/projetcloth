"use client";

import { useState } from 'react';
import styled from 'styled-components';

interface FormData {
  username: string;
  password: string;
}

const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #005bb5;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  text-align: center;
`;

const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>({ username: '', password: '' });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Une erreur est survenue.');
        setIsLoading(false);
        return;
      }

      // Si l'inscription réussit, rediriger l'utilisateur ou effectuer une autre action
      alert('Inscription réussie !');
    } catch (error) {
      setError('Erreur lors de la connexion avec l\'API');
    }

    setIsLoading(false);
  };

  return (
    <FormWrapper>
      <Title>Connexion</Title>
      <form onSubmit={handleSubmit}>
        <div>
          <InputField
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <InputField
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Chargement...' : 'Se connecter'}
          </Button>
        </div>
      </form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormWrapper>
  );
};

export default LoginForm;
