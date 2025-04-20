import React from 'react'
import { getDecryptedCookie } from '../../utils/cookieManager';
import { BookOutlined, FilterOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';


const { Title } = Typography;

const Nav = ({ children, title }) => {
    const userData = getDecryptedCookie("auth");
    const { sesionOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Función para determinar si un botón debe estar visible
    const isButtonVisible = (route) => {
        return location.pathname !== route;
    };

    return (
        <div style={{ padding: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 30 }} className="fade-in-up">
            <Title level={3} style={{ marginBottom: 0, color: "white", borderLeft: "white 2px solid", paddingLeft: 10 }}>{title} <BookOutlined /></Title>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                {children}
                <Button
                    type="primary"
                    onClick={() => navigate('/people')}
                    icon={<UserOutlined />}
                    style={{ display: isButtonVisible('/people') ? 'flex' : 'none' }}
                >
                    Usuarios
                </Button>

                <Button
                    type="primary"
                    onClick={() => navigate('/lends')}
                    icon={<FilterOutlined />}
                    style={{ display: isButtonVisible('/lends') ? 'flex' : 'none' }}
                >
                    Todos los préstamos
                </Button>

                <Button
                    type="primary"
                    icon={<BookOutlined />}
                    style={{ display: isButtonVisible('/') ? 'flex' : 'none' }}
                    onClick={() => navigate("/")}
                >
                    Libros
                </Button>

                <Button
                    type="primary"
                    icon={<LogoutOutlined />}
                    onClick={sesionOut}
                >
                    Cerrar sesión
                </Button>
                <p style={{ textTransform: "capitalize" }}>{userData.user.name} <UserOutlined /></p>
            </div>
        </div>
    )
}

export default Nav