(() => {
const script=document.currentScript;
const assets=new URL('imagenes/',script.src).href;
const perfilPropio=document.body.dataset.vista==='personal';
const pantalla=document.body.dataset.pantalla || 'todos';
const root=document.getElementById('pantalla');
const imagen=(nombre)=>assets+nombre;
const escapar=(text)=>String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const catalogos={
 obras:[['Contraste interno',0],['Ciudades posibles',1],['Equilibrio',2],['Luz al horizonte',3],['Silencio',4],['Vuelo libre',5]].map(([titulo,i])=>({titulo,imagen:`obras-${i}.webp`,tipo:'obras',indice:i})),
 enventa:[['Mirada Fragmentada',320],['Paisaje Interior',450],['Equilibrio I',280],['Luz del Sur',390],['Silencio',250],['Vuelo Libre',310]].map(([titulo,precio],i)=>({titulo,precio,imagen:`enventa-${i}.webp`,tipo:'enventa',indice:i})),
 subastas:[['Mirada Fragmentada',120,'2d 14h 32m'],['Naturaleza en Equilibrio',85,'1d 6h 18m'],['Pueblo de Luz',200,'3d 21h 5m'],['Silencio Interior',95,'12h 47m'],['Raíces',60,'1d 4h 12m'],['Geometría del Alma',150,'2d 9h 36m']].map(([titulo,precio,tiempo],i)=>({titulo,precio,tiempo,imagen:`subastas-${i}.webp`,tipo:'subastas',indice:i}))
};
let nombre='Nombre de usuario';
let biografia='Artista visual apasionado por el color, la geometría y las formas que cuentan historias. Mi trabajo explora la identidad, la ciudad y sus contrastes.';
const pestanas=[['todos','Todos'],['obras','Obras'],['subastas','Subastas'],['enventa','En venta']];
root.innerHTML=`
 <header class="marca"><a href="../../index.html" aria-label="Volver a las plantillas"><img src="${imagen('nombre.webp')}" alt="pahartARTE"></a></header>
 <aside class="perfil" aria-label="${perfilPropio?'Mi perfil':'Perfil del artista'}">
  <a class="volver" href="../../index.html" aria-label="Volver a las plantillas">←</a>
  <div class="perfil-arriba"><img class="avatar" src="${imagen('avatar.png')}" alt="Avatar de ${nombre}"><div class="perfil-identidad"><h2 class="nombre">${nombre}</h2>${perfilPropio?'<button class="boton editar-perfil" type="button" data-editar-perfil>Editar perfil</button>':''}</div></div>
  <div class="redes"><h2>Redes sociales</h2><a class="enlace-red" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram, abrir plataforma"><img class="red-icono" src="${imagen('instagram.png')}" alt="">Instagram<img class="externo" src="${imagen('externo.png')}" alt=""></a><a class="enlace-red" href="https://www.behance.net/" target="_blank" rel="noopener noreferrer" aria-label="Behance, abrir plataforma"><img class="red-icono" src="${imagen('behance.png')}" alt="">Behance<img class="externo" src="${imagen('externo.png')}" alt=""></a></div>
  <details class="sobre"><summary>Sobre mí</summary><p>${biografia}</p></details>
 </aside>
 <main class="principal">
  <div class="encabezado"><h1>${perfilPropio?'Mi arte':'Su arte'}</h1>${perfilPropio?'<button class="boton boton-principal publicar" type="button" data-publicar><span aria-hidden="true">＋</span>Publicar obra</button>':''}</div>
  <div class="barra"><nav class="pestanas" aria-label="Tipo de publicación">${pestanas.map(([id,texto])=>`<a class="pestana ${id===(pantalla==='vacia'?'obras':pantalla)?'activa':''}" href="${id}.html" ${id===(pantalla==='vacia'?'obras':pantalla)?'aria-current="page"':''}>${texto}</a>`).join('')}</nav><div class="herramientas"><button class="control orden" type="button" id="orden"><img class="icono" src="${imagen('orden.png')}" alt=""><span>Más recientes</span><img class="icono" src="${imagen('chevron.png')}" alt=""></button><button class="control filtros" type="button" id="filtros" aria-expanded="false" aria-controls="filtro-panel"><img class="icono" src="${imagen('filtro.png')}" alt="">Filtros</button></div></div>
  <div class="filtro-panel" id="filtro-panel" hidden><label for="tipo">Tipo de publicación</label><select id="tipo"><option value="todos">Todos</option><option value="obras">Obras</option><option value="subastas">Subastas</option><option value="enventa">En venta</option></select></div>
  <section class="rejilla" aria-label="Publicaciones ${perfilPropio?'propias':'del artista'}"></section>
  <section class="vacia" ${pantalla==='vacia'?'':'hidden'}><img src="${imagen('simbolo-vacio.png')}" alt="Símbolo de pahartARTE"><h2>${perfilPropio?'Todavía no has publicado ninguna obra.':'Este artista todavía no tiene ninguna obra publicada.'}</h2>${perfilPropio?'<p>Comparte tu primera creación y empieza a dar forma a tu porfolio.</p><button class="boton boton-principal" type="button" data-publicar>Publicar mi primera obra</button>':''}</section>
  <p class="aviso" aria-live="polite"></p>
 </main>
 <dialog id="dialogo"><div class="dialogo-contenido"></div></dialog>`;
const sobre=root.querySelector('.sobre');
const media=window.matchMedia('(max-width:760px)');
function ajustarPerfil(){sobre.open=!media.matches;} ajustarPerfil(); media.addEventListener('change',ajustarPerfil);
const rejilla=root.querySelector('.rejilla'); const aviso=root.querySelector('.aviso');
let ordenTitulo=false;let seleccion=[];let vacia=pantalla==='vacia';
function tarjeta(obra,i){
 const titulo=escapar(obra.titulo);
 const informacion=obra.tipo==='enventa'?`<div class="informacion"><span class="precio">${obra.precio} €</span><span class="disponible">● Disponible</span></div>`:obra.tipo==='subastas'?`<div class="subasta-datos"><div><span class="etiqueta">Puja actual</span><strong class="precio">${obra.precio} €</strong></div><div><span class="etiqueta">Tiempo restante</span><strong class="tiempo"><img class="icono" src="${imagen('reloj.png')}" alt="">${obra.tiempo}</strong></div></div>`:'<p class="tipo-porfolio">Obra de porfolio</p>';
 const accion=perfilPropio?(obra.tipo==='obras'?'Editar obra':obra.tipo==='enventa'?'Gestionar venta':'Gestionar subasta'):(obra.tipo==='subastas'?'Ver subasta':'Ver obra');
 return `<article class="tarjeta"><img class="arte" src="${imagen(obra.imagen)}" alt="${titulo}"><div class="titulo-fila"><h2 class="titulo">${titulo}</h2>${perfilPropio?`<button class="mas" type="button" data-editar="${i}" aria-label="Editar ${titulo}">···</button>`:''}</div>${informacion}<button class="boton boton-principal accion" type="button" ${perfilPropio?'data-editar':'data-detalle'}="${i}">${accion}</button></article>`;
}
function dibujar(){
 if(vacia){rejilla.hidden=true;root.querySelector('.vacia').hidden=false;return;}
 let obras=pantalla==='todos'?[catalogos.obras[0],catalogos.subastas[1],catalogos.enventa[2],catalogos.obras[3],catalogos.subastas[4],catalogos.enventa[5]]:[...catalogos[pantalla==='vacia'?'obras':pantalla]];
 const tipo=root.querySelector('#tipo').value;if(tipo!=='todos')obras=obras.filter(o=>o.tipo===tipo);
 if(ordenTitulo)obras.sort((a,b)=>a.titulo.localeCompare(b.titulo,'es'));
 seleccion=obras;rejilla.hidden=false;root.querySelector('.vacia').hidden=true;rejilla.innerHTML=obras.map(tarjeta).join('');
 aviso.textContent=obras.length?'':'No hay obras con estos filtros.';
}
root.querySelector('#orden').addEventListener('click',()=>{ordenTitulo=!ordenTitulo;root.querySelector('#orden span').textContent=ordenTitulo?'Título A–Z':'Más recientes';dibujar();});
root.querySelector('#filtros').addEventListener('click',e=>{const p=root.querySelector('.filtro-panel');p.hidden=!p.hidden;e.currentTarget.setAttribute('aria-expanded',String(!p.hidden));});
root.querySelector('#tipo').addEventListener('change',dibujar);
const dialogo=root.querySelector('#dialogo');
function abrir(contenido){dialogo.querySelector('.dialogo-contenido').innerHTML=contenido;dialogo.showModal();dialogo.querySelectorAll('[data-cerrar]').forEach(b=>b.addEventListener('click',()=>dialogo.close()));}
root.querySelectorAll('[data-editar-perfil]').forEach(b=>b.addEventListener('click',()=>{
 abrir(`<h2>Editar mi perfil</h2><form id="perfil-form"><label for="nombre">Nombre</label><input id="nombre" name="nombre" value="${escapar(nombre)}" required maxlength="40"><label for="biografia">Sobre mí</label><textarea id="biografia" name="biografia" rows="4" maxlength="240">${escapar(biografia)}</textarea><div class="dialogo-acciones"><button class="boton" type="button" data-cerrar>Cancelar</button><button class="boton boton-principal" type="submit">Guardar cambios</button></div></form>`);
 dialogo.querySelector('form').addEventListener('submit',e=>{e.preventDefault();nombre=e.target.nombre.value.trim();biografia=e.target.biografia.value.trim();root.querySelector('.nombre').textContent=nombre;root.querySelector('.sobre p').textContent=biografia;dialogo.close();});
}));
function editarObra(obra){
 abrir(`<h2>${obra?'Editar publicación':'Publicar obra'}</h2><form id="obra-form"><label for="titulo-obra">Título</label><input id="titulo-obra" name="titulo" value="${obra?escapar(obra.titulo):''}" required maxlength="55"><label for="tipo-obra">Tipo de publicación</label><select id="tipo-obra" name="tipo"><option value="obras">Porfolio</option><option value="enventa">En venta</option><option value="subastas">Subasta</option></select><label for="precio-obra">Precio o puja inicial (€)</label><input id="precio-obra" name="precio" type="number" min="0" step="1" value="${obra?.precio||0}"><div class="dialogo-acciones"><button class="boton" type="button" data-cerrar>Cancelar</button><button class="boton boton-principal" type="submit">Guardar</button></div></form>`);
 const form=dialogo.querySelector('form');form.tipo.value=obra?.tipo||'obras';
 form.addEventListener('submit',e=>{e.preventDefault();const tipo=form.tipo.value;
  if(obra){const tipoAnterior=obra.tipo;Object.assign(obra,{titulo:form.titulo.value.trim(),precio:Number(form.precio.value),tipo});if(tipoAnterior!==tipo){catalogos[tipoAnterior]=catalogos[tipoAnterior].filter(o=>o!==obra);catalogos[tipo].unshift(obra);}}
  else{catalogos[tipo].unshift({titulo:form.titulo.value.trim(),tipo,precio:Number(form.precio.value),tiempo:'7d 0h 0m',imagen:tipo==='obras'?'obras-0.webp':tipo==='enventa'?'enventa-0.webp':'subastas-0.webp'});vacia=false;}
  dialogo.close();dibujar();aviso.textContent='Cambios guardados en esta vista previa.';
 });
}
root.querySelectorAll('[data-publicar]').forEach(b=>b.addEventListener('click',()=>editarObra(null)));
rejilla.addEventListener('click',e=>{const edit=e.target.closest('[data-editar]'),detail=e.target.closest('[data-detalle]');if(edit&&perfilPropio)editarObra(seleccion[Number(edit.dataset.editar)]);if(detail){const obra=seleccion[Number(detail.dataset.detalle)];abrir(`<h2>${escapar(obra.titulo)}</h2><img class="detalle-imagen" src="${imagen(obra.imagen)}" alt="${escapar(obra.titulo)}"><p>${obra.tipo==='obras'?'Obra de porfolio':obra.tipo==='enventa'?'Precio: '+obra.precio+' € · Disponible':'Puja actual: '+obra.precio+' € · '+obra.tiempo}</p><div class="dialogo-acciones"><button type="button" class="boton" data-cerrar>Cerrar</button></div>`);}});
dibujar();
})();
