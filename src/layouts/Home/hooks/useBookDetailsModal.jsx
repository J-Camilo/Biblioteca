import { useState } from 'react';

const useBookDetailsModal = () => {
  const [seeEdit, setSeeEdit] = useState(false); // Estado para editar
  const [selectedUser, setSelectedUser] = useState(null); // Estado para el usuario seleccionado

  // Función para manejar el cambio de usuario
  const handleUserChange = (value) => {
    setSelectedUser(value);
  };

  return {
    seeEdit,
    setSeeEdit,
    selectedUser,
    handleUserChange,
  };
};

export default useBookDetailsModal;