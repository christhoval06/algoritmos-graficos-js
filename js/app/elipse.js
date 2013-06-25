var elipse = {


	init: function(){
		ejemplo._limpiarBotonera();
		$('#canva').html('');
		var form = '<div><label for="radiox">Radio X:</label><input type="range" name="radiox" id="radiox" value="25" min="0" max="100"/> <label for="radio">Radio Y:</label><input type="range" name="radioy" id="radioy" value="25" min="0" max="100"/></div>'

  		$('#canva').append(form);
		$('#canva').append('<canvas id="canv-elipse" class="_canvas_" width="720" height="480">Tu navegador no tiene soporte para Canvas.</canvas>')
		var self = this;
		$('#canv-elipse._canvas_').on('click',function(e){
		
			var canvas = document.getElementById('canv-elipse');
		  	var context = canvas.getContext("2d");
		  	self._dibujarElipse(context, dda_linea._getPunto(canvas, e));
		});
	},

	_colorRandom: function(){
		var r = Math.floor(Math.random()*256),
			g= Math.floor(Math.random()*256),
			b= Math.floor(Math.random()*256),
			a= Math.round(Math.random()*2 * 100) / 100;
		return "rgba("+r+", "+g+", "+b+", " + a + ")";
	},

	_getRadios: function(){
		return { x: parseInt($('#radiox').val()), y: parseInt($('#radioy').val())}
	},

	_dibujarElipse: function(context, centro, radios, grosor, color){
		var xc = centro.x, yc = centro.y;
		radios = radios ? radios : this._getRadios();
		var rx = radios.x , ry = radios.y;

		var x,y,rx2,ry2,p1,p2;

		//circulo_relleno._dibujarCirculo(context, centro, 2, "black");

		x=0;
		y=ry;
		rx2=Math.pow(rx,2);
		ry2=Math.pow(ry,2);
		p1=ry2-(rx2*ry)+(0.25*rx2);
		while((ry2*x)<(rx2*y)){
			if(p1<0){
				x++;
		        p1=p1+(2*ry2*x)+ry2;
		    }else{
		        x++; y--;
		        p1=p1+(2*ry2*x)-(2*rx2*y)+ry2;
		    }

		    circulo_relleno._dibujarCirculo(context, {x: xc+x, y: yc+y},grosor?grosor:2, color?color:"black", color?color:"black");
		    circulo_relleno._dibujarCirculo(context, {x: xc-x, y: yc+y},grosor?grosor:2, color?color:"black", color?color:"black");
		    circulo_relleno._dibujarCirculo(context, {x: xc-x, y: yc+y},grosor?grosor:2, color?color:"black", color?color:"black");
		    circulo_relleno._dibujarCirculo(context, {x: xc+x, y: yc-y},grosor?grosor:2, color?color:"black", color?color:"black");
		    circulo_relleno._dibujarCirculo(context, {x: xc-x, y: yc-y},grosor?grosor:2, color?color:"black", color?color:"black");
		}

		p2=(ry2)*Math.pow((x+0.5),2)+(rx2)*Math.pow((y-1),2)-(rx2*ry2);
   		while(y>0){
   			if (p2>0){
   				y--;
           		p2=p2-(2*rx2*y) +rx2;
         	}else{
         		x++;
         		y--;
           		p2=p2+ (2*ry2*x)-(2*rx2*y)+rx2;
        }

        circulo_relleno._dibujarCirculo(context, {x: xc+x, y: yc+y},grosor?grosor:2, color?color:"black", color?color:"black");
		circulo_relleno._dibujarCirculo(context, {x: xc-x, y: yc+y},grosor?grosor:2, color?color:"black", color?color:"black");
		circulo_relleno._dibujarCirculo(context, {x: xc+x, y: yc-y},grosor?grosor:2, color?color:"black", color?color:"black");
		circulo_relleno._dibujarCirculo(context, {x: xc-x, y: yc-y},grosor?grosor:2, color?color:"black", color?color:"black");
      }
	}
}
