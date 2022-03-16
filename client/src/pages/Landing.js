import React from "react";
import LandingLayout from "components/layouts/LandingLayout";
import Hero from "components/sections/Hero";

export default function Landing() {
  return (
    <LandingLayout>
      <Hero
        title="File Drive"
        subtitle="A file management system"
        image="/landing-doc.jpeg"
        ctaText="Get Started"
        ctaLink="/register"
      />
    </LandingLayout>
  );
}
