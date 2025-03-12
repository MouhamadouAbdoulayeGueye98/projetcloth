"use client"

import React, { useState } from 'react';
import styled from 'styled-components';

// Styles
const FilterContainer = styled.div`
  width: 100%;
  max-width: 300px;
  font-family: 'Arial', sans-serif;

  @media (max-width: 788px){
    display: none;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 10px;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 5px;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;
  font-weight: 600;
  padding: 3px 0;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #333;
`;

const Arrow = styled.span<{ isOpen: boolean }>`
  font-size: 12px;
  display: inline-block;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;
`;

const FilterOptions = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const SizeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  margin-bottom: 10px;
`;

const SizeButton = styled.button<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? '#333' : '#f5f5f5')};
  color: ${({ selected }) => (selected ? '#fff' : '#333')};
  border: 1px solid #e0e0e0;
  padding: 8px 0;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ selected }) => (selected ? '#333' : '#e0e0e0')};
  }
`;

const CheckboxGroup = styled.div`
  margin-bottom: 8px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  cursor: pointer;
`;

const Count = styled.span`
  color: #888;
  margin-left: 5px;
`;

// Définir explicitement les types des objets d'état

type OpenSections = {
  size: boolean;
  availability: boolean;
  category: boolean;
  colors: boolean;
  price: boolean;
  collections: boolean;
  tags: boolean;
  ratings: boolean;
};

type AvailabilityChecked = {
  available: boolean;
  outOfStock: boolean;
};

const ProductFilters = () => {
  // États pour l'ouverture/fermeture des sections avec des types explicites
  const [openSections, setOpenSections] = useState<OpenSections>({
    size: true,
    availability: true,
    category: false,
    colors: false,
    price: false,
    collections: false,
    tags: false,
    ratings: false,
  });

  // État pour les tailles sélectionnées
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  
  // État pour les disponibilités cochées avec un type explicite
  const [availabilityChecked, setAvailabilityChecked] = useState<AvailabilityChecked>({
    available: false,
    outOfStock: false,
  });

  // Toggle pour ouvrir/fermer une section
  const toggleSection = (section: keyof OpenSections) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section]
    });
  };

  // Toggle pour sélectionner/désélectionner une taille
  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  // Toggle pour les checkboxes de disponibilité
  const toggleAvailability = (type: keyof AvailabilityChecked) => {
    setAvailabilityChecked({
      ...availabilityChecked,
      [type]: !availabilityChecked[type]
    });
  };

  return (
    <FilterContainer>
      {/* Section Taille */}
      <FilterSection>
        <SectionTitle>Size</SectionTitle>
        <SizeGrid>
          {['XS', 'S', 'M', 'L', 'XL', '2X'].map(size => (
            <SizeButton 
              key={size} 
              selected={selectedSizes.includes(size)}
              onClick={() => toggleSize(size)}
            >
              {size}
            </SizeButton>
          ))}
        </SizeGrid>
      </FilterSection>

      {/* Section Disponibilité */}
      <FilterSection>
        <FilterHeader onClick={() => toggleSection('availability')}>
          <SectionTitle>Availability</SectionTitle>
          <Arrow isOpen={openSections.availability}>^</Arrow>
        </FilterHeader>
        <FilterOptions isOpen={openSections.availability}>
          <CheckboxGroup>
            <CheckboxLabel>
              <Checkbox 
                type="checkbox" 
                checked={availabilityChecked.available}
                onChange={() => toggleAvailability('available')}
              />
              Availability <Count>(450)</Count>
            </CheckboxLabel>
          </CheckboxGroup>
          <CheckboxGroup>
            <CheckboxLabel>
              <Checkbox 
                type="checkbox" 
                checked={availabilityChecked.outOfStock}
                onChange={() => toggleAvailability('outOfStock')}
              />
              Out Of Stock <Count>(18)</Count>
            </CheckboxLabel>
          </CheckboxGroup>
        </FilterOptions>
      </FilterSection>

      {/* Section Catégorie */}
      <FilterSection>
        <FilterHeader onClick={() => toggleSection('category')}>
          <SectionTitle>Category</SectionTitle>
          <Arrow isOpen={openSections.category}>^</Arrow>
        </FilterHeader>
      </FilterSection>

      {/* Section Couleurs */}
      <FilterSection>
        <FilterHeader onClick={() => toggleSection('colors')}>
          <SectionTitle>Colors</SectionTitle>
          <Arrow isOpen={openSections.colors}>{'>'}</Arrow>
        </FilterHeader>
      </FilterSection>

      {/* Section Prix */}
      <FilterSection>
        <FilterHeader onClick={() => toggleSection('price')}>
          <SectionTitle>Price Range</SectionTitle>
          <Arrow isOpen={openSections.price}>{'>'}</Arrow>
        </FilterHeader>
      </FilterSection>

      {/* Section Collections */}
      <FilterSection>
        <FilterHeader onClick={() => toggleSection('collections')}>
          <SectionTitle>Collections</SectionTitle>
          <Arrow isOpen={openSections.collections}>{'>'}</Arrow>
        </FilterHeader>
      </FilterSection>

      {/* Section Tags */}
      <FilterSection>
        <FilterHeader onClick={() => toggleSection('tags')}>
          <SectionTitle>Tags</SectionTitle>
          <Arrow isOpen={openSections.tags}>{'>'}</Arrow>
        </FilterHeader>
      </FilterSection>

      {/* Section Évaluations */}
      <FilterSection>
        <FilterHeader onClick={() => toggleSection('ratings')}>
          <SectionTitle>Ratings</SectionTitle>
          <Arrow isOpen={openSections.ratings}>{'>'}</Arrow>
        </FilterHeader>
      </FilterSection>
    </FilterContainer>
  );
};

export default ProductFilters;
