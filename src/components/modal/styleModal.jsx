import { createStyles } from "antd-style";

export const useModalStyles = createStyles(({ token }) => ({
    modal: { background: 'transparent' },
    body: {
        background: token.colorBgContainer,
        borderRadius: 25,
        padding: token.paddingSM,
    },
    mask: { backdropFilter: 'blur(4px)' },
    header: {
        background: token.colorBgContainer,
        color: token.colorText,
        borderRadius: 0,
        paddingInlineStart: 5,
        borderBottom: `1px dotted ${token.colorPrimary}`,
    },
    footer: {
        background: token.colorBgContainer,
        color: token.colorPrimary,
    },
    content: {
        background: token.colorBgContainer,
        borderRadius: 25,
        border: `2px solid ${token.colorPrimary}`,
        boxShadow: `0px 0px 430px ${token.colorPrimary}`,
    },
}));