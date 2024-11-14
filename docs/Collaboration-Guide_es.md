[English](../Collaboration-Guide.md) | [Català](./docs/Collaboration-Guide_ca.md)

# 🤝 Guía de Colaboración

## 👀 Issues del Sitio Web

Abre issues para el sitio web del repositorio en https://github.com/ddialar/voluntary-warehouse/issues.

## 🆙 PRs y Contribuciones de Código

- Los tests deben pasar
- Sigue el [JavaScript Standard Style](http://standardjs.com/) y `npm run lint`
- Si corriges un bug, añade un test

## 🔀 Ramas

Usa la rama `master` para correcciones o trabajo menor destinado a la versión actual.

Usa la rama correspondiente, ej. `develop`, para cambios destinados a futuras versiones.

## ✏️ Commits

Tenemos reglas muy precisas sobre cómo deben formatearse nuestros mensajes de commit en Git. Este formato facilita la lectura del historial de commits.

Cada mensaje de commit consta de una cabecera, un cuerpo y un pie.

```sh
<cabecera>
<LÍNEA EN BLANCO>
<cuerpo>
<LÍNEA EN BLANCO>
<pie>
```

**La cabecera es obligatoria** y debe ajustarse al formato de Cabecera de Mensaje de Commit.

**El cuerpo es obligatorio** para todos los commits excepto aquellos de tipo "docs". Cuando el cuerpo está presente debe tener al menos 20 caracteres y debe ajustarse al formato de Cuerpo de Mensaje de Commit.

_El pie es opcional_. El formato de Pie de Mensaje de Commit describe para qué se utiliza el pie y la estructura que debe tener.

### Cabecera del Mensaje de Commit

```sh
<tipo>(<ámbito>): <resumen breve>
  │       │             │
  │       │             └─⫸ Resumen en tiempo presente. Sin mayúscula inicial. Sin punto final.
  │       │
  │       └─⫸ Ámbito del Commit: animations|bazel|benchpress|common|compiler|compiler-cli|core|
  │                               elements|forms|http|language-service|localize|platform-browser|
  │                               platform-browser-dynamic|platform-server|router|service-worker|
  │                               upgrade|zone.js|packaging|changelog|docs-infra|migrations|
  │                               devtools
  │
  └─⫸ Tipo de Commit: build|ci|docs|feat|fix|perf|refactor|test
```

Los campos <tipo> y <resumen> son obligatorios, el campo (<ámbito>) es opcional.

#### Tipo

Debe ser uno de los siguientes:

- `build`: Cambios que afectan al sistema de construcción o dependencias externas (ejemplos de ámbitos: gulp, broccoli, npm)
- `ci`: Cambios en nuestros archivos de configuración y scripts de CI (ejemplos: Github Actions, SauceLabs)
- `docs`: Cambios solo en documentación
- `feat`: Una nueva característica
- `fix`: Una corrección de error
- `perf`: Un cambio de código que mejora el rendimiento
- `refactor`: Un cambio de código que no corrige un error ni añade una característica
- `test`: Añadir pruebas faltantes o corregir pruebas existentes

#### Ámbito

El ámbito debe ser el nombre del paquete npm afectado (según lo percibe la persona que lee el changelog generado a partir de los mensajes de commit).

La siguiente es la lista de ámbitos de ejemplo:

- `common`
- `core`
- `components`
- `forms`
- `language-service`
- `router`
- `modules`

#### Resumen

Usa el campo de resumen para proporcionar una descripción concisa del cambio:

- usa el imperativo, tiempo presente: "cambia" no "cambiado" ni "cambios"
- no capitalices la primera letra
- sin punto (.) al final

### Cuerpo del Mensaje de Commit

Al igual que en el resumen, usa el imperativo, tiempo presente: "arregla" no "arreglado" ni "arregla".

Explica la motivación del cambio en el cuerpo del mensaje de commit. Este mensaje debe explicar por qué estás haciendo el cambio. Puedes incluir una comparación del comportamiento anterior con el nuevo comportamiento para ilustrar el impacto del cambio.

### Pie del Mensaje de Commit

El pie puede contener información sobre cambios importantes (breaking changes) y deprecaciones, y también es el lugar para referenciar issues de GitHub, tickets de Jira y otros PRs que este commit cierra o con los que está relacionado. Por ejemplo:

```sh
BREAKING CHANGE: <resumen del cambio importante>
<LÍNEA EN BLANCO>
<descripción del cambio importante + instrucciones de migración>
<LÍNEA EN BLANCO>
<LÍNEA EN BLANCO>
Fixes #<número de issue>
```

o

```sh
DEPRECATED: <qué está deprecado>
<LÍNEA EN BLANCO>
<descripción de la deprecación + ruta de actualización recomendada>
<LÍNEA EN BLANCO>
<LÍNEA EN BLANCO>
Closes #<número de pr>
```

La sección de Cambios Importantes debe comenzar con la frase BREAKING CHANGE: seguida de un resumen del cambio importante, una línea en blanco, y una descripción detallada del cambio importante que también incluye instrucciones de migración.

De manera similar, una sección de Deprecación debe comenzar con DEPRECATED: seguido de una breve descripción de lo que está deprecado, una línea en blanco, y una descripción detallada de la deprecación que también menciona la ruta de actualización recomendada.

## 📋 Pasos para contribuir

1. [Crea un issue](https://github.com/ddialar/voluntary-warehouse/issues/new) para el bug o funcionalidad
2. Crea tu propio [fork](https://github.com/ddialar/voluntary-warehouse) en GitHub
3. Escribe tu código localmente
4. Instala dependencias con `npm install` y ejecuta `npm test`
5. Asegúrate que el código pasa el linter con `npm run lint`
6. Si los tests pasan, haz commit y crea un pull request referenciando el issue

## ❓ Issues que son preguntas

Cerraremos issues vagos o preguntas específicas de una aplicación. Revisa la documentación antes de crear un issue.

Para que atendamos tu pregunta:

- Código JS/TS completo y ejecutable
- Descripción clara del problema
- Descripción del resultado esperado
- Pasos de depuración realizados
