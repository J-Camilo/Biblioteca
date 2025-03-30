import React, { useState, useEffect } from "react";
import { Button, Typography, Card, Tooltip } from "antd";
import { useCardsData } from "../hooks/useCardData";
import { useMouseEffect } from "../hooks/useMouseEffect";

const { Title } = Typography;

const styleCardApp = {
    margin: 20,
    cursor: "pointer",
    borderRadius: 25,
    width: "210px",
    height: "320px",
    background: "black",
    display: "flex",
    boxShadow: "0px 0px 10px #22557b",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    transition: "transform 0.3s ease",
};

function Cards() {
    const { cardsData, visibleCards } = useCardsData();

    const {
        handleMouseMoveCardApp,
        handleMouseLeaveCardApp,
        styles,
    } = useMouseEffect();

    const handleCardClick = () => {
        // dispatch(toggleModal({ index: 1, isOpen: true }));
        // dispatch(setLoading(true));

        // setTimeout(() => {
        //     dispatch(setLoading(false));
        // }, 2000);
    };

    return (
        cardsData.map((card, index) =>
            visibleCards.includes(index) ? (
                <Tooltip title="Toca para ver más de esta categoria">
                    <Card
                        key={card.id}
                        style={{ ...styleCardApp, ...styles[card.id] }}
                        onMouseMove={(e) => handleMouseMoveCardApp(e, card.id)}
                        onMouseLeave={() => handleMouseLeaveCardApp(card.id)}
                        onClick={() => handleCardClick()}
                    >
                        <Title level={3} style={{ color: "white", marginBottom: 0, textAlign: "center" }}>
                            {card.name}
                        </Title>
                    </Card>
                </Tooltip>
            ) : null
        )
    );
}

export default Cards;
