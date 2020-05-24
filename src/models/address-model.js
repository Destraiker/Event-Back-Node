'use strict';

const connection = require('./connection');

module.exports = class Address extends connection {
    idEndereco;
    Usuario_idUsuario;
    Estado;
    Cidade;
    Bairro;
    Rua;
    Numero;
    Complemento;

    async insert(req) {
        var con = new connection();
        const conexao=con.conexao();

        var sql = "INSERT INTO endereco (Usuario_idUsuario, Estado, Cidade, Bairro, Rua, Numero, Complemento) VALUES ?";
        var values = [[[req.idUsuario, req.Estado, req.Cidade, req.Bairro, req.Rua, req.Numero, req.Complemento]]];
        
        return await con.executarQuery(sql, values,conexao);
    }
    async update(req) {
        var con = new connection();
        const conexao=con.conexao();

        var sql = "UPDATE endereco SET Estado=?,Cidade=?,Bairro=?,Rua=?,Numero=?,Complemento=? WHERE idEndereco=?";
        var values = [req.Estado, req.Cidade, req.Bairro, req.Rua, req.Numero, req.Complemento,req.idEndereco];
        
        return await con.executarQuery(sql, values,conexao);
    }
    async find(idEndereco) {
        var con = new connection();
        const conexao=con.conexao();

        var sql = "SELECT * FROM endereco WHERE idEndereco=?";
        var values = [idEndereco];
        
        return await con.executarQuery(sql, values,conexao);
    }
    async delete(idEndereco) {
        var con = new connection();
        const conexao=con.conexao();

        var sql = "DELETE FROM endereco WHERE idEndereco=?";
        var values = [idEndereco];
        
        return await con.executarQuery(sql, values,conexao);
    }
    async findAll(idUsuario) {
        const con=new connection();
        const conexao=con.conexao();

        var sql = "SELECT * FROM endereco WHERE Usuario_idUsuario=?";
        var values = [idUsuario];

        return await con.executarQuery(sql, values, conexao);
    }
}