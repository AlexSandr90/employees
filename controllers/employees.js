const {prisma} = require("../prisma/prisma-client");

/**
 * @route GET api/employees/all
 * @desc Get all employees
 * @access Private
 */
const all = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany();

        res.status(200).json(employees);
    } catch (e) {
        res.status(500).json({message: 'Failed to get employees'});
    }
};

/**
 *
 * @route POST api/employees/add
 * @desc Adding employees
 * @access Private
 */
const add = async (req, res) => {
    try {
        const data = req.body;
        const {firstName, lastName, address, age} = data;
        if (!firstName || !lastName || !address || !age) {
            return res.status(400).json({message: 'All fields are required'});
        }

        const employee = await prisma.employee.create({
            data: {
                ...data,
                userId: req.user.id
            }
        });

        // const employee = await prisma.user.update({
        //     where: {
        //         id: req.user.id
        //     },
        //     data: {
        //         createdEmployee: {
        //             create: data
        //         }
        //     }
        // });

        res.status(201).json(employee);
    } catch (e) {
        res.status(500).json({message: 'Failed to add employee'});
    }
};

/**
 *
 * @route POST api/employees/remove/:id
 * @desc Remove employee
 * @access Private
 */
const remove = async (req, res) => {
    try {
        const {id} = req.body;

        await prisma.employee.delete({where: {id}});

        res.status(204).json('OK');
    } catch (e) {
        res.status(500).json({message: 'Failed to remove an employee'})
    }
};

/**
 *
 * @route PUT api/employees/edit/:id
 * @desc Edit employee
 * @access Private
 */
const edit = async (req, res) => {
    try {
        const {data: {id}} = req.body;
        // const id = data.id;

        await prisma.employee.update({
            where: {id}, data
        });

        res.status(204).json('OK');
    } catch (e) {
        res.status(400).json({message: 'Could not edit an employee'});
    }
};

/**
 *
 * @route GET api/employees/:id
 * @desc Get employee
 * @access Private
 */
const employee = async (req, res) => {
    try {
        const {id} = req.params;

        const employee = await prisma.employee.findUnique({where: {id}});

        res.status(200).json(employee);
    } catch (e) {
        res.status(400).json({message: 'Failed to get an employee'})
    }
};

module.exports = {
    add,
    edit,
    remove,
    all,
    employee
}