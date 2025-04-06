import React from "react";
import imgLogo from "../../assets/Screenshot 2025-03-30 144759.png";

import { Button, Card, Form, Input, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import BlurText from "../../components/TextBlur/textBlur";
import { useValidations } from "./hooks/useValidatios";
import { useAuth } from "../../context/AuthContext";
const { Title } = Typography;

function Sign() {

    const { formData, handleChange, handleAnimationComplete, showSignInButton, showPasswordInput, showForm, errors } = useValidations(); // Usa el hook
    const { sesion } = useAuth();
    let loading = false;

    const handleSubmit = (e) => {
        sesion(formData);
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            position: "absolute",
            top: 0,
            left: 0
        }}>
            {!showForm ?
                <BlurText
                    text={"Encruentra todos tus libros de una manera unica" || ''}
                    delay={30}
                    animateBy="letters"
                    fontSize={50}
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="text-8xl mb-8"
                />
                :
                <Card style={{ width: 400, borderRadius: 20 }} className="fade-in-up">
                    <Form
                        name="login"
                        initialValues={{ remember: true }}
                        onFinish={handleSubmit}
                        autoComplete="off"
                        style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}
                    >
                        <img alt="logo" src={imgLogo} style={{ width: 60, borderRadius: 20 }} />

                        <Title level={3} style={{ marginBottom: 20 }}>Inicio de sesión</Title>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Por favor ingresa tu username.' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Correo" name="username" value={formData.username} onChange={handleChange} />
                        </Form.Item>
                        {errors.username && <p style={{ color: 'red' }} className="fade-in-login">{errors.username}</p>}
                        {showPasswordInput && (
                            <Form.Item
                                name="Contraseña"
                                rules={[{ required: true, message: 'Por favor ingresa tu contraseña.' }]}
                            >
                                <Input prefix={<LockOutlined />} type="password" placeholder="Contraseña" name="password" value={formData.password} onChange={handleChange} />
                            </Form.Item>
                        )}
                        {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
                        {showSignInButton && (
                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    Iniciar sesión
                                </Button>
                            </Form.Item>
                        )}
                    </Form>
                </Card>
            }
        </div>
    );
}

export default Sign;
