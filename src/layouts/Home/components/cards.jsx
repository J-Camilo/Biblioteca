import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useCardsData } from "../hooks/useCardData";
import { useMouseEffect } from "../hooks/useMouseEffect";
import { Button, Typography, Card, Tooltip, Alert } from "antd";
import { AuditOutlined, DeleteOutlined, PayCircleOutlined } from "@ant-design/icons";
import imageprueba from "../../../assets/Screenshot 2025-03-30 144759.png"
import { deleteBook } from "../../../services/books";
import ModalCard from "../../../components/modal/modal";

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
    const { cardsData, refreshData, lend, alert, showAlert, setShowAlert} = useCardsData();
    const [isModalOpen, setIsModalOpen] = useState({});
    const [dataModal, setDataModal] = useState('');
    const navigate = useNavigate();

    const handleToggleModal = (index, value) => {
        setIsModalOpen(prev => ({
            ...prev,
            [index]: value,
        }));
        setShowAlert(false);
    };

    const {
        styles,
        handleMouseMoveCardApp,
        handleMouseLeaveCardApp,
    } = useMouseEffect();

    const handleCardClick = (card) => {
        setDataModal(card);
        handleToggleModal('modal-details', true);
    };

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    return (
        <>
            {cardsData.map((card, index) =>
                <Tooltip title="Toca para ver" key={index}>
                    <Card
                        key={card.id}
                        style={{ ...styleCardApp, ...styles[card.id] }}
                        onMouseMove={(e) =>{ handleMouseMoveCardApp(e, card.id)}}
                        onMouseLeave={() => handleMouseLeaveCardApp(card.id)}
                        onClick={() => handleCardClick(card)}
                    >
                        {/* Imagen */}
                        <img src={imageprueba} alt="Image" style={{ width: "170px", borderRadius: 12,padding:3 }} />

                        {/* Título */}
                        <Title level={5} style={{ color: "white", marginBottom: 0, textAlign: "center", overflow: "hidden" }}>
                            <span className="animated-text">{truncateText(card.name, 15)}</span>
                        </Title>

                        <div style={{ padding: 15 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong>Precio:</strong>
                                <span>${card.price}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong>Stock:</strong>
                                <span>{card.quantity}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong>ISBN:</strong>
                                <span>{card.ISBN}</span>
                            </div>
                        </div>
                    </Card>
                </Tooltip>
            )}
            <ModalCard
                index={'modal-details'}
                title="Detalles del libro"
                isModalOpen={isModalOpen}
                handleToggleModal={handleToggleModal}
            >
                <div style={{ padding: 15 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>Nombre:</strong>
                        <span>{dataModal.name}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>Cantidad de stock:</strong>
                        <span>{dataModal.quantity}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>Precio:</strong>
                        <span>${dataModal.price}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>ISBN:</strong>
                        <span>{dataModal.ISBN}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: "column" }}>
                        <strong>sypnosis:</strong>
                        <span>{dataModal.sypnosis}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: "column", marginTop: '10px', gap: 10 }}>
                    <Button type="primary" icon={<AuditOutlined />} onClick={() => {lend(dataModal); }}>
                        Prestar
                    </Button>
                    <Button type="primary" icon={<PayCircleOutlined />} onClick={() => navigate(`/payment/book/${dataModal.id}`)}>
                        Comprar
                    </Button>
                    <Button type="primary" icon={<DeleteOutlined />} onClick={async () => { await deleteBook(dataModal.id); handleToggleModal("modal-details", false); refreshData(); }}>
                        Eliminar
                    </Button>
                </div>
                {showAlert && (
                    <Alert
                        message={alert.message}
                        className="fade-in-up"
                        type={alert.type}
                        showIcon
                        closable
                        onClose={() => setShowAlert(false)} 
                        style={{ marginTop: '20px' }}
                    />
                )}
            </ModalCard>

        </>
    );
}

export default Cards;
