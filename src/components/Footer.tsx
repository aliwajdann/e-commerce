"use client";
import React, { useState } from 'react';

const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
   <>
   yo
   </>
          
  );
};

export default Footer;