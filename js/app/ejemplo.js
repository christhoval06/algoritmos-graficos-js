var ejemplo = {
	grosor: 2,
	color: "#333",
	forma: 'linea',
	_getBotonesGrosor: function(){
		return '<div class="panel"><div class="botones grosor" onclick="ejemplo.cambioGrosor(1, this)"><img src="img/grosor1.png"></div>'+
		'<div class="botones grosor" onclick="ejemplo.cambioGrosor(2, this)"><img src="img/grosor2.png"></div>'+
		'<div class="botones grosor" onclick="ejemplo.cambioGrosor(3, this)" style="background-color: white;"><img src="img/grosor3.png"></div>'+
		'<div class="botones grosor" onclick="ejemplo.cambioGrosor(4, this)"><img src="img/grosor4.png"></div>'+
		'<div class="botones grosor" onclick="ejemplo.cambioGrosor(5, this)"><img src="img/grosor5.png"></div>'+
		'<div class="botones grosor" onclick="ejemplo.cambioGrosor(7, this)"><img src="img/grosor6.png"></div>'+
		'<div class="botones grosor" onclick="ejemplo.cambioGrosor(8, this)"><img src="img/grosor7.png"></div>'+
		'<div class="botones grosor" onclick="ejemplo.cambioGrosor(9, this)"><img src="img/grosor9.png"></div>'+
		'<div class="botones grosor" onclick="ejemplo.cambioGrosor(10, this)"><img src="img/grosor8.png"></div></div>';
	},
	_getBotonesColor: function(){
		return '<div classs="panel"><div class="botones color" onclick="ejemplo.cambioColor(' + "'333'" + ', this)" style="background-color: white;"><img src="img/negro.png"></div>'+
		'<div class="botones color" onclick="ejemplo.cambioColor(' + "'fff'" + ', this)"><img src="img/blanco.png"></div>'+
		'<div class="botones color" onclick="ejemplo.cambioColor(' + "'fe0000'" + ', this)"><img src="img/rojo.png"></div>'+
		'<div class="botones color" onclick="ejemplo.cambioColor(' + "'800080'" + ', this)"><img src="img/morado.png"></div>'+
		'<div class="botones color" onclick="ejemplo.cambioColor(' + "'ffff00'" + ', this)"><img src="img/amarillo.png"></div>'+
		'<div class="botones color" onclick="ejemplo.cambioColor(' + "'00ff00'" + ', this)"><img src="img/verde.png"></div>'+
		'<div class="botones color" onclick="ejemplo.cambioColor(' + "'00ffff'" + ', this)"><img src="img/azulClaro.png"></div>'+
		'<div class="botones color" onclick="ejemplo.cambioColor(' + "'0000fe'" + ', this)"><img src="img/azulOscuro.png"></div>'+
		'<div class="botones" id="fondo" onclick="ejemplo.cambioFondo()"><img src="img/bg.png"></div></div>';
	},
	_getBotonesFormas: function(){
		return '<div ><div class="botones forma" onclick="ejemplo.cambioForma(' + "'linea'" + ', this)" style="background-color: white;"><img src="img/linea.png"></div>'+
		'<div class="botones forma" onclick="ejemplo.cambioForma(' + "'libre'" + ', this)"><img src="img/libre.png"></div>'+
		'<div class="botones forma" onclick="ejemplo.cambioForma(' + "'circulo'" + ', this)"><img src="img/circulo.png"></div>'+
		'<div class="botones forma" onclick="ejemplo.cambioForma(' + "'relleno'" + ', this)"><img src="img/relleno.png"></div>'+
		'<div class="botones forma" onclick="ejemplo.cambioForma(' + "'elipse'" + ', this)"><img src="img/elipse.png"></div>';
	},
	_limpiarBotonera: function(){
		$('#botonera').html('');
	},
	_getHeramientas: function(){
		return '<div id="botonera"><div><table class="herramientas"><tbody>'+
			'<tr><td rowspan="4"><div id="colorrelleno"></div></td></tr>'+
			'<tr><td><div id="color"></div></td></tr>'+
			'<tr><td><div id="grosor"></div></td></tr>'+
			'<tr><td><div id="forma"></div></td></tr>'+
		'</tbody></table><div></div>';
	},
	cambioGrosor: function(grosor, btn){
		this.grosor = grosor;
		$('.grosor').css({'background-color': 'transparent'});
		$(btn).css({'background-color': 'white'});
	},
	cambioColor: function(reciboColor, btn){
		this.color = "#" + reciboColor;
		$('#rellenoFondo').css({'background-color': this.color});
		$('.color').css({'background-color': 'transparent'});
		$(btn).css({'background-color': 'white'});
	},
	cambioFondo: function(){
		document.getElementById('canv-ejemplo').style.background = this.color;
	},
	cambioForma: function(forma, btn){
		this.forma = forma;
		$('.forma').css({'background-color': 'transparent'});
		$(btn).css({'background-color': 'white'});
	},

	canvas: null,
	ctx: null,
	estoyDibujando: false,

	lineaP1: {},
	lineaP2: {},
	centro: {},
	radioX: 5,
	radioY: 5,

	_getPunto: function(e){
		var rect = this.canvas.getBoundingClientRect();
		return {x: Math.round(e.clientX - rect.left), y: Math.round(e.clientY - rect.top)};
	},

	init: function(){
		var self = this;
		$('#canva').html('');
		$('#canva').append('<canvas id="canv-ejemplo" class="_canvas_" width="780" height="520">Tu navegador no tiene soporte para Canvas.</canvas>');
		
		$('#botonera').html(self._getHeramientas());
		$('#colorrelleno').append('<div id="rellenoFondo" ></div>');
		$('#color').append(self._getBotonesColor());
		$('#grosor').append(self._getBotonesGrosor());
		$('#forma').append(self._getBotonesFormas());

		self.canvas = document.getElementById('canv-ejemplo');
		self.ctx = self.canvas.getContext('2d');

		$('#canv-ejemplo').on('mousedown',function(e){
			self.estoyDibujando = true;
			switch(self.forma){
				case 'libre': 
					self.ctx.beginPath();
					self.ctx.lineWidth = self.grosor;
					self.ctx.moveTo(self._getPunto(e).x,self._getPunto(e).y);
					break;
				case 'linea':
					self.lineaP1 = self._getPunto(e);
					dda_linea._graficarPunto(self.ctx, self.lineaP1, self.grosor, self.color);
					break;
				case 'elipse':
				case 'relleno':
				case 'circulo':
					self.centro = self._getPunto(e);
					break;
			};

		});

		$('#canv-ejemplo').on('mousemove',function(e){
			if(self.estoyDibujando){
				switch(self.forma){
					case 'libre': 
						self.ctx.strokeStyle = self.color;
						self.ctx.lineTo(self._getPunto(e).x,self._getPunto(e).y);
						self.ctx.stroke();
						break;
					case 'linea': break;
				};
			}
		});

		$('#canv-ejemplo').on('mouseup',function(e){
			switch(self.forma){
				case 'libre': 
					self.ctx.closePath();
					break;
				case 'linea':
					self.lineaP2 = self._getPunto(e);
					dda_linea._graficarPunto(self.ctx, self.lineaP2, self.grosor, self.color);
					dda_linea._graficarLinea(self.ctx, self.lineaP1, self.lineaP2, self.grosor, self.color);
					break;
				case 'circulo':
					self.radioX = Math.abs(self._getPunto(e).x - self.centro.x);
					circulo._dibujarCirculo(self.ctx, self.centro, self.radioX, self.color, self.grosor);
					break;
				case 'relleno':
					self.radioX = Math.abs(self._getPunto(e).x - self.centro.x);
					circulo_relleno._dibujarCirculo(self.ctx, self.centro, self.radioX, self.color);
					break;
				case 'elipse':
					self.radioX = Math.abs(self._getPunto(e).x - self.centro.x);
					self.radioY = Math.abs(self._getPunto(e).y - self.centro.y);
					elipse._dibujarElipse(self.ctx, self.centro, {x: self.radioX, y: self.radioY}, self.grosor, self.color);
					break;
			};
			self.estoyDibujando = false;
		});
	}
}
