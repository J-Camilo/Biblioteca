import React from 'react';
import { Table, Tag, Button, Popconfirm } from 'antd';

const LendTable = ({ lendData, loading, handleReturnBook }) => {
    const columns = [
        {
            title: 'Usuario',
            dataIndex: 'userName',
            key: 'userName',
            render: (text, record) => (
                <div>
                    <strong>{record.userName}</strong>
                    <br />
                    <small>{record.userEmail}</small>
                </div>
            ),
        },
        {
            title: 'Libro',
            dataIndex: 'bookName',
            key: 'bookName',
            render: (text, record) => (
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <img src={record.bookUrl} alt="book" style={{ width: 50, height: 50, objectFit: 'cover' }} />
                    <strong>{record.bookName}</strong>
                </div>
            ),
        },
        {
            title: 'Fecha de Préstamo',
            dataIndex: 'date_lend',
            key: 'date_lend',
        },
        {
            title: 'Estado',
            dataIndex: 'isReturned',
            key: 'isReturned',
            render: (isReturned) => (
                <Tag color={isReturned ? 'green' : 'red'}>
                    {isReturned ? 'Devuelto' : 'No Devuelto'}
                </Tag>
            ),
        },
        {
            title: 'Acción',
            key: 'action',
            render: (_, record) => (
                !record.isReturned && (
                    <Popconfirm
                        title="¿Estás seguro de marcar este libro como devuelto?"
                        onConfirm={() => {
                            handleReturnBook(record.user_id, { book_id: record.book_id, user_id: record.user_id, date_lend: record.date_lend });;
                        }}
                    >
                       <a>Devolver</a>
                    </Popconfirm>
                )
            ),
        },
    ];

    return (
        <Table
            dataSource={lendData}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={false}
            scroll={{ y: 55 * 9 }}
            bordered
        />
    );
};

export default LendTable;