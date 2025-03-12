"use client";  // Ajout de la directive "use client" pour marquer ce fichier comme côté client

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

// Déclaration des types pour les états
export default function Connexion() {
  const [email, setEmail] = useState<string>("");  // Spécifier le type string
  const [password, setPassword] = useState<string>("");  // Spécifier le type string
  const [error, setError] = useState<string>("");  // Spécifier le type string
  const [success, setSuccess] = useState<string>("");  // Spécifier le type string
  const [loading, setLoading] = useState<boolean>(false);  // Spécifier le type boolean

  // Spécifier le type de l'événement pour handleSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Utilisation de axios pour la requête POST
      const response = await axios.post("http://localhost:8000/api/users/login", {
        email,
        motDePasse: password,
      });

      setSuccess("Connexion réussie ! Redirection...");
      localStorage.setItem("token", response.data.token);

      // Redirection après 1.5s
      setTimeout(() => {
        window.location.href = "/"; // Rediriger après connexion
      }, 1500);
    } catch (err: AxiosError) {  // Typage avec AxiosError pour l'erreur
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}  // Typage pour onChange
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}  // Typage pour onChange
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
