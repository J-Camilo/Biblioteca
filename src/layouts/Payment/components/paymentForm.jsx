import React from "react";
import { Form, Input, Row, Col, message } from "antd";

const PaymentForm = ({ onChange, onValidationChange }) => {
  const [form] = Form.useForm();

  const handleValuesChange = (changedValues, allValues) => {
    if (onChange) {
      onChange(allValues); 
    }
  };

  // Valida el formulario automáticamente
  const validateForm = () => {
    form
      .validateFields()
      .then(() => {
        onValidationChange(true); 
      })
      .catch((errors) => {
        onValidationChange(false); 
        message.error("Por favor, completa todos los campos obligatorios.");
      });
  };

  return (
    <Form
      form={form}
      name="payment_form"
      layout="vertical"
      style={{ maxWidth: 600, margin: "0 auto" }}
      onValuesChange={handleValuesChange} // Escucha cambios en los campos
      onFinishFailed={() => validateForm()} // Valida cuando el formulario falla
    >
      <h2 style={{ marginBottom: 20, color: "white" }}>Formulario de Pago</h2>

      <Form.Item
        name="cardNumber"
        rules={[
          { required: true, message: "Por favor, ingresa el número de tarjeta" },
          { len: 16, message: "El número de tarjeta debe tener 16 dígitos" },
        ]}
      >
        <Input placeholder="Número de tarjeta" maxLength={16} onBlur={validateForm} />
      </Form.Item>

      <Form.Item
        name="cardName"
        rules={[
          { required: true, message: "Por favor, ingresa el nombre en la tarjeta" },
        ]}
      >
        <Input placeholder="Nombre en la tarjeta" onBlur={validateForm} />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="expiryDate"
            rules={[
              { required: true, message: "Por favor, ingresa la fecha de expiración" },
              { pattern: /^(0[1-9]|1[0-2])\/\d{2}$/, message: "Formato inválido (MM/AA)" },
            ]}
          >
            <Input placeholder="MM/AA" onBlur={validateForm} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="cvv"
            rules={[
              { required: true, message: "Por favor, ingresa el CVV" },
              { len: 3, message: "El CVV debe tener 3 dígitos" },
            ]}
          >
            <Input placeholder="CVV" maxLength={3} onBlur={validateForm} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default PaymentForm;