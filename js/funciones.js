var pagess=1;
var paginasavisos=1;
var pagesPermiso=1;
var paginaspermisos=1;
var pagesCurso=1;
var paginascursos=1;
var pagesCertificado=1;
var paginascertificado=1;
var pagesIntensivo=1;
var paginasIntensivo=1;
var pagesCliente=1;
var paginasCliente=1;
var misfotos;
var miscursos;
var misavisos;
var totalItemsCarga=0;
var itemsCargados=0;
var dias_semana = new Array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado");
var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre", "Diciembre");	
function sinConexion() {
	$("#msg_loading").text("Error de conexión");
        navigator.notification.alert(
        'Ha sido imposible conectar con nuestro servidor. Inténtalo más tarde!',     // mensaje (message)
        'Imposible conectar',            // titulo (title)
        'Sin conexion'                // nombre del botón (buttonName)
        );
		
    }
	
function refrescarCargaInicial(){
	var porcent=(itemsCargados/totalItemsCarga)*220;
	//$(".ui-hor-loading").css('width',porcent+"px");
	$(".ui-hor-loading").animate({width:porcent+"px"},{duration:400});
	if(porcent==220){
		$(".ui-hor-loading").parent().fadeOut(400);
		
	}
	
}
function obtenerImagenes(){
				var data = {
				};
				
		jQuery.getJSON("http://www.autoescuelaselpilar.com/api/imgslideapp/", data, function(objjson1) {
		console.log('El servidor me ha dicho: ' + objjson1);
				//$resultado=array('status'=>'ok',imagenes=>array['titulo'=>$titulo,'url'=>$url,];				
					if(objjson1.status=="ok"){
						 var misfotos=objjson1.imagenes;
						 for(foto in misfotos){
							 var imagen='<li><img src="'+misfotos[foto].url+'"></li>';
							 
							jQuery("ul.rslides").append(imagen);					 
						 }
						 //$(".ui-hor-loading").fadeOut(400);
						 $("#logo-resplandor").fadeOut(500,function(){
							 
							 $(".slidegaleria").fadeIn(300);
						jQuery(".rslides").responsiveSlides({  auto: true,            
  											speed: 500,            
  											timeout: 4000}); 
											
						 })
					}
		
		}).fail(function(){
			//alert("El servidor no está operativo");
			sinConexion();
		});
		
}

	 
	 
    
function pintarFotosGaleria(){
	var fotoc=0;		

			for(foto in misfotos){
				if(fotoc>11){
				break;	
				}
			jQuery("#gallery").append(
			'<a href="#img'+foto+'" data-rel="popup" data-position-to="window" data-transition="fade"><img class="popphoto miimg" src="'+misfotos[foto].thumbURL+'"></a><div data-role="popup" id="img'+foto+'" data-overlay-theme="b" data-theme="b" data-corners="false"><a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><img class="popphoto" src="'+misfotos[foto].imageURL+'" style="width:100%;"></div>');
			
			
			fotoc++;
			delete misfotos[foto];
			}
				$('#galeria').trigger('create');
				$('#galeria [data-role="content"]').iscrollview("refresh");
}
	
	//obtener imagenes galeria
function obtenerGaleria() {
			
/*				 $.mobile.loading( "show", {
            text: "Cargando imagenes de Galería",
            textVisible: true,
            theme: "a",
            textonly: false,
            
    });*/
							var data = {
					
				};
				
				
		jQuery.getJSON("http://www.autoescuelaselpilar.com/api/getImgGaleria/", data, function(objjson8) {
		console.log('El servidor me ha dicho: ' + objjson8);
				// $.mobile.loading("hide");
				$("#home-btn-galeria").animate({opacity:1},'slow');
					if(objjson8.status=="ok"){
						
						misfotos=objjson8.imagenes;
				
			pintarFotosGaleria();
			
	}
									
						
					
					
		})
		
			
		
	}		

	// obtener cursos

