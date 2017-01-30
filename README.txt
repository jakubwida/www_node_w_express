-tutaj nastapi przejscie na jade
-idea jest taka ze angula nie jest zalecany, zamiast tego jade i express



baza danych

> screen
> ssh -L 3306:127.0.0.1:3306 wida_1113470@149.156.43.65 
i w innym terminalu nalezy uruchomic nodejs, tak zeby laczyl sie z bd po porcie 3306


baza danych:
tabela "results"
	varchar(250) username
	time time_result
	varchar(100) preset
	datetime date_result
tabels "users"
	varchar(250) username
	varchar(250) password
//przykladowy user to "user_1", haslo: "12345678"
