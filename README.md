jak na spuštění databáze lokálně
nainstaluj mysql
dej do environment path
přes cmd se přihlaš do mysql

mysql -u root -p
zadej heslo

zavolej příkaz na vytvoření databáze dle našeho sql kódu
mysql> SOURCE C:\Users\marek.sucharda\Desktop\susi-private\zelnak-app\backend\db\database.sql

zavolej SHOW DATABASES;

zavolej USE zelnak;

tim by měla databáze frčet

lokální spuštění backendu

připrav si .env soubor např takto
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=zelnak

spust v složce backend2.0 npm run dev

a mělo by to běžet

/////////
spusteni BE lokalne:

1. cd backend2.0
2. npm run dev

/////

edit product - susi
add product - susi
add event - v discordu - susi
router.tsx - vyresit prava - JP
zkontrolovat prava na BE - NEVIM KDO
na farmer page pridat ze pokud je to jeho page tak bude mit tlacitko na edit - nevim kdo
edit event - susi
