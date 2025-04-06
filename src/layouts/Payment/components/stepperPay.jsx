import React from "react";
import BookStep from "./bookStep";
import { Alert, Button } from "antd";
import PaymentForm from "./paymentForm";
import { useNavigate } from "react-router-dom";
import usePaymentLogic from "../hooks/usePaymentLogic";
import Stepper, { Step } from "../../../components/Steper/Stepper";

function StepperPay() {
    const navigate = useNavigate();
    const { handleFormChange, handleBookDataChange, generatePDF } = usePaymentLogic();

    return (
        <Stepper
            initialStep={1}
            onNextStep={(currentStep, nextStep, validateStep) => {
                if (currentStep === 2) {
                    validateStep(() => true);
                }
            }}
            onFinalStepCompleted={() => {
                generatePDF(); 
                navigate("/"); 
              }}
            backButtonText="Anterior paso"
            nextButtonText="Siguiente"
            completeButtonText="Terminar"
        >
            <Step>
                <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
                    <h2>Bienvenido al sistema de pago</h2>
                    <p>Debes tener en cuenta estos términos</p>
                    <Alert
                        message="⚠️ Advertencia"
                        description="Esta pasarela de pagos es solo una simulación y no procesa transacciones reales. No ingreses datos reales de tarjetas de crédito o información personal."
                        type="warning"
                        showIcon
                    />
                </div>
            </Step>

            {/* Paso 2: Detalles del libro */}
            <Step>
                <BookStep onDataChange={handleBookDataChange} />
            </Step>

            {/* Paso 3: Formulario de pago */}
            <Step>
                <PaymentForm onChange={handleFormChange} />
            </Step>

            {/* Paso 4: Comprobante de pago */}
            <Step>
                <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
                    <h2>Se ha procesado exitosamente el pago</h2>
                    <Alert message="Pago exitoso" type="success" showIcon />

                    <Alert
                        message="⚠️ Recuerda"
                        description="Esta pasarela de pagos es solo una simulación y no procesa transacciones reales. No ingreses datos reales de tarjetas de crédito o información personal."
                        type="warning"
                        showIcon
                    />
                </div>
            </Step>
        </Stepper>
    );
}

export default StepperPay;