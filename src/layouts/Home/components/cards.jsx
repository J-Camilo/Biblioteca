import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useCardsData } from "../hooks/useCardData";
import { useMouseEffect } from "../hooks/useMouseEffect";
import { Button, Typography, Card, Tooltip } from "antd";
import { AuditOutlined, PayCircleOutlined } from "@ant-design/icons";
import imageprueba from "../../../assets/Screenshot 2025-03-30 144759.png"

const { Title } = Typography;

const styleCardApp = {
    margin: 15,
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
    const navigate = useNavigate();

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
                <Tooltip title="Toca para ver">
                    <Card
                        key={card.id}
                        style={{ ...styleCardApp, ...styles[card.id] }}
                        onMouseMove={(e) => handleMouseMoveCardApp(e, card.id)}
                        onMouseLeave={() => handleMouseLeaveCardApp(card.id)}
                        onClick={() => handleCardClick()}
                    >
                        <img src={imageprueba} alt="Image" style={{ width: "200px", borderRadius: 20 }} />
                        <Title level={5} style={{ color: "white", marginBottom: 0, textAlign: "center" }}>
                            {card.name}
                        </Title>
                        <div>
                            <Button
                                type="primary"
                                icon={<AuditOutlined />}
                            >
                                Rentar
                            </Button>
                            <Button
                                type="primary"
                                icon={<PayCircleOutlined />}
                                onClick={() => navigate("/payment")} 
                            >
                                Comprar
                            </Button>
                            <Button
                                type="primary"
                                icon={<PayCircleOutlined />}
                                onClick={() => navigate("/payment")} 
                            >
                                Eliminar
                            </Button>
                        </div>
                    </Card>
                </Tooltip>
            ) : null
        )
    );
}

export default Cards;
