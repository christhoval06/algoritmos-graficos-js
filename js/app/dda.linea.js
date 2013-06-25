var dda_linea = {

	x1: null,
	x2: null,
	y1: null,
	y2: null,

	firstClick: null,

	init: function(){
		ejemplo._limpiarBotonera();
		$('#canva').html('');
		$('#canva').html('<canvas id="canv-dda-linea" class="_canvas_" width="720" height="480">Tu navegador no tiene soporte para Canvas.</canvas>')

		var self = this;
		self._resetPuntos();
		self.firstClick = true;
		$('#canv-dda-linea._canvas_').on('click',function(e){
		
			var canvas = document.getElementById('canv-dda-linea');
		  	var context = canvas.getContext("2d");
		  	var punto = self._getPunto(canvas, e);

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

	_getPunto: function(canva, e){
		var rect = canva.getBoundingClientRect();
		return {x: Math.round(e.clientX - rect.left), y: Math.round(e.clientY - rect.top)};
	},

	_graficarPunto: function(context, punto, radio, color, coord){
		context.fillStyle = color;
		//context.fillRect(Math.round(punto.x),Math.round(punto.y),4, 4);
		circulo_relleno._dibujarCirculo(context, punto ,radio ? radio :5, color);
		context.fillStyle = "blue";
		
		if(coord)
			context.fillText("("+punto.x+" , "+punto.x+")", punto.x, punto.y);
		else{
			if(this.firstClick != null){
				if(this.firstClick){
					context.clearRect ( 0, 10, 100 , 50 );
					context.fillText("("+punto.x+" , "+punto.y+")", 10, 30);
				}else{
					context.clearRect ( 640, 10 , 100 , 50 );
					context.fillText("("+punto.x+" , "+punto.y+")", 650, 30);
				}
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

	_graficarLinea: function(ctx, punto1, punto2, radio, color){
		var x1 = punto1.x, y1 = punto1.y, x2 = punto2.x, y2 = punto2.y;
		var numsteps =  0;
		if(Math.abs(Math.round(x2) - Math.round(x1)) >= Math.abs(Math.round(y2) - Math.round(y1)))
			numsteps= Math.abs(Math.round(x2) - Math.round(x1));
		else
			numsteps= Math.abs(Math.round(y2) - Math.round(y1));
		

		var xinc = (x2-x1)/numsteps;
		var yinc = (y2-y1)/numsteps;
		var x = x1;
		var y = y1;
		ctx.fillStyle = color ? color :"black";
		//ctx.fillRect(Math.round(x),Math.round(y),1,1);
		circulo_relleno._dibujarCirculo(ctx, {x: x, y: y},radio ? radio :2,color ? color :"black");

		for (var i=0;i<numsteps; i++) {
		  x += xinc;
		  y += yinc;
		  ctx.fillStyle = color ? color :"black";
		  //ctx.fillRect(Math.round(x),Math.round(y),1,1);
		  circulo_relleno._dibujarCirculo(ctx, {x: Math.round(x), y: Math.round(y)},radio ? radio :2, color ? color :"black", color ? color :"black");
		}
	}
}
