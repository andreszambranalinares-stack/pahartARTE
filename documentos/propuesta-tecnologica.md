# Propuesta tecnológica para pahartARTE

Fecha: 02/10/2026. Propuesta de orientación preparada con asistencia de IA; pendiente de la elección final del autor.

## Punto de partida

El autor ha trabajado con Java, JavaScript, HTML, CSS, SQL, MySQL y MongoDB. Prefiere una web y el tutor permite elegir el tipo de aplicación. Cloudflare es el alojamiento previsto, todavía sin servicio ni despliegue configurados.

La recomendación es **React con JavaScript + Spring Boot con Java + MySQL**. Reutiliza lo aprendido en DAM y permite practicar interfaz, API, programación orientada a objetos, SQL y control de versiones. React es la incorporación principal; Spring Boot también requiere aprender sus convenciones.

## Qué usar y para qué

| Parte | Elección propuesta | Motivo en este proyecto |
| --- | --- | --- |
| Interfaz | React, JavaScript, HTML y CSS | Compartir componentes de perfil, pestañas, tarjetas y formularios entre las pantallas existentes. |
| Preparación del cliente | Vite | Crear y compilar una interfaz React sencilla. |
| Navegación | React Router | Abrir perfiles, obras y formularios mediante direcciones propias. |
| Peticiones | `fetch` del navegador | Comunicarse con la API sin añadir una biblioteca para peticiones al principio. |
| API | Java y Spring Boot, con Spring Web | Recibir solicitudes, validar datos y aplicar las reglas de obras, ventas y subastas. |
| Persistencia | MySQL con InnoDB | Relacionar usuarios, obras, ventas, subastas y pujas, manteniendo su integridad. |
| Acceso a datos | Spring Data JPA e Hibernate | Trabajar con entidades Java; conservar el aprendizaje de SQL para comprender consultas y transacciones. |
| Acceso y permisos | Spring Security | Proteger operaciones y almacenar contraseñas mediante hash adecuado. |
| Construcción de la API | Maven | Gestionar las dependencias y compilar la aplicación Java. |
| Versiones | Git y GitHub | Guardar avances pequeños, explicar cambios y recuperar versiones. |
| Pruebas | JUnit y pruebas de integración del backend | Comprobar permisos, operaciones de venta y pujas, donde los errores afectan a los datos. |

**Lenguajes:** Java y JavaScript; HTML es marcado, CSS define estilos y SQL consulta los datos. React, Spring Boot y MySQL son tecnologías, no nombres de lenguajes. Node.js se utilizaría para las herramientas del cliente, aunque la API propuesta esté escrita en Java.

Usar una versión estable de Spring Boot compatible con el JDK elegido mediante Spring Initializr. Java 21 es una base posible; comprobar la compatibilidad al crear el proyecto. Registrar entonces las versiones exactas y mantenerlas durante el desarrollo.

