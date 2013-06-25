var circulo = {


	init: function(){
		ejemplo._limpiarBotonera();
		$('#canva').html('');
		var form = '<div><label for="radio">Radio:</label><input type="range" name="radio" id="radio" value="25" min="0" max="250"/></div>'

  		$('#canva').append(form);
		$('#canva').append('<canvas id="canv-circulo" class="_canvas_" width="720" height="480">Tu navegador no tiene soporte para Canvas.</canvas>')
		var self = this;
		$('#canv-circulo._canvas_').on('click',function(e){
		
			var canvas = document.getElementById('canv-circulo');
		  	var context = canvas.getContext("2d");
		  	self._dibujarCirculo(context, dda_linea._getPunto(canvas, e));
		});
	},

	_colorRandom: function(){
		var r = Math.floor(Math.random()*256),
			g= Math.floor(Math.random()*256),
			b= Math.floor(Math.random()*256),
			a= Math.round(Math.random()*2 * 100) / 100;
		return "rgba("+r+", "+g+", "+b+", " + a + ")";
	},

	_dibujarCirculo : function(context, punto, radio, color, grosor) {
		var r = radio ? radio :parseInt($('#radio').val());
		var _x = punto.x, _y = punto.y;
		var f = 1 - r;
		var ddF_x = 1;
		var ddF_y = -2 * r;
		var x = 0;
		var y = r;
		var grosor = grosor?grosor:1;
		
		context.fillStyle = color ? color : this._colorRandom();

		context.fillRect(_x, _y + r,grosor,grosor);
		context.fillRect(_x, _y - r,grosor,grosor);
		context.fillRect(_x + r, _y,grosor,grosor);
		context.fillRect(_x - r, _y,grosor,grosor);
											 
		while(x < y){
										    
			if(f >= 0) {
				y--;
				ddF_y += 2;
				f += ddF_y;
			}
			
			x++;
			ddF_x += 2;
			f += ddF_x;    
			
			context.fillRect(_x + x, _y + y,grosor,grosor);
			context.fillRect(_x - x, _y + y,grosor,grosor);
			context.fillRect(_x + x, _y - y,grosor,grosor);
			context.fillRect(_x - x, _y - y,grosor,grosor);
			context.fillRect(_x + y, _y + x,grosor,grosor);
			context.fillRect(_x - y, _y + x,grosor,grosor);
			context.fillRect(_x + y, _y - x,grosor,grosor);
			context.fillRect(_x - y, _y - x,grosor,grosor);
		}
	}
}