import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { getBookById, updateBook } from "../../../services/books";
import { useParams } from "react-router-dom";

const usePaymentLogic = () => {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({});
  const { idbook } = useParams();
  const [oneBook, setOneBook] = useState(null); // Almacena los datos del libro

  useEffect(() => {
    const fetchData = async () => {
      try {
        const books = await getBookById(idbook);
        if (books && books.length > 0) {
          setOneBook(books[0]); // Asigna el primer libro encontrado
        }
      } catch (error) {
        console.error("Error al obtener el libro:", error);
      }
    };
    fetchData();
  }, [idbook]);

  // Estado para los datos del libro
  const [bookData, setBookData] = useState({
    bookName: "",
    price: 0,
    quantity: 1,
    total: 0,
  });

  // Actualiza los datos del libro cuando se obtienen
  useEffect(() => {
    if (oneBook) {
      setBookData((prev) => ({
        ...prev,
        bookName: oneBook.name || "N/A",
        price: oneBook.price || 0,
        total: oneBook.price || 0,
      }));
    }
  }, [oneBook]);

  // Maneja cambios en el formulario
  const handleFormChange = (values) => {
    setFormData(values);
  };

  // Maneja cambios en los datos del libro (cantidad)
  const handleBookDataChange = (data) => {
    const { quantity } = data;
    const newTotal = quantity * bookData.price; // Calcula el nuevo total
    setBookData((prev) => ({
      ...prev,
      quantity: quantity || 1, // Asegura que la cantidad no sea cero
      total: newTotal,
    }));
  };

  // Función para generar el PDF
  const generatePDF = () => {
    if (!formData || Object.keys(formData).length === 0) {
      alert("No hay datos para generar el comprobante.");
      return;
    }
    
    let dataBook = {
      name: oneBook.name,
      quantity: oneBook.quantity - bookData.quantity,
      price: oneBook.price,
      sypnosis: oneBook.sypnosis,
      url: oneBook.url,
      isbn: oneBook.ISBN,
      state: 1
    }

    updateBook(idbook, dataBook);

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
    doc.line(20, 102, 190, 102);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Libro: ${bookData.bookName || "N/A"}`, 20, 110);
    doc.text(`ISBN: ${oneBook?.ISBN || "N/A"}`, 20, 120); // Agrega el ISBN
    doc.text(`Cantidad comprada: ${bookData.quantity || "N/A"}`, 20, 130);
    doc.text(`Precio unitario: $${bookData.price.toFixed(2) || "N/A"}`, 20, 140);

    // Resumen del total
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Resumen del Pago", 20, 160);
    doc.line(20, 162, 190, 162);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Subtotal: $${(bookData.quantity * bookData.price).toFixed(2) || "N/A"}`, 20, 170);
    doc.text(`IVA (1.9%): $${((bookData.total - bookData.quantity * bookData.price) || 0).toFixed(2)}`, 20, 180);
    doc.setFont("helvetica", "bold");
    doc.text(`Total: $${bookData.total.toFixed(2) || "N/A"}`, 20, 190);

    // Guardar el documento PDF
    doc.save("comprobante_pago.pdf");
  };

  return {
    formData,
    bookData,
    oneBook, // Retornar los datos del libro
    handleFormChange,
    handleBookDataChange,
    generatePDF,
  };
};

export default usePaymentLogic;