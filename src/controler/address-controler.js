'use strict';

const addressModel = require('../models/address-model');
const validator = require('../validator/vaalidator');
const model = new addressModel();

exports.post = (req, res, next) => {
    let user = new validator();

    user.isRequired(req.body.idUsuario, 'Campo idUsuario é obrigatorio!');
    user.isRequired(req.body.Estado, 'Campo Estado é obrigatorio!');
    user.isRequired(req.body.Cidade, 'Campo Cidade é obrigatorio!');
    user.isRequired(req.body.Bairro, 'Campo Bairro é obrigatorio!');
    user.isRequired(req.body.Rua, 'Campo Rua é obrigatorio!');
    user.isRequired(req.body.Numero, 'Campo Numero é obrigatorio!');

    if (!user.isValid()) {
        res.status(400).send(user.errors()).end();
        return;
    }

    model.insert(req.body).then(function(x){
        res.status(201).send({
            message: 'Endereço cadastrados com suscesso!'
        });
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao cadastrar endereço!',
            data: err
        })
    }));

};
exports.get = (req, res, next) => {
    let user = new validator();

    user.isRequired(req.body.idUsuario, 'Campo idUsuario é obrigatorio!');

    if (!user.isValid()) {
        res.status(400).send(user.errors()).end();
        return;
    }

    model.findAll(req.body.idUsuario).then(function(x){
        res.status(201).send({
            message: 'Endereços encontrados com suscesso',
            data: x
        });
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao listar endereços!',
            data: err
        })
    }));
};

exports.getById = (req, res, next) => {
    let user = new validator();

    user.isRequired(req.params.idEndereco, 'Campo idEndereco é obrigatorio!');

    if (!user.isValid()) {
        res.status(400).send(user.errors()).end();
        return;
    }
    model.find(req.params.idEndereco).then(function(x){
        res.status(201).send({
            message: 'Endereço encontrado com suscesso',
            data: x
        });
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao listar endereço!',
            data: err
        })
    }));
};
exports.put = (req, res, next) => {
    let user = new validator();

    user.isRequired(req.body.idEndereco, 'Campo idEndereco é obrigatorio!');
    user.isRequired(req.body.Estado, 'Campo Estado é obrigatorio!');
    user.isRequired(req.body.Cidade, 'Campo Cidade é obrigatorio!');
    user.isRequired(req.body.Bairro, 'Campo Bairro de nascimento é obrigatorio!');
    user.isRequired(req.body.Rua, 'Campo Rua é obrigatorio!');
    user.isRequired(req.body.Numero, 'Campo Numero de nascimento é obrigatorio!');

    if (!user.isValid()) {
        res.status(400).send(user.errors()).end();
        return;
    }
    model.update(req.body).then(function(x){
        res.status(201).send({
            message: 'Endereço alterado com suscesso',
            data: x
        });
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao listar endereço!',
            data: err
        })
    }));
};
exports.delete = (req, res, next) => {
    let user = new validator();

    user.isRequired(req.params.idEndereco, 'Campo idEndereco é obrigatorio!');

    if (!user.isValid()) {
        res.status(400).send(user.errors()).end();
        return;
    }
    model.delete(req.params.idEndereco).then(function(x){
        res.status(201).send({
            message: 'Endereço deletado com suscesso',
            data: x
        });
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao deletar endereço!',
            data: err
        })
    }));
};