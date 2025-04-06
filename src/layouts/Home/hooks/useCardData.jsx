import { jsPDF } from "jspdf";
import { useEffect, useState } from "react";
import { getAllBooks } from "../../../services/books";
import { lendBook } from "../../../services/lend";
import { getDecryptedCookie } from "../../../utils/cookieManager";

export const useCardsData = () => {
  const [search, setSearch] = useState('');
  const [alert, setAlert] = useState(null);
  const [refresh, setRefresh] = useState(0);
  // const userData = getDecryptedCookie("auth");
  const [cardsData, setCardsData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const refreshData = () => {
    setRefresh((prev) => prev + 1);
  }

  useEffect(() => {
    const fetchData = async () => {
      const books = await getAllBooks();
      setCardsData(books);
    };
    fetchData();
  }, [refresh]);

  const handleSearch = (value) => {

  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const loanDurationDays = 15;
  const loanDate = new Date(); // Fecha actual
  const returnDate = new Date();
  returnDate.setDate(loanDate.getDate() + loanDurationDays);

  const formattedLoanDate = formatDate(loanDate);
  const formattedReturnDate = formatDate(returnDate);

  const lend = async (value) => {
    const lendData = {
      user_id: 1,
      book_id: value.id,
      date_lend: formattedLoanDate,
      date_deliver: formattedReturnDate
    }
    try {
      const response = await lendBook(lendData);

      // if (!response.success) {
      //   throw new Error(response.message || "Error al registrar el préstamo");
      // }

      generateLoanPDF(value);
      window.location.reload();
    } catch (error) {
      setAlert({ type: "error", message: error.response.data.detail || "Error inesperado" });
      setShowAlert(true);
    }
  };

  const generateLoanPDF = (value) => {
    const doc = new jsPDF();

    // Título del comprobante
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Comprobante de Préstamo", 20, 20);

    // Detalles del préstamo
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("Detalles del Préstamo", 20, 30);
    doc.line(20, 32, 190, 32); // Línea divisoria

    doc.setFontSize(12);
    doc.text(`Fecha de préstamo: ${formattedLoanDate}`, 20, 40);
    doc.text(`Fecha de devolución: ${formattedReturnDate}`, 20, 50);
    doc.text(`Duración del préstamo: ${loanDurationDays} días`, 20, 60);

    // Detalles del libro
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Detalles del Libro", 20, 80);
    doc.line(20, 82, 190, 82); // Línea divisoria

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Libro: ${value.name || "N/A"}`, 20, 90);
    doc.text(`ISBN: ${value?.ISBN || "N/A"}`, 20, 100);
    doc.text(`Sinopsis: ${value?.sypnosis || "N/A"}`, 20, 120);

    // Resumen del préstamo
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Resumen del Préstamo", 20, 140);
    doc.line(20, 142, 190, 142); // Línea divisoria

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Estado del libro: ${value?.state === 1 ? "Disponible" : "No disponible"}`, 20, 150);
    doc.text(`Fecha límite de devolución: ${formattedReturnDate}`, 20, 160);

    // Guardar el documento PDF
    doc.save("comprobante_prestamo.pdf");
  };

  return { cardsData, search, setSearch, handleSearch, refreshData, lend, alert, showAlert, setShowAlert };
};
