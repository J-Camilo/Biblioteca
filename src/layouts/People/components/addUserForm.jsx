import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { saveUser } from '../../../services/users';

const AddUserForm = ({ refreshData, messageApi, handleToggleModal }) => {
    const [form] = Form.useForm();

    // Función para manejar el envío del formulario
    const handleSubmit = async (values) => {
        try {
            messageApi.loading({ content: 'Procesando...', key: 'saveUser', duration: 0 });
            await saveUser(values); // Llama a la API para guardar el usuario
            messageApi.success({ content: 'Usuario creado correctamente.', key: 'saveUser', duration: 2 });
            
            setTimeout(() => { 
                handleToggleModal('modal-add', false); // Cierra el modal
                form.resetFields(); // Limpia el formulario
                refreshData();
            })
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            messageApi.error({ content: 'Error al crear el usuario.', key: 'saveUser', duration: 2 });
        }
    };

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    name: '',
                    email: '',
                    address: '',
                    identification: '',
                    phone: '',
                }}
            >
                {/* Campo Nombre */}
                <Form.Item
                    label="Nombre"
                    name="name"
                    rules={[
                        { required: true, message: 'Por favor, ingresa el nombre.' },
                    ]}
                >
                    <Input placeholder="Nombre completo" />
                </Form.Item>

                {/* Campo Correo Electrónico */}
                <Form.Item
                    label="Correo Electrónico"
                    name="email"
                    rules={[
                        { required: true, message: 'Por favor, ingresa el correo electrónico.' },
                        { type: 'email', message: 'El correo electrónico no es válido.' },
                    ]}
                >
                    <Input placeholder="Correo electrónico" />
                </Form.Item>

                {/* Campo Dirección */}
                <Form.Item
                    label="Dirección"
                    name="address"
                    rules={[
                        { required: true, message: 'Por favor, ingresa la dirección.' },
                    ]}
                >
                    <Input placeholder="Dirección" />
                </Form.Item>

                {/* Campo Identificación */}
                <Form.Item
                    label="Identificación"
                    name="identification"
                    rules={[
                        { required: true, message: 'Por favor, ingresa la identificación.' },
                    ]}
                >
                    <Input placeholder="Número de identificación" />
                </Form.Item>

                {/* Campo Teléfono */}
                <Form.Item
                    label="Teléfono"
                    name="phone"
                    rules={[
                        { required: true, message: 'Por favor, ingresa el teléfono.' },
                    ]}
                >
                    <Input placeholder="Número de teléfono" />
                </Form.Item>

                {/* Botones de Envío */}
                <Form.Item>
                    <Button type="primary" block htmlType="submit">
                        Guardar
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddUserForm;