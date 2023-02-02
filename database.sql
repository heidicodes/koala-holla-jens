CREATE TABLE koalas (
	"id" serial primary key,
	"koalaname" varchar(40) not null,
	"gender" varchar(2) not null,
	"age" integer not null,
	"ready" boolean not null,
	"notes" varchar(80) not null
);

INSERT INTO koalas (koalaname, gender, age, ready, notes)
VALUES ('Scotty', 'M', 4, true, 'Born in Guatemala'),
('Jean', 'F', 5, true, 'Allergic to lotz of lava'),
('Ororo','F',7,false,'Love listening Paula (Abdul)'),
('Logan','M',15,false,'Loves the sauna'),
('Charlie','M',9,true,'Favorite band is Nirvana'),
('Betsy','F',4,true,'Has a pet iguana');