'use strict';

const eventModel = require('../models/event-model');
const validator = require('../validator/vaalidator');
const model = new eventModel();

//Cadastrar novo evento
exports.post = (req, res, next) => {
    let event = new validator();

    event.isRequired(req.body.Endereco_idEndereco, 'Campo Endereco_idEndereco é obrigatorio!');
    event.isRequired(req.body.idUsuario, 'Campo idUsuario é obrigatorio!');
    event.isRequired(req.body.Nome, 'Campo Nome é obrigatorio!');
    event.isRequired(req.body.Decricao, 'Campo Decricao é obrigatorio!');
    event.isRequired(req.body.DataInicio, 'Campo DataInicio é obrigatorio!');
    event.isRequired(req.body.HoraInicio, 'Campo HoraInicio é obrigatorio!');
    event.isRequired(req.body.HoraFinal, 'Campo HoraFinal é obrigatorio!');
    event.isRequired(req.body.Vagas, 'Campo Vagas é obrigatorio!');

    if (!event.isValid()) {
        res.status(400).send(event.errors()).end();
        return;
    }

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
    if(req.params.page===undefined || req.params.page<0){
        req.params.page=0;
    }
    let quant=15;
    model.findAll((req.params.page*quant),quant,req.body.idUsuario).then(function(x){
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
    let event = new validator();

    event.isRequired(req.params.idEvento, 'Parametro idEvento é obrigatorio!');

    if (!event.isValid()) {
        res.status(400).send(event.errors()).end();
        return;
    }
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
    let event = new validator();

    event.isRequired(req.body.Endereco_idEndereco, 'Campo Endereco_idEndereco é obrigatorio!');
    event.isRequired(req.body.idEvento, 'Campo idEvento é obrigatorio!');
    event.isRequired(req.body.Nome, 'Campo Nome é obrigatorio!');
    event.isRequired(req.body.Decricao, 'Campo Decricao é obrigatorio!');
    event.isRequired(req.body.DataInicio, 'Campo DataInicio é obrigatorio!');
    event.isRequired(req.body.HoraInicio, 'Campo HoraInicio é obrigatorio!');
    event.isRequired(req.body.HoraFinal, 'Campo HoraFinal é obrigatorio!');
    event.isRequired(req.body.Vagas, 'Campo Vagas é obrigatorio!');

    if (!event.isValid()) {
        res.status(400).send(event.errors()).end();
        return;
    }
    
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
    let event = new validator();

    event.isRequired(req.params.idEvento, 'Campo idEvento é obrigatorio!');

    if (!event.isValid()) {
        res.status(400).send(event.errors()).end();
        return;
    }
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
    console.log("Ta aqui carai");
    let event = new validator();

    event.isRequired(req.body.idUsuario, 'Campo idUsuario é obrigatorio!');

    if (!event.isValid()) {
        res.status(400).send(event.errors()).end();
        return;
    }

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
    let event = new validator();

    event.isRequired(req.body.idUsuario, 'Campo idUsuario é obrigatorio!');

    if (!event.isValid()) {
        res.status(400).send(event.errors()).end();
        return;
    }
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
    let event = new validator();

    event.isRequired(req.params.idEvento, 'Campo idEvento é obrigatorio!');

    if (!event.isValid()) {
        res.status(400).send(event.errors()).end();
        return;
    }
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
    let event = new validator();

    event.isRequired(req.body.idUsuario, 'Campo idUsuario é obrigatorio!');
    event.isRequired(req.body.idEvento, 'Campo idEvento é obrigatorio!');

    if (!event.isValid()) {
        res.status(400).send(event.errors()).end();
        return;
    }
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
    let event = new validator();

    event.isRequired(req.body.idUsuario, 'Campo idUsuario é obrigatorio!');
    event.isRequired(req.body.idEvento, 'Campo idEvento é obrigatorio!');

    if (!event.isValid()) {
        res.status(400).send(event.errors()).end();
        return;
    }
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