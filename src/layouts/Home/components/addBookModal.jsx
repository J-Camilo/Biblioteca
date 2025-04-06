import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input } from "antd";
import { saveBook } from "../../../services/books";
import ModalCard from "../../../components/modal/modal";

const AddBookModal = ({ isModalOpen, handleToggleModal }) => {
    const [form] = Form.useForm();

    const [alert, setAlert] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [wait, setWait] = useState(false);

    const handleAddBook = async (values) => {
        try {
            setWait(true);
            const response = await saveBook(values);
            if (response.success) {
                setAlert({ type: 'success', message: 'Guardado con éxito' });
                setShowAlert(true);

                setWait(false);
                form.resetFields();
                setTimeout(() => { handleToggleModal('modal-add', false); setShowAlert(false); }, 2000);
            } else {
                setAlert({ type: 'error', message: 'Error al guardar el libro' });
                setShowAlert(true);
            }
        } catch (error) {
            setAlert({ type: 'error', message: 'Error inesperado al guardar el libro' });
            setShowAlert(true);
            setWait(false);
        }
    };

    return (
        <>
            <ModalCard
                index={'modal-add'}
                title="+ Agregar un nuevo libro"
                isModalOpen={isModalOpen}
                handleToggleModal={handleToggleModal}
            >
                {showAlert && (
                    <Alert
                        message={alert.message}
                        className="fade-in-up"
                        type={alert.type}
                        showIcon
                        closable
                        onClose={() => setShowAlert(false)} // Ocultar la alerta al cerrarla
                        style={{ marginBottom: '20px' }}
                    />
                )}
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleAddBook}
                    autoComplete="off"
                    style={{ marginTop: '10px' }}
                >
                    <Form.Item
                        name="name"
                        rules={[
                            { required: true, message: 'Por favor, ingresa el nombre del libro' },
                        ]}
                    >
                        <Input placeholder="Nombre del libro" />
                    </Form.Item>

                    <Form.Item
                        name="isbn"
                        rules={[
                            { required: true, message: 'Por favor, ingresa el ISBN' },
                            { pattern: /^\d{10,13}$/, message: 'El ISBN debe tener entre 10 y 13 dígitos' },
                        ]}
                    >
                        <Input placeholder="ISBN" />
                    </Form.Item>

                    <Form.Item
                        name="url"
                        rules={[
                            { required: true, message: 'Por favor, ingresa la URL de la imagen' },
                            { type: 'url', message: 'La URL no es válida' },
                        ]}
                    >
                        <Input placeholder="URL de la imagen" />
                    </Form.Item>

                    <Form.Item
                        name="state"
                        initialValue={1}
                        rules={[
                            { required: true, message: 'Por favor, selecciona un estado' },
                        ]}
                    >
                        <Input type="number" min={1} max={2} placeholder="Estado (1 o 2)" />
                    </Form.Item>

                    <Form.Item
                        name="quantity"
                        rules={[
                            { required: true, message: 'Por favor, ingresa la cantidad' },
                        ]}
                        validateTrigger={['onChange', 'onBlur']}
                    >
                        <Input type="number" placeholder="Cantidad" />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        rules={[
                            { required: true, message: 'Por favor, ingresa el precio' },
                        ]}
                    >
                        <Input type="number" step="0.01" placeholder="Precio" />
                    </Form.Item>

                    <Form.Item
                        name="sypnosis"
                        rules={[
                            { required: true, message: 'Por favor, ingresa la sinopsis' },
                        ]}
                    >
                        <Input.TextArea rows={4} placeholder="Sinopsis del libro" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<PlusOutlined />}
                            loading={wait}
                            block
                        >
                            Agregar libro
                        </Button>
                    </Form.Item>
                </Form>
            </ModalCard>
        </>
    );
};

export default AddBookModal;
