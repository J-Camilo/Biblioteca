import { useEffect, useState } from "react";
import { getAllBooks } from "../../../services/books";

export const useCardsData = () => {
  const [refesh, setRefesh] = useState(0);
  const [search, setSearch] = useState('');
  const [cardsData, setCardsData] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);

  const refreshData = () => {
    setRefesh((prev) => prev + 1); 
  }

  
  useEffect(() => {
    const fetchData = async () => {
      const books = await getAllBooks();
      setCardsData(books);
    };
    fetchData();
  }, [refesh]);

  const handleSearch = (value) => {
    const normalizedSearch = value.toLowerCase(); // Normalizar la búsqueda a minúsculas
    const filtered = cardsData.filter((book) => {
      const bookName = book.name.toLowerCase();
      const bookISBN = book.ISBN.toLowerCase();
      return (
        bookName.includes(normalizedSearch) ||
        bookISBN.includes(normalizedSearch)
      );
    });
    setCardsData(filtered);

    // Reiniciar las tarjetas visibles al filtrar
    setVisibleCards([]);
    setTimeout(() => {
      filtered.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards((prev) => [...prev, index]);
        }, index * 200);
      });
    }, 100);
  };

  useEffect(() => {
    const revealCards = () => {
      cardsData.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards((prev) => [...prev, index]);
        }, index * 200);
      });
    };
    revealCards();
  }, [cardsData]);

  return { cardsData, visibleCards, search, setSearch, handleSearch, refreshData };
};
