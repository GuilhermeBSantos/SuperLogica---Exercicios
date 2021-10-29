create database superlogica_exercicio_3;

use superlogica_exercicio_3;

Create Table USER (
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	cpf VARCHAR(30) NOT NULL unique,
	nome VARCHAR(30) NOT NULL
);

Create Table INFO (
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	cpf VARCHAR(30) NOT NULL unique,
	genero VARCHAR(1) NOT NULL,
	ano_nascimento year(4) NOT NULL
);

Insert Into USER(cpf, nome) 
			values ('16798125050', 'Luke Skywalker'),
					('59875804045', 'Bruce Wayne'),
					('04707649025', 'Diane Prince'),
					('21142450040', 'Bruce Banner'),
					('83257946074', 'Harley Quinn'),
					('07583509025', 'Peter Parker');

Insert Into INFO(cpf, genero, ano_nascimento) 
			values ('16798125050', 'M', 1976),
					('59875804045', 'M', 1960),
					('04707649025', 'F', 1988),
					('21142450040', 'M', 1954),
					('83257946074', 'F', 1970),
					('07583509025', 'M', 1972);
                    
select concat(nome, ' - ', INFO.genero) as 'usuário',
	   if(YEAR(CURDATE()) - INFO.ano_nascimento < 50, 'NÃO', 'SIM') as 'maior_50_anos' from USER inner join INFO ON USER.cpf = INFO.cpf

