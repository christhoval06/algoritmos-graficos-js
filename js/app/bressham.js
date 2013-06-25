var bressham = {

	x1: null,
	x2: null,
	y1: null,
	y2: null,

	firstClick: true,


	init: function(){
		ejemplo._limpiarBotonera();
		$('#canva').html('');
		$('#canva').html('<canvas id="canv-bre" class="_canvas_" width="720" height="480">Tu navegador no tiene soporte para Canvas.</canvas>')

		var self = this;
		self._resetPuntos();
		$('#canv-bre._canvas_').on('click',function(e){
		
			var canvas = document.getElementById('canv-bre');
		  	var context = canvas.getContext("2d");
		  	var punto = dda_linea._getPunto(canvas, e);

		  	context.fillStyle = "blue";
		  	context.font = "bold 8px Arial";
	
			if(self.firstClick){
				self._resetPuntos();
				self.x1 = punto.x;
				self.y1 = punto.y;
				self._graficarPunto(context, punto, "red", false);
				self.firstClick = false;
			}else{
				self.x2 = punto.x;
				self.y2 = punto.y;
				self._graficarPunto(context, punto, "green", false);
				self.firstClick = true;
			}


			if(self.x1 != null && self.x2 != null ){
				self._graficarLinea(context, {x: self.x1, y: self.y1}, {x: self.x2, y: self.y2});
			}
		});
	},

	_graficarPunto: function(context, punto, color, coord){
		context.fillStyle = color;
		//context.fillRect(Math.round(punto.x),Math.round(punto.y),4, 4);
		circulo_relleno._dibujarCirculo(context, punto ,5, color);
		context.fillStyle = "blue";
		
		if(coord)
			context.fillText("("+punto.x+" , "+punto.x+")", punto.x, punto.y);
		else{
			if(this.firstClick){
				context.clearRect ( 0, 10, 100 , 50 );
				context.fillText("("+punto.x+" , "+punto.y+")", 10, 30);
			}else{
				context.clearRect ( 640, 10 , 100 , 50 );
				context.fillText("("+punto.x+" , "+punto.y+")", 650, 30);
			}

			
		}
	},
	_resetPuntos: function(){
		this.firstClick= true
		this.x1= null;
		this.x2= null;
		this.y1= null;
		this.y2= null;
	},

	_graficarLinea: function(context, punto1, punto2) {
	var x1 = punto1.x, y1 = punto1.y, x2 = punto2.x, y2 = punto2.y;
	var	xx, yy, dx, dy, p, incE, incNE, stepx, stepy;
	dx = (x2 - x1);
	dy = (y2 - y1);
	
	
	/* determinar que punto usar para empezar, cual para terminar */
	if (dy < 0) { 
		dy = -dy; stepy = -1; 
	}else
		stepy = 1;
	if (dx < 0) {  
		dx = -dx; stepx = -1; 
	}else 
		stepx = 1;
	xx = x1;
	yy = y1;
	//context.fillRect(x1, y1, 1, 1);
	circulo_relleno._dibujarCirculo(context, {x: Math.round(x1), y: Math.round(y1)},2, "black");
	/* se cicla hasta llegar al extremo de la línea */
	if(dx>dy){
		p = 2*dy - dx;
		incE = 2*dy;
		incNE = 2*(dy-dx);
		while (xx != x2){
			xx = xx + stepx;
			if (p < 0){
				p = p + incE;
			}else {
				yy = yy + stepy;
				p = p + incNE;
			}
			//context.fillRect(xx, yy, 1, 1);
			circulo_relleno._dibujarCirculo(context, {x: Math.round(xx), y: Math.round(yy)},2, "black");
		}
	}else{
		p = 2*dx - dy;
		incE = 2*dx;
		incNE = 2*(dx-dy);
		while (yy != y2){
			yy = yy + stepy;
			if (p < 0){
				p = p + incE;
			}else {
				xx = xx + stepx;
				p = p + incNE;
			}
			//context.fillRect(xx, yy, 1, 1);
			circulo_relleno._dibujarCirculo(context, {x: Math.round(xx), y: Math.round(yy)},2, "black");
		}
	}
	context.clearRect(0, 30, 80, 25);
}
}


