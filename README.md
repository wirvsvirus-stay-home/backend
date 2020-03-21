# backend

## Server starten

```
node index.js
```

## MySQL / MariaDB starten

MySQL kann einfach per `docker-compose` gestartet werden:

```sh
docker-compose -f docker/dev/mariadb/docker-compose.yml up
```

Der Server ist dann unter `localhost` bzw. `127.0.0.1` mit dem Benutzernamen `root` und dem Passwort `password` erreichbar

### Datenbank initialisieren

```
npm run db:init
```

### Datenbank zurücksetzen

```
npm run db:reset
```

### Datenbank zurücksetzen und Server neu starten

```sh
docker-compose -f docker/dev/mariadb/docker-compose.yml down && docker-compose -f docker/dev/mariadb/docker-compose.yml up  
```