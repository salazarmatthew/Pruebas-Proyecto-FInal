import React, { useState } from "react";
import { db } from "../../api/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { Button, Form, Row, Col, Card, Toast } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Loading from "../../general/Loading";

const AddItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    quantity: 0,
    category: "",
    price: "",
    description: "",
  });
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const categories = [
    "Bebida",
    "Lacteo",
    "Snacks",
    "Alimentos",
    "Producto enlatado",
  ];
  const [isLoading, setLoading] = useState(false);

  const itemsCollectionRef = collection(db, "items");

  const addItem = async () => {
    setLoading(true);
    setShowSuccessToast(false);
    setShowErrorToast(false);

    try {
      await addDoc(itemsCollectionRef, {
        ...formData,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
      });

      setFormData({
        name: "",
        quantity: 0,
        category: "",
        price: "",
        description: "",
      });

      setShowSuccessToast(true);
      setTimeout(() => {
        navigate('/Home'); // Redirigir después de un breve tiempo
      }, 2000);
    } catch (error) {
      setShowErrorToast(true);
      console.error("Error al agregar artículo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="container mt-5">
      <div style={{ textAlign: 'center' }}>
        <h2>Ingresar Producto</h2>
      </div>

      <Card className="p-4 shadow">
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} className="mb-3">
              <Form.Label className="fw-bold">Nombre del producto</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ingrese el nombre del artículo"
                required
                className="w-80"
                style={{
                  borderRadius: '10px',
                  backgroundColor: '#cce5ff', // Color de fondo celeste
                  padding: '8px' // Espacio interior para mejor apariencia
                }}
              />
            </Form.Group>



            <Form.Group as={Col} className="mb-3">
              <Form.Label className="fw-bold">Cantidad del producto</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="Ingrese la cantidad"
                className="w-50" // Cambia el tamaño del campo de entrada
                style={{
                  borderRadius: '10px',
                  backgroundColor: '#cce5ff', // Color de fondo celeste
                  padding: '8px' // Espacio interior para mejor apariencia
                }} // Añade bordes redondeados
              />
            </Form.Group>
          </Row>

          <Form.Group as={Col} className="mb-3">
            <Form.Label className="fw-bold">Categoría</Form.Label>
            <Form.Select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-50"
              style={{
                borderRadius: '10px',
                backgroundColor: '#cce5ff', // Color de fondo celeste
                padding: '8px' // Espacio interior para mejor apariencia
              }}
            >
              <option>Seleccione una categoría</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Select>
          </Form.Group>



          <Row className="mb-3">
          <Form.Group as={Col}>
    <Form.Label className="fw-bold">Precio del producto</Form.Label>
    <Form.Control
        type="text"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
        placeholder="Ingrese el precio"
        style={{
            borderRadius: '10px', // Añade bordes redondeados
            backgroundColor: '#cce5ff', // Color de fondo celeste
            padding: '8px' // Espacio interior para mejor apariencia
        }}
    />
</Form.Group>



            <Form.Group as={Col}>
              <Form.Label className="fw-bold">Descripción del producto</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Ingrese una descripción del artículo"
                style={{
                  borderRadius: '10px', // Añade bordes redondeados
                  backgroundColor: '#cce5ff', // Color de fondo celeste
                  padding: '8px' // Espacio interior para mejor apariencia
                }}
              />
            </Form.Group>


          </Row>

          <Button variant="success" onClick={addItem} >
            Agregar Producto
          </Button>

        </Form>
      </Card>
      <Toast
        show={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        delay={5000}
        autohide
        className="position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Header>
          <strong className="me-auto">Éxito</strong>
        </Toast.Header>
        <Toast.Body>El artículo se ha agregado correctamente.</Toast.Body>
      </Toast>

      <Toast
        show={showErrorToast}
        onClose={() => setShowErrorToast(false)}
        delay={5000}
        autohide
        bg="danger"
        text="white"
        className="position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Header>
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>Ha ocurrido un error al agregar el artículo.</Toast.Body>
      </Toast>
    </div>
  );
};

export default AddItem;
