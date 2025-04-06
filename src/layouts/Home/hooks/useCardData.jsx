import { useEffect, useState } from "react";
import { getAllBooks } from "../../../services/books";

export const useCardsData = () => {
  const [search, setSearch] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [cardsData, setCardsData] = useState([]);

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
    // const normalizedSearch = value.toLowerCase(); // Normalizar la búsqueda a minúsculas
    // const filtered = cardsData.filter((book) => {
    //   const bookName = book.name.toLowerCase();
    //   const bookISBN = book.ISBN.toLowerCase();
    //   return (
    //     bookName.includes(normalizedSearch) ||
    //     bookISBN.includes(normalizedSearch)
    //   );
    // });
    // setCardsData(filtered);

    // // Reiniciar las tarjetas visibles al filtrar
    // setVisibleCards([]);
    // setTimeout(() => {
    //   filtered.forEach((_, index) => {
    //     setTimeout(() => {
    //       setVisibleCards((prev) => [...prev, index]);
    //     }, index * 200);
    //   });
    // }, 100);
  };

  return { cardsData, search, setSearch, handleSearch, refreshData };
};
