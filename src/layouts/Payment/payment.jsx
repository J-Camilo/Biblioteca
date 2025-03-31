import React, { useState, useEffect } from "react";
import { Button, Typography, Input, Card, Alert } from "antd";

import { BookOutlined, LogoutOutlined, } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import StepperPay from "./components/stepperPay";
const { Title } = Typography;

function Payment() {
    const navigate = useNavigate();

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
            <div style={{
                padding: 20,
                height: "90vh",
                width: "100%",
            }} className="fade-in-up">
                <div style={{ padding: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 30 }} className="fade-in-up">
                    <Title level={2} style={{ marginBottom: 0, color: "white", borderLeft: "white 2px solid", paddingLeft: 10 }}>Compra de libro [a12] <BookOutlined /></Title>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <Button
                            type="primary"
                            icon={<LogoutOutlined />}
                            onClick={() => navigate("/")}
                        >
                            Cancelar la compra
                        </Button>
                        <p>Usuario</p>
                    </div>
                </div>
                <div style={{ display: "flex", gap: 10, height: "60vh" }}>
                        <StepperPay />
                </div>
            </div>
        </div>
    );
}

export default Payment;
