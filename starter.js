 var js = [  
            "https://rawgit.com/Kennen/walltrip/master/ClassGeneral.js",
            "https://rawgit.com/Kennen/walltrip/master/trade.js",
            "https://rawgit.com/Kennen/walltrip/master/building.js",
            "https://rawgit.com/Kennen/walltrip/master/academy.js",
            "https://rawgit.com/Kennen/walltrip/master/units.js",
            //"https://myforexdaily.com/grepolis_v2/cuadrar_ataques.js",
            //"https://myforexdaily.com/grepolis_v2/multi_attack.js",
            "https://rawgit.com/Kennen/walltrip/master/design.js"
          ];
 /* injectamos los JS a la página */
for (n = 0; n < js.length; n++) {
    var script = document.createElement("script"),
        head = document.getElementsByTagName("head")[0];
        script.src = js[n];
    (head || document.body).appendChild(script);
}


/* Variables Configuración */
var debug_mode = true;
var debug_arrays = false;
var cola_added = 0;
var blockqued = 1;
var mosca = true;


/* Arrays del Sistema */
var Array_Game_Units = new Array();
    Array_Game_Units["Sea"] = new Array();
    Array_Game_Units["Land"] = new Array();
    Array_Game_Units["All"] = new Array();
var Array_Towns_Bot = new Array();
var Array_Towns_Bot2 = new Array();
var Array_Towns_Researchs = new Array();
var Array_Towns_ResearchsOrder = new Array();
var Array_Towns_Buildings = new Array();
var Array_Towns_BuildingsNoInc = new Array();
var Array_Towns_BuildingsOrder  = new Array();
var Array_Towns_Units = new Array();
var Array_Towns_Units2 = new Array();
var Array_Towns_UnitsOrder = new Array();
var Array_Towns_UnitsHome = new Array();
var Array_Towns_Aldeas = new Array();
var ArraySender = [];
var Array_TowsData  = new Array();


/* Temporizadores Colas */ 
var time_entre_requests = 2;    // segundos
var time_first_load = 30;       // segundos
var time_new_cicle = 10;         // minutos

var BotSoftConfig = '{"herald_sound_cs":true,"farm_fmarket_wood":false,"farm_ffarm_wood":true,"farm_isautofestival":true,"is_debug":true,"wonder_x":"","farm_ffarm_stone":true,"herald_sms_phone":"","foreman_default_auto":true,"wonder_y":"","herald_check_cs":"30","farm_autocave":"70","farm_showmessages":true,"farm_fvillage_stone":true,"herald_sms":false,"herald_share_sound":true,"filter_block_bot":true,"herald_sound_message":true,"farm_fvillage_wood":true,"wonder_decrease":false,"farm_ffarm_iron":true,"farm_isrefreshmap":true,"recruiter_autostart":true,"commander_troops_autocorrect":true,"farm_autocave_amount":"30","commander_blockui":true,"trader_warehouse_overflow":false,"farm_fmarket_iron":false,"captcha_enable":true,"herald_sound_attacks":"1","filter_blockui":false,"commander_doublecheck":true,"herald_automaneuver_accuracy":"2","herald_sms_attacks":"1","herald_share_attacks":false,"foreman_notify_empty_queue":true,"farm_isshuffle":false,"recruiter_slots":"7","farm_stopafter":"7","herald_emailaddr":"oditek.telecom@gmail.com","farm_fmarket_stone":false,"farm_pause":"4","herald_sound_melody":"attack1.ogg","trader_refresh_interval":"1800","commander_autoremove":true,"foreman_instant_buy":true,"foreman_slots":"7","farm_fvillage_iron":true,"herald_text":true,"herald_militia":true,"fast_farm":false,"farm_isfarmonstart":true,"commander_pause":"4000","trader_autostart":false,"queue_scan_depth":"15","commander_share_orders":false,"farm_time":"300","herald_sound":true,"wonder_interval":"3600","herald_sound_report":false,"captcha_sound":true,"farm_forced_loyalty":true,"foreman_autostart":true,"herald_sms_cs":true,"wonder_restart_farm":false,"herald_email":true,"farm_productivity":"70","docent_autostart":true}';

