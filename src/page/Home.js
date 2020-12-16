import React from "react";
import { Link } from 'react-router-dom';


export default function Home() {
  return (
    <div className="Home">
      <div className="lander">
        <h1>Personal Budget App</h1>
        <p className="text-muted">An app for all your budgeting needs</p>
        <Link to="/login">Login or sign up</Link>
      </div>
    </div>
  );
}