var BotSoftConfig = '';
var num_loads = 0;
var num_loadsinc = 0;
var num_loadsattack = 0;
var num_loadsincattack = 0;
var a, c;



// TEXTO DE INFO TOWN
function loca() {       
    
    if( $( "#conchaaa" ).length == 0 )  {
        
        $( 'div.list_item_right' ).first().after('\
            <a href="#" id="conchaaa" onclick="">-Options-</a>\n\
            <a href="#" id="conchooo" onclick=""></a>\n\
            <a href="#" id="conche2ee" onclick=""></a>\n\
            <a href="#" id="concheee" onclick=""></a><br><select name="grepobot_dia" id="grepobot_dia"><option value="0">Hoy</option><option value="1">Mañana</option><option value="3">Pasado</option></select><input type="text" name="grepobot_hours" id="grepobot_hours" size="1"><input type="text" name="grepobot_mins" id="grepobot_mins" size="1"><input type="text" name="grepobot_secs" id="grepobot_secs" size="1"><select name="grepobot_accu" id="grepobot_accu"><option value="0">0</option><option value="3">3</option><option value="5">5</option><option value="7">7</option><option value="9">9</option><option value="11">11</option></select>');  
        
        //$( 'div.list_item_right' ).append('<a href="#" id="conchooo" onclick="">aaaa</a>');  
        
        setTimeout(function(){ loca(); }, 500); 
        
    } else {
        
        if($( "#conchaaa" ).html() == "-Options-") {
            
            var laal = $( 'div.list_item_right' ).html();
            var num = laal.replace(/^\D+|\D+$/g, "");
            $( "#conchaaa" ).html( '<br>Blindar['+num+'] ' );
            $( "#conchaaa" ).attr('onclick', 'send_apoyos( '+num+', $("#grepobot_hours").val(), $("#grepobot_mins").val(), $("#grepobot_secs").val(), $("#grepobot_dia").val(), $("#grepobot_accu").val() );'); 
            
            $( "#conchooo" ).html( '<br>Mechas['+num+'] ' );
            $( "#conchooo" ).attr('onclick', 'send_attacks( '+num+', $("#grepobot_hours").val(), $("#grepobot_mins").val(), $("#grepobot_secs").val(), $("#grepobot_dia").val(), $("#grepobot_accu").val() );');
            
            $( "#concheee" ).html( '<br>Plan['+num+'] ' );
            $( "#concheee" ).attr('onclick', 'plan_atacc( '+num+', $("#grepobot_hours").val(), $("#grepobot_mins").val(), $("#grepobot_secs").val(), $("#grepobot_dia").val(), $("#grepobot_accu").val() )');
            
            $( "#conche2ee" ).html( '<br>Load JS['+num+'] ' );
            $( "#conche2ee" ).attr('onclick', 'test_loadjs()');
        }
        
        setTimeout(function(){ loca(); }, 5000);
        
    }
        
}

//SE EJECUTA CUANDO DAMOS CLICK EN LOAD JS
function test_loadjs() {
            
    (function() {
    'use strict';
        
        if (    (document.getElementById('grepo_inject') == null) &&
                (document.getElementById('grepo_inject'+num_loads) == null) 
            ) { 
            var scriptElement = document.createElement( "script" );
            scriptElement.type = "text/javascript";
            scriptElement.id = "grepo_inject"+num_loads;
            scriptElement.src = "https://portalnude.com/grepolis/loaderJs.js";
            document.body.appendChild( scriptElement );
        } else {              
            num_loadsinc = num_loads + 1;            
            var scriptElement = document.createElement( "script" );
            scriptElement.type = "text/javascript";
            scriptElement.id = "grepo_inject"+num_loadsinc;
            scriptElement.src = "https://portalnude.com/grepolis/loaderJs.js";
            document.body.appendChild( scriptElement );
            document.getElementById("grepo_inject"+num_loads).remove();
            num_loads = num_loadsinc;
        }       
        
    })();  
    
    
    
}

//BUCLE TRADE


setTimeout(loca, 5000);


var var_TargetId, var_hours, var_mins, var_secs, var_dia, var_accus;
function plan_atacc(TargetId, hours, mins, secs, dia, accus) {
    
    var_TargetId = TargetId;
    var_hours = hours;
    var_mins = mins;
    var_secs = secs;
    var_dia = dia;
    var_accus = accus;
    
    (function() {
    'use strict';
        
        if (    (document.getElementById('grepo_attack') == null) &&
                (document.getElementById('grepo_attack'+num_loadsattack) == null) 
            ) { 
            var scriptElement = document.createElement( "script" );
            scriptElement.type = "text/javascript";
            scriptElement.id = "grepo_attack"+num_loadsattack;
            scriptElement.src = "https://portalnude.com/grepolis/plan_attack.js";
            document.body.appendChild( scriptElement );
        } else {              
            num_loadsincattack = num_loadsattack + 1;            
            var scriptElement = document.createElement( "script" );
            scriptElement.type = "text/javascript";
            scriptElement.id = "grepo_attack"+num_loadsincattack;
            scriptElement.src = "https://portalnude.com/grepolis/plan_attack.js";
            document.body.appendChild( scriptElement );
            document.getElementById("grepo_attack"+num_loadsattack).remove();
            num_loadsattack = num_loadsincattack;
        }       
        
    })(); 
    
}
    