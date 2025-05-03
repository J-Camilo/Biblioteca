import React from "react";
import { Button, Input } from "antd";

const BookSearch = ({ handleSearch, resetFilters }) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <Input.Search
        placeholder="Buscar nombre"
        onSearch={handleSearch} // Llama a handleSearch cuando se realiza una búsqueda
        enterButton
        style={{ width: "100%" }}
      />

      <Button onClick={resetFilters} block style={{marginTop: 10}}>Reiniciar Filtros</Button>
    </div>
  );
};

export default BookSearch;