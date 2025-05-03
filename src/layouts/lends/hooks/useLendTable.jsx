import { message } from 'antd';
import { useState, useEffect } from 'react';
import { getUserById } from '../../../services/users';
import { getBookById } from '../../../services/books';
import { getLendHistory, returnBook } from '../../../services/lend';

const useLendTable = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [lendData, setLendData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener y procesar los datos
  const fetchLendData = async () => {
    messageApi.loading({ content: 'Cargando todos los prestamos.', key: 1, duration: 0 });
    try {
      setLoading(true);
      const lendHistory = await getLendHistory(); // Obtener historial de préstamos
      let destructurando = lendHistory.data.reverse();

      // Procesar cada préstamo para incluir detalles del usuario y el libro
      const processedData = await Promise.all(
        destructurando.map(async (lend) => {
          const user = await getUserById(lend.user_id); // Obtener datos del usuario
          const book = await getBookById(lend.book_id); // Obtener datos del libro

          return {
            ...lend,
            userName: user.name,
            userEmail: user.email,
            bookName: book.name,
            bookUrl: book.url,
            isReturned: !!lend.date_deliver, // Determinar si el libro ha sido devuelto
          };
        })
      );

      messageApi.success({ content: 'Listo! 😃', key: 1, duration: 2 });
      setLendData(processedData);
    } catch (err) {
      console.error('Error al cargar los datos de préstamos:', err);
      messageApi.error({ content: 'Error al cargar los datos de préstamos.', key: 1, duration: 2 });
    } finally {
      setLoading(false);
    }
  };

  // Función para devolver un libro
  const handleReturnBook = async (lendId, data) => {
    messageApi.loading({ content: 'Procesando...', key: 1, duration: 0 });
    try {
      await returnBook(lendId, data); // Llamar a la API para marcar el libro como devuelto
     window.location.reload();
    } catch (err) {
      console.error('Error al devolver el libro:', err);
      messageApi.error({ content: err.response.data.message || "No se puede devolver este libro intenta de nuevo", key: 1, duration: 2 });
    }
  };

  useEffect(() => {
    fetchLendData(); // Cargar datos al montar el componente
  }, []);

  return { lendData, loading, contextHolder, handleReturnBook };
};

export default useLendTable;