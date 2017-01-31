

instrukcja uruchomienia z maszyny nie bedacej serwerem:

konsola> screen
konsola> ssh -L 3306:127.0.0.1:3306 wida_1113470@149.156.43.65 
W innym terminalu nalezy uruchomic program (>npm start).

instrukcja uruchomienia z maszyny bedacej serwerem:
nalezy zmodyfikowac plik serwer.js w zaznaczonym fragmencie dotyczacym lacza z baza danych (zamienic komentarze na dwoch framgentach kodu)
nastepnie uruchomic (>npm start)

baza danych -informacje:
tabela "results"
	varchar(250) username
	time time_result
	varchar(100) preset
	datetime date_result
tabels "users"
	varchar(250) username
	varchar(250) password
//przykladowy uzytkownik(users) to "user_1", haslo: "12345678"
