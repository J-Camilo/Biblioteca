import { useState } from 'react';
import { Form, Typography, Popconfirm } from 'antd'; // Importa Form aquí

const originData = Array.from({ length: 5 }).map((_, i) => ({
    key: i.toString(),
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
}));

const useEditableTable = () => {
    const [form] = Form.useForm(); // Ahora Form está definido
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({ name: '', age: '', address: '', ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
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
            dataIndex: 'age',
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
            title: 'Acción',
            dataIndex: 'operation',
            width: '12%',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
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
                <Popconfirm title="¿Estás seguro de eliminar este usuario?" onConfirm={() => { }}>
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
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return {
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