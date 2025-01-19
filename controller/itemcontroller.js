
const item = require('../db/models/item');
const user = require('../db/models/user');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const createNameItem = catchAsync(async (req, res, next) => {
    const body = req.body;
    const userId = req.user.id;
    const newItem = await item.create({
        name: body.name,
        description: body.description,
        quantity: body.quantity,
        createdBy: userId,
    });

    return res.status(201).json({
        status: 'success',
        data: newItem,
    });
});

const getAllItem = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const result = await item.findAll({
        include: user,
        where: { createdBy: userId },
    });

    return res.json({
        status: 'success',
        data: result,
    });
});

const getItemById = catchAsync(async (req, res, next) => {
    const itemId = req.params.id;
    const result = await item.findByPk(itemId, { include: user });
    if (!result) {
        return next(new AppError('Invalid item id', 400));
    }
    return res.json({
        status: 'success',
        data: result,
    });
});

const updateItem = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const itemId = req.params.id;
    const body = req.body;

    const result = await item.findOne({
        where: { id: itemId, createdBy: userId },
    });

    if (!result) {
        return next(new AppError('Invalid item id', 400));
    }

    result.name = body.name;
    result.description = body.description;
    result.quantity = body.quantity;
    
    

    const updatedResult = await result.save();

    return res.json({
        status: 'success',
        data: updatedResult,
    });
});

const deleteItem = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const projectId = req.params.id;
    const body = req.body;

    const result = await item.findOne({
        where: { id: itemId, createdBy: userId },
    });

    if (!result) {
        return next(new AppError('Invalid item id', 400));
    }

    await result.destroy();

    return res.json({
        status: 'success',
        message: 'Record deleted successfully',
    });
});

module.exports = {
    createNameItem,
    getAllItem,
    getItemById,
    updateItem,
    deleteItem,
};





