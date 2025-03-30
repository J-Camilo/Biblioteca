import React, { useState, useEffect } from "react";
import { Button, Typography, Input, Card, Alert } from "antd";

import { BookOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import Cards from "./components/cards";
const { Search } = Input;
const { Title } = Typography;

function Home() {

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
            backdropFilter: "blur(3px)",
        }}>
            {/* <div style={{ display: "flex", gap: 10, alignItems: "center", background: "white", padding: 7, borderRadius: 10}} className="fade-in-up">
                <Title level={5} style={{ marginBottom: 0}}>Cargando contenido</Title>
                <img alt="Logo" src={imgLogo} style={{ width: 35}} />
            </div> */}

            <div style={{
                padding: 20,
                height: "90vh",
                width: "100%",
            }} className="fade-in-up">
                <div style={{ padding: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 30 }} className="fade-in-up">
                    <Title level={2} style={{ marginBottom: 0, color: "white", borderLeft: "white 2px solid", paddingLeft: 10 }}>Lista de libros <BookOutlined /></Title>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                        >
                            Agregar un libro
                        </Button>
                        <Button
                            type="primary"
                            icon={<FilterOutlined />}
                        >
                            Prestamos
                        </Button>
                        <Search placeholder="Busca el libro" enterButton="Buscar" loading />
                        <p>Usuario</p>
                    </div>
                </div>
                <div style={{ display: "flex", gap: 10, height: "60vh" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: 20, position: "static", background: "black", width: "18%", borderRadius: 10, marginTop: 20 }}>
                        <Title level={2} style={{ marginBottom: 0, color: "white" }}>Filtros</Title>
                        <Alert
                            message="info"
                            description="Filtros no disponibles."
                            type="info"
                            showIcon
                        />
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", marginTop: 40, width: "80%" }}>
                        <Cards />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