function obtenerCursos(firstTime) {
	
			if(pagesCurso<=paginascursos){
				if(!firstTime){
					
						 $.mobile.loading( "show", {
					text: "Cargando cursos",
					textVisible: true,
					theme: "a",
					textonly: false,
					
						 });
				}else{
					totalItemsCarga++;
					refrescarCargaInicial();
				}
			var data = {
					type:'wpsc-product',
					slug:'cursos',
					count:10,
					page:pagesCurso
				};
				
				
		jQuery.getJSON("http://www.autoescuelaselpilar.com/api/getProductsByCategory/", data, function(objjson5) {
		console.log('El servidor me ha dicho de los permisos: ' + objjson5);
				 if(firstTime){
					 itemsCargados++;
					refrescarCargaInicial();
					 $("#cursillos.apelpilar-loading").removeClass("apelpilar-loading");
					 
					 $("#home-btn-maincursos").animate({opacity:1},'slow');
					 $(document).delegate('#mascursos','tap',function(){
						 obtenerCursos(false);
					 })
					 

				 }else{
					 $.mobile.loading("hide");
				 }
					if(objjson5.status=="ok"){
						paginascursos=objjson5.pages;
						miscursos=objjson5.posts;
						for(curso in miscursos){
							var str=miscursos[curso].post_content;
							//var res=str.replace("/r/n","<br/>");
							
							//Obtenemos las variantes de los cursos
							var variaciones=miscursos[curso].variaciones;
							var variaciones_str='<div class="ui-body ui-body-a ui-corner-all lista-variaciones"><h3 class="ui-bar ui-bar-a ui-corner-all">Variaciones del curso</h3>';
							for(v in variaciones){
								variaciones_str=variaciones_str+'<h4>'+variaciones[v].titulo+'</h4><ul class="lista_variaciones" data-role="listview">'
								var varitems=variaciones[v].variantes;
									for(vi in varitems){
										variaciones_str=variaciones_str+'<li>'+varitems[vi]+'</li>';
									}
									
							variaciones_str=variaciones_str+'</ul>';		
							}
							variaciones_str=variaciones_str+'</div>';
							console.log("La lista de variaciones "+variaciones_str);
							jQuery("#cursillos").append(
			'<div class="avis clear">'
			

			//+'<a href="#'+miscursos[curso].id+'" data-rel="popup" class=" popupp" data-transition="pop"><img class="left" width="100px"  src="'+miscursos[curso].thumbnail+'"/></a>'
//			+'<div class="tit_curso">'
//			+'<a href="#'+miscursos[curso].id+'" data-rel="popup" class=" popupp" data-transition="pop">'+miscursos[curso].title+'</a>'
			//+'<div data-role="popup" id="'+miscursos[curso].id+'" class="verpopup"><a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><p>'+miscursos[curso].content+'</p></div>'
			+'<img data-iden='+curso+' class="left popupp" width="100px"  src="'+miscursos[curso].post_thumbnail+'"/>'
		
		+'<div   data-iden='+curso+' class="tit_curso popupp" >'+miscursos[curso].post_title+'</div><div class="item_desc">'+str.replace(/\n/g,"<br/>")+variaciones_str+'</div>'
		+''
			
			+'</div>');
						}
						
						pagesCurso++;
						$('#cursos').trigger('create');
						$('#cursos [data-role="content"]').iscrollview("refresh");
						//$('#cursos [data-role="content"]').refresh();
					}
		})
		
			}
		
}

			
function obtenerPermisos(firstTime) {
	
			if(pagesPermiso<=paginaspermisos){
				if(!firstTime){
					
						 $.mobile.loading( "show", {
					text: "Cargando permisos",
					textVisible: true,
					theme: "a",
					textonly: false,
					
						 });
				}else{
					totalItemsCarga++;
					refrescarCargaInicial();
				}

			var data = {
					type:'wpsc-product',
					slug:'permisos',
					count:10,
					page:pagesPermiso
				};
				
				
		jQuery.getJSON("http://www.autoescuelaselpilar.com/api/getProductsByCategory/", data, function(objjson5) {
		console.log('El servidor me ha dicho de los permisos: ' + objjson5);
				 if(firstTime){
					 itemsCargados++;
					refrescarCargaInicial();
					$("#permisillos.apelpilar-loading").removeClass("apelpilar-loading");
					 $("#home-btn-permisos").animate({opacity:1},'slow');
					 $(document).delegate('#maspermisos','tap',function(){
						 obtenerPermisos(false);
					 })
					 
				 }else{
					 $.mobile.loading("hide");
				 }
					if(objjson5.status=="ok"){
						paginaspermisos=objjson5.pages;
						miscursos=objjson5.posts;
						for(curso in miscursos){
							jQuery("#permisillos").append(
			'<div class="avis clear">'
			
			//+'<a href="#'+miscursos[curso].id+'" data-rel="popup" class=" popupp" data-transition="pop"><img class="left" width="100px"  src="'+miscursos[curso].thumbnail+'"/></a>'
//			+'<div class="tit_curso">'
//			+'<a href="#'+miscursos[curso].id+'" data-rel="popup" class=" popupp" data-transition="pop">'+miscursos[curso].title+'</a>'
			//+'<div data-role="popup" id="'+miscursos[curso].id+'" class="verpopup"><a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><p>'+miscursos[curso].content+'</p></div>'
			+'<img data-iden='+curso+' class="left popupp" width="100px"  src="'+miscursos[curso].post_thumbnail+'"/>'
		
		+'<div   data-iden='+curso+' class="tit_curso popupp" >'+miscursos[curso].post_title+'</div><div class="item_desc">'+miscursos[curso].post_content.replace(/\n/g,"<br/>")+'</div>'
		+''
			
			+'</div>');
						}
						
						pagesPermiso++;
						$('#permisos').trigger('create');
						$('#permisos [data-role="content"]').iscrollview("refresh");
					}
		})
		
			}
		
}

function obtenerCertificados(firstTime) {
	
			if(pagesCertificado<=paginascertificado){
				if(!firstTime){
					
						 $.mobile.loading( "show", {
					text: "Cargando certificados",
					textVisible: true,
					theme: "a",
					textonly: false,
					
						 });
				}else{
					totalItemsCarga++;
					refrescarCargaInicial();
				}

			var data = {
					type:'wpsc-product',
					slug:'certificados-profesionales',
					count:10,
					page:pagesCertificado
				};
				
				
		jQuery.getJSON("http://www.autoescuelaselpilar.com/api/getProductsByCategory/", data, function(objjson5) {
		console.log('El servidor me ha dicho de los permisos: ' + objjson5);
				 if(firstTime){
					 itemsCargados++;
					refrescarCargaInicial();
					$("#certificadillos.apelpilar-loading").removeClass("apelpilar-loading");
					 $(document).delegate('#mascertificados','tap',function(){
						 obtenerCertificados(false);
					 })
					 
				 }else{
					 $.mobile.loading("hide");
				 }
					if(objjson5.status=="ok"){
						paginascertificado=objjson5.pages;
						miscursos=objjson5.posts;
						for(curso in miscursos){
							jQuery("#certificadillos").append(
			'<div class="avis clear">'
			
			//+'<a href="#'+miscursos[curso].id+'" data-rel="popup" class=" popupp" data-transition="pop"><img class="left" width="100px"  src="'+miscursos[curso].thumbnail+'"/></a>'
//			+'<div class="tit_curso">'
//			+'<a href="#'+miscursos[curso].id+'" data-rel="popup" class=" popupp" data-transition="pop">'+miscursos[curso].title+'</a>'
			//+'<div data-role="popup" id="'+miscursos[curso].id+'" class="verpopup"><a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><p>'+miscursos[curso].content+'</p></div>'
			+'<img data-iden='+curso+' class="left popupp" width="100px"  src="'+miscursos[curso].post_thumbnail+'"/>'
		
		+'<div   data-iden='+curso+' class="tit_curso popupp" >'+miscursos[curso].post_title+'</div><div class="item_desc">'+miscursos[curso].post_content.replace(/\n/g,"<br/>")+'</div>'
		+''
			
			+'</div>');
						}
						
						pagesCertificado++;
						$('#certificados').trigger('create');
						$('#certificados [data-role="content"]').iscrollview("refresh");
					}
		})
		
			}
		
}

	
		//obtener avisos
		
function obtenerAvisos(firstTime) {
			if(pagess<=paginasavisos){
				
				if(!firstTime){
					$.mobile.loading( "show", {
					text: "Cargando avisos",
					textVisible: true,
					theme: "a",
					textonly: false,
					
					});
				}else{
					totalItemsCarga++;
					refrescarCargaInicial();
				}

							var data = {
					slug:"avisos",
					count:5,
					page:pagess
				};
				
		jQuery.getJSON("http://www.autoescuelaselpilar.com/api/get_category_posts/", data, function(objjson4) {
		console.log('El servidor me ha dicho: ' + objjson4);
							if(firstTime){
								itemsCargados++;
					refrescarCargaInicial();
					$("#home-btn-avisos").animate({opacity:1},'slow');
								$("#tablon.apelpilar-loading").removeClass("apelpilar-loading");
								$(document).delegate('#masavisos','tap',function(){
									obtenerAvisos(false);
								})
								
							}else{
								$.mobile.loading( "hide");
							}
								 
					if(objjson4.status=="ok"){
						paginasavisos=objjson4.pages;
						misavisos=objjson4.posts;
						for(aviso in misavisos){
							jQuery("#tablon").append(
			'<div class="avis clear popupp" data-iden='+aviso+'>'
			+'<img class="left" width="100px"  src="'+misavisos[aviso].thumbnail+'"/>'
			+'<div class="tit_aviso">'+misavisos[aviso].title+'</div><div class="item_desc">'+misavisos[aviso].content.replace(/\n/g,"<br/>") +'</div>'
			+'</div>');
						}
						
						
						pagess++;
						$('#avisos').trigger('create');
						$('#avisos [data-role="content"]').iscrollview("refresh");
						
					}
		})
		
			}
		
	}					                
	
	//obtener intensivos
	
	function obtenerIntensivos(firstTime) {
			
			if(!firstTime){
				 $.mobile.loading( "show", {
            text: "Cargando cursos ",
            textVisible: true,
            theme: "a",
            textonly: false,
            
    		});
			
			}else{
					totalItemsCarga++;
					refrescarCargaInicial();
				}

							var data = {
				
				};
				
				
		jQuery.getJSON("http://www.autoescuelaselpilar.com/api/getNextCourses/", data, function(objjson10) {
		console.log('El servidor me ha dicho: ' + objjson10);
				if(firstTime){
					itemsCargados++;
					refrescarCargaInicial();
					$("#intensivillos.apelpilar-loading").removeClass("apelpilar-loading");
					$(document).delegate('#masintensivos','tap',function(){
						obtenerIntensivos(false);
					})
					
				}else{
					$.mobile.loading("hide");
				}
					if(objjson10.status=="ok"){
						
						
						var misintensivos=objjson10.cursos;
						for(intensivo in misintensivos){
							var finicio=misintensivos[intensivo].start;
							var ffin=misintensivos[intensivo].end;
							//finicio=finicio.replace("-","/");
							//ffin=ffin.replace("-","/");
							console.log("El mes de "+ finicio + " es "+moment(finicio).format());
							var mydates=new Date(moment(finicio).format());
							var mydatefin=new Date(moment(ffin).format());

							var mes=mydates.getMonth();
							var mesfin=mydatefin.getMonth();
						
							var mesn=meses[mes];
							var mesnfin=meses[mesfin];
							var dia=mydates.getDate();
							var diafin=mydatefin.getDate();
							var weekday=dias_semana[mydates.getDay()];
							var weekdayfin=dias_semana[mydatefin.getDay()];
																				
							var hora="0" + (mydates.getHours()+1);
							hora = hora.substring(hora.length-2, hora.length);
							var horafin="0" + (mydatefin.getHours()+1);
							horafin = horafin.substring(horafin.length-2, horafin.length);
							var minuto="0" + (mydates.getMinutes());
							minuto = minuto.substring(minuto.length-2,minuto.length);
							var minutofin="0" + (mydatefin.getMinutes());
							minutofin = minutofin.substring(minutofin.length-2, minutofin.length);
							var myhora=hora+':'+minuto;
							var myhorafin=horafin+':'+minutofin;
							var anofin=mydatefin.getFullYear();
							jQuery("#intensivillos").append(
							'<div class="intensivillos">'
							+'<div class="date"><span class="month">'+mesn+'</span><span class="day">'+dia+'</span><span class="weekday">'+weekday+'</span></div>'
               	             +'<div class="eventos popupp">'
							 +'<span class="hora">'+myhora+'</span><span class="titulo">'+misintensivos[intensivo].post_title+'</span><span class="direccion">'+misintensivos[intensivo].Lugar+'</span></div>'
						 +'<div id="'+misintensivos[intensivo].ID+'" class="verpopup no_visible"><div class="ver"><span class="titulo">'+misintensivos[intensivo].post_title+'</span><span class="direccion">'+misintensivos[intensivo].Lugar+'</span><div class="time">'+mesn+' '+dia+'@'+myhora+' – '+diafin+' '+mesnfin+','+anofin+' @ '+myhorafin+'</div><div class="ai1ec-event-avatar  ai1ec-post_thumbnail ai1ec-portrait"><img src="'+misintensivos[intensivo].imagen_evento+'"  width="220" height="300"/></div><div class="contenidos">'+misintensivos[intensivo].post_content.replace(/\n/g,"<br/>")+'</div></div></div>'
							 +'</div>'); 
							 
					
				}
				
						 $('#calendario').trigger('create');
					$('#calendario [data-role="content"]').iscrollview("refresh");
						
					}
		})
		
		
		
	}		
			
// obtener clientes

function obtenerClientes() {
		

					totalItemsCarga++;
					refrescarCargaInicial();
				

							var data = {
					
					
				};
				
				
		jQuery.getJSON("http://www.autoescuelaselpilar.com/api/get_Promotion_Categories/", data, function(objjson9) {
		console.log('El servidor me ha dicho: ' + objjson9);
itemsCargados++;
					refrescarCargaInicial();
					$("#home-btn-clientes").animate({opacity:1},'slow');
					if(objjson9.status=="ok"){
						
						misclientes=objjson9.query.tax_query[0].term;
						
						console.log("mis clientes "+misclientes);
						
						for(cliente in misclientes){
							
							jQuery("#clientillos #lista_clientes").append('<li data-titulopromo="'+misclientes[cliente].name+'" data-promoslug="'+misclientes[cliente].slug+'"><div class="ui-elpilar-loading"></div>'+misclientes[cliente].name+'</li>');
    
				
						}
						$('#clientes').trigger('create');	
						$('#clientes [data-role="content"]').iscrollview("refresh");				
						$("#lista_clientes").listview( "refresh" );
						
						}
		})
		
	
		
	}		
	
	
	//boton enviar contacto
jQuery("#envio").click(function(){
		var nombre=jQuery("#nombre").val();
		var email=jQuery("#email").val();
		var tema=jQuery("#tema").val();
		var mensaje=jQuery("#mensaje").val();
		console.log(nombre+email+tema+mensaje);
		var data = {
			nombre: nombre,
			email: email,
			tema:tema,
			mensaje:mensaje
		};
		
		console.log(nombre+email+tema+mensaje);
		
	jQuery.post( "www.autoescuelaselpilar.com/api/dudasfromapp/", data, function(response) {
		console.log('El servidor me ha dicho: ' + response);
			if(response.status=="error"){
				alert(response.error);
			}else{
				alert(response.mensaje);
			}
			})
});

/*
$(document).delegate('#navmenu a','tap',function(){
								 $.mobile.loading( "show", {
            text: "Cargando sección...",
            textVisible: true,
            theme: "a",
            textonly: false,
            
    });
	urldest=$(this).attr('href');
	window.location.href=urldest;
	//$('#container').fadeOut('fast');
	//alert("Espero a ver si se ha quitado");
	//$.mobile.navigate(urldest);
	//alterContent(urldest);
	//$( ":mobile-pagecontainer" ).pagecontainer( "change", urldest, { transition: "fade" } );
return false;

			})
	 
*/
/*	DELEGACIONES */
$(document).delegate('#home a','tap',function(){
	$(this).parent().addClass('ui-loading-button');
	//delete $.mobile.urlHistory.stack[0];
   // $( ":mobile-pagecontainer" ).pagecontainer( "change",$(this).attr("href"),{transition:'slide',reverse: false, changeHash: false});
	//return false;
   // $("#home").remove();             
                     

})

$(document).delegate('#menuelpilar a','tap',function(){
	$(this).parent().addClass('ui-loading-button');
	if ($.mobile.activePage.is($(this).attr("href"))){
           $(this).parent().removeClass('ui-loading-button');
		   $("#menuelpilar").panel('close');
		   return false;
        }
	
})
$(document).delegate('.ui-page', 'pageshow', function () {
    //Your code for each page load here
	$('.ui-loading-button').removeClass('ui-loading-button');
	//$(this).find('[data-role="content"]').iscrollview("refresh");
	var pagina=$( ":mobile-pagecontainer" ).pagecontainer("getActivePage").attr("id");
	switch(pagina){
		case "content-viewer":
		case "permisos":
		case "calendario":
		case "avisos":
		case "galeria":
		case "clientes":
		case "empresas":
		case "certificados":
		case "cursos":
		case "videos":
			$( ":mobile-pagecontainer" ).pagecontainer("getActivePage").find('[data-role="content"]').iscrollview("scrollTo", 0, 0, 200, false);
			
		case "videos":
		$(document).delegate('.yunero-feed','tap',function(){
		console.log("Queremos cargar el video");
        $('#yuneroVideoFrame').attr('src', 'http://www.youtube.com/embed/' + this.id);
$( ":mobile-pagecontainer" ).pagecontainer( "change","#visor-video",{transition:'slide'});
    })	
		break;	
	}

});

//DELEGACION PARA ENVIAR EL FORMULARIO Y PROCESAR LA RESPUESTA
$(document).delegate("#contacto #envio",'tap',function(){
	console.log("El valor es "+$("#contacto #nombre").val());
	if((!$("#contacto #nombre").val())||(!$("#contacto #email").val())){
	$("#fallo_campo").popup();
	$("#fallo_campo").popup("open");
	return false;	
	}
	$.mobile.loading( "show", {
            text: "Enviando formulario ",
            textVisible: true,
            theme: "a",
            textonly: false,
            
    		});
			
	var data={
	nombre:$("#contacto #nombre").val(),
	email:	$("#contacto #email").val(),
	tema:$("#contacto #tema").val(),
	asunto:$("#contacto #asunto").val(),
	mensaje:$("#contacto #mensaje").val()
	}
	jQuery.getJSON("http://www.autoescuelaselpilar.com/api/sendContacto/", data, function(r) {
		if(r.status=='ok'){
			$("#respuesta-contacto div[data-role='content'").html(r.html);
			$("#respuesta-contacto div[data-role='content'").iscrollview('refresh');
			
			
		}
		$( ":mobile-pagecontainer" ).pagecontainer( "change","#respuesta-contacto",{transition:'slide'});
			
	})
})

/*DELEGACIONES PARA CARGAR EL CONTENIDO DEL ITEM EN EL VIEWER CONTENT*/
$(document).delegate('#masgalerias','tap',function(){
	
	pintarFotosGaleria();
})
function visualizarItem(){
	//Copiamos y pegamos el contenido en el visor
	var contenido=$(this).find('.item_desc').clone();
	contenido.removeClass('item_desc');
	//console.log("El curso es "+contenido);
	//contenido.addClass("descripcionItem");
	var imagen=$(this).find('img').attr("src");
	$('#content-viewer h1').text("Cursos");
	$('#content-viewer div[data-role="content"] .iscroll-content').html('');
	contenido.prepend('<img src="'+imagen+'" />');
	contenido.append('<div style="height:20px"></div>');
	$('#content-viewer div[data-role="content"] .iscroll-content').append(contenido);
	
	$( ":mobile-pagecontainer" ).pagecontainer( "change","#content-viewer",{transition:'slide'});
	
	$('#content-viewer [data-role="content"]').iscrollview('refresh');
	$('#content-viewer .lista_variaciones').listview('refresh');
	
}
$(document).delegate('#cursillos .avis','tap',visualizarItem)

$(document).delegate('#certificadillos .avis','tap',visualizarItem)

$(document).delegate('#permisillos .avis','tap',visualizarItem)

$(document).delegate('#intensivillos .intensivillos','tap',function(){
	
	var contenido=$(this).find('.verpopup.no_visible .ver').clone();
	//contenido.removeClass('no_visible');
	console.log("El curso es "+contenido);
	var imagen=$(this).find('img').attr("src");
	//$('#content-viewer h1').text("Cursos");
	$('#content-viewer div[data-role="content"] .iscroll-content').html('');
	//contenido.prepend('<img src="'+imagen+'" />');
	contenido.append('<div style="height:20px"></div>');
	$('#content-viewer div[data-role="content"] .iscroll-content').append(contenido);
	$( ":mobile-pagecontainer" ).pagecontainer( "change","#content-viewer",{transition:'slide'});
	$('#content-viewer [data-role="content"]').iscrollview('refresh');
})

$(document).delegate('#empresas #lista_empresas li','tap',function(){
	
	var contenido=$(this).find('.item_desc').clone();
	contenido.removeClass('item_desc');
	console.log("El curso es "+contenido);
	var imagen=$(this).find('img').attr("src");
	$('#content-viewer h1').text("Cursos");
	$('#content-viewer div[data-role="content"] .iscroll-content').html('');
	//contenido.prepend('<img src="'+imagen+'" />');
	contenido.append('<div style="height:20px"></div>');
	$('#content-viewer div[data-role="content"] .iscroll-content').append(contenido);
	$( ":mobile-pagecontainer" ).pagecontainer( "change","#content-viewer",{transition:'slide'});
	$('#content-viewer [data-role="content"]').iscrollview('refresh');
})

$(document).delegate('#tablon .avis','tap',visualizarItem)

$(document).delegate('#lista_clientes li','tap',function(){
                     $(this).addClass('ui-loading-button');
                     
                     var promoslug=$(this).data('promoslug');
                     var titulo=$(this).data('titulopromo');
                     var data = {
                     promocategoria:promoslug
                     
                     };
                     
                     
                     jQuery.getJSON("http://www.autoescuelaselpilar.com/api/get_Promotions/", data, function(objjson9) {
                                    console.log('El servidor me ha dicho: ' + objjson9);
                                    
                                    if(objjson9.status=="ok"){
                                    
                                    empresas=objjson9.posts;
                                    $('#empresas #container').html('');
                                    $('#empresas #container').append('<div><ul id="lista_empresas" data-role="list-view" data-inset=true></ul></div>')
                                    console.log("mis clientes "+misclientes);
                                    
                                    for(empresa in empresas){
                                    
                                    $("#lista_empresas").append('<li>'+empresas[empresa].title+'<div class="item_desc"><h2>'+empresas[empresa].title+'</h2>'+empresas[empresa].content+'</div></li>');
                                    
                                    
                                    }
                                    
                                   $("#lista_empresas").listview();
								   $("#empresas .ui-header h1").text(titulo);
                                    $( ":mobile-pagecontainer" ).pagecontainer( "change","#empresas",{transition:'slide'});
                                    }
                                    })

                     
                     })