[English](../Collaboration-Guide.md) | [Castellano](./docs/Collaboration-Guide_es.md)

# 🤝 Guia del Col·laboració

## 👀 Issues del Lloc Web

Obre issues per al lloc web del repositori a https://github.com/ddialar/voluntary-warehouse/issues.

## 🆙 PRs i Contribucions de Codi

- Els tests han de passar
- Segueix el [JavaScript Standard Style](http://standardjs.com/) i `npm run lint`
- Si corregeixes un bug, afegeix un test

## 🔀 Branques

Utilitza la branca `master` per a correccions o treball menor destinat a la versió actual.

Utilitza la branca corresponent, ex. `develop`, per a canvis destinats a futures versions.

## ✏️ Commits

Tenim regles molt precises sobre com s'han de formatejar els nostres missatges de commit a Git. Aquest format facilita la lectura de l'historial de commits.

Cada missatge de commit consta d'una capçalera, un cos i un peu.

```sh
<capçalera>
<LÍNIA EN BLANC>
<cos>
<LÍNIA EN BLANC>
<peu>
```

**La capçalera és obligatòria** i ha d'ajustar-se al format de Capçalera de Missatge de Commit.

**El cos és obligatori** per a tots els commits excepte aquells de tipus "docs". Quan el cos és present ha de tenir almenys 20 caràcters i ha d'ajustar-se al format de Cos de Missatge de Commit.

_El peu és opcional_. El format de Peu de Missatge de Commit descriu per a què s'utilitza el peu i l'estructura que ha de tenir.

### Capçalera del Missatge de Commit

```sh
<tipus>(<àmbit>): <resum breu>
  │       │             │
  │       │             └─⫸ Resum en temps present. Sense majúscula inicial. Sense punt final.
  │       │
  │       └─⫸ Àmbit del Commit: animations|bazel|benchpress|common|compiler|compiler-cli|core|
  │                              elements|forms|http|language-service|localize|platform-browser|
  │                              platform-browser-dynamic|platform-server|router|service-worker|
  │                              upgrade|zone.js|packaging|changelog|docs-infra|migrations|
  │                              devtools
  │
  └─⫸ Tipus de Commit: build|ci|docs|feat|fix|perf|refactor|test
```

Els camps <tipus> i <resum> són obligatoris, el camp (<àmbit>) és opcional.

#### Tipus

Ha de ser un dels següents:

- `build`: Canvis que afecten al sistema de construcció o dependències externes (exemples d'àmbits: gulp, broccoli, npm)
- `ci`: Canvis en els nostres arxius de configuració i scripts de CI (exemples: Github Actions, SauceLabs)
- `docs`: Canvis només en documentació
- `feat`: Una nova característica
- `fix`: Una correcció d'error
- `perf`: Un canvi de codi que millora el rendiment
- `refactor`: Un canvi de codi que no corregeix un error ni afegeix una característica
- `test`: Afegir proves que falten o corregir proves existents

#### Àmbit

L'àmbit ha de ser el nom del paquet npm afectat (segons ho percep la persona que llegeix el changelog generat a partir dels missatges de commit).

La següent és la llista d'àmbits d'exemple:

- `common`
- `core`
- `components`
- `forms`
- `language-service`
- `router`
- `modules`

#### Resum

Utilitza el camp de resum per proporcionar una descripció concisa del canvi:

- utilitza l'imperatiu, temps present: "canvia" no "canviat" ni "canvis"
- no capitalitzis la primera lletra
- sense punt (.) al final

### Cos del Missatge de Commit

Igual que en el resum, utilitza l'imperatiu, temps present: "arregla" no "arreglat" ni "arregla".

Explica la motivació del canvi en el cos del missatge de commit. Aquest missatge ha d'explicar per què estàs fent el canvi. Pots incloure una comparació del comportament anterior amb el nou comportament per il·lustrar l'impacte del canvi.

### Peu del Missatge de Commit

El peu pot contenir informació sobre canvis importants (breaking changes) i deprecacions, i també és el lloc per referenciar issues de GitHub, tickets de Jira i altres PRs que aquest commit tanca o amb els quals està relacionat. Per exemple:

```sh
BREAKING CHANGE: <resum del canvi important>
<LÍNIA EN BLANC>
<descripció del canvi important + instruccions de migració>
<LÍNIA EN BLANC>
<LÍNIA EN BLANC>
Fixes #<número d'issue>
```

o

```sh
DEPRECATED: <què està deprecat>
<LÍNIA EN BLANC>
<descripció de la deprecació + ruta d'actualització recomanada>
<LÍNIA EN BLANC>
<LÍNIA EN BLANC>
Closes #<número de pr>
```

La secció de Canvis Importants ha de començar amb la frase BREAKING CHANGE: seguida d'un resum del canvi important, una línia en blanc, i una descripció detallada del canvi important que també inclou instruccions de migració.

De manera similar, una secció de Deprecació ha de començar amb DEPRECATED: seguit d'una breu descripció del que està deprecat, una línia en blanc, i una descripció detallada de la deprecació que també esmenta la ruta d'actualització recomanada.

## 📋 Passos per Contribuir

1. [Crea un issue](https://github.com/ddialar/voluntary-warehouse/issues/new) per al bug o funcionalitat
2. Crea el teu propi [fork](https://github.com/ddialar/voluntary-warehouse) a GitHub
3. Escriu el teu codi localment
4. Instal·la dependències amb `npm install` i executa `npm test`
5. Assegura't que el codi passa el linter amb `npm run lint`
6. Si els tests passen, fes commit i crea un pull request referenciant l'issue

## ❓ Issues que són Preguntes

Tancarem issues vagues o preguntes específiques d'una aplicació. Revisa la documentació abans de crear un issue.

Per a que atenguem la teva pregunta:

- Codi JS/TS complet i executable
- Descripció clara del problema
- Descripció del resultat esperat
- Passos de depuració realitzats
