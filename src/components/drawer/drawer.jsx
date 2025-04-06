import React from 'react';
import { Drawer } from 'antd';
import { createStyles, useTheme } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
    myDrawerBody: {},
    myDrawerMask: {
        backdropFilter: 'blur(3px)',
    },
    myDrawerHeader: {},
    myDrawerFooter: {},
    myDrawerContent: {},
}));

const DrawerDynamic = ({ open, onClose, title, children, placement, styless, loading}) => {
    const token = useTheme();
    const { styles } = useStyles(); 

    const classNames = {
        body: styles.myDrawerBody,
        mask: styles.myDrawerMask,
        header: styles.myDrawerHeader,
        footer: styles.myDrawerFooter,
        content: styles.myDrawerContent,
    };

    return (
        <Drawer
            title={title}
            placement={placement}
            onClose={onClose}
            open={open}
            classNames={classNames}
            style={styless}
            loading={loading}
        >
            {children}
        </Drawer>
    );
};

export default DrawerDynamic;