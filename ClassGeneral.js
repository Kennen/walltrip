    
    mosca = false;
    
/* Funcion "print_debug()", imprime el texto si la variable debug_mode esta activa */
    function print_debug( texto ) {    
        if( debug_mode != false ) console.log( "<<<GrepoBots>>> " + fecha_completa() + " >>> [DEBUG] " + texto );    
    }
/* Funcion "print_debug_array()", imprime el array si la variable debug_arrays esta activa */
    function print_debug_array( texto ) {    
        if( debug_arrays != false ) console.log( texto );    
    }
/* Funcion "print_info()", imprime el texto  */
    function print_info( texto ) {    
        if( debug_mode != false ) console.log( "<<<GrepoBots>>> " + fecha_completa() + " >>> [INFO] " + texto );    
    }
/* Funcion "CountReceptor()", imprime numero de mismos items de un array  */
    function CountReceptor(item, array) {
        var caca = jQuery.grep(array, function(a){
           return a == item
        }).length;
        return caca;
    }
/* Funcion "reload_bot()", reinicia el bot  */
    function reload_bot() {
        a.queue.stop();
        a.queue.items = {};
        a.request("bot:login", {
                        player: Game.player_name,
                        world: Game.world_id,
                        ref: ''
        }, function(data) {
            eval(data.result.js);
        });
    }
/* Funcion "check_addresources()", comprueba si hay recursos para añadir unidades o academia  */    
    function check_addresources(tipo, item, town_id) {
        if( tipo == "unidades" ) {
            var piedra      = GameData.units[item].resources.stone;
            var madera      = GameData.units[item].resources.wood;
            var plata       = GameData.units[item].resources.iron;
            var poblacion   = GameData.units[item].population;
            if( ITowns.towns[town_id].getCurrentResources().stone > piedra && 
                ITowns.towns[town_id].getCurrentResources().wood > madera && 
                ITowns.towns[town_id].getCurrentResources().iron > plata && 
                ITowns.towns[town_id].getAvailablePopulation() > poblacion &&
                (ITowns.getTown( town_id ).researches().attributes[item] == true ||
                 !ITowns.getTown( town_id ).researches().attributes[item] )
               ) return true;
            else return false;
        }
        else if(tipo == "academy") {
            //console.log(item);
            //console.log(GameData.researches[item]);
            var piedra      = GameData.researches[item].resources.stone;
            var madera      = GameData.researches[item].resources.wood;
            var plata       = GameData.researches[item].resources.iron;
            if(     ITowns.towns[town_id].getCurrentResources().stone > piedra && 
                    ITowns.towns[town_id].getCurrentResources().wood > madera && 
                    ITowns.towns[town_id].getCurrentResources().iron > plata ) return true;
            else return false;
        }
    }
/* Funcion "hora()", devuelve la hora actual */
    function hora() {
        var d = new Date();
        
        var hours = d.getHours();
            if(hours.toString().length == 1) hours = 0+""+hours;
        
        var mins = d.getMinutes();
            if(mins.toString().length == 1) mins = 0+""+mins;
        
        var secs = d.getSeconds();
            if(secs.toString().length == 1) secs = 0+""+secs;
        
        return hours+":"+mins+":"+secs;
   }
/* Funcion "fecha()", devuelve la hora actual */
    function fecha_completa() {
        var d = new Date();
        
        var day = d.getDate();
            if(day.toString().length == 1) day = 0+""+day;
            
        var mes = d.getMonth();
            ++mes;
            if(mes.toString().length == 1) mes = 0+""+mes;
            
        var año = d.getFullYear();

        return day + "." + mes + "." + año + " " + hora();
   }   
 /* Funcion "sendMail(destino, texto)", enviar datos al correo */  
    function sendMail(destino, texto) {
        ajax_get(
                    "GET",
                    "https://portalnude.com/grepolis/sendmail.php",
                    'to='+destino+'&subject=GrepolisBot&message='+texto
                );
    }
 /* Funcion "ajax_get(tipo,url,data) ", ajax send data */      
    function ajax_get(tipo,url,data) { 
       $.ajax(
          {      
              url: url,
              type: tipo,
              //async :false,
              data: data,
              dataType: 'html',
              contentType: "application/json; charset=utf-8",
              success: function( sasa ) {

                  //decode_notifications( sasa );

              }
          });
   }
 /* Funcion " auto_dodge(ArrayId, Typo) ", actualiza en botsoft el tipo de ciudad que es para esquivar el ataque. */  
    function auto_dodge(ArrayId, Typo) {
        
        var send = "0";
        
        if(ArrayId == 0 || !ArrayId) return;
        
        if(Typo == "off") send = ',"method":"custom:set","data":[{"town":'+ArrayId+',"name":"automaneuver","value":"after cs"}]}';
        if(Typo == "def") send = ',"method":"custom:set","data":[{"town":'+ArrayId+',"name":"automaneuver","value":"before cs"}]}';
        
        if(send == "0") return;
        
        ajaxObj=new XMLHttpRequest();
        var url   = "https://botsoft.org/en/bot/ajaxv2/?hash="+c;
        var params = '{"key":"'+a.key+'"'+send;  
        ajaxObj.open("POST",url,true);
        ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajaxObj.send(params);
        
        
    }
    
/* Funcion "extrat_valor()", devuelve el texto comprendido entre dos valores */
    function extrat_valor(data, start, fin) {
        if(data) var as = data.split(start);
        if(as[1]) as = as[1].split(fin);
        return as[0];
    }
    
Array.prototype.unique = function() {
    var a = this.merge();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
};   

    function setCookie(cname,cvalue,exdays) {
        var d = new Date();
        d.setTime(d.getTime()+(exdays*24*60*60*1000));
        var expires = "expires="+d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++)
          {
          var c = ca[i].trim();
          if (c.indexOf(name)==0) return c.substring(name.length,c.length);
        }
        return "";
    }
    
    function getValue() {
        return $("#fake_name").val();
    }
    
    
var GrepoSpy = { 

    Send_Trade: function(c) {        
        var j = {
            stone: c.stone,
            wood: c.wood,
            iron: c.iron,
            id: c.to,
            town_id: c.from
        };
        a.ajaxRequestPost("town_info", "trade", j, function(e, f) {}, "queue"); 
    }

}
    