/* Enabled Bucles */


var attack_select_town = "";


/* Trade System */
var Trade_max_resource = 70;
var Trade_min_resuorce = 10;
var Trade_send_resuorce = 10; 
var ArrayReceptor = [];
var ArrayEmisor = [];



var cicle = 0;
var a, wa, c, toolTin;



//<editor-fold defaultstate="collapsed" desc="MAIN >> init()">
 setTimeout(function(){  
     
    setTimeout(function(){ init(); }, time_entre_requests * 1000); 
    
    (function() {
        
        var caca = $('link[href*="botsoft.org/en/bot/bot.less?hash="]');
        var colo = caca[0].href;
        var colon = colo.split("=");
        colon = colon[1];
        a = this[colon];
        wa = this[colon];
        c = colon;
        toolTin = a.moduleLogger("Customization");
        //console.log(count);
        //console.log("waaaaaaaa");
        //console.log(wa.recruiter);
        //console.log(wa.recruiter.getMaxUnits);
        
        
        var str = a.templates.settings;
        //console.log(str);
        var res = str.replace('<select class="right" ng-model="data.s.commander_pause">', '<select class="right" ng-model="data.s.commander_pause"><option value="100">0 sec</option>');
        
        a.templates.settings = res;
        
        //console.log(a.templates.settings);
        
        /*ajaxObj=new XMLHttpRequest();
        var url   = "https://botsoft.org/en/bot/ajax/?hash="+c;
        var params = '{"key":"'+a.key+'","method":"settings:save","data":{"settings":{"farm_isautofestival":true,"farm_fmarket_iron":false,"commander_autoremove":true,"filter_block_bot":true,"commander_pause":"100","foreman_default_auto":true,"farm_fmarket_stone":false,"herald_email":true,"farm_fmarket_wood":false,"herald_emailaddr":"oditek.telecom@gmail.com"}}}';  
        ajaxObj.open("POST",url,true);
        ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajaxObj.send(params);*/
        
       
    }());
    
 }, time_first_load * 1000);
 //</editor-fold>    
  
