import React from 'react';
import Nav from '../../components/Nav/Nav';
import { Form, Table } from 'antd';
import useLendTable from './hooks/useLendTable';
import LendTable from './components/LendTable';

const Lends = () => {
    const { lendData, loading, contextHolder, handleReturnBook } = useLendTable();

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
                    <Nav title="Prestamos" />

                    <LendTable lendData={lendData} loading={loading} handleReturnBook={handleReturnBook} />
                </div>
            </div>

        </>
    );
};

export default Lends;