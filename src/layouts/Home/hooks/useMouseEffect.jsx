import { useState } from "react";

export const useMouseEffect = () => {
  const [styles, setStyles] = useState({});
  const [stylePerfil, setStylePerfil] = useState({});
  const [styleConfiguracion, setStyleConfiguracion] = useState({});

  // Card Hover Effects
  const handleMouseMoveCardApp = (e, id) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const shadowX = (x / rect.width) * 2;
    const shadowY = (y / rect.height) * 2;

    setStyles((prev) => ({
      ...prev,
      [id]: {
        transform: `rotateY(${x / 10}deg) rotateX(${y / 10}deg) scale(1.05)`,
        boxShadow: `${shadowX}px ${shadowY}px 30px #22557b`,
        transition: "transform 0.1s, box-shadow 0.1s",
      },
    }));
  };

  const handleMouseLeaveCardApp = (id) => {
    setStyles((prev) => ({
      ...prev,
      [id]: {
        transform: "rotateY(0deg) rotateX(0deg) scale(1)",
        boxShadow: "0px 0px 10px #22557b",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      },
    }));
  };

  return {
    handleMouseMoveCardApp,
    handleMouseLeaveCardApp,
    styles,
    setStyles,
    stylePerfil,
    setStylePerfil,
    styleConfiguracion,
    setStyleConfiguracion,
  };
};
