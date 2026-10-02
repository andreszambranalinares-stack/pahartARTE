# Guía para redactar el anteproyecto de pahartARTE

Fecha: 02/10/2026. Guía de orientación elaborada con asistencia de IA a partir de la lectura del Word existente. **El documento original no se ha modificado.**

Esta guía proporciona preguntas, decisiones y ejemplos de contenido. No es una memoria terminada para entregar: escribe las respuestas con tus palabras, comprueba las decisiones y conserva las instrucciones y el formato que exija tu tutor.

## Qué hay actualmente en el Word

Los datos generales y los dos párrafos de **1.1 Contexto y Justificación** contienen información del proyecto. Los apartados **1.2 y 1.3**, y los puntos posteriores, conservan indicaciones y ejemplos de la plantilla. Por tanto, el punto 1 está empezado, pero todavía faltan partes.

## Datos generales

Comprueba título, autor, tutor y fecha. En URL del repositorio puedes incorporar [el repositorio público de pahartARTE](https://github.com/andreszambranalinares-stack/pahartARTE). No pongas la URL del repositorio como si fuera la web publicada: son dos direcciones con funciones diferentes.

## 1. Introducción y diagnóstico

### 1.1 Contexto y justificación

Ya explicas el origen de la idea, el contacto con estudiantes de arte, el nombre y la identidad. Conserva ese enfoque personal.

Para tu propia revisión, sin cambiar aquí tu texto:

- Aparecen «amarillos, azul y amarillo»: el tercer color de la identidad es **rojo**.
- La referencia a colores primarios corresponde al modelo artístico tradicional de pigmentos, no al modelo RGB de las pantallas.
- Revisa espacios, tildes y palabras unidas cuando termines de redactar.
- Presenta lo comentado por tus conocidos como una motivación personal. Para afirmar que existe una necesidad general, harían falta entrevistas, encuestas o fuentes que la apoyen.

Puedes completar el contexto respondiendo: ¿por qué te interesa este problema?, ¿qué conoces del público?, ¿qué parte del proceso artístico quieres facilitar?

### 1.2 Definición del problema

Describe la dificultad actual antes de explicar tu solución. Dedica un párrafo breve a lo que les ocurre a esos artistas y otro a sus consecuencias.

Preguntas para redactar:

- ¿Dónde muestran hoy sus obras y cómo reciben solicitudes de compra?
- ¿Qué información acaba repartida entre porfolio, redes y mensajes?
- ¿Qué dificultad concreta tienen para indicar si una obra está disponible, vendida o en subasta?
- ¿Cómo ayudaría reunir perfil, catálogo y estado de las obras?

No afirmes que no existen plataformas similares. Identifica el enfoque de pahartARTE y, si comparas alternativas, documenta qué has observado en ellas. Una comparación pequeña y honesta es suficiente.

### 1.3 Público objetivo

Sustituye los roles genéricos de la plantilla por los que de verdad necesites:

| Perfil | Qué necesita hacer |
| --- | --- |
| Visitante | Descubrir artistas, consultar perfiles y ver obras. |
| Usuario registrado | Gestionar su perfil, publicar obras, solicitar compras y pujar por obras de otros. |
| Administrador | Gestionar contenido o cuentas cuando sea necesario; definir un alcance mínimo. |

Artista y comprador pueden ser capacidades de la misma cuenta. No necesitas un rol «Empleado/Gestor» si no hay una función concreta que lo justifique.

Especifica a quién te diriges primero: estudiantes de arte y artistas emergentes. Una futura audiencia nacional o internacional puede ser una aspiración; no implica que la primera versión necesite idiomas, envíos o pagos internacionales.

## 2. Alcance y objetivos

### 2.1 Objetivo general

Redacta una sola frase con un verbo principal y el resultado esperado. Construcción orientativa: **desarrollar + tipo de aplicación + público + necesidad que resuelve**.

Incluye la web adaptable, el porfolio y la gestión de obras. Evita prometer liderazgo en el mercado, rentabilidad o una comunidad mundial si no vas a medirlo.

### 2.2 Producto mínimo viable (MVP)

Enumera funciones que puedas demostrar de principio a fin. La propuesta de alcance, pendiente de que la aceptes y ajustes al calendario, es:

| Bloque | Resultado demostrable |
| --- | --- |
| Cuentas y perfil | Un usuario se registra, entra, edita su perfil y ve otro perfil. |
| Porfolio | Publica una obra con imagen; al recargar, sigue guardada. Solo el propietario puede editarla. |
| Catálogo | Se consultan obras y se filtra por tipo de publicación. |
| Venta | Se solicita una compra, se confirma o rechaza y se actualiza el estado de la obra. |
| Subasta básica | Se reciben pujas válidas y se guarda el ganador al finalizar. |

Escribe expresamente que el primer alcance **no incluye cobros integrados**. Distingue una solicitud de compra de un pago y una puja guardada de una venta cobrada.

Concreta las reglas: estados de la obra, quién puede reservar, cuándo se puede retirar, si puede haber varias solicitudes y qué sucede al terminar una subasta sin pujas. Elige reglas sencillas y consistentes.

### 2.3 Funcionalidades opcionales

Elige pocas y ordénalas por utilidad: pasarela de pago en pruebas, favoritos, modo oscuro o notificaciones. Chat, varios idiomas o una aplicación móvil independiente aumentan mucho el trabajo; no los conviertas en obligaciones de la primera versión.

Mantener enlaces a Instagram y Behance es parte del perfil actual. Conectar sus API sería una ampliación distinta.

## 3. Requisitos

### 3.1 Requisitos funcionales

Usa un identificador por requisito y una conducta verificable. Los siguientes son ejemplos para adaptar, no funciones ya implementadas:

| ID | Conducta propuesta | Cómo comprobarla |
| --- | --- | --- |
| RF-01 | Registrar una cuenta con datos válidos y correo único. | Registrar una cuenta y rechazar un correo repetido. |
| RF-02 | Iniciar y cerrar sesión. | Entrar y después verificar que una acción privada exige identificarse. |
| RF-03 | Editar el perfil propio y sus enlaces sociales. | Guardar cambios y comprobarlos tras recargar. |
| RF-04 | Publicar una obra con imagen, título y descripción. | Crear una obra y verla en el perfil y en el catálogo. |
| RF-05 | Editar o retirar las obras propias. | Intentar hacerlo también con una obra ajena y comprobar el rechazo del servidor. |
| RF-06 | Consultar obras por tipo de publicación. | Filtrar y comprobar que todas las obras mostradas corresponden al filtro. |
| RF-07 | Solicitar y resolver la compra de una obra disponible. | Confirmar una solicitud y verificar el estado y el historial. |
| RF-08 | Crear una subasta con precio e instante de cierre válidos. | Rechazar importes negativos y fechas pasadas. |
| RF-09 | Registrar una puja válida de otro usuario antes del cierre. | Rechazar una puja insuficiente, una fuera de plazo y una del propietario. |
| RF-10 | Cerrar una subasta y registrar su resultado. | Probar con pujas, sin pujas y con dos pujas simultáneas. |

Si incluyes administración en el MVP, añade su requisito concreto. No uses «gestionar todo» como descripción.

### 3.2 Requisitos no funcionales

Indican cómo debe funcionar el sistema: seguridad, facilidad de uso, rendimiento y mantenimiento. Propón criterios que puedas comprobar.

- **Seguridad:** contraseñas mediante hash adecuado, permisos comprobados en la API y secretos fuera del repositorio. La plantilla dice «cifradas»; hash y cifrado son conceptos distintos. Revisa el término al redactarlo tú.
- **Adaptación:** navegación usable en móvil y ordenador, sin desplazamiento horizontal accidental. Los tamaños de las capturas de diseño no limitan los dispositivos admitidos por la web.
- **Usabilidad y accesibilidad:** etiquetas en formularios, mensajes claros de error, texto alternativo en imágenes y navegación con teclado en el flujo principal.
- **Integridad:** una operación no deja una obra vendida dos veces ni una subasta con resultados contradictorios.
- **Persistencia:** los datos permanecen después de cerrar el navegador y reiniciar el servidor.
- **Rendimiento:** fija una carga y un entorno de medición. El ejemplo «menos de 500 ms» de la plantilla no es un resultado obtenido; solo compromételo si sabes cómo lo medirás.
- **Mantenimiento:** componentes compartidos y separación entre presentación, reglas de negocio y acceso a datos.

## 4. Tecnologías

Completa las cinco filas existentes con una elección y una justificación breve. Consulta también la [propuesta tecnológica](propuesta-tecnologica.md).

| Fila de tu Word | Contenido propuesto | Idea para justificar |
| --- | --- | --- |
| Frontend / Cliente | React y Vite; JavaScript, HTML y CSS | Componentes reutilizables y una web adaptable aprovechando conocimientos previos. |
| Backend / API | Java, Spring Boot y Spring Web | API con validaciones y reglas de negocio, vinculada a Java de DAM. |
| Base de datos | MySQL; SQL; Spring Data JPA e Hibernate | Modelo relacional para perfiles, obras, solicitudes y pujas. |
| Gestión de código | Git y GitHub | Historial de avances, versiones y repositorio público. |
| Otras librerías / API | Spring Security; Cloudflare para la interfaz | Control de acceso y publicación; pagos solo como ampliación si se incorporan. |

Cloudflare es un servicio de alojamiento, no un lenguaje. No escribas que Pages o un Worker ordinario ejecuta Spring Boot. Decide aparte cómo alojar Java, MySQL e imágenes; no atribuyas un despliegue configurado a algo que todavía es una previsión.

## 5. Viabilidad

### Viabilidad técnica

Separa conocimientos previos de aprendizajes pendientes. Ya has utilizado Java, JavaScript, HTML, CSS, SQL y MySQL; necesitas practicar React, Spring Boot, seguridad, persistencia y publicación según tu experiencia real.

Explica por qué el tamaño se puede controlar: una sola web, una sola API, una base relacional y funciones por etapas. Identifica como dificultad principal la integridad de ventas y pujas, además del despliegue.

Detalla herramientas y recursos disponibles sin inventar un presupuesto. El coste y el proveedor de alojamiento de la API y MySQL siguen pendientes; comprueba sus condiciones antes de afirmar que todo será gratuito.

### Viabilidad temporal

Incluye las fechas y horas reales del módulo cuando las conozcas. Desglosa tareas y reserva tiempo para errores, pruebas, memoria y defensa. Una tabla puede contener: tarea, fecha prevista, esfuerzo estimado, dependencia y resultado.

No completes horas ni fechas con números elegidos al azar. Si todavía no hay calendario, indica que la planificación se ajustará a los hitos del tutor.

## 6. Planificación y riesgos

### 6.1 Planificación

Si la plantilla organiza el curso por trimestres, relaciona cada uno con entregables:

| Periodo de la plantilla | Trabajo orientativo | Entregable |
| --- | --- | --- |
| Primer trimestre | Anteproyecto, requisitos, modelo de datos, diseño y prueba pequeña de conexión cliente–API–MySQL. | Alcance acordado y una función persistente. |
| Segundo trimestre | Cuentas, perfil, porfolio, imágenes y solicitudes de compra; despliegue temprano. | Flujo principal completo en un entorno de pruebas. |
| Tercer trimestre | Subastas, pruebas de errores y concurrencia, ajustes, memoria y defensa. | Versión demostrable y documentación revisada. |

Adáptalo a las fechas reales. Si las subastas se retrasan, reduce extras y evita añadir pagos o chat; revisa con el tutor cualquier cambio del alcance comprometido.

### 6.2 Riesgos

| Riesgo concreto | Consecuencia | Prevención o respuesta |
| --- | --- | --- |
| Curva de aprendizaje de React y Spring | Retraso del flujo principal | Practicar primero una pantalla y una operación guardada; completar porfolio antes de ventas y subastas. |
| Alojamiento incompatible con Java o sin persistencia | La interfaz se publica pero la aplicación no funciona completa | Probar pronto una API pequeña y verificar dónde se guardan MySQL e imágenes. |
| Pujas o reservas simultáneas | Datos o ganador incorrectos | Diseñar transacciones y probar dos usuarios actuando a la vez. |
| Permisos incompletos | Un usuario modifica datos de otro | Comprobar propietario en el servidor y probar accesos ajenos. |
| Aumento de funcionalidades | MVP sin terminar | Mantener una lista corta de obligatorias y separar ampliaciones. |
| Pérdida de avances | Retrabajo | Commits pequeños, sincronización con GitHub y copia de seguridad de documentos y datos que Git no incluye. |
| Dependencia de ayuda externa o IA | Dificultad para explicar el proyecto | Entender cada función, probarla personalmente y registrar la asistencia utilizada. |

La incompatibilidad de versiones y los problemas de pagos que aparecen en la plantilla son ejemplos. Conserva solo los riesgos que se correspondan con tus decisiones.

## Cómo redactarlo por tu cuenta y declarar la ayuda

1. Lee un apartado de esta guía y toma tus propias decisiones.
2. Cierra la guía y redacta una primera versión desde lo que has entendido.
3. Contrasta afirmaciones técnicas con las fuentes oficiales y añade las referencias que utilices.
4. Revisa que lo prometido coincide con el alcance y el calendario.
5. Completa el [registro de uso de IA](registro-uso-ia.md), indicando apartado, propósito y revisión realizada.

Escribir personalmente el texto no elimina la asistencia recibida para organizar ideas o elegir tecnologías. Declara esa orientación con el formato que indique tu centro o tutor. No marques como revisado personalmente algo que aún no hayas comprobado.

## Lista de revisión antes de entregar

- Cada indicación genérica de la plantilla ha sido atendida según las instrucciones del tutor.
- El problema, el público, los objetivos y el MVP describen el mismo proyecto.
- Se distingue lo disponible, lo previsto y lo opcional.
- Los requisitos pueden demostrarse y los riesgos tienen una respuesta.
- El alojamiento de cliente, API, datos e imágenes está identificado o figura como pendiente.
- Las fechas son reales, las fuentes están citadas y la ayuda de IA está declarada.
