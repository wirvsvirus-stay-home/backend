# backend

## Start

```
node index.js
```

## MySQL / MariaDB

MySQL kann einfach per `docker-compose` gestartet werden:

```sh
docker-compose -f docker/mariadb/docker-compose.yml up
```

Der Server ist dann unter `localhost` bzw. `127.0.0.1` mit dem Benutzernamen `root` und dem Passwort `password` erreichbar

### Datenbank zurücksetzen und Server neu starten

```sh
docker-compose -f docker/mariadb/docker-compose.yml down && docker-compose -f docker/mariadb/docker-compose.yml up  
```