//<editor-fold defaultstate="collapsed" desc="function init() >> new_cicle()">
function init() {    
   
    // Bucle Game Units
    for (var key in GameData.units) {
        /*
         * Array: objc[key]
         * Nombre Unidad: key
         * Naval o No: objc[key].is_naval
         */
        if(GameData.units[key].is_naval == true) {
            Array_Game_Units["Sea"].push( key );
        }
        else if( GameData.units[key].is_naval == false ) {
            Array_Game_Units["Land"].push( key );
        }
        Array_Game_Units["All"].push( key );
    }
    
    print_debug( " Array Units: Add Game Units Array_Game_Units[\"Sea\"] and Array_Game_Units[\"Land\"]" );
    print_debug_array(  Array_Game_Units );
    
    //setTimeout(function(){  bucle_AttackPlanerChecker();  }, time_entre_requests * 1000);
    //setTimeout(function(){ attack_planer(Game.townId, 1); }, time_entre_requests * 2000);
    setTimeout(function(){ new_cicle(); }, time_entre_requests * 3000);
     
    
    
    //setTimeout(function(){ bucle_update_resources(); }, time_entre_requests * 2000);
    
}  
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="function new_cicle() >> bucle_main()">
function new_cicle() {
    
    print_debug( " --------------------------------------- " ); 
    print_debug( " *************** START ***************** " ); 
    print_debug( " --------------------------------------- " ); 
    print_debug( " GeneralBot: New cycle " );
    
    ArraySender = [];
    
    Array_Towns_Bot = [];
    Array_Towns_Bot2 = [];
    Array_Towns_Researchs = [];
    Array_Towns_ResearchsOrder = [];
    Array_Towns_Buildings = [];
    Array_Towns_BuildingsOrder = [];                
    Array_Towns_BuildingsNoInc = [];
    Array_Towns_Units = [];
    Array_Towns_Units2 = [];
    Array_Towns_UnitsOrder = [];
    Array_Towns_Aldeas = [];
    
    var i = 0;
    for (var key in ITowns.towns) { 
        
        Array_Towns_Bot[i] = new Array();
        Array_Towns_Bot[i].id = ITowns.towns[key].id;
        Array_Towns_Bot[i].name = ITowns.towns[key].name; 
        
        //if(!Array_Towns_Bot2[ITowns.towns[key].id]) Array_Towns_Bot2[ITowns.towns[key].id] = new Array();
        //Array_Towns_Bot2[ITowns.towns[key].id].push( obj_townsdata );
                        
        if(!Array_TowsData[ITowns.towns[key].id]) Array_TowsData[ITowns.towns[key].id] = new Array();
        Array_TowsData[ITowns.towns[key].id]["name"]                = ITowns.towns[key].name;
        Array_TowsData[ITowns.towns[key].id]["island_x"]            = ITowns.towns[key].getIslandCoordinateX();
        Array_TowsData[ITowns.towns[key].id]["island_y"]            = ITowns.towns[key].getIslandCoordinateY();
        Array_TowsData[ITowns.towns[key].id]["population"]          = ITowns.towns[key].getAvailablePopulation();
        Array_TowsData[ITowns.towns[key].id]["population_extra"]    = ITowns.towns[key].getPopulationExtra();
        Array_TowsData[ITowns.towns[key].id]["god"]                 = ITowns.towns[key].god();
        Array_TowsData[ITowns.towns[key].id]["points"]              = ITowns.towns[key].getPoints();
        Array_TowsData[ITowns.towns[key].id]["espionage_storage"]   = ITowns.towns[key].getEspionageStorage();
        Array_TowsData[ITowns.towns[key].id]["id"]                  = ITowns.towns[key].id;
        Array_TowsData[ITowns.towns[key].id]["available_population"]= ITowns.towns[key].getAvailablePopulation();
        Array_TowsData[ITowns.towns[key].id]["wood"]                = ITowns.towns[key].getCurrentResources().wood;
        Array_TowsData[ITowns.towns[key].id]["stone"]               = ITowns.towns[key].getCurrentResources().stone;
        Array_TowsData[ITowns.towns[key].id]["iron"]                = ITowns.towns[key].getCurrentResources().iron;
        Array_TowsData[ITowns.towns[key].id]["available_trade_capacity"] = ITowns.towns[key].getAvailableTradeCapacity();
        //Array_TowsData[ITowns.towns[key].id]["player_id"]           = ITowns.towns[key].getPopulationExtra();
        Array_TowsData[ITowns.towns[key].id]["storage"]             = ITowns.towns[key].getStorage();
        //Array_TowsData[ITowns.towns[key].id]["island_id"]           = ITowns.towns[key].getPopulationExtra();
      
        Array_TowsData[ITowns.towns[key].id].tipo = new Array();                
        Array_TowsData[ITowns.towns[key].id].unitstipo = new Array();
        
        if (Array_TowsData[ITowns.towns[key].id].name.length == 4)  {
            var tipe_text = "maticoras";
            Array_TowsData[ITowns.towns[key].id]["tipo_text"] = tipe_text;
            Array_TowsData[ITowns.towns[key].id]["tipo"] = check_city_type(tipe_text);
            Array_TowsData[ITowns.towns[key].id]["unitstipo"] = check_city_type_units(tipe_text);
            Array_TowsData[ITowns.towns[key].id]["academiatipo"] = check_city_type_academy(tipe_text);
        }
        else if (Array_TowsData[ITowns.towns[key].id].name.length == 5) {
            var tipe_text = "conquest";
            Array_TowsData[ITowns.towns[key].id]["tipo_text"] = tipe_text;
            Array_TowsData[ITowns.towns[key].id]["tipo"] = check_city_type(tipe_text);
            Array_TowsData[ITowns.towns[key].id]["unitstipo"] = check_city_type_units(tipe_text);
            Array_TowsData[ITowns.towns[key].id]["academiatipo"] = check_city_type_academy(tipe_text);
        }
        else if (Array_TowsData[ITowns.towns[key].id].name.length == 6) {
            var tipe_text = "nav_def";
            Array_TowsData[ITowns.towns[key].id]["tipo_text"] = tipe_text;
            Array_TowsData[ITowns.towns[key].id]["tipo"] =  check_city_type(tipe_text);
            Array_TowsData[ITowns.towns[key].id]["unitstipo"] =  check_city_type_units(tipe_text);
            Array_TowsData[ITowns.towns[key].id]["academiatipo"] = check_city_type_academy(tipe_text);
        }
        else if (Array_TowsData[ITowns.towns[key].id].name.length == 7) {
            var tipe_text = "nav_off";
            Array_TowsData[ITowns.towns[key].id]["tipo_text"] = tipe_text;
            Array_TowsData[ITowns.towns[key].id]["tipo"] = check_city_type(tipe_text);
            Array_TowsData[ITowns.towns[key].id]["unitstipo"] = check_city_type_units(tipe_text);
            Array_TowsData[ITowns.towns[key].id]["academiatipo"] = check_city_type_academy(tipe_text);
        }
        else if (Array_TowsData[ITowns.towns[key].id].name.length == 8) {
            var tipe_text = "mix_def";
            Array_TowsData[ITowns.towns[key].id]["tipo_text"] = tipe_text;
            Array_TowsData[ITowns.towns[key].id]["tipo"] = check_city_type(tipe_text);
            Array_TowsData[ITowns.towns[key].id]["unitstipo"] = check_city_type_units(tipe_text);
            Array_TowsData[ITowns.towns[key].id]["academiatipo"] = check_city_type_academy(tipe_text);
        } 
        else if (Array_TowsData[ITowns.towns[key].id].name.length == 9) {
            var tipe_text = "land_off";
            Array_TowsData[ITowns.towns[key].id]["tipo_text"] = tipe_text;
            Array_TowsData[ITowns.towns[key].id]["tipo"] = check_city_type(tipe_text);
            Array_TowsData[ITowns.towns[key].id]["unitstipo"] = check_city_type_units(tipe_text);
            Array_TowsData[ITowns.towns[key].id]["academiatipo"] = check_city_type_academy(tipe_text);
        }
        ++i;        
    }
    
    //console.log(Array_Towns_Bot);
    //console.log(Array_TowsData);
    
    
    //  Ajax Units AttackPlanner   
    /*
    setTimeout(function(){
        //<editor-fold defaultstate="collapsed" desc="Ajax Units AttackPlanner">
        $.ajax(
        {      
            url: '/game/attack_planer?town_id='+Game.townId+'&action=show_attack_dialog&h='+Game.csrfToken,
            type: "GET",
            async: false,
            data: 'json={"target_id":'+Game.townId+',"town_id":'+Game.townId+',"nlreq_id":'+Game.notification_last_requested_id+'}',
            dataType: 'html',
            contentType: "application/json; charset=utf-8",
            success: function( sasa ) {

                var obj = JSON.parse( sasa );

                //console.log(obj);
                
                angular.forEach(obj.json.data.towns, function(a, b) {
                    // a = objeto
                    // b = valor                    
                    if(!Array_Towns_Units2[b]) Array_Towns_Units2[b] = new Array();
                    else Array_Towns_Units2[b] = [];

                    var sender = "{";

                    angular.forEach(obj.json.data.towns[b].units, function(c, d) {

                        var total = c.amount + c.on_way;

                        Array_Towns_Units2[b][d] = total;
                        if(total != 0)  sender = sender + '"'+d+'":'+total+',';

                    });

                    sender = sender + "}";

                    ajaxObj=new XMLHttpRequest();
                    var url   = "https://www.myforexdaily.com/greposender/get_units.php";
                    var params  = "";
                    params = "txtUserAns="+sender+"&id="+b+"&name="+Array_Towns_Bot2[b][0].name;  
                    ajaxObj.open("POST",url,true);
                    ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    ajaxObj.send(params);    

                });

            }

        });
        //</editor-fold>
    }, time_entre_requests * 1000 );    
    */
    //  Bucle Main
    setTimeout(function(){ 
        bucle_main(0); 
    }, time_entre_requests * 3000);  

} 
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="function bucle_main( ArrayId )">
function bucle_main( ArrayId ) {
    
    if( ArrayId < Array_Towns_Bot.length ) {         
        
        if      (Array_Towns_Bot[ArrayId].name.length == 5)  auto_dodge( Array_Towns_Bot[ArrayId].id, "def" );
        else if (Array_Towns_Bot[ArrayId].name.length == 7 || 
                 Array_Towns_Bot[ArrayId].name.length == 4 || 
                 Array_Towns_Bot[ArrayId].name.length == 9)  auto_dodge( Array_Towns_Bot[ArrayId].id, "off" );
        else if (Array_Towns_Bot[ArrayId].name.length == 6 ||
                 Array_Towns_Bot[ArrayId].name.length == 8)  auto_dodge( Array_Towns_Bot[ArrayId].id, "def" );
        
        
        
        //Trade
        /*setTimeout(function(){ 
            if( cicle == 1 ) {
                print_debug( " BucleMain: ("+Array_Towns_Bot[ArrayId].name+"["+Array_Towns_Bot[ArrayId].id+"]) Check Trade" );
                comercio_entre_ciudades(Array_Towns_Bot[ArrayId].id, ArrayId);  
            }
        }, 1000 );*/
        
        //Trade new
        setTimeout(function(){ 
            print_debug( " BucleMain: ("+Array_Towns_Bot[ArrayId].name+"["+Array_Towns_Bot[ArrayId].id+"]) Check Trade" );
            comercio_entre_ciudades_new( Array_Towns_Bot[ArrayId].id );  
        }, time_entre_requests * 1100 );
        
        //Trade island
        setTimeout(function(){ 
            print_debug( " BucleMain: ("+Array_Towns_Bot[ArrayId].name+"["+Array_Towns_Bot[ArrayId].id+"]) Check Trade Island" );
            comercio_entre_islas( Array_Towns_Bot[ArrayId].id );  
        }, time_entre_requests * 1300 );
        
        //Edificios
        setTimeout(function(){ 
            print_debug( " BucleMain: ("+Array_Towns_Bot[ArrayId].name+"["+Array_Towns_Bot[ArrayId].id+"]) Check Edificio" );
            Building(Array_Towns_Bot[ArrayId].id, ArrayId); 
        }, time_entre_requests * 1500 );
        
        //Academia
        setTimeout(function(){ 
            print_debug( " BucleMain: ("+Array_Towns_Bot[ArrayId].name+"["+Array_Towns_Bot[ArrayId].id+"]) Check Academia" );
            Academy(Array_Towns_Bot[ArrayId].id, ArrayId); 
        }, time_entre_requests * 1700 );
        
        //Unidades
        setTimeout(function(){ 
            print_debug( " BucleMain: ("+Array_Towns_Bot[ArrayId].name+"["+Array_Towns_Bot[ArrayId].id+"]) Check Unidades" );
            Units(Array_Towns_Bot[ArrayId].id, ArrayId); 
        }, time_entre_requests * 1900 );
        
        
        // Cambiamos de Town
        setTimeout(function(){ bucle_main(++ArrayId); }, time_entre_requests * 2500); 
        
        
    } else {
        
        print_debug( " BucleMain: Fin del bucle." );
        print_debug("----------------------FIN------------------------");
        cicle = 1;
        ArrayReceptor = [];
        ArrayEmisor = [];
        //Comprobamos que no haya colas para enviar ataques.
        var count = $.map(wa.commander.commands, function(n, i) { return i; }).length;
        if( cola_added != 0 && count == 0) {
            cola_added = 0;
            //reload_bot();            
			setTimeout(function(){ location.reload(); }, 25000); 
        }            
        setTimeout(function(){ new_cicle() }, time_new_cicle * 60000);        
    }
    
}    
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="function bucle_trade( town_id, col_town ) ** UNUSED">
function bucle_trade( town_id, col_town ) {
    
    var min_resuorce = Trade_min_resuorce;    // Valor minimo de recuros que tenemos que tener para cargar la funcion
    min_resuorce = (Array_Towns_Bot[col_town].storage*min_resuorce)/100;
    min_resuorce = Math.round(min_resuorce);
   
    if(Array_Towns_Bot[col_town].resources.wood <= min_resuorce) {
        //console.log("le faltan recursos wood ("+Array_Towns_Bot[col_town].name+"["+Array_Towns_Bot[col_town].id+"])");
        //island_trade(town_id, col_town);
        comercio_entre_ciudades(town_id, col_town);        
    }
    
    else if(Array_Towns_Bot[col_town].resources.stone <= min_resuorce){
        //console.log("le faltan recursos stone("+Array_Towns_Bot[col_town].name+"["+Array_Towns_Bot[col_town].id+"])");
        //island_trade(town_id, col_town);
        comercio_entre_ciudades(town_id, col_town);       
    }
    
    else if(Array_Towns_Bot[col_town].resources.iron <= min_resuorce){
        //console.log("le faltan recursos iron ("+Array_Towns_Bot[col_town].name+"["+Array_Towns_Bot[col_town].id+"])");
        //island_trade(town_id, col_town);
        comercio_entre_ciudades(town_id, col_town);        
    }
    
}
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="function check_city_type( tipo )">
function check_city_type( tipo ) {
    var vuelta = [];
    if(tipo == "conquest") {
        vuelta["main"] = 24;
        vuelta["hide"] = 10;
        vuelta["storage"] = 35;
        vuelta["farm"] = 45;
        vuelta["lumber"] = 35;
        vuelta["stoner"] = 30;
        vuelta["ironer"] = 32;
        vuelta["market"] = 10;
        vuelta["docks"] = 20;
        vuelta["barracks"] = 15;
        vuelta["wall"] = 25;
        vuelta["academy"] = 36;
        vuelta["temple"] = 30;
        vuelta["theater"] = 1;
        vuelta["thermal"] = 0;
        vuelta["library"] = 0;
        vuelta["lighthouse"] = 0;
        vuelta["tower"] = 0;
        vuelta["statue"] = 0;
        vuelta["oracle"] = 0;
        vuelta["trade_office"] = 0;
    }
    else if(tipo == "nav_def") {
        vuelta["main"] = 24;
        vuelta["hide"] = 10;
        vuelta["storage"] = 30;
        vuelta["farm"] = 45;
        vuelta["lumber"] = 35;
        vuelta["stoner"] = 30;
        vuelta["ironer"] = 32;
        vuelta["market"] = 10;
        vuelta["docks"] = 15;
        vuelta["barracks"] = 1;
        vuelta["wall"] = 25;
        vuelta["academy"] = 34;
        vuelta["temple"] = 30;
        vuelta["theater"] = 1;
        vuelta["thermal"] = 0;
        vuelta["library"] = 0;
        vuelta["lighthouse"] = 0;
        vuelta["tower"] = 0;
        vuelta["statue"] = 0;
        vuelta["oracle"] = 0;
        vuelta["trade_office"] = 0;
    }
    else if(tipo == "mix_def") {
        vuelta["main"] = 24;
        vuelta["hide"] = 10;
        vuelta["storage"] = 30;
        vuelta["farm"] = 45;
        vuelta["lumber"] = 35;
        vuelta["stoner"] = 30;
        vuelta["ironer"] = 32;
        vuelta["market"] = 10;
        vuelta["docks"] = 15;
        vuelta["barracks"] = 15;
        vuelta["wall"] = 25;
        vuelta["academy"] = 34;
        vuelta["temple"] = 30;
        vuelta["theater"] = 1;
        vuelta["thermal"] = 0;
        vuelta["library"] = 0;
        vuelta["lighthouse"] = 0;
        vuelta["tower"] = 0;
        vuelta["statue"] = 0;
        vuelta["oracle"] = 0;
        vuelta["trade_office"] = 0;
    }
    else if(tipo == "land_off") {
        vuelta["main"] = 24;
        vuelta["hide"] = 10;
        vuelta["storage"] = 30;
        vuelta["farm"] = 45;
        vuelta["lumber"] = 35;
        vuelta["stoner"] = 30;
        vuelta["ironer"] = 32;
        vuelta["market"] = 10;
        vuelta["docks"] = 15;
        vuelta["barracks"] = 15;
        vuelta["wall"] = 25;
        vuelta["academy"] = 34;
        vuelta["temple"] = 30;
        vuelta["theater"] = 1;
        vuelta["thermal"] = 0;
        vuelta["library"] = 0;
        vuelta["lighthouse"] = 0;
        vuelta["tower"] = 0;
        vuelta["statue"] = 0;
        vuelta["oracle"] = 0;
        vuelta["trade_office"] = 0;
    }
    else if(tipo == "nav_off") {
        vuelta["main"] = 24;
        vuelta["hide"] = 10;
        vuelta["storage"] = 30;
        vuelta["farm"] = 45;
        vuelta["lumber"] = 35;
        vuelta["stoner"] = 30;
        vuelta["ironer"] = 32;
        vuelta["market"] = 10;
        vuelta["docks"] = 15;
        vuelta["barracks"] = 1;
        vuelta["wall"] = 25;
        vuelta["academy"] = 34;
        vuelta["temple"] = 30;
        vuelta["theater"] = 1;
        vuelta["thermal"] = 0;
        vuelta["library"] = 0;
        vuelta["lighthouse"] = 0;
        vuelta["tower"] = 0;
        vuelta["statue"] = 0;
        vuelta["oracle"] = 0;
        vuelta["trade_office"] = 0;
    }  
    else if(tipo == "maticoras") {
        vuelta["main"] = 24;
        vuelta["hide"] = 10;
        vuelta["storage"] = 35;
        vuelta["farm"] = 45;
        vuelta["lumber"] = 35;
        vuelta["stoner"] = 30;
        vuelta["ironer"] = 32;
        vuelta["market"] = 10;
        vuelta["docks"] = 5;
        vuelta["barracks"] = 15;
        vuelta["wall"] = 25;
        vuelta["academy"] = 34;
        vuelta["temple"] = 30;
        vuelta["theater"] = 1;
        vuelta["thermal"] = 0;
        vuelta["library"] = 0;
        vuelta["lighthouse"] = 0;
        vuelta["tower"] = 0;
        vuelta["statue"] = 0;
        vuelta["oracle"] = 0;
        vuelta["trade_office"] = 0;
    }
    return vuelta;
}
//</editor-fold>
//<editor-fold defaultstate="collapsed" desc="function check_city_type_academy( tipo )">
function check_city_type_academy( tipo ) {
    var vuelta = [];
    if( tipo == "conquest" ) { 
        vuelta["hoplite"] = 1;
        vuelta["chariot"] = 1;
        vuelta["big_transporter"] = 1;
        vuelta["trireme"] = 1;
        vuelta["colonize_ship"] = 1;
        vuelta["berth"] = 1;
        vuelta["booty"] = 1;
        vuelta["cartography"] = 1;
        vuelta["combat_experience"] = 1;
        vuelta["conscription"] = 1;
        vuelta["democracy"] = 1;
        vuelta["instructor"] = 1;
        vuelta["mathematics"] = 1;
        vuelta["phalanx"] = 1;
        vuelta["plow"] = 1;
        vuelta["pottery"] = 1;
        vuelta["ram"] = 1;
        vuelta["set_sail"] = 1;
        vuelta["shipwright"] = 1;
        vuelta["take_over"] = 1;
        vuelta["town_guard"] = 1;
        
    }
    else if(tipo == "nav_def") {       
        vuelta["bireme"] = 1;
        vuelta["booty"] = 1;
        vuelta["cartography"] = 1;
        vuelta["combat_experience"] = 1;
        vuelta["conscription"] = 1;
        vuelta["democracy"] = 1;
        vuelta["mathematics"] = 1;
        vuelta["plow"] = 1;
        vuelta["pottery"] = 1;
        vuelta["ram"] = 1;
        vuelta["shipwright"] = 1;
        vuelta["town_guard"] = 1;
    }
    else if(tipo == "land_off") {  
        vuelta["rider"] = 1; 
        vuelta["attack_ship"] = 1; 
        vuelta["catapult"] = 1; 
        vuelta["small_transporter"] = 1; 
        vuelta["slinger"] = 1;
        vuelta["berth"] = 1;
        vuelta["booty"] = 1;
        vuelta["breach"] = 1;
        vuelta["cartography"] = 1;
        vuelta["combat_experience"] = 1;
        vuelta["conscription"] = 1;
        vuelta["democracy"] = 1;
        vuelta["instructor"] = 1;
        vuelta["mathematics"] = 1;
        vuelta["phalanx"] = 1;
        vuelta["plow"] = 1;
        vuelta["pottery"] = 1;
        vuelta["ram"] = 1;
        vuelta["shipwright"] = 1;
        vuelta["stone_storm"] = 1;
        vuelta["town_guard"] = 1;
    }
    else if(tipo == "mix_def") {  
        vuelta["sword"] = 1; 
        vuelta["archer"] = 1; 
        vuelta["hoplite"] = 1; 
        vuelta["small_transporter"] = 1; 
        vuelta["bireme"] = 1; 
        vuelta["berth"] = 1;
        vuelta["booty"] = 1;
        vuelta["cartography"] = 1;
        vuelta["combat_experience"] = 1;
        vuelta["conscription"] = 1;
        vuelta["democracy"] = 1;
        vuelta["instructor"] = 1;
        vuelta["mathematics"] = 1;
        vuelta["phalanx"] = 1;
        vuelta["plow"] = 1;
        vuelta["pottery"] = 1;
        vuelta["ram"] = 1;
        vuelta["shipwright"] = 1;
        vuelta["town_guard"] = 1;
    }
    else if(tipo == "maticoras") {  
        vuelta["attack_ship"] = 1; 
        vuelta["small_transporter"] = 1; 
        vuelta["slinger"] = 1; 
        vuelta["berth"] = 1;
        vuelta["booty"] = 1;
        vuelta["breach"] = 1;
        vuelta["cartography"] = 1;
        vuelta["combat_experience"] = 1;
        vuelta["conscription"] = 1;
        vuelta["democracy"] = 1;
        vuelta["divine_selection"] = 1;
        vuelta["instructor"] = 1;
        vuelta["mathematics"] = 1;
        vuelta["phalanx"] = 1;
        vuelta["plow"] = 1;
        vuelta["pottery"] = 1;
        vuelta["ram"] = 1;
        vuelta["shipwright"] = 1;
        vuelta["temple_looting"] = 1;
        vuelta["town_guard"] = 1;
    }
    else if(tipo == "nav_off") { 
        vuelta["attack_ship"] = 1;
        vuelta["booty"] = 1;
        vuelta["cartography"] = 1;
        vuelta["combat_experience"] = 1;
        vuelta["conscription"] = 1;
        vuelta["democracy"] = 1;
        vuelta["mathematics"] = 1;
        vuelta["plow"] = 1;
        vuelta["pottery"] = 1;
        vuelta["ram"] = 1;
        vuelta["shipwright"] = 1;
        vuelta["town_guard"] = 1;
    }
    return vuelta;
}
//</editor-fold>
//<editor-fold defaultstate="collapsed" desc="function check_city_type_units( tipo )">
function check_city_type_units( tipo ) {
    var vuelta = [];
    if(tipo == "conquest") {
        vuelta["hoplite"] = 400;
        vuelta["chariot"] = 150;
        vuelta["big_transporter"] = 38; // * 32 = 1216
        vuelta["trireme"] = 75;
        vuelta["colonize_ship"] = 1;
    }
    else if(tipo == "nav_def") {
        vuelta["bireme"] = 300;
    }
    else if(tipo == "land_off") {
        vuelta["rider"] = 250;
        vuelta["attack_ship"] = 70;
        vuelta["catapult"] = 16;
        vuelta["small_transporter"] = 94;
        vuelta["slinger"] = 750;
    }
    else if(tipo == "mix_def") {
        vuelta["sword"] = 360;
        vuelta["archer"] = 120;
        vuelta["hoplite"] = 300;
        vuelta["small_transporter"] = 49;
        vuelta["bireme"] = 200;
    }
    else if(tipo == "maticoras") {
        vuelta["manticore"] = 50;
        vuelta["attack_ship"] = 70;
    }
    else if(tipo == "nav_off") {
        vuelta["attack_ship"] = 230;
    }
   

    return vuelta;
}
//</editor-fold>
