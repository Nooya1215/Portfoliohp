import React from 'react';
import '../assets/css/Footer.css'

export default function Footer() {
  const startYear = 2024;
  const currentYear = new Date().getFullYear();

  return (
    <footer id='footer'>
      <div className="wrap">
        <p className='p'>© {startYear}{startYear !== currentYear ? `~${currentYear}` : ''} KIM SEONWOO. All rights reserved.</p>
      </div>
    </footer>
  );
}
