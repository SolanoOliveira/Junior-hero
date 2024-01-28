import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import AddEntryModal from './AddEntryModal'; // Substitua pelo caminho correto do seu modal
import EditEntryModal from './EditEntryModal'; // Substitua pelo caminho correto do seu modal

function Tabela() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [currentEditData, setCurrentEditData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/vagas')
      .then(response => response.json())
      .then(data => {
        setTableRows(data.map(item => ({
          id: item.id,
          name: item.nome_empresa,
          vaga: item.nome_vaga,
          resposta: item.resposta,
          feedback: item.feedback
        })));
      })
      .catch(error => {
        console.error('Erro ao buscar vagas:', error);
      });
  }, []);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleFormSubmit = (formData) => {
    fetch('http://localhost:3000/vagas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome_empresa: formData.name,
        nome_vaga: formData.vaga,
        resposta: formData.resposta,
        feedback: formData.feedback,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        setTableRows([...tableRows, {...formData, id: data.id}]);
      }
    })
    .catch(error => console.error('Erro ao adicionar vaga:', error));

    handleModalClose();
  };

  const handleEditModalOpen = (rowData) => {
    setCurrentEditData(rowData);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleEditFormSubmit = async (editedData) => {
    try {
      const response = await fetch(`http://localhost:3000/vagas/${editedData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome_empresa: editedData.name,
          nome_vaga: editedData.vaga,
          resposta: editedData.resposta,
          feedback: editedData.feedback,
        }),
      });
  
      if (response.ok) {
        const updatedRows = tableRows.map(row => row.id === editedData.id ? { ...row, ...editedData } : row);
        setTableRows(updatedRows);
        handleEditModalClose();
      } else {
        console.error('Falha ao editar vaga');
      }
    } catch (error) {
      console.error('Erro ao editar vaga:', error);
    }
  };
  

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/vagas/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setTableRows(prevRows => prevRows.filter(row => row.id !== id));
      } else {
        console.error('Falha ao excluir vaga');
      }
    })
    .catch(error => {
      console.error('Erro ao excluir vaga:', error);
    });
  };

  return (
    <div>
      <TableContainer component={Paper} sx={{ width: '95%', margin: '0 auto', marginTop: '20px' }}>
        <Table sx={{ minWidth: 650, fontFamily: 'Roboto, sans-serif' }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: red[300] }}>
            <TableRow>
              <TableCell align="center">Nome da empresa</TableCell>
              <TableCell align="center">Nome da vaga</TableCell>
              <TableCell align="center">Resposta?</TableCell>
              <TableCell align="center">Feedback?</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {tableRows.length === 0 ? (
    <TableRow>
      <TableCell colSpan={5} align="center">
        <IconButton aria-label="add" onClick={handleModalOpen}>
          <AddIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  ) : (
    tableRows.map((row) => (
      <TableRow key={row.id}>
        <TableCell component="th" scope="row" align="center">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.vaga}</TableCell>
        <TableCell align="center">{row.resposta}</TableCell>
        <TableCell align="center">{row.feedback}</TableCell>
        <TableCell align="center">
          <IconButton aria-label="edit" onClick={() => handleEditModalOpen(row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDelete(row.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="add" onClick={handleModalOpen}>
            <AddIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ))
  )}
</TableBody>


        </Table>
      </TableContainer>

      <AddEntryModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleFormSubmit}
      />

      <EditEntryModal
        isOpen={editModalOpen}
        onClose={handleEditModalClose}
        onSubmit={handleEditFormSubmit}
        initialData={currentEditData}
      />
    </div>
  );
}

export default Tabela;
