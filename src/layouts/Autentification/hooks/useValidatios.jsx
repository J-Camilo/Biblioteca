import { useEffect, useState } from "react";

export const useValidations = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [showSignInButton, setShowSignInButton] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const emailTimeout = setTimeout(() => {
            validateField('email', formData.email);
        }, 500);

        return () => clearTimeout(emailTimeout);
    }, [formData.email]);

    useEffect(() => {
        if (showPasswordInput) {
            const passwordTimeout = setTimeout(() => {
                validateField('password', formData.password);
            }, 500);

            return () => clearTimeout(passwordTimeout);
        }
    }, [formData.password, showPasswordInput]);

    const handleAnimationComplete = () => {
        setTimeout(() => {
            setShowForm(true);
        }, 1000);
    };

    const validateField = (field, value) => {
        let error = '';
        if (field === 'email') {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                error = 'Por favor ingresa un correo válido.';
                setShowPasswordInput(false);
            } else {
                setShowPasswordInput(true);
            }
        } else if (field === 'password') {
            if (value.length < 4) {
                error = 'La contraseña debe tener al menos 4 caracteres.';
                setShowSignInButton(false);
            } else {
                setShowSignInButton(true);
            }
        }
        setErrors(prevErrors => ({ ...prevErrors, [field]: error }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    return {formData, handleChange, handleAnimationComplete, showSignInButton, showPasswordInput, showForm, errors};
}
