import React from "react";
import { Button, Input } from "antd";
import { RetweetOutlined } from "@ant-design/icons";

const BookSearch = ({ handleSearch, resetFilters, selectField }) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <Input.Search
        placeholder="Escribe lo que buscas"
        onSearch={handleSearch} // Llama a handleSearch cuando se realiza una búsqueda
        enterButton
        disabled={!selectField}
        style={{ width: "100%" }}
      />

      <Button onClick={resetFilters} block style={{marginTop: 10}} icon={<RetweetOutlined />}>Reiniciar Filtros</Button>
    </div>
  );
};

export default BookSearch;