import Cards from "./components/cards";
import React, { useState } from "react";
import { Button, Typography, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;

import AddBookModal from "./components/addBookModal";
import { useCardsData } from "./hooks/useCardData";
import BookSearch from "./components/BookSearch";
import Nav from "../../components/Nav/Nav";

function Home() {
    const { handleSearch, cardsData, contextHolder, resetFilters, refreshData, selectField, setSelectField } = useCardsData();
    const [isModalOpen, setIsModalOpen] = useState({});

    const handleToggleModal = (index, value) => {
        setIsModalOpen((prev) => ({
            ...prev,
            [index]: value,
        }));
    };

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
                        <Select
                            value={selectField}
                            onChange={(value) => setSelectField(value)}
                            style={{ width: '100%' }}
                        >
                            <Select.Option value="">Buscar por</Select.Option>
                            <Select.Option value="name">Nombre de libro</Select.Option>
                            <Select.Option value="isbn">Numero de isbn</Select.Option>
                        </Select>
                        <BookSearch handleSearch={handleSearch} resetFilters={resetFilters} selectField={selectField}/>
                    </div>
                    <Cards cardsData={cardsData} />
                </div>
            </div>
            <AddBookModal isModalOpen={isModalOpen} handleToggleModal={handleToggleModal} refreshData={refreshData} />
        </div>
    );
}

export default Home;