import Task from "../model/taskModel.js";

export const addTasks = async (req, res) => {
  const { title, description, category, endDate } = req.body;
  try {
    const task = await Task.create({
      title: title,
      description: description,
      category: category,
      dateDue: endDate,
      user: req.user._id,
    });

    res.status(201).json({
      status: "success",
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

export const getAllTask = async (req, res) => {
  try {
    const task = await Task.find({});

    res.status(200).json({
      status: "success",
      message: "Task list retrieved",
      task,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

export const getUserTask = async (req, res) => {
  try {
    const userTask = await Task.find({ user: req.user._id });
    res.status(200).json({
      status: "success",
      message: "Task retrieved",
      data: userTask,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

export const getTaskDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const taskDetails = await Task.findById(id);
    if (!taskDetails) {
      res.status(404).json({
        status: "failed",
        message: "Task not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Task Details retrieved",
      data: taskDetails,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

export const updateUserTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId).exec();
    if (!task) {
      return res.status(404).json({
        status: "failed",
        message: "Task not found",
      });
    }
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({
        status: "failed",
        message: "You are not authorized",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      {
        title: req.body.title,
        completed: req.body.completed,
      },
      { new: true }
    );
    return res.status(201).json(updatedTask);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({
        status: "failed",
        message: "Task not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: `${deletedTask.title} has been deleted`,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

export const toggleCompleted = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id)

    if(!task) return res.status(404).send('Todo does not exist')

    const updatedTask = await Task.findByIdAndUpdate(id,{
      isCompleted : task.isCompleted === false ? true : false
  },{new:true})
    res.status(201).json({
      status: "success",
      message: `${updatedTask.title} has been updated`,
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