La [documentación de React](https://react.dev/learn/build-a-react-app-from-scratch) contempla Vite para una aplicación creada desde cero; la [guía de Spring](https://spring.io/guides/gs/rest-service/) muestra una API REST en Java. Consulta los [requisitos de Spring Boot](https://docs.spring.io/spring-boot/system-requirements.html) antes de fijar versiones.

## Cloudflare: qué parte alojar allí

La interfaz React se compila en archivos que pueden publicarse en Cloudflare. Existen guías para [React en Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/) y [React con Vite en Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/react/). Elegir uno al preparar el despliegue; no hace falta utilizar ambos.

**Una API Spring Boot requiere un entorno que ejecute Java.** Los Workers ordinarios tienen un runtime distinto, según sus [lenguajes admitidos](https://developers.cloudflare.com/workers/languages/). Cloudflare ofrece también [Containers](https://developers.cloudflare.com/containers/), que permiten otros runtimes y requieren un plan de pago, pero añaden empaquetado y configuración.

Recomendación para empezar: desarrollar React, la API Java y MySQL en el ordenador; publicar después la interfaz en Cloudflare y elegir un alojamiento sencillo para Java y MySQL. El proveedor y el coste quedan pendientes. Si se decide concentrar todo en Cloudflare, revisar la alternativa de Containers antes de comprometer el anteproyecto.

El recorrido propuesto es:

```text
Navegador: interfaz React alojada en Cloudflare
    → solicitudes HTTPS a la API Spring Boot
        → MySQL y almacenamiento persistente de imágenes
```

MySQL se conecta a la API, no directamente al navegador. Las claves de base de datos permanecen en el servidor. En el despliegue habrá que concretar los dominios, los permisos de acceso entre cliente y API y la configuración de las cookies.

Para una primera versión, una sesión del servidor con cookie segura evita implementar un sistema propio de tokens. Mantener la protección CSRF y configurar los orígenes permitidos. Preferir cliente y API bajo subdominios del mismo dominio cuando se disponga de él. La decisión final debe probarse con el alojamiento real.

Las imágenes pueden empezar en una carpeta local gestionada por el backend, guardando su referencia en MySQL. En producción deben usar almacenamiento persistente; no asumir que el disco temporal del alojamiento conserva los archivos. Un servicio de almacenamiento de objetos sería una ampliación si hace falta.

## Alcance asumible y funcional

### Primera entrega: porfolio completo

Registro, inicio y cierre de sesión, perfil editable, enlaces sociales, publicación de obras con imagen, título y descripción, edición y retirada de las propias obras, consulta de perfiles y filtros. Los datos deben persistir tras reiniciar la aplicación.

### Segunda entrega: venta a precio fijo

Una obra puede estar disponible, reservada o vendida. Un usuario registrado solicita comprarla y el artista confirma o rechaza la solicitud. Registrar usuario, importe y estado; evitar dos reservas simultáneas. Este flujo es real y persistente, pero el cobro queda fuera de la plataforma en este alcance.

### Tercera entrega: subasta básica

Una obra, precio de salida, incremento mínimo y fecha de cierre. Aceptar pujas de usuarios registrados, superiores al mínimo y anteriores al cierre; impedir que el propietario puje por su propia obra. Usar importes decimales exactos, no números de coma flotante para dinero.

El servidor decide la hora válida y el ganador. Dos pujas simultáneas deben resolverse dentro de una transacción. MySQL documenta los [bloqueos de lectura de InnoDB](https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html), útiles al diseñar esa operación. Al cerrar la subasta se debe guardar el resultado una sola vez; si no hubo pujas, no hay ganador. Consultar periódicamente el estado desde el cliente es suficiente para la primera versión.

No permitir que una misma obra tenga una venta y una subasta activas a la vez. Antes de prometer estas tres entregas, ajustar su tamaño al calendario real del módulo.

## Qué reservar para ampliaciones

- Pagos integrados: estudiar primero un modo de pruebas. [Stripe permite probar sin mover dinero real](https://docs.stripe.com/testing); repartir cobros entre artistas requiere diseñar un flujo de marketplace adicional.
- Chat, notificaciones instantáneas, recomendaciones automáticas y aplicación móvil instalable.
- Modo oscuro, varios idiomas y conexión con las API de redes sociales. Un enlace a Instagram o Behance no necesita su API.
- Firebase no es necesario para esta propuesta: la API y MySQL ya cubren el backend y la persistencia.

## Alternativas y criterio de elección

| Alternativa | Cuándo tendría sentido | Por qué no es la primera propuesta |
| --- | --- | --- |
| HTML, CSS y JavaScript sin React | Si aprender React consume demasiado tiempo | Es viable, pero habrá que organizar manualmente componentes y estado a medida que crezcan las pantallas. |
| Java con Spring MVC y Thymeleaf | Si se prioriza reducir la separación entre cliente y API | Simplifica un despliegue Java único; cambia el planteamiento de una interfaz React alojada por separado. |
| API con JavaScript en Cloudflare Workers | Si alojar la API directamente en Workers se convierte en prioridad | Cambia el backend recomendado; habría que replantear bibliotecas y persistencia, no trasladar Spring Boot sin más. |
| MongoDB | Si el modelo de datos justifica documentos flexibles | Las relaciones y operaciones de este proyecto encajan con SQL y MySQL ya es conocido. |
| Flutter/Dart | Si se exige una aplicación instalable multiplataforma | La web está permitida y preferida; aprender Dart no aporta una ventaja necesaria para este alcance. |

## Orden de aprendizaje y trabajo

1. Definir en papel los usuarios, las reglas y las entidades. Dibujar un modelo relacional pequeño.
2. Practicar React con la tarjeta de una obra y la barra de pestañas del diseño existente.
3. Crear una API que devuelva obras de prueba y conectar una sola pantalla.
4. Añadir MySQL y comprobar crear, consultar, editar y retirar una obra.
5. Incorporar cuentas, permisos e imágenes. Comprobar con dos usuarios que nadie edita obras ajenas.
6. Completar solicitudes de venta y después las pujas con sus pruebas de concurrencia y cierre.
7. Desplegar una parte pequeña pronto; completar la publicación, la documentación y la demostración al final.

Para trabajar con autonomía, implementar una función pequeña cada vez y poder explicar su recorrido de navegador a base de datos. Registrar la ayuda de IA cuando se use para entender, diseñar, redactar, generar código o resolver errores; no limitar la declaración al código copiado.
