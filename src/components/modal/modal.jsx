import React from 'react';
import { Modal } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ token }) => ({
    'ant-modal': { background: 'transparent' },
    'my-modal-body': { background: token.blue1, padding: token.paddingSM },
    'my-modal-mask': {},
    'my-modal-header': { borderBottom: `1px dotted ${token.colorPrimary}` },
    'my-modal-footer': { color: token.colorPrimary },
    'my-modal-content': { border: '1px solid #333' },
}));

const ModalCard = ({ index, title, children, footer, isModalOpen, handleToggleModal }) => {

    const { styles } = useStyle();

    const classNames = {
        AllContent: styles['ant-modal'],
        body: styles['my-modal-body'],
        mask: styles['my-modal-mask'],
        header: styles['my-modal-header'],
        footer: styles['my-modal-footer'],
        content: styles['my-modal-content'],
    };

    const modalStyles = {
        header: {
            background: "white",
            color: "white !important",
            borderRadius: 0,
            paddingInlineStart: 5,
        },
        mask: { backdropFilter: 'blur(4px)' },
        body: {
            background: "white",
            borderRadius: 25,
        },
        footer: {},
        content: {
            background: "white",
            borderRadius: 25,
            border: `2px solid rgb(203 203 203)`,
            boxShadow: 'rgb(249 255 251) 0px 0px 430px',
        },
    };

    return (
        <Modal
            title={title}
            styles={modalStyles}
            classNames={classNames}
            open={isModalOpen[index]}
            footer={footer ?? ""}
            onOk={() => handleToggleModal(index, false)}
            onCancel={() => handleToggleModal(index, false)}
        >
            {children}
        </Modal>
    );
};

export default ModalCard;
