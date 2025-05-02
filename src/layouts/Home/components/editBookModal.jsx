import {  useState } from "react";
import { EditOutlined  } from "@ant-design/icons";
import { Alert, Button, Form, Input } from "antd";
import { updateBook } from "../../../services/books";
import { useCardsData } from "../hooks/useCardData";

const EditBookModal = ({ handleToggleModal, dataModal }) => {
    const [form] = Form.useForm();
    const { refreshData } = useCardsData();
    const [alert, setAlert] = useState(null);

    const [wait, setWait] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleEditBook = async (values) => {
        try {
            setWait(true);
            const response = await updateBook(dataModal.id, values);
            if (response.success) {
                setAlert({ type: 'success', message: 'Editado con éxito' });
                setShowAlert(true);
                setWait(false);
                form.resetFields();
                setTimeout(() => { handleToggleModal('modal-details', false); setShowAlert(false); refreshData(); window.location.reload(); }, 2000);
            } else {
                setAlert({ type: 'error', message: 'Error al editar el libro' });
                setShowAlert(true);
            }
        } catch (error) {
            setAlert({ type: 'error', message: 'Error inesperado al editar el libro' });
            setShowAlert(true);
            setWait(false);
        }
    };

    return (
        <>
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
                onFinish={handleEditBook}
                autoComplete="off"
                style={{ marginTop: '10px' }}
                initialValues={dataModal}
            >
                <Form.Item
                    name="name"
                >
                    <Input placeholder={dataModal.name} />
                </Form.Item>

                <Form.Item
                    name="isbn"
                >
                    <Input placeholder={dataModal.isbn} />
                </Form.Item>

                <Form.Item
                    name="url"
                    rules={[
                        { type: 'url', message: 'La URL no es válida' },
                    ]}
                >
                    <Input placeholder={dataModal.url} />
                </Form.Item>

                <Form.Item
                    name="state"
                    initialValue={1}
                >
                    <Input type="number" min={1} max={2} placeholder="Estado (1 o 2)" />
                </Form.Item>

                <Form.Item
                    name="quantity"
                    validateTrigger={['onChange', 'onBlur']}
                >
                    <Input type="number" placeholder={dataModal.quantity} />
                </Form.Item>

                <Form.Item
                    name="price"
                >
                    <Input type="number" step="0.01" placeholder={dataModal.price} />
                </Form.Item>

                <Form.Item
                    name="sypnosis"
                >
                    <Input.TextArea rows={4} placeholder={dataModal.sypnosis} />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        icon={<EditOutlined />}
                        loading={wait}
                        block
                    >
                        Editar libro
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default EditBookModal;
