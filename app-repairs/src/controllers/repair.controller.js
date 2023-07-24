const Repair = require('../models/repair.model');

exports.findAllRepairs = async (req, res) => {
  try {
    const repairs = await Repair.findAll({
      where: {
        status: 'pending',
      },
    });

    return res.status(200).json({
      status: 'success',
      message: 'Found Repairs',
      repairs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
      error,
    });
  }
};

exports.findOneRepair = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await Repair.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(400).json({
        status: 'error',
        message: `Repair with id ${id} not found`,
      });
    } else {
      return res.status(200).json({
        status: 'success',
        message: 'Found Repair',
        repair,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
      error,
    });
  }
};

exports.createRepair = async (req, res) => {
  try {
    const { date, userId } = req.body;

    const repair = await Repair.create({ date, userId });

    return res.status(201).json({
      status: 'success',
      message: 'Service created successfully',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
      error,
    });
  }
};

exports.updateRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const repair = await Repair.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(400).json({
        status: 'error',
        message: `Repair with id ${id} not found`,
      });
    }

    await repair.update({
      status,
    });

    return res.status(200).json({
      status: 'succes',
      message: 'Repair update successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
      error,
    });
  }
};

exports.deleteRepair = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await Repair.findOne({
      where: { id, status: 'pending' },
    });

    if (!repair) {
      return res.status(400).json({
        status: 'error',
        message: `Repair with id ${id} not found or status completed`,
      });
    }

    await repair.update({
      status: 'cancelled',
    });

    return res.status(200).json({
      status: 'success',
      message: 'Repair delete successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
      error,
    });
  }
};
