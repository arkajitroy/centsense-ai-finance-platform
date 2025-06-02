import React from "react";
import HomePage from "./(landing)";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomePage />;
      <Footer />
    </>
  );
}
