import React, { useState, useEffect } from "react";
import imgLogo from "../../assets/Screenshot 2025-03-30 144759.png";

import { Button, Card, Form, Input, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import BlurText from "../../components/TextBlur/textBlur";
const { Title } = Typography;
// import useLogin from "./hooks/post";

function Sign() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [showSignInButton, setShowSignInButton] = useState(false);
    const [showForm, setShowForm] = useState(false);

    //   const { login, loading, setLoading, error } = useLogin(); // Usa el hook
    let loading = false;

    useEffect(() => {
        const emailTimeout = setTimeout(() => {
            validateField('email', formData.email);
        }, 500);

        return () => clearTimeout(emailTimeout);
    }, [formData.email]);

    useEffect(() => {
        if (showPasswordInput) {
            const passwordTimeout = setTimeout(() => {
                validateField('password', formData.password);
            }, 500);

            return () => clearTimeout(passwordTimeout);
        }
    }, [formData.password, showPasswordInput]);

    const handleAnimationComplete = () => {
        setTimeout(() => {
            setShowForm(true);
        }, 1000);
    };

    const validateField = (field, value) => {
        let error = '';
        if (field === 'email') {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                error = 'Por favor ingresa un correo válido.';
                setShowPasswordInput(false);
            } else {
                setShowPasswordInput(true);
            }
        } else if (field === 'password') {
            if (value.length < 4) {
                error = 'La contraseña debe tener al menos 4 caracteres.';
                setShowSignInButton(false);
            } else {
                setShowSignInButton(true);
            }
        }
        setErrors(prevErrors => ({ ...prevErrors, [field]: error }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        // e.preventDefault();
        // login(formData.email, formData.password);
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
                    text="Encruentra todos tus libros de una manera unica"
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
                            name="email"
                            rules={[{ required: true, message: 'Por favor ingresa tu email.' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Correo" name="email" value={formData.email} onChange={handleChange} />
                        </Form.Item>
                        {errors.email && <p style={{ color: 'red' }} className="fade-in-login">{errors.email}</p>}
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
