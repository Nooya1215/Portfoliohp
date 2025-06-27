import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../assets/css/Aside.css";

export default function Aside() {
  return (
    <div id="aside">
      <Link to="/board"></Link>
    </div>
  );
}
