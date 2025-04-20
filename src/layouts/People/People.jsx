import React from 'react';
import { Button, Form, Table } from 'antd';
import Nav from '../../components/Nav/Nav';
import EditableCell from '../../components/EditTablet/EditableCell';
import useEditableTable from './hooks/useEditableTable';
import { PlusOutlined } from '@ant-design/icons';

const People = () => {
  const {
    form,
    data,
    editingKey,
    isEditing,
    edit,
    cancel,
    save,
    mergedColumns,
  } = useEditableTable();

  return (
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
            // onClick={() => handleToggleModal('modal-add', true)}
          >
            Agregar un usuario
          </Button>
        </Nav>
        <Form form={form} component={false}>
          <Table
            components={{
              body: { cell: EditableCell },
            }}
            scroll={{ y: 55 * 8 }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
      </div>
    </div>
  );
};

export default People;