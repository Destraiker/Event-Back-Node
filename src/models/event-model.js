'use strict';

const connection = require('./connection');

module.exports = class Endereco extends connection {
    idEvento;
    Endereco_idEndereco; 
    Usuario_idUsuario; 
    Nome; 
    Decricao; 
    DataInicio; 
    HoraInicio; 
    HoraFinal; 
    Vagas;

    async insert(req) {
        var con = new connection();
        const conexao=con.conexao();

        var sql = "INSERT INTO evento (Endereco_idEndereco, Usuario_idUsuario, Nome, Decricao, DataInicio, HoraInicio, HoraFinal, Vagas) VALUES ?";
        var values = [[[req.Endereco_idEndereco, req.idUsuario, req.Nome, req.Decricao, req.DataInicio, req.HoraInicio, req.HoraFinal, req.Vagas]]];
        
        return await con.executarQuery(sql, values,conexao);
    }
    async update(req) {
        var con = new connection();
        const conexao=con.conexao();

        var sql = "UPDATE evento SET Endereco_idEndereco=?,Nome=?,Decricao=?,DataInicio=?,HoraInicio=?,HoraFinal=?,Vagas=? WHERE idEvento=?";
        var values = [req.Endereco_idEndereco, req.Nome, req.Decricao, req.DataInicio, req.HoraInicio, req.HoraFinal,req.Vagas,req.idEvento];
        
        return await con.executarQuery(sql, values,conexao);
    }
    async delete(idEvento) {
        var con = new connection();
        const conexao=con.conexao();

        var sql = "DELETE FROM evento WHERE idEvento=?";
        var values = [idEvento];
        
        return await con.executarQuery(sql, values,conexao);
    }
    async find(idEvento) {
        var con = new connection();
        const conexao=con.conexao();

        var sql = "SELECT * FROM evento WHERE idEvento=?";
        var values = [idEvento];
        
        return await con.executarQuery(sql, values,conexao);
    }
    async findAll(start,quant, idUsuario) {
        const con=new connection();
        const conexao=con.conexao();

        var sql = "SELECT * FROM evento WHERE  Vagas>0 AND DataInicio>CURDATE() AND Usuario_idUsuario!=? LIMIT ?,?";
        var values = [idUsuario,start,quant];

        return await con.executarQuery(sql, values, conexao);
    }
    async findMyEvents(idUsuario) {
        const con=new connection();
        const conexao=con.conexao();

        var sql = "SELECT * FROM evento WHERE Usuario_idUsuario=?";
        var values = [idUsuario];

        return await con.executarQuery(sql, values, conexao);
    }
    async removeVaga(idEvento) {
        const con=new connection();
        const conexao=con.conexao();

        var sql = "UPDATE evento SET Vagas=Vagas-1 WHERE idEvento=?";
        var values = [idEvento];

        return await con.executarQuery(sql, values, conexao);
    }
    async addVaga(idEvento) {
        const con=new connection();
        const conexao=con.conexao();

        var sql = "UPDATE evento SET Vagas=Vagas+1 WHERE idEvento=?";
        var values = [idEvento];

        return await con.executarQuery(sql, values, conexao);
    }
    async eventSubscribersByUser(idUsuario) {
        const con=new connection();
        const conexao=con.conexao();

        var sql = "SELECT * FROM usuario_has_evento INNER JOIN evento ON usuario_has_evento.Evento_idEvento = evento.idEvento WHERE usuario_has_evento.Usuario_idUsuario=?";
        var values = [idUsuario];

        return await con.executarQuery(sql, values, conexao);
    }
    async userSubscribersByEvent(idEvento) {
        const con=new connection();
        const conexao=con.conexao();

        var sql = "SELECT * FROM usuario_has_evento INNER JOIN usuario ON usuario_has_evento.Usuario_idUsuario = usuario.idUsuario WHERE usuario_has_evento.Evento_idEvento=?";
        var values = [idEvento];

        return await con.executarQuery(sql, values, conexao);
    }
    async registerEvent(req) {
        const con=new connection();
        const conexao=con.conexao();

        var sql = "INSERT INTO `usuario_has_evento`(`Usuario_idUsuario`, `Evento_idEvento`) VALUES ?";
        var values = [[[req.idUsuario,req.idEvento]]];

        return await con.executarQuery(sql, values, conexao);
    }
    async unsubscribe(req) {
        const con=new connection();
        const conexao=con.conexao();

        var sql = "DELETE FROM `usuario_has_evento` WHERE Usuario_idUsuario=? AND Evento_idEvento=?";
        var values = [req.idUsuario,req.idEvento];

        return await con.executarQuery(sql, values, conexao);
    }
    
}