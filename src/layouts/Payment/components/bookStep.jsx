import { Button } from "antd";
import React, { useState } from "react";

const BookStep = ({ bookData, onDataChange }) => {
  const [availableQuantity, setAvailableQuantity] = useState(bookData?.quantity || 0);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);

  // Función para calcular el total (subtotal + IVA)
  const calculateTotal = (quantity) => {
    const subtotal = quantity * bookData.price;
    const ivaAmount = subtotal * 0.019; // Tasa de IVA
    return subtotal + ivaAmount;
  };

  // Función para aumentar la cantidad de compra
  const increaseQuantity = () => {
    if (purchaseQuantity < availableQuantity) {
      const newPurchaseQuantity = purchaseQuantity + 1;
      setPurchaseQuantity(newPurchaseQuantity);
      updateBookData(newPurchaseQuantity);
    } else {
      alert("No hay más libros disponibles.");
    }
  };

  // Función para disminuir la cantidad de compra
  const decreaseQuantity = () => {
    if (purchaseQuantity > 1) {
      const newPurchaseQuantity = purchaseQuantity - 1;
      setPurchaseQuantity(newPurchaseQuantity);
      updateBookData(newPurchaseQuantity);
    }
  };

  // Actualiza los datos del libro y notifica al padre
  const updateBookData = (quantity) => {
    const total = calculateTotal(quantity);

    const updatedBookData = {
      bookName: bookData.name,
      price: bookData.price,
      quantity: quantity,
      total: total,
    };

    onDataChange(updatedBookData); // Notifica al padre sobre los cambios
  };

  return (
    <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
      <h2>Libro: {bookData?.name || "N/A"}</h2>
      <h4>Precio: ${bookData?.price?.toFixed(2) || "N/A"}</h4>
      <h4>Cantidad disponibles: {availableQuantity}</h4>
      <h4>IVA: {(0.019 * 100).toFixed(2)}%</h4>

      {/* Contador */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Button onClick={decreaseQuantity} disabled={purchaseQuantity === 1}>
          -
        </Button>
        <span>{purchaseQuantity}</span>
        <Button onClick={increaseQuantity} disabled={purchaseQuantity === availableQuantity}>
          +
        </Button>
      </div>

      {/* Total */}
      <h4>Total: ${calculateTotal(purchaseQuantity).toFixed(2)}</h4>
    </div>
  );
};

export default BookStep;