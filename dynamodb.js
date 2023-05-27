const AWS = require('aws-sdk')
require('dotenv').config()

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient()

const TABLE_MEMBERS = "users-js"


const addUser = async (user) => {
    const params = {
        TableName: TABLE_MEMBERS,
        Item: user
    }

    return await dynamoClient.put(params).promise()
}

const getUserById = async (id) => {
    const params = {
        TableName: TABLE_MEMBERS,
        Key: {
            id
        }
    }
    return await dynamoClient.get(params).promise()
}

const deleteUser = async (id) => {
    const params = {
        TableName: TABLE_MEMBERS,
        Key: {
            id
        }
    }

    return await dynamoClient.delete(params).promise()
}

module.exports = {
    dynamoClient,
    addUser,
    getUserById,
    deleteUser
}