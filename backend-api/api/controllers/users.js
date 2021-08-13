const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const saltRounds = 10;

exports.get_all_users = (req, res, next) => {
    User.find()
        .select({ __v: 0, password: 0 })
        .then(users => {
            if (!users.length) {
                res.status(404).json({
                    message: 'No users in database'
                });
            } else {
                res.status(200).json({
                    message: 'Users found successfully',
                    count: users.length,
                    usersFound: users.map(user => {
                        return {
                            user: {
                                id: user._id,
                                email: user.email,
                                role: user.role
                            },
                            request: {
                                getUser: {
                                    type: 'GET',
                                    url: `http://localhost:${process.env.PORT}/users/${user._id}`
                                }
                            }
                        }

                    })
                });
            }

        }).catch(error => {
            res.status(500).json({
                message: 'Error looking for users',
                error: error
            });
        });
};

exports.register = (req, res, next) => {

    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        if (err) {
            res.status(500).json({
                message: 'Error while creating user',
                error: err
            });
        } else {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save().then(user => {
                res.status(200).json({
                    message: 'User created successfully',
                    createdUser: user,
                    request: {
                        getUser: {
                            type: 'GET',
                            url: `http://localhost:${process.env.PORT}/users/${user._id}`
                        }
                    }
                });
            }).catch(error => {
                res.status(500).json({
                    message: 'Error while creating user',
                    error: error
                });
            });
        }

    });

};

exports.update_user = (req, res, next) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err && Object.keys(err).length) {
            res.status(500).json({
                message: 'Error while updating user',
                error: err,
                source: 'In bcryptHash'
            });
        }else{
            let data = req.body;
            if (hash){
                data.password = hash
            }
            if (req.file){
                data.img = req.file.path;
            }
            User.findByIdAndUpdate(req.params.id, { $set: data }, { new: true }).then(user => {
                if(!user){
                    res.status(404).json({
                        message: 'User not found'
                    });
                }else{
                    res.status(200).json({
                        message: 'User updated successfully',
                        updatedUser: user,
                        request: {
                            getUser: {
                                type: 'GET',
                                url: `http://localhost:${process.env.PORT}/users/${user._id}`
                            }
                        }
                    });
                }     
            }).catch(error => {
                res.status(500).json({
                    message: 'Error while updating user',
                    error: error,
                    source: 'In findByIdAndUpdate'
                });
            });
        }

    })


};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(user => {
        if(!user){
            res.status(404).json({
                message: 'There is no user with the specified email'
            });
        }else{
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                // Store hash in your password DB.
                if (err){
                    res.status(500).json({
                        message: 'Error while looking for user',
                        error: err
                    });
                }else{
                    if (!result){
                        res.status(200).json({
                            message: 'Invalid credentials',
                        });
                    }else{
                        const token = jwt.sign({
                            id: user._id,
                            email: user.email
                        },
                            process.env.PRIVATE_KEY,
                            {
                                expiresIn: "1h"
                            })
                        res.status(200).json({
                            message: 'Authentification successfull',
                            token: token
                        });
                    }
                }
            });
        }
        
    }).catch(error => {
        res.status(500).json({
            message: 'Error while looking for user',
            error: error
        });
    });

};

exports.get_user_by_id = (req, res, next) => {
    User.findById(req.params.id)
        .select({ __v: 0, password: 0 })
        .then(user => {
            if(!user){
                res.status(404).json({
                    message: 'User not found'
                });
            }else{
                res.status(200).json({
                    message: 'User found successfully',
                    foundUser: {
                        id: user._id,
                        email: user.email,
                        role: user.role,
                        img: user.img
                    },
                    request: {
                        listUsers: {
                            type: 'GET',
                            url: `http://localhost:${process.env.PORT}/users`
                        }
                    }
                });
            }

        }).catch(error => {
            res.status(500).json({
                message: 'Error while finding user',
                error: error
            });
        });
};

exports.delete_user = (req, res, next) => {
    User.findByIdAndDelete(req.params.id).then(user => {
        if(!user){
            res.status(404).json({
                message: 'There is no user with the specified id'
            });
        }else{
            res.status(200).json({
                message: 'User deleted successfully',
                deletedUser: user,
                request: {
                    listUsers: {
                        type: 'GET',
                        url: `http://localhost:${process.env.PORT}/users`
                    },
                    createUser: {
                        type: 'POST',
                        url: `http://localhost:${process.env.PORT}/users/register`,
                        body: {
                            email: 'String',
                            password: 'String'
                        }
                    }
    
                }
            });
        }
        
    }).catch(error => {
        res.status(500).json({
            message: 'Error while deleting user',
            error: error
        });
    });
};