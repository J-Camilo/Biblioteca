import Cards from "./components/cards";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button, Typography, Input, Card, Alert } from "antd";
import { BookOutlined, FilterOutlined, LogoutOutlined, PlusOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Title } = Typography;

import AddBookModal from "./components/addBookModal";
import imgPay from "../../assets/icons8-loading.gif";
import { getDecryptedCookie } from "../../utils/cookieManager";
import DetailLends from "./components/detailLends";

function Home() {
    const { sesionOut } = useAuth();
    const userData = getDecryptedCookie("auth");
    const [isContentLoaded, setIsContentLoaded] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState({});
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
                    <div style={{ padding: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 30 }} className="fade-in-up">
                        <Title level={2} style={{ marginBottom: 0, color: "white", borderLeft: "white 2px solid", paddingLeft: 10 }}>Lista de libros <BookOutlined /></Title>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                            {/* <Search
                                placeholder="Busca el libro"
                                enterButton="Buscar"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onSearch={handleSearch}
                            /> */}
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => handleToggleModal('modal-add', true)}
                            >
                                Agregar un libro
                            </Button>
                            <Button
                                type="primary"
                                onClick={() => setIsDrawerOpen(true)}
                                icon={<FilterOutlined />}
                            >
                                Prestamos
                            </Button>
                            <Button
                                type="primary"
                                icon={<LogoutOutlined />}
                                onClick={sesionOut}
                            >
                                Cerrar sesión
                            </Button>
                            <p style={{ textTransform: "capitalize" }}>{userData.user.name}</p>
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: 10, height: "60vh" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: 20, position: "static", background: "black", width: "18%", borderRadius: 10, marginTop: 20 }}>
                            <Title level={2} style={{ marginBottom: 0, color: "white" }}>Filtros</Title>
                            <Alert
                                message="info"
                                description="Filtros no disponibles versión de pruebas iberoamericana."
                                type="info"
                                showIcon
                            />
                        </div>
                        <Cards />

                    </div>
                </div>
            )}
            <AddBookModal isModalOpen={isModalOpen} handleToggleModal={handleToggleModal} />
            <DetailLends isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
        </div>
    );
}

export default Home;