import Cards from "./components/cards";
import React, { useState, useEffect } from "react";
import { Button, Typography, Input, Alert } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Title } = Typography;

import AddBookModal from "./components/addBookModal";
import imgPay from "../../assets/icons8-loading.gif";
import Nav from "../../components/Nav/Nav";
import { useCardsData } from "./hooks/useCardData";
import BookSearch from "./components/BookSearch";

function Home() {
    const { handleSearch, cardsData, contextHolder, resetFilters } = useCardsData();
    const [isModalOpen, setIsModalOpen] = useState({});
    const [isContentLoaded, setIsContentLoaded] = useState(false);

    const handleToggleModal = (index, value) => {
        setIsModalOpen((prev) => ({
            ...prev,
            [index]: value,
        }));
    };

    // Temporizador para simular la carga
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsContentLoaded(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh",
            width: "95%",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backdropFilter: "blur(4px)",
        }}>
            {contextHolder}
            {!isContentLoaded && (
                <div style={{ display: "flex", gap: 10, alignItems: "center", background: "white", padding: 7, borderRadius: 10 }} className="fade-in-up">
                    <Title level={5} style={{ marginBottom: 0 }}>Cargando contenido</Title>
                    <img alt="Logo" src={imgPay} style={{ width: 35 }} />
                </div>
            )}

            {isContentLoaded && (
                <div style={{
                    padding: 20,
                    height: "90vh",
                    width: "100%",
                }} className="fade-in-up">
                    <Nav
                        title="Lista de libros"
                    >
                        <Button
                            type="dashed"
                            icon={<PlusOutlined />}
                            onClick={() => handleToggleModal('modal-add', true)}
                        >
                            Agregar un libro
                        </Button>
                    </Nav>

                    <div style={{ display: "flex", gap: 10, height: "60vh" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: 20, position: "static", background: "black", width: "18%", borderRadius: 10, marginTop: 20 }}>
                            <Title level={2} style={{ marginBottom: 0, color: "white" }}>Filtros</Title>
                            <BookSearch handleSearch={handleSearch} resetFilters={resetFilters} />
                        </div>
                        <Cards cardsData={cardsData}/>
                    </div>
                </div>
            )}
            <AddBookModal isModalOpen={isModalOpen} handleToggleModal={handleToggleModal} />
        </div>
    );
}

export default Home;