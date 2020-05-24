'use strict';

const addressModel = require('../models/address-model');
const model = new addressModel();

exports.post = (req, res, next) => {
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