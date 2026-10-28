
(function(){
  var rnd=function(a,b){return a+Math.random()*(b-a)};
  var el=function(c,p,css){var d=document.createElement('div');d.className=c;d.style.cssText=css;p.appendChild(d);return d};

  // Estrellas titilantes
  var stars=document.getElementById('stars');
  for(var i=0;i<50;i++){
    var s=el('star',stars,'left:'+rnd(0,100)+'%;top:'+rnd(0,38)+'%');
    gsap.to(s,{opacity:rnd(.1,.4),duration:rnd(1.2,3),repeat:-1,yoyo:true,delay:rnd(0,2),ease:'sine.inOut'});
  }
  // Luciérnagas
  var flies=document.getElementById('flies');
  for(var j=0;j<14;j++){
    var f=el('firefly',flies,'left:'+rnd(0,100)+'%;top:'+rnd(55,95)+'%');
    gsap.to(f,{x:rnd(-60,60),y:rnd(-50,50),duration:rnd(4,8),repeat:-1,yoyo:true,ease:'sine.inOut'});
    gsap.to(f,{opacity:.1,duration:rnd(1,2.5),repeat:-1,yoyo:true,delay:rnd(0,2)});
  }
  // Sol, reflejo, nubes y pájaros
  gsap.to('#sun',{y:8,scale:1.03,duration:4,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to('#glint',{scaleX:1.12,opacity:.5,duration:2.4,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to('.c1',{x:50,duration:30,repeat:-1,yoyo:true,ease:'none'});
  gsap.to('.c2',{x:-60,duration:36,repeat:-1,yoyo:true,ease:'none'});
  gsap.to('.c3',{x:40,duration:26,repeat:-1,yoyo:true,ease:'none'});
  gsap.to('#b1',{x:window.innerWidth+160,y:-30,duration:26,repeat:-1,ease:'none'});
  gsap.to('#b2',{x:window.innerWidth+220,y:-20,duration:32,repeat:-1,delay:4,ease:'none'});

  // Entrada
  gsap.from('#intro h1,#intro p',{y:24,opacity:0,duration:1.1,stagger:.25,ease:'power3.out'});
  gsap.from('#env,#open',{y:30,opacity:0,duration:1,delay:.7,ease:'power3.out'});
  gsap.to('#env',{y:-6,duration:1.6,repeat:-1,yoyo:true,ease:'sine.inOut'});

  // Abrir carta
  var intro=document.getElementById('intro'),letter=document.getElementById('letter');
  var btn=document.getElementById('open'),busy=false;
  btn.addEventListener('click',function(){
    if(busy)return;busy=true;
    gsap.killTweensOf('#env');
    gsap.to('#sideBtn',{autoAlpha:0,x:70,duration:.4});
    var tl=gsap.timeline();
    tl.to('#flap',{rotationX:180,duration:.7,ease:'power2.inOut'})
      .to('#open,#intro h1,#intro p',{opacity:0,y:-16,duration:.5,stagger:.08},'-=.2')
      .to('#env',{y:60,opacity:0,scale:.8,duration:.6,ease:'power2.in'},'-=.2')
      .set(intro,{display:'none'})
      .set(letter,{visibility:'visible'})
      .fromTo(letter,{y:120,scale:.8,rotation:-4,opacity:0},{y:0,scale:1,rotation:0,opacity:1,duration:1,ease:'back.out(1.4)'})
      .from('#letter h2,#letter p,#letter .sign,#letter .close',{opacity:0,y:14,duration:.6,stagger:.35},'-=.4')
      .add(function(){
        confetti({particleCount:60,spread:90,origin:{y:.35},colors:['#ffc371','#f47d4f','#c2456b','#fff1c2'],scalar:1.1});
      },'-=1.2');
  });

  // Cerrar
  document.getElementById('close').addEventListener('click',function(){
    gsap.to(letter,{y:100,scale:.85,opacity:0,duration:.6,ease:'power2.in',onComplete:function(){
      gsap.set(letter,{visibility:'hidden'});
      gsap.set(intro,{display:'block'});
      gsap.set('#flap',{rotationX:0});
      gsap.set('#env',{y:0,opacity:1,scale:1});
      gsap.set('#open,#intro h1,#intro p',{opacity:1,y:0});
      gsap.to('#env',{y:-6,duration:1.6,repeat:-1,yoyo:true,ease:'sine.inOut'});
      busy=false;
      gsap.to('#sideBtn',{autoAlpha:1,x:0,duration:.5,delay:.2});
    }});
  });
})();

(function(){
  // 👉 Agrega aquí tus imágenes (guárdalas en la carpeta "mensajes" del repositorio)
  var MENSAJES=[
    'img/foto1.jpeg',
    'img/foto2.jpeg',
    'img/foto3.jpeg'
  ];

  var gal=document.getElementById('gallery'),panel=document.getElementById('panel'),
      btn=document.getElementById('sideBtn'),lb=document.getElementById('lightbox'),
      lbImg=lb.querySelector('img'),isOpen=false;

  MENSAJES.forEach(function(src,i){
    var fig=document.createElement('figure'),img=new Image();
    img.src=src;img.alt='Mensaje '+(i+1);img.loading='lazy';
    img.onerror=function(){fig.innerHTML='<div class="falta">Falta la imagen '+src+'</div>';fig.style.cursor='default';fig.onclick=null;};
    fig.appendChild(img);
    fig.onclick=function(){lbImg.src=src;lb.style.display='grid';gsap.fromTo(lbImg,{scale:.9,opacity:0},{scale:1,opacity:1,duration:.3});};
    gal.appendChild(fig);
  });

  document.getElementById('badge').textContent=MENSAJES.length;
  gsap.set(panel,{xPercent:105});
  function toggle(open){
    isOpen=open;
    btn.setAttribute('aria-expanded',open);panel.setAttribute('aria-hidden',!open);
    gsap.to(panel,{xPercent:open?0:105,duration:.6,ease:'power3.out'});
    gsap.to(btn,{x:open?80:0,duration:.4});
    if(open)gsap.fromTo('.gallery figure',{y:24,opacity:0},{y:0,opacity:1,duration:.5,stagger:.12,delay:.25});
  }
  btn.addEventListener('click',function(){toggle(true)});
  document.getElementById('panelClose').addEventListener('click',function(){toggle(false)});
  lb.addEventListener('click',function(){lb.style.display='none'});
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){if(lb.style.display==='grid')lb.style.display='none';else if(isOpen)toggle(false);}
  });
})();
