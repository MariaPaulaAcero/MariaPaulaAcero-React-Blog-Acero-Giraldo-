import React from 'react';

const Navbar = ({ handleBlogListClick, handleBlogPostClick }) => {
  return (
    <nav>
      <ul>
        <li><button onClick={handleBlogListClick}>Lista de publicaciones</button></li>
        <li><button onClick={handleBlogPostClick}>Detalles de publicación</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;