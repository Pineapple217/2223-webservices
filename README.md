# Examenopdracht Web Services

- Student: Jules Roser
- Studentennummer: 202184102
- E-mailadres: jules.rosier@student.hogent.be

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

## Opstarten

Voor het opstarten van de aplicatie moet er een `.env` bestand aangemaakt worden. Hier in moet mode ingestelt worden het zijnde 'development' of 'production'
Voorbeeld:

```
# .env
# NODE_ENV=production
NODE_ENV=development

DATABASE_URL=mysql://USER:WACHTWOORD@DOMAIN:PORT/DATABASE
# bv mysql://root:toor@localhost:3306/f1

AUTH_JWKS_URI=auth0 domein/.well-known/jwks.json'
AUTH_AUDIENCE=uniek aan iedere auth0 palicatie
AUTH_ISSUER=auth 0 domein
AUTH_USER_INFO=auth 0 domein/userinfo'
```
Vergeet ook niet alle yarn packages te downloaden vooe het starten van het programma, dit kan je simpel doen met het volgende commando.

```
yarn install
```

Voor het starten van de API moet het volgende commando in de root van het project worden uitgevoert.

```
yarn start
```
## Datalaag

Dit project maakt gebruik van [Prisma](https://www.prisma.io/). Voor de databank te seeden word het volgende Prisma commando gebruikt.

```
yarn prisma db seed
```
Migrations kunnen ook op een simpele manier uitgevoerd worden met volgend commando.

```
yarn prisma migrate dev
```

## Testen

Maak een bestand aan met de naam `.env.test`. Hier in komt het zelfde van de voorgaande `.env` in de meeste gavallen plus een aantal extra dingen in verband met Auth0.
```
AUTH_TEST_USER_USER_ID=de user id van de test gebruiker
AUTH_TEST_USER_USERNAME=de gebruikers naam van de test gebruiker
AUTH_TEST_USER_PASSWORD=het wachtwoord van de test gebruiker
AUTH_TOKEN_URL=uw auth0 domein/oauth/token
AUTH_CLIENT_ID=uw auth0 application client id
AUTH_CLIENT_SECRET=uw auth0 application client id secret
```

Voer het commando `yarn test` uit voor te testen. Het commando `yarn test:coverage` kan ook gebruikt worden om een overzicht te krijgen van hoeveel van de code er getest word.
