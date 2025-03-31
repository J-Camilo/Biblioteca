import { useState } from "react";
import { jsPDF } from "jspdf";

const usePaymentLogic = () => {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({});

  // Estado para los datos del libro
  const [bookData, setBookData] = useState({
    bookName: "El Gran Libro",
    price: 50,
    quantity: 0,
    total: 0,
  });

  // Maneja cambios en el formulario
  const handleFormChange = (values) => {
    console.log("Datos actualizados:", values);
    setFormData(values); // Actualiza los datos automáticamente
  };

  // Maneja cambios en los datos del libro
  const handleBookDataChange = (data) => {
    setBookData(data); // Actualiza los datos del libro
  };

  // Función para generar el PDF
  const generatePDF = () => {
    if (!formData || Object.keys(formData).length === 0) {
      alert("No hay datos para generar el comprobante.");
      return;
    }

    const doc = new jsPDF();

    // Título del comprobante
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Comprobante de Pago", 20, 20);

    // Detalles del método de pago
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("Detalles del Pago", 20, 30);
    doc.line(20, 32, 190, 32); // Línea divisoria

    doc.setFontSize(12);
    doc.text(`Método de pago: Tarjeta virtual`, 20, 40);
    doc.text(`Número de tarjeta: ${formData.cardNumber || "N/A"}`, 20, 50);
    doc.text(`Nombre en la tarjeta: ${formData.cardName || "N/A"}`, 20, 60);
    doc.text(`Fecha de expiración: ${formData.expiryDate || "N/A"}`, 20, 70);
    doc.text(`CVV: ${formData.cvv || "N/A"}`, 20, 80);

    // Detalles del libro
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Detalles del Libro", 20, 100);
    doc.line(20, 102, 190, 102); // Línea divisoria

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Libro: ${bookData.bookName || "N/A"}`, 20, 110);
    doc.text(`Cantidad comprada: ${bookData.quantity || "N/A"}`, 20, 120);
    doc.text(`Precio unitario: $${bookData.price.toFixed(2) || "N/A"}`, 20, 130);

    // Resumen del total
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Resumen del Pago", 20, 150);
    doc.line(20, 152, 190, 152); // Línea divisoria

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Subtotal: $${(bookData.quantity * bookData.price).toFixed(2) || "N/A"}`, 20, 160);
    doc.text(`IVA (1.9%): $${((bookData.total - bookData.quantity * bookData.price) || 0).toFixed(2)}`, 20, 170);
    doc.setFont("helvetica", "bold");
    doc.text(`Total: $${bookData.total.toFixed(2) || "N/A"}`, 20, 180);

    // Guardar el documento PDF
    doc.save("comprobante_pago.pdf");
  };

  return {
    formData,
    bookData,
    handleFormChange,
    handleBookDataChange,
    generatePDF,
  };
};

export default usePaymentLogic;