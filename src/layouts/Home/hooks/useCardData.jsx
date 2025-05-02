import { jsPDF } from "jspdf";
import { useEffect, useState } from "react";
import { getAllBooks } from "../../../services/books";
import { lendBook } from "../../../services/lend";
import { message } from "antd";
import { getAllUsers } from "../../../services/users";

export const useCardsData = () => {
  const [search, setSearch] = useState('');
  const [refresh, setRefresh] = useState(0);

  const [alert, setAlert] = useState(null);
  const [cardsData, setCardsData] = useState([]);
  const [cardsDataUser, setCardsDataUser] = useState([]);

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const refreshData = () => {
    setRefresh(prev => prev + 1);
  }

  const fetchData = async () => {
    const key = 'fetchBooks'; // Clave única para identificar el mensaje
    messageApi.loading({ content: 'Cargando libros...', key, duration: 0 }); // Muestra el mensaje de carga
    
    try {
      const books = await getAllBooks(); // Llama a la API para obtener los libros
      setCardsData(books); // Actualiza el estado con los datos obtenidos
      messageApi.success({ content: 'Libros cargados correctamente.', key, duration: 2 }); // Muestra mensaje de éxito
    } catch (error) {
      console.error('Error al cargar los libros:', error);
      messageApi.error({ content: 'Error al cargar los libros.', key, duration: 2 }); // Muestra mensaje de error
    }
  };

  const fetchDataUsers = async () => {
    try {
      const users = await getAllUsers(); // Llama a la API para obtener los libros
      setCardsDataUser(users.data); // Actualiza el estado con los datos obtenidos
    } catch (error) {
      console.error('Error al cargar los libros:', error);
    }
  };

  useEffect(() => {
    fetchDataUsers();
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

  const lend = async (value, selectedUser) => {
    if (
      (selectedUser === null || selectedUser === undefined)
    ) {
      messageApi.info({
        content: "Escoge el usuario para prestarle el libro y si no lo encuentras, dale al botón registrar.",
        key: 1,
        duration: 6
      });
      return
    }

    const lendData = {
      user_id: selectedUser,
      book_id: value.id,
      date_lend: formattedLoanDate,
      date_deliver: formattedReturnDate
    }
    setLoading(true);
    try {
      await lendBook(lendData);
      generateLoanPDF(value);
      setLoading(false);

      window.location.reload();
    } catch (error) {
      messageApi.error({ content: error.response.data.message || "No se pudo procesar el prestamo intenta luego", key: value, duration: 5 });
      setLoading(false);
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

  return { cardsDataUser, contextHolder, cardsData, loading, search, setSearch, handleSearch, refreshData, lend, alert, showAlert, setShowAlert };
};
