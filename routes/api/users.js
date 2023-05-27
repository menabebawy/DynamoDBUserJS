const express = require('express')

const {addMember, addUser, deleteUser, getUserById} = require('../../dynamodb')

const router = express.Router();

router.use(express.json())

router.post('/', async (req, res) => {
    const user = req.body
    try {
        const newUser = await addMember(user)
        res.json(newUser)
    } catch (error) {
        console.error(error)
        res.status(500).json({err: `Something went wrong`})
    }
})

router.put('/:id', async (req, res) => {
    const user = req.body
    const {id} = req.params
    user.id = id
    try {
        const updateUser = await addUser(user)
        res.json(updateUser)
    } catch (error) {
        console.error(error)
        res.status(500).json({err: `Something went wrong`})
    }
})

// api endpoint for deleting an entry in the table
router.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const deletedUser = await deleteUser(id)
        res.json(deletedUser)
    } catch (error) {
        console.error(error)
        res.status(500).json({err: `Something went wrong`})
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const users = await getUserById(id)
        res.json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json({err: `Something went wrong`})
    }
})

module.exports = router