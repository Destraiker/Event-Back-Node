-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 25-Maio-2020 às 00:34
-- Versão do servidor: 10.1.38-MariaDB
-- versão do PHP: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `event`
--
CREATE DATABASE IF NOT EXISTS `event` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `event`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `endereco`
--

CREATE TABLE `endereco` (
  `idEndereco` int(10) UNSIGNED NOT NULL,
  `Usuario_idUsuario` int(10) UNSIGNED NOT NULL,
  `Estado` varchar(2) NOT NULL,
  `Cidade` varchar(65) DEFAULT NULL,
  `Bairro` varchar(65) DEFAULT NULL,
  `Rua` varchar(65) DEFAULT NULL,
  `Numero` varchar(10) DEFAULT NULL,
  `Complemento` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `endereco`
--

INSERT INTO `endereco` (`idEndereco`, `Usuario_idUsuario`, `Estado`, `Cidade`, `Bairro`, `Rua`, `Numero`, `Complemento`) VALUES
(1, 20, 'MG', 'Nova Lima', 'Nova Suiça', 'Matto Grosso', '131', 'CASA'),
(2, 25, 'zx', 'zx', 'zx', 'zx', 'zx', 'xz'),
(3, 25, 'as', 'as', 'as', 'as', 'as', 'as'),
(4, 25, 'qw', 'qw', 'qw', 'qw', 'qw', 'qw');

-- --------------------------------------------------------

--
-- Estrutura da tabela `evento`
--

CREATE TABLE `evento` (
  `idEvento` int(10) UNSIGNED NOT NULL,
  `Endereco_idEndereco` int(10) UNSIGNED NOT NULL,
  `Usuario_idUsuario` int(10) UNSIGNED NOT NULL,
  `Nome` varchar(55) NOT NULL,
  `Decricao` varchar(255) DEFAULT NULL,
  `DataInicio` date DEFAULT NULL,
  `HoraInicio` time DEFAULT NULL,
  `HoraFinal` time DEFAULT NULL,
  `Vagas` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `evento`
--

INSERT INTO `evento` (`idEvento`, `Endereco_idEndereco`, `Usuario_idUsuario`, `Nome`, `Decricao`, `DataInicio`, `HoraInicio`, `HoraFinal`, `Vagas`) VALUES
(1, 1, 20, 'Festinha', 'Festa na casa dos outros', '2020-06-10', '12:00:00', '15:00:00', 6),
(3, 1, 20, 'Trote', 'Legal', '2020-03-12', '15:00:00', '22:00:00', 15),
(4, 2, 25, 'Brener Eduardo Rodrigues', NULL, '2020-06-03', '14:00:00', '20:00:00', 20);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(10) UNSIGNED NOT NULL,
  `Nome` varchar(100) DEFAULT NULL,
  `Telefone` int(10) UNSIGNED DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Data_nascimento` date DEFAULT NULL,
  `Senha` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `Nome`, `Telefone`, `Email`, `Data_nascimento`, `Senha`) VALUES
(20, 'Brener', 365228522, 'brener_live', '2020-01-01', 'Senha'),
(21, 'Brener', 365228522, 'brener_live', '2020-01-01', 'Senha'),
(22, 'Brener Eduar', 365228522, 'brener_live@live.com', '2019-12-12', '22e5c5bc5929d14cd88fcfcd5afe5ee5'),
(23, 'Brener Eduardo Rodrigues', 656565, 'Brener@hot.com', '1999-12-12', '0b941b9120372867a292bf02e3ae3450'),
(24, 'João', 6565, 'tes@tes.com', '1999-06-06', '0b941b9120372867a292bf02e3ae3450'),
(25, 'Teste', 65656565, 't@t.com', '1999-06-06', '0b941b9120372867a292bf02e3ae3450');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario_has_evento`
--

CREATE TABLE `usuario_has_evento` (
  `Usuario_idUsuario` int(10) UNSIGNED NOT NULL,
  `Evento_idEvento` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuario_has_evento`
--

INSERT INTO `usuario_has_evento` (`Usuario_idUsuario`, `Evento_idEvento`) VALUES
(20, 1),
(21, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `endereco`
--
ALTER TABLE `endereco`
  ADD PRIMARY KEY (`idEndereco`),
  ADD KEY `Endereco_FKIndex1` (`Usuario_idUsuario`);

--
-- Indexes for table `evento`
--
ALTER TABLE `evento`
  ADD PRIMARY KEY (`idEvento`),
  ADD KEY `Evento_FKIndex1` (`Usuario_idUsuario`),
  ADD KEY `Evento_FKIndex2` (`Endereco_idEndereco`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- Indexes for table `usuario_has_evento`
--
ALTER TABLE `usuario_has_evento`
  ADD PRIMARY KEY (`Usuario_idUsuario`,`Evento_idEvento`),
  ADD KEY `Usuario_has_Evento_FKIndex1` (`Usuario_idUsuario`),
  ADD KEY `Usuario_has_Evento_FKIndex2` (`Evento_idEvento`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `endereco`
--
ALTER TABLE `endereco`
  MODIFY `idEndereco` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `evento`
--
ALTER TABLE `evento`
  MODIFY `idEvento` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `endereco`
--
ALTER TABLE `endereco`
  ADD CONSTRAINT `endereco_ibfk_1` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`),
  ADD CONSTRAINT `fk_usuario_endereco` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `evento`
--
ALTER TABLE `evento`
  ADD CONSTRAINT `evento_ibfk_1` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`),
  ADD CONSTRAINT `evento_ibfk_2` FOREIGN KEY (`Endereco_idEndereco`) REFERENCES `endereco` (`idEndereco`),
  ADD CONSTRAINT `fk_endereco_evento` FOREIGN KEY (`Endereco_idEndereco`) REFERENCES `endereco` (`idEndereco`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_usuario_evento` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `usuario_has_evento`
--
ALTER TABLE `usuario_has_evento`
  ADD CONSTRAINT `fk_evento_control` FOREIGN KEY (`Evento_idEvento`) REFERENCES `evento` (`idEvento`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_usuario_control` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `usuario_has_evento_ibfk_1` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`),
  ADD CONSTRAINT `usuario_has_evento_ibfk_2` FOREIGN KEY (`Evento_idEvento`) REFERENCES `evento` (`idEvento`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
