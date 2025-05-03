import { useEffect, useState } from 'react';
import { Form, Typography, Popconfirm, message } from 'antd'; // Importa Form aquí
import { deleteUser, getAllUsers, updateUser } from '../../../services/users';

const useEditableTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [editingKey, setEditingKey] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    // Función para obtener todos los usuarios
    const fetchUsers = async () => {
        const key = 'fetchUsers'; // Clave única para identificar el mensaje
        messageApi.loading({ content: 'Cargando usuarios...', key, duration: 0 });
        try {
            const response = await getAllUsers();
            if (response && response.data) {
                const reversedData = [...response.data].reverse();
                setData(reversedData);
            }
            messageApi.success({ content: 'Listo! 😃', key, duration: 2 });
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            messageApi.error({ content: 'Error al cargar los usuarios.', key, duration: 2 });
        }
    };

    const refreshData = () => {
        setRefresh(prev => prev + 1);
    }

    useEffect(() => {
        fetchUsers(); // Cargar datos al montar el componente
    }, [refresh]);

    const isEditing = (record) => record.id === editingKey;

    const edit = (record) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.id);

            if (index > -1) {
                messageApi.loading({ content: 'Procesando...', key });
                const item = newData[index];
                const updatedData = { ...item, ...row };
                delete updatedData.key;

                await updateUser(key, updatedData);
                newData.splice(index, 1, updatedData);
                setData(newData);
                setEditingKey('');
                messageApi.success({ content: 'Listo! 😃', key });
            }
        } catch (errInfo) {
            messageApi.error({ content: 'Error al editar este usuario 😓', key });
            console.log('Validación fallida:', errInfo);
        }
    };

    const remove = async (key) => {
        try {
            messageApi.loading({ content: 'Procesando...', key });
            await deleteUser(key);
            const newData = data.filter((item) => item.id !== key);
            setData(newData);
            messageApi.success({ content: 'Listo! 😃', key });

        } catch (error) {
            messageApi.error({ content: "No pudimos eliminar este usuario, tiene un prestamo pendiente. Devuelve el prestamo y vuelve a intentarlo", key });
            console.error('Error al eliminar el usuario:', error);
        }
    };

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            editable: true,
        },
        {
            title: 'Correo',
            dataIndex: 'email',
            editable: true,
        },
        {
            title: 'Identificación',
            dataIndex: 'identification',
            editable: true,
        },
        {
            title: 'Dirección',
            dataIndex: 'address',
            editable: true,
        },
        {
            title: 'Telefono',
            dataIndex: 'phone',
            editable: false,
        },
        {
            title: 'Acción',
            width: '12%',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8 }}>
                            Guardar
                        </Typography.Link>
                        <Popconfirm title="¿Estás seguro de cancelar?" onConfirm={cancel}>
                            <a>Cancelar</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Editar
                    </Typography.Link>
                );
            },
        },
        {
            title: 'Eliminar',
            width: '8%',
            dataIndex: 'operation',
            render: (_, record) => (
                <Popconfirm title="¿Estás seguro de eliminar este usuario?" onConfirm={() => remove(record.id)}>
                    <a>Eliminar</a>
                </Popconfirm>
            ),
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'lended' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return {
        refreshData,
        messageApi,
        contextHolder,
        form,
        data,
        editingKey,
        isEditing,
        edit,
        cancel,
        save,
        mergedColumns,
    };
};


export default useEditableTable;