import React from "react";
import LandingLayout from "components/layouts/LandingLayout";
import Hero from "components/sections/Hero";

export default function Landing() {
  return (
    <LandingLayout>
      <Hero
        title="File Drive"
        subtitle="Safely store and share your documents."
        image="/landing-doc.jpeg"
        ctaText="Get Started"
        ctaLink="/register"
      />
    </LandingLayout>
  );
}
