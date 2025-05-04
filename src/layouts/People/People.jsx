import React, { useState } from 'react';
import { Button, Form, Table } from 'antd';
import Nav from '../../components/Nav/Nav';
import EditableCell from '../../components/EditTablet/EditableCell';
import useEditableTable from './hooks/useEditableTable';
import { PlusOutlined } from '@ant-design/icons';
import ModalCard from '../../components/modal/modal';
import AddUserForm from './components/addUserForm';

const People = () => {
  const { fetchUsers, messageApi, contextHolder, form, data, mergedColumns, edit, save, cancel } = useEditableTable();

  const [isModalOpen, setIsModalOpen] = useState({});

  const handleToggleModal = (index, value) => {
    setIsModalOpen(prev => ({
      ...prev,
      [index]: value,
    }));
  };

  return (
    <>
      {contextHolder}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100vh',
          width: '95%',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <div
          style={{
            padding: 20,
            height: '90vh',
            width: '100%',
          }}
          className="fade-in-up"
        >
          <Nav title="Usuarios">
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={() => handleToggleModal('modal-add', true)}
            >
              Agregar un usuario
            </Button>
          </Nav>
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell, // Usa el componente personalizado
                },
              }}
              bordered
              dataSource={data}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={false}
              scroll={{ y: 55 * 9 }}
            />
          </Form>
        </div>
      </div>
      <ModalCard
        index={'modal-add'}
        title="+ Agrega un usuario"
        isModalOpen={isModalOpen}
        handleToggleModal={handleToggleModal}
      >
        < AddUserForm refreshData={fetchUsers} messageApi={messageApi}  handleToggleModal={handleToggleModal}/>
      </ModalCard>
    </>
  );
};

export default People;