import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const modalStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const paperStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
  padding: '16px',
  width: '400px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  alignItems: 'center',
};

export default function EditEntryModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    vaga: '',
    resposta: '',
    feedback: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        vaga: initialData.vaga,
        resposta: initialData.resposta,
        feedback: initialData.feedback,
      });
    }
  }, [initialData]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = () => {
    // Inclua o id no formData antes de enviar
    const dataToSubmit = { ...formData, id: initialData.id };
    onSubmit(dataToSubmit);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose} style={modalStyle}>
      <div style={paperStyle}>
        <h2>Editar Entrada</h2>
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
          Salvar
        </Button>
      </div>
    </Modal>
  );
}
