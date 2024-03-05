import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faListAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container mt-5">
      <h1 className="text-center">Bienvenido a Super Bodega</h1>
      <div className="d-flex justify-content-center mt-4">
        <Button variant="success" className="me-2" onClick={() => navigate('/add-item')}>
          <FontAwesomeIcon icon={faPlusCircle} /> Añadir Producto
        </Button>
        <Button variant="info" onClick={() => navigate('/items')}>
          <FontAwesomeIcon icon={faListAlt} /> Gestionar Inventario
        </Button>
      </div>
    </div>
  );
};

export default Home;