import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useCardsData } from "../hooks/useCardData";
import { useMouseEffect } from "../hooks/useMouseEffect";
import { Button, Typography, Card, Tooltip, Alert, Popconfirm } from "antd";
import { AuditOutlined, DeleteOutlined, EditOutlined, PayCircleOutlined } from "@ant-design/icons";
import imageprueba from "../../../assets/Screenshot 2025-03-30 144759.png"
import { deleteBook } from "../../../services/books";
import ModalCard from "../../../components/modal/modal";
import EditBookModal from "./editBookModal";
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

function Cards() {
    const { contextHolder, cardsData, loading, refreshData, lend, alert, showAlert, setShowAlert } = useCardsData();
    const [isModalOpen, setIsModalOpen] = useState({});
    const [dataModal, setDataModal] = useState('');
    const [seeEdit, setSeeEdit] = useState(false);
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
            {contextHolder}
            <div style={{ display: 'flex', gap: '10px', width: '100%', height: '80vh', flexWrap: 'wrap', overflowX: 'auto' }}>
                {cardsData.data?.map((card, index) =>
                    <Tooltip title="Toca para ver" key={index}>
                        <Card
                            key={card.id}
                            style={{ ...styleCardApp, ...styles[card.id] }}
                            onMouseMove={(e) => { handleMouseMoveCardApp(e, card.id) }}
                            onMouseLeave={() => handleMouseLeaveCardApp(card.id)}
                            onClick={() => handleCardClick(card)}
                        >
                            {/* Imagen */}
                            <img
                                src={card.url ? card.url : imageprueba}
                                alt="Image"
                                style={{
                                    width: "170px",
                                    borderRadius: 12,
                                }}
                            />

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
                            </div>
                        </Card>
                    </Tooltip>
                )}
            </div>
            <ModalCard
                index={'modal-details'}
                title="Detalles del libro"
                isModalOpen={isModalOpen}
                handleToggleModal={handleToggleModal}
            >
                {!seeEdit ?
                    <div className="fade-in-up">
                        <div style={{ padding: 15 }}>
                            <div style={{ display: 'flex', gap: 10, width: '100%', marginBottom: 10 }}>
                                <img src={dataModal.url} alt="imgLibrary" style={{ width: '30%', borderRadius: '10px' }} />
                                <div style={{ width: '100%' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <h1>{dataModal.name}</h1>
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
                                        <span>{dataModal.isbn}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: "column" }}>
                                <strong><h2>Sypnosis</h2></strong>
                                <span>{dataModal.sypnosis}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: "row", marginTop: '10px', gap: 10 }}>
                            <Button color="blue" type="dashed" block icon={<EditOutlined />} onClick={() => setSeeEdit(true)}>
                                Editar
                            </Button>
                            <Popconfirm title="¿Estás seguro de eliminar?" onConfirm={async () => { await deleteBook(dataModal.id); handleToggleModal("modal-details", false); refreshData(); }}>
                                <Button type="primary" block danger icon={<DeleteOutlined />} >
                                    Eliminar
                                </Button>
                            </Popconfirm>
                            <Button loading={loading} block disabled={!dataModal.quantity || dataModal.quantity <= 0} type="dashed" icon={<AuditOutlined />} onClick={() => { lend(dataModal); }}>
                                Prestar
                            </Button>
                            <Button type="primary" block disabled={!dataModal.quantity || dataModal.quantity <= 0} icon={<PayCircleOutlined />} onClick={() => navigate(`/payment/book/${dataModal.id}`)}>
                                Vender
                            </Button>
                        </div>
                    </div>
                    :
                    <div className="fade-in-up">
                        <EditBookModal handleToggleModal={handleToggleModal} dataModal={dataModal} />
                        <Button type="primary" block danger onClick={() => setSeeEdit(false)}>
                            Cancelar
                        </Button>
                    </div>
                }
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
