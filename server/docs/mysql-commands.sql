create database if not exists sanatorio;

create user if not exists pacientes@'%' identified by 'pacientes';
grant select, update, insert, delete on sanatorio.* to pacientes@'%';