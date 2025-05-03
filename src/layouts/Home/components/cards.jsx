import React, { useState } from "react";
import { Typography, Card, Tooltip } from "antd";
import BookDetailsModal from "./BookDetailsModal";
import { useCardsData } from "../hooks/useCardData";
import { deleteBook } from "../../../services/books";
import { useMouseEffect } from "../hooks/useMouseEffect";
import useBookDetailsModal from "../hooks/useBookDetailsModal";
import imageprueba from "../../../assets/Screenshot 2025-03-30 144759.png"

const { Title } = Typography;

const styleCardApp = {
    margin: 15,
    cursor: "pointer",
    borderRadius: 25,
    width: "210px",
    height: "400px",
    background: "black",
    display: "flex",
    boxShadow: "0px 0px 10px #22557b",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    transition: "transform 0.3s ease",
};

function Cards({cardsData, refreshData}) {
    const { cardsDataUser, lend, alert, showAlert, setShowAlert } = useCardsData();
    const {
        seeEdit,
        setSeeEdit,
        selectedUser,
        handleUserChange,
    } = useBookDetailsModal();

    const [isModalOpen, setIsModalOpen] = useState({});
    const [dataModal, setDataModal] = useState('');

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
            <div style={{ display: 'flex', gap: '10px', width: '100%', height: '80vh', flexWrap: 'wrap', overflowX: 'auto' }}>
                {cardsData?.map((card, index) =>
                    <Tooltip title="Toca para ver" key={index}>
                        <Card
                            key={card.id}
                            style={{ ...styleCardApp, ...styles[card.id] }}
                            onMouseMove={(e) => { handleMouseMoveCardApp(e, card.id) }}
                            onMouseLeave={() => handleMouseLeaveCardApp(card.id)}
                            onClick={() => handleCardClick(card)}
                        >
                            <img
                                src={card.url ? card.url : imageprueba}
                                alt="Image"
                                style={{
                                    width: "170px",
                                    borderRadius: 12,
                                }}
                            />

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
                                    <strong>isbn:</strong>
                                    <span>{card.isbn}</span>
                                </div>
                            </div>
                        </Card>
                    </Tooltip>
                )}
            </div>
            <BookDetailsModal
                isModalOpen={isModalOpen}
                handleToggleModal={handleToggleModal}
                dataModal={dataModal}
                seeEdit={seeEdit}
                setSeeEdit={setSeeEdit}
                selectedUser={selectedUser}
                handleUserChange={handleUserChange}
                lend={lend}
                cardsDataUser={cardsDataUser}
                deleteBook={deleteBook}
                refreshData={refreshData}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                alert={alert}
            />
        </>
    );
}

export default Cards;
