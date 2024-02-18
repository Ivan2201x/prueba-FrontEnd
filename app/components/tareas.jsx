import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

let id = 1;

export default function TaskManager() {
    const [tasks, setTasks] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [selectedTask, setSelectedTask] = React.useState(null);

    const handleCreateTask = (taskName) => {
        const newTask = { id: id++, taskName, completed: false };
        setTasks([...tasks, newTask]);
    };

    const handleTaskCompletion = (taskId) => {
        setTasks(tasks.map((task) =>
            task.id === taskId ? { ...task, completed: true } : task
        ));
    };

    const handleTaskDeletion = () => {
        setTasks(tasks.filter((task) => task.id !== selectedTask));
        setOpen(false);
    };

    const handleOpenModal = (taskId) => {
        setSelectedTask(taskId);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const columns = [
        { field: 'id', headerName: <strong>ID</strong>, width: 70 },
        { field: 'taskName', headerName: <strong>Tarea</strong>, width: 300 },
        {
            field: 'completed',
            headerName: <strong>Completada</strong>,
            width: 150,
            renderCell: (params) => (
                <Checkbox
                    checked={params.row.completed}
                    disabled
                    color="primary"
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            ),
        },
        {
            field: 'actions',
            headerName: <strong>Acciones</strong>,
            width: 190,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    {!params.row.completed && (
                        <IconButton
                            color="success"
                            size="small"
                            onClick={() => handleTaskCompletion(params.row.id)}
                        >
                            <CheckCircleOutlineIcon />
                        </IconButton>
                    )}
                    <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleOpenModal(params.row.id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Stack>
            ),
        },
    ];

    return (
        <div id="tareas" style={{ margin: '50px auto', maxWidth: '60%' }}>
            <TaskButtons onCreateTask={handleCreateTask} />
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={tasks}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                />
            </div>
            <Modal
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 5
                    }}
                >
                    <Typography id="modal-title" variant="h6" component="h2">
                        Confirmar Eliminación
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        ¿Estás seguro de que quieres eliminar esta tarea?
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                        <Button variant="outlined" onClick={handleTaskDeletion} color="error">
                            Eliminar
                        </Button>
                        <Button variant="outlined" onClick={handleCloseModal}>
                            Cancelar
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}

function TaskButtons({ onCreateTask }) {
    const [taskName, setTaskName] = React.useState('');

    const handleCreateTask = () => {
        if (taskName.trim() !== '') {
            onCreateTask(taskName);
            setTaskName('');
        }
    };

    return (
        <Stack direction="row" spacing={2} sx={{ marginBottom: '1rem' }}>
            <TextField
                label="Nombre de la tarea"
                variant="outlined"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <Button variant="outlined" onClick={handleCreateTask}>
                Crear nueva tarea
            </Button>
        </Stack>
    );
}
