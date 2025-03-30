import { useEffect, useState } from "react";

export const useCardsData = () => {
  const [cardsData, setCardsData] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = [
        { id: 1, name: "BI" },
        { id: 2, name: "Fotos" },
        // { id: 3, name: "Alertamiento" },
        { id: 5, name: "Analitica ML" },
        { id: 4, name: "IA Generativa" },

      ];
      setCardsData(data);
    };
    fetchData();
  }, []);

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

  return { cardsData, visibleCards };
};
