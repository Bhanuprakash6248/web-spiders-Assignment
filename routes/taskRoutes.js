const express = require('express');
const { createTask,getAllTasks,getTaskById , updateTaskById,deleteTaskById } = require('../controllers/taskController');
const authenticate = require('../middlewares/authentication.js');

const router = express.Router();


router.use(authenticate)

 // tasks 
router.post('/', createTask);

router.get('/', getAllTasks);

router.get('/:id', getTaskById);

router.put("/:id", updateTaskById )

router.delete("/:id",deleteTaskById)

module.exports = router;
