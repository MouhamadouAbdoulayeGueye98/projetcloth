"use client";

import { useState } from "react";
import axios from "axios";
import {
  Container,
  Title,
  Form,
  FormGroup,
  Label,
  Input,
  ButtonContainer,
  Button,
  BackButton,
  ForgotPassword,
  RegisterLink,
  StyledLink,
} from "@/styles/Connexion";
import { ErrorMessage, SuccessMessage, ErrorInput } from "@/styles/erreur";

export default function Connexion() {
  const [email, setEmail] = useState<string>(""); // Préciser le type pour email
  const [password, setPassword] = useState<string>(""); // Préciser le type pour password
  const [error, setError] = useState<string>(""); // Préciser le type pour error
  const [success, setSuccess] = useState<string>(""); // Préciser le type pour success
  const [loading, setLoading] = useState<boolean>(false); // Préciser le type pour loading

  const handleSubmit = async (e: React.FormEvent) => {  // Typage de l'événement
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/users/login", {
        email,
        motDePasse: password,
      });

      setSuccess("Connexion réussie ! Redirection...");
      localStorage.setItem("token", response.data.token);
      setTimeout(() => {
        window.location.href = "/"; // Rediriger après connexion
      }, 1500);
    } catch (err: any) {  // Typage de 'err' pour éviter 'any'
      setError(err.response?.data?.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <BackButton onClick={handleBack}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Retour
      </BackButton>

      <Container>
        <Title>Connexion</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} // Typage pour onChange
              placeholder="votre@email.com"
              as={error ? ErrorInput : Input}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} // Typage pour onChange
              as={error ? ErrorInput : Input}
            />
          </FormGroup>

          <ForgotPassword href="/reset-password">
            Mot de passe oublié ?
          </ForgotPassword>

          <ButtonContainer>
            <Button type="submit" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </ButtonContainer>
          <RegisterLink>
            Vous n&apos;avez pas de compte ?{" "}
            <StyledLink href="/inscription">S&apos;inscrire</StyledLink>
          </RegisterLink>
        </Form>
      </Container>
    </>
  );
}
