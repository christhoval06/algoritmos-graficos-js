var circulo_relleno = {


	init: function(){
		ejemplo._limpiarBotonera();
		$('#canva').html('');
		var form = '<div><label for="radio">Radio:</label><input type="range" name="radio" id="radio" value="25" min="0" max="250"/></div>'

  		$('#canva').append(form);
		$('#canva').append('<canvas id="canv-circulo-relleno" class="_canvas_" width="720" height="480">Tu navegador no tiene soporte para Canvas.</canvas>')
		var self = this;
		$('#canv-circulo-relleno._canvas_').on('click',function(e){
		
			var canvas = document.getElementById('canv-circulo-relleno');
		  	var context = canvas.getContext("2d");
		  	self._dibujarCirculo(context, dda_linea._getPunto(canvas, e));
		});
	},

	_dibujarCirculo: function (context, punto, radio, color, bcolor) {
		var r = radio ? radio :parseInt($('#radio').val());
		var _x = punto.x, _y = punto.y;											
		var x = r;
		var y = 0;
		var xChange = 1 - (r << 1);
		var yChange = 0;
		var rError = 0;
		
		context.fillStyle = color ? color : circulo._colorRandom();
		while (x >= y){
			for (i = _x - x; i <= _x + x; i++){
				context.fillRect(i, _y + y,1,1);
				context.fillRect(i, _y - y,1,1);
			}
			for (i = _x - y; i <= _x + y; i++){
				context.fillRect(i, _y + x,1,1);
				context.fillRect(i, _y - x,1,1);
				}

			y++;
			rError += yChange;
			yChange += 2;
			if (((rError << 1) + xChange) > 0){
				x--;
				rError += xChange;
				xChange += 2;
			}
		}

		context.fillStyle = "black";
		circulo._dibujarCirculo(context, punto, radio, bcolor?bcolor:"black");
	}
}


