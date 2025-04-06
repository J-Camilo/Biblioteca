import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { getBookById } from "../../../services/books";
import { useParams } from "react-router-dom";

const BookStep = ({ onDataChange }) => {

  const { idbook } = useParams();
  const [oneBook, setOneBook] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      const books = await getBookById(idbook);
      setOneBook(books);
    };
    fetchData();
  }, []);

  console.log(oneBook);


  // Estado inicial
  const [availableQuantity, setAvailableQuantity] = useState(10);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const bookPrice = 50;
  const ivaRate = 0.019;

  // Función para calcular el total (subtotal + IVA)
  const calculateTotal = (quantity) => {
    const subtotal = quantity * bookPrice;
    const ivaAmount = subtotal * ivaRate;
    return subtotal + ivaAmount;
  };

  // Función para aumentar la cantidad de compra
  const increaseQuantity = () => {
    if (purchaseQuantity < availableQuantity) {
      const newPurchaseQuantity = purchaseQuantity + 1;
      setPurchaseQuantity(newPurchaseQuantity);
      setAvailableQuantity(availableQuantity - 1);
      updateBookData(newPurchaseQuantity);
    } else {
      alert("No hay más libros disponibles.");
    }
  };

  // Función para disminuir la cantidad de compra
  const decreaseQuantity = () => {
    if (purchaseQuantity > 0) {
      const newPurchaseQuantity = purchaseQuantity - 1;
      setPurchaseQuantity(newPurchaseQuantity);
      setAvailableQuantity(availableQuantity + 1);
      updateBookData(newPurchaseQuantity);
    }
  };

  // Actualiza los datos del libro y notifica al padre
  const updateBookData = (quantity) => {
    const total = calculateTotal(quantity);

    const bookData = {
      bookName: "El Gran Libro",
      price: bookPrice,
      quantity: quantity,
      total: total,
    };

    onDataChange(bookData); // Notifica al padre sobre los cambios
  };

  return (
    <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
      <h2>Libro: El Gran Libro</h2>
      <h4>Precio: ${bookPrice.toFixed(2)}</h4>
      <h4>Cantidad disponibles: {availableQuantity}</h4>
      <h4>IVA: {ivaRate * 100}%</h4>

      {/* Contador */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Button onClick={decreaseQuantity} disabled={purchaseQuantity === 0}>
          -
        </Button>
        <span>{purchaseQuantity}</span>
        <Button onClick={increaseQuantity} disabled={availableQuantity === 0}>
          +
        </Button>
      </div>

      {/* Total */}
      <h4>Total: ${calculateTotal(purchaseQuantity).toFixed(2)}</h4>
    </div>
  );
};

export default BookStep;