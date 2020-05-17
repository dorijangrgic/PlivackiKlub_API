# PlivackiKlub_API
API for information system PlivackiKlub

## Setup:

First install MySql server with root passsword "mysqlserver" or change username and password in config/config.json at development.

sql
create database plivackiKlub;

npm install
npm install nodemon babel-cli babel-preset-env babel-loader babel-core bcrypt node-pre-gyp sequelize-cli

Run migrations (node_modules\.bin\sequelize db:migrate)

insert into Users (first_name, last_name, email, username, date_of_birth, password , verified, groupId, roleId, createdAt , updatedAt)
values 
('Master', 'Admin', 'master@zpk.hr', 'administrator', NOW() - interval 28 year, '$2b$10$MzYGjjqRdPiNy9fxOA6IWOEZJZ1q7UKL8ars5KgRIN0MbGenVcSuS', 1, null, 1, NOW(), NOW())

npm start