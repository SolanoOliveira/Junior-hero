import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const initialFormData = {
  name: '',
  vaga: '',
  resposta: '',
  feedback: '',
};

const modalStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const paperStyle = {
  backgroundColor: 'white',
  borderRadius: '8px', // Arredonda as pontas
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', // Adiciona sombra
  padding: '16px',
  width: '400px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  alignItems: 'center',
};

export default function AddEntryModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState(initialFormData);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = () => {
    onSubmit(formData);
    setFormData(initialFormData);
  };

  return (
    <Modal open={isOpen} onClose={onClose} style={modalStyle}>
      <div style={paperStyle}>
        <h2>Adicionar Nova Entrada</h2>
        <TextField
          label="Nome da empresa"
          name="name"
          value={formData.name}
          onChange={handleFormChange}
        />
        <TextField
          label="Nome da vaga"
          name="vaga"
          value={formData.vaga}
          onChange={handleFormChange}
        />
        <TextField
          label="Resposta?"
          name="resposta"
          value={formData.resposta}
          onChange={handleFormChange}
        />
        <TextField
          label="Feedback"
          name="feedback"
          value={formData.feedback}
          onChange={handleFormChange}
        />
        <Button variant="contained" onClick={handleFormSubmit}>
          Adicionar
        </Button>
      </div>
    </Modal>
  );
}
