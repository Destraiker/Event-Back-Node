'use strict';

const eventModel = require('../models/event-model');
const model = new eventModel();

//Cadastrar novo evento
exports.post = (req, res, next) => {
    model.insert(req.body).then(function(x){
        res.status(201).send({
            message: 'Evento cadastrados com suscesso!'
        });
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao cadastrar evento!',
            data: err
        })
    }));

};
//Listar eventos disponiveis
exports.get = (req, res, next) => {
    model.findAll().then(function(x){
        res.status(201).send({
            message: 'Eventos encontrado com suscesso',
            data: x
        });
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao listar evento!',
            data: err
        })
    }));
};
//Listar evento pelo idEvento
exports.getById = (req, res, next) => {
    model.find(req.params.idEvento).then(function(x){
        res.status(201).send({
            message: 'Evento encontrado com suscesso',
            data: x
        });
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao listar evento!',
            data: err
        })
    }));
};
//Alterar evento pelo idEvento
exports.put = (req, res, next) => {
    model.update(req.body).then(function(x){
        res.status(201).send({
            message: 'Evento alterado com suscesso',
            data: x
        });
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao listar evento!',
            data: err
        })
    }));
};
//Deletar evento pelo idEvento
exports.delete = (req, res, next) => {
    model.delete(req.params.idEvento).then(function(x){
        res.status(201).send({
            message: 'Evento deletado com suscesso',
            data: x
        });
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao deletar evento!',
            data: err
        })
    }));
};

//Listar eventos criados
exports.getMyEvents = (req, res, next) => {
    model.findMyEvents(req.body.idUsuario).then(function(x){
        res.status(201).send({
            message: 'Eventos criados listados com suscesso',
            data: x
        });
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao listar eventos criados evento!',
            data: err
        })
    }));
};

//Listar eventos em que o usuario se inscrevel
exports.getEventsRegister = (req, res, next) => {
    model.eventSubscribersByUser(req.body.idUsuario).then(function(x){
        res.status(201).send({
            message: 'Eventos inscritos do usuario listados com suscesso',
            data: x
        });
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao listar eventos inscritos do usuario evento!',
            data: err
        })
    }));
};

//Listar usuarios inscritos em um evento
exports.getUsersEvent = (req, res, next) => {
    model.userSubscribersByEvent(req.params.idEvento).then(function(x){
        res.status(201).send({
            message: 'Usuarios inscritos no evento listados com suscesso',
            data: x
        });
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao listar usuarios inscritos no evento evento!',
            data: err
        })
    }));
};

//Inscrever Usuario em evento
exports.registerUserOfEvent = (req, res, next) => {
    model.registerEvent(req.body).then(function(x){
        model.removeVaga(req.body.idEvento).then(function(x2){
            res.status(201).send({
                message: 'Usuario regitrado com suscesso, e vaga reservada no evento',
                data: {
                    dataRegister: x,
                    dataRemoveVaga: x2
                }
            });
        }).catch((err) => setImmediate(() => {
            res.status(400).send({
                message: 'Falha ao reservar vaga no evento!',
                data: err
            })
        }));
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao registrar no evento!',
            data: err
        })
    }));
};

//Remover usuario de um evento
exports.deleteUserOfEvent = (req, res, next) => {
    model.unsubscribe(req.body).then(function(x){
        model.addVaga(req.body.idEvento).then(function(x2){
            res.status(201).send({
                message: 'Usuario removido de evento com suscesso, e vaga devolvida ao evento',
                data: {
                    dataRegister: x,
                    dataRemoveVaga: x2
                }
            });
        }).catch((err) => setImmediate(() => {
            res.status(400).send({
                message: 'Falha ao devolver vaga no evento!',
                data: err
            })
        }));
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao remover usuario do evento!',
            data: err
        })
    }));
};