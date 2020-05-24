'use strict';

const connection = require('./connection');

module.exports = class User extends connection {
    idUsuario;
    Nome;
    Telefone;
    Email;
    Data_nascimento;
    Senha;

    async insert(req) {
        var con = new connection();
        const conexao=con.conexao();

        var sql = "INSERT INTO usuario (Nome, Telefone, Email, Data_nascimento, Senha) VALUES ?";
        var values = [[[req.Nome, req.Telefone, req.Email, req.Data_nascimento, req.Senha]]];
        
        return await con.executarQuery(sql, values,conexao);
    }
    async update(req) {
        var con = new connection();
        const conexao=con.conexao();

        var sql = "UPDATE usuario SET Nome=?,Telefone=?,Email=? WHERE idUsuario=?";
        var values = [req.Nome,req.Telefone,req.Email,req.idUsuario];
        
        return await con.executarQuery(sql, values,conexao);
    }
    async find(idUsuario) {
        var con = new connection();
        const conexao=con.conexao();

        var sql = "SELECT * FROM usuario WHERE idUsuario=?";
        var values = [idUsuario];
        
        return await con.executarQuery(sql, values,conexao);
    }
    async delete(idUsuario) {
        var con = new connection();
        const conexao=con.conexao();

        var sql = "DELETE FROM usuario WHERE idUsuario=?";
        var values = [idUsuario];
        
        return await con.executarQuery(sql, values,conexao);
    }
    async findAll() {
        const con=new connection();
        const conexao=con.conexao();

        var sql = "SELECT * FROM usuario";

        return await con.executarQuery(sql, null, conexao);
    }

    async login(req) {
        const con=new connection();
        const conexao=con.conexao();

        var sql = "SELECT idUsuario,Nome,Email,Senha FROM usuario WHERE Email=? AND Senha=? LIMIT 1";
        var values = [req.Email,req.Senha];

        return await con.executarQuery(sql, values, conexao);
    }
}