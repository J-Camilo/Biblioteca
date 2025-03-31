import React, { useState } from "react";

const BookStep = ({ onDataChange }) => {
  // Estado inicial
  const [availableQuantity, setAvailableQuantity] = useState(10); // Cantidad disponible inicial
  const [purchaseQuantity, setPurchaseQuantity] = useState(0); // Cantidad de compra inicial
  const bookPrice = 50; // Precio del libro
  const ivaRate = 0.019; // Tasa de IVA

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
        <button onClick={decreaseQuantity} disabled={purchaseQuantity === 0}>
          -
        </button>
        <span>{purchaseQuantity}</span>
        <button onClick={increaseQuantity} disabled={availableQuantity === 0}>
          +
        </button>
      </div>

      {/* Total */}
      <h4>Total: ${calculateTotal(purchaseQuantity).toFixed(2)}</h4>
    </div>
  );
};

export default BookStep;