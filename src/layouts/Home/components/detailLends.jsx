import React, { useState, useEffect } from "react";
import { Alert, Button, List, message } from "antd";
import DrawerDynamic from "../../../components/drawer/drawer";
import { getLendHistory, returnBook } from "../../../services/lend";

const DetailLends = ({ isDrawerOpen, setIsDrawerOpen }) => {
    const [lendsData, setLendsData] = useState([]);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const books = await getLendHistory(1);
                setLendsData(books);
            } catch (error) {
                console.error("Error al obtener el historial de préstamos:", error);
                setAlert({ type: "error", message: "Ocurrió un error al cargar los préstamos." });
            }
        };
        fetchData();
    }, []);

    const handleReturnBook = async (lendId) => {
        try {
            await returnBook(1, lendId);

            setLendsData((prev) => prev.filter((lend) => lend.book_id !== lendId));

            setAlert({ type: "success", message: "Libro devuelto exitosamente." });
            setTimeout(() => {setAlert(null); setIsDrawerOpen(false)}, 2000); 
        } catch (error) {
            console.error("Error al devolver el libro:", error);
            setAlert({ type: "error", message: "Ocurrió un error al devolver el libro." });
        }
    };

    return (
        <>
            <DrawerDynamic
                index={"drawer-lend"}
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="Detalles del Préstamo"
                placement="right"
                styless={{ width: "400px" }}
                loading={false}
            >
                {alert && (
                    <Alert
                        message={alert.message}
                        type={alert.type}
                        showIcon
                        closable
                        onClose={() => setAlert(null)}
                    />
                )}
                <div>
                    <List
                        dataSource={lendsData}
                        renderItem={(lend) => (
                            <List.Item
                                key={lend.book_id}
                                actions={[
                                    <Button
                                        type="primary"
                                        danger
                                        onClick={() => handleReturnBook(lend.book_id)}
                                    >
                                        Devolver
                                    </Button>,
                                ]}
                            >
                                <List.Item.Meta
                                    title={lend.book_name}
                                    description={
                                        <>
                                            <p>
                                                <strong>Fecha de préstamo:</strong> {lend.date_lend}
                                            </p>
                                            <p>
                                                <strong>Fecha de devolución:</strong>{" "}
                                                {lend.date_deliver}
                                            </p>
                                            <p>
                                                <strong>Estado:</strong> {lend.status}
                                            </p>
                                        </>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </DrawerDynamic>
        </>
    );
};

export default DetailLends;