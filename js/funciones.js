

var pagess=1;
var paginasavisos=1;
var pagesCurso=1;
var paginascursos=1;
var pagesIntensivo=1;
var paginasIntensivo=1;
var pagesCliente=1;
var paginasCliente=1;
var misfotos;

function obtenerImagenes(){
				var data = {
				};
				
		jQuery.getJSON("http://www.autoescuelaselpilar.com/api/imgslideapp", data, function(objjson1) {
		console.log('El servidor me ha dicho: ' + objjson1);
				//$resultado=array('status'=>'ok',imagenes=>array['titulo'=>$titulo,'url'=>$url,];				
					if(objjson1.status=="ok"){
						 var misfotos=objjson1.imagenes;
						 for(foto in misfotos){
							 var imagen='<li><img src="'+misfotos[foto].url+'"></li>';
							 
							jQuery("ul.rslides").append(imagen);					 
						 }
						jQuery(".rslides").responsiveSlides({  auto: true,            
  											speed: 500,            
  											timeout: 4000,
											
											}); 			
					}
		
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
				$('#misgalerias').trigger('create');
}
	
	//obtener imagenes galeria
function obtenerGaleria() {
			
				 $.mobile.loading( "show", {
            text: "Cargando imagenes de Galería",
            textVisible: true,
            theme: "a",
            textonly: false,
            
    });
							var data = {
					
				};
				
				
		jQuery.getJSON("http://www.autoescuelaselpilar.com/api/getImgGaleria", data, function(objjson8) {
		console.log('El servidor me ha dicho: ' + objjson8);
				 $.mobile.loading("hide");
					if(objjson8.status=="ok"){
						
						misfotos=objjson8.imagenes;
				
			pintarFotosGaleria();
			
	}
									
						
					
					
		})
		
			
		
	}		

	// obtener cursos
			
function obtenerCursos() {
			if(pagesCurso<=paginascursos){
				 $.mobile.loading( "show", {
            text: "Cargando permisos",
            textVisible: true,
            theme: "a",
            textonly: false,
            
    });
							var data = {
					type:'wpsc-product',
					count:10,
					page:pagesCurso
				};
				
				
		jQuery.getJSON("http://www.autoescuelaselpilar.com/api/get_products", data, function(objjson5) {
		console.log('El servidor me ha dicho: ' + objjson5);
				 $.mobile.loading("hide");
					if(objjson5.status=="ok"){
						paginascursos=objjson5.pages;
						var miscursos=objjson5.posts;
						for(curso in miscursos){
							jQuery("#cursillos").append(
			'<div class="avis clear">'
			+'<a href="#'+miscursos[curso].id+'" data-rel="popup" class=" popupp" data-transition="pop"><img class="left" width="100px"  src="'+miscursos[curso].thumbnail+'"/></a>'
			+'<div class="tit_curso">'
			+'<a href="#'+miscursos[curso].id+'" data-rel="popup" class=" popupp" data-transition="pop">'+miscursos[curso].title+'</a>'
			+'<div data-role="popup" id="'+miscursos[curso].id+'" class="verpopup"><a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><p>'+miscursos[curso].content+'</p></div>'
			+'</div>');
						}
						$('.verpopup').css('overflow-y', 'scroll');
						pagesCurso++;
						$('#miscursillos').trigger('create');
					}
		})
		
			}
		
	}		
		
		//obtener avisos
		
function obtenerAvisos() {
			if(pagess<=paginasavisos){
								 $.mobile.loading( "show", {
            text: "Cargando avisos",
            textVisible: true,
            theme: "a",
            textonly: false,
            
    });
							var data = {
					slug:"avisos",
					count:5,
					page:pagess
				};
				
		jQuery.getJSON("http://www.autoescuelaselpilar.com/api/get_category_posts", data, function(objjson4) {
		console.log('El servidor me ha dicho: ' + objjson4);
								 $.mobile.loading( "hide");
					if(objjson4.status=="ok"){
						paginasavisos=objjson4.pages;
						var misavisos=objjson4.posts;
						for(aviso in misavisos){
							jQuery("#tablon").append(
			'<a href="#'+misavisos[aviso].id+'" data-rel="popup" class=" popupp" data-transition="pop">'
			+'<div class="avis clear">'
			+'<img class="left" width="100px"  src="'+misavisos[aviso].thumbnail+'"/>'
			+'<div class="tit_aviso">'+misavisos[aviso].title+'</div><div class="content_aviso">'+misavisos[aviso].excerpt +'</div></a>'
			+'<div data-role="popup" id="'+misavisos[aviso].id+'" class="verpopup"><a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><p class="no_enlace">'+misavisos[aviso].content+'</p></div>'
			+'</div>');
						}
						$('.verpopup').css('overflow-y', 'scroll'); 
						
						pagess++;
						$('#avisillos').trigger('create');
					}
		})
		
			}
		
	}					                
	
	//obtener intensivos
	
	function obtenerIntensivos() {
			
				 $.mobile.loading( "show", {
            text: "Cargando cursos ",
            textVisible: true,
            theme: "a",
            textonly: false,
            
    });
							var data = {
				
				};
				
				
		jQuery.getJSON("http://www.autoescuelaselpilar.com/api/getNextCourses", data, function(objjson10) {
		console.log('El servidor me ha dicho: ' + objjson10);
				 $.mobile.loading("hide");
					if(objjson10.status=="ok"){
						
						
						var misintensivos=objjson10.cursos;
						for(intensivo in misintensivos){
							var mydates=new Date(misintensivos[intensivo].start);
							var mydatefin=new Date(misintensivos[intensivo].end);
							var dias_semana = new Array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado");
							var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre", "Diciembre");	
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
               	             +'<div class="eventos">'
							 +'<a href="#'+misintensivos[intensivo].ID+'" data-rel="popup" class=" popupp" data-transition="pop">'
							 +'<span class="hora">'+myhora+'</span><span class="titulo">'+misintensivos[intensivo].post_title+'</span><span class="direccion">'+misintensivos[intensivo].Lugar+'</span></a></div>'
						 +'<div data-role="popup" id="'+misintensivos[intensivo].ID+'" class="verpopup hide"><a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><div class=""><span class="titulo">'+misintensivos[intensivo].post_title+'</span><span class="direccion">'+misintensivos[intensivo].Lugar+'</span><div class="time">'+mesn+' '+dia+'@'+myhora+' – '+diafin+' '+mesnfin+','+anofin+' @ '+myhorafin+'</div><div class="ai1ec-event-avatar  ai1ec-post_thumbnail ai1ec-portrait"><img src="'+misintensivos[intensivo].imagen_evento+'"  width="220" height="300"></div><div class="contenidos">'+misintensivos[intensivo].post_content+'</div></div>'
							 +'</div>'); 
							 
					
				}
				console.log("ahora creo nuevo");
						$('#misintensivo').trigger('create');		 
					
						
					}
		})
		
		
		
	}		
			
// obtener clientes

function obtenerClientes() {
		
				 $.mobile.loading( "show", {
            text: "Cargando clientes",
            textVisible: true,
            theme: "a",
            textonly: false,
            
    });
							var data = {
					
					
				};
				
				
		jQuery.getJSON("http://www.autoescuelaselpilar.com/api/get_Promotion_Categories", data, function(objjson9) {
		console.log('El servidor me ha dicho: ' + objjson9);
				 $.mobile.loading("hide");
					if(objjson9.status=="ok"){
						
						misclientes=objjson9.query.tax_query[0].term;
						
						console.log("mis clientes "+misclientes);
						
						for(cliente in misclientes){
							
							jQuery("#milist").append(
							
							 '<li><a href="#">'+misclientes[cliente].name+'</a></li>');
    
				
						}
											
						$("#milist").listview( "refresh" );
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
		
	jQuery.post( "www.autoescuelaselpilar.com/api/dudasfromapp", data, function(response) {
		console.log('El servidor me ha dicho: ' + response);
			if(response.status=="error"){
				alert(response.error);
			}else{
				alert(response.mensaje);
			}
			})
});


	 
