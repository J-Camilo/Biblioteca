import React from 'react';
import { Button, Select, Popconfirm, Alert } from 'antd';
import { EditOutlined, DeleteOutlined, AuditOutlined, PayCircleOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ModalCard from '../../../components/modal/modal';
import EditBookModal from './editBookModal';

const BookDetailsModal = ({
    isModalOpen,
    handleToggleModal,
    dataModal,
    seeEdit,
    setSeeEdit,
    selectedUser,
    handleUserChange,
    lend,
    cardsDataUser,
    deleteBook,
    refreshData,
    showAlert,
    setShowAlert,
    alert,
}) => {
    const navigate = useNavigate();

    return (
        <ModalCard
            index={'modal-details'}
            title="Detalles del libro"
            isModalOpen={isModalOpen}
            handleToggleModal={handleToggleModal}
        >
            {!seeEdit ? (
                <div className="fade-in-up">
                    <div style={{ padding: 15 }}>
                        <div style={{ display: 'flex', gap: 10, width: '100%', marginBottom: 10 }}>
                            <img src={dataModal.url} alt="imgLibrary" style={{ width: '30%', borderRadius: '10px' }} />
                            <div style={{ width: '100%' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h1>{dataModal.name}</h1>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Cantidad de stock:</strong>
                                    <span>{dataModal.quantity}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Precio:</strong>
                                    <span>${dataModal.price}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>ISBN:</strong>
                                    <span>{dataModal.isbn}</span>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: "column" }}>
                            <strong><h2>Sinopsis</h2></strong>
                            <span>{dataModal.sypnosis}</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: "row", marginTop: '10px', gap: 10 }}>
                        <Button type="dashed" block icon={<EditOutlined />} onClick={() => setSeeEdit(true)}>
                            Editar
                        </Button>
                        <Popconfirm
                            title="¿Estás seguro de eliminar?"
                            onConfirm={async () => {
                                await deleteBook(dataModal.id);
                                handleToggleModal('modal-details', false);
                                refreshData();
                            }}
                        >
                            <Button type="primary" block danger icon={<DeleteOutlined />}>
                                Eliminar
                            </Button>
                        </Popconfirm>
                        <Popconfirm
                            title="Selecciona un usuario para completar el préstamo"
                            description={
                                <div style={{ padding: 10, textAlign: "center" }}>
                                    <Select
                                        showSearch
                                        placeholder="Selecciona un usuario"
                                        value={selectedUser}
                                        onChange={(value) => handleUserChange(value)}
                                        style={{ width: '100%' }}
                                    >
                                        {cardsDataUser.map((user) => (
                                            <Select.Option key={user.id} value={user.id}>
                                                {user.name} - {user.email}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                    <p>ó</p>
                                    <Button block type="dashed" style={{ marginTop: 4 }} onClick={() => navigate(`/people`)} icon={<ArrowRightOutlined />}>
                                        Registra el usuario para realizar el préstamo
                                    </Button>
                                </div>
                            }
                            onConfirm={() => lend(dataModal, selectedUser)}
                            okText="Aceptar"
                            cancelText="Cancelar"
                            disabled={!dataModal.quantity || dataModal.quantity <= 0}
                        >
                            <Button
                                block
                                disabled={!dataModal.quantity || dataModal.quantity <= 0}
                                type="dashed"
                                icon={<AuditOutlined />}
                            >
                                Prestar
                            </Button>
                        </Popconfirm>
                        <Button
                            type="primary"
                            block
                            disabled={!dataModal.quantity || dataModal.quantity <= 0}
                            icon={<PayCircleOutlined />}
                            onClick={() => navigate(`/payment/book/${dataModal.id}`)}
                        >
                            Vender
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="fade-in-up">
                    <EditBookModal handleToggleModal={handleToggleModal} dataModal={dataModal} />
                    <Button type="primary" block danger onClick={() => setSeeEdit(false)}>
                        Cancelar
                    </Button>
                </div>
            )}
            {showAlert && (
                <Alert
                    message={alert.message}
                    className="fade-in-up"
                    type={alert.type}
                    showIcon
                    closable
                    onClose={() => setShowAlert(false)}
                    style={{ marginTop: '20px' }}
                />
            )}
        </ModalCard>
    );
};

export default BookDetailsModal;