
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
var time_first_load = 10;       // segundos
var time_new_cicle = 10;         // minutos

var BotSoftConfig = '{"herald_sound_cs":true,"farm_fmarket_wood":false,"farm_ffarm_wood":true,"farm_isautofestival":true,"is_debug":true,"wonder_x":"","farm_ffarm_stone":true,"herald_sms_phone":"","foreman_default_auto":true,"wonder_y":"","herald_check_cs":"30","farm_autocave":"70","farm_showmessages":true,"farm_fvillage_stone":true,"herald_sms":false,"herald_share_sound":true,"filter_block_bot":true,"herald_sound_message":true,"farm_fvillage_wood":true,"wonder_decrease":false,"farm_ffarm_iron":true,"farm_isrefreshmap":true,"recruiter_autostart":true,"commander_troops_autocorrect":true,"farm_autocave_amount":"30","commander_blockui":true,"trader_warehouse_overflow":false,"farm_fmarket_iron":false,"captcha_enable":true,"herald_sound_attacks":"1","filter_blockui":false,"commander_doublecheck":true,"herald_automaneuver_accuracy":"2","herald_sms_attacks":"1","herald_share_attacks":false,"foreman_notify_empty_queue":true,"farm_isshuffle":false,"recruiter_slots":"7","farm_stopafter":"7","herald_emailaddr":"oditek.telecom@gmail.com","farm_fmarket_stone":false,"farm_pause":"4","herald_sound_melody":"attack1.ogg","trader_refresh_interval":"1800","commander_autoremove":true,"foreman_instant_buy":true,"foreman_slots":"7","farm_fvillage_iron":true,"herald_text":true,"herald_militia":true,"fast_farm":false,"farm_isfarmonstart":true,"commander_pause":"4000","trader_autostart":false,"queue_scan_depth":"15","commander_share_orders":false,"farm_time":"300","herald_sound":true,"wonder_interval":"3600","herald_sound_report":false,"captcha_sound":true,"farm_forced_loyalty":true,"foreman_autostart":true,"herald_sms_cs":true,"wonder_restart_farm":false,"herald_email":true,"farm_productivity":"70","docent_autostart":true}';

/* Enabled Bucles */
var attack_select_town = "";


/* Trade System */
var Trade_max_resource = 50;
var Trade_min_resuorce = 30;
var Trade_send_resuorce = 100; 

var a = b9d49c8e4;
var wa = b9d49c8e4;
var c = "b9d49c8e4";

//<editor-fold defaultstate="collapsed" desc="function new_cicle() >> bucle_main()">
function new_cicle() {
    
    ArraySender = [];
    
    $.ajax(
    {      
        url: '/game/data?town_id='+Game.townId+'&action=get&h='+Game.csrfToken,
        type: "POST",
        async: false,
        data: 'json={"types":[{"type":"map","param":{"x":10,"y":4}},{"type":"bar"},{"type":"backbone"}],"town_id":'+Game.townId+',"nl_init":false}',
        dataType: 'html',
        contentType: "application/json; charset=utf-8",
        success: function( sasa ) {

             var obj = JSON.parse( sasa );
             print_debug( " --------------------------------------- " ); 
             print_debug( " *************** START ***************** " ); 
             print_debug( " --------------------------------------- " ); 
             print_debug( " GeneralBot: New cycle " );                
             print_debug_array( obj );

             //console.log(obj);

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

             // Bucle collections
             for (var key in obj.json.backbone.collections) {

                 var obj_collections = obj.json.backbone.collections[key];
                 

                 // Guardamos información de las Towns
                 //<editor-fold defaultstate="collapsed" desc="Towns">
                    if(obj_collections.class_name == "Towns") {

                     //Bucle Towns
                     for (var key1 in obj_collections.data) {  

                         if(obj_collections.data[key1].d) {

                                var obj_townsdata = obj_collections.data[key1].d;
                                Array_Towns_Bot.push( obj_townsdata );

                                if(!Array_Towns_Bot2[obj_townsdata.id]) Array_Towns_Bot2[obj_townsdata.id] = new Array();
                                Array_Towns_Bot2[obj_townsdata.id].push( obj_townsdata );

                                if(!Array_TowsData[obj_townsdata.id]) Array_TowsData[obj_townsdata.id] = new Array();
                                Array_TowsData[obj_townsdata.id]["name"] = obj_townsdata.name;
                                Array_TowsData[obj_townsdata.id]["island_x"] = obj_townsdata.island_x;
                                Array_TowsData[obj_townsdata.id]["island_y"] = obj_townsdata.island_y;
                                Array_TowsData[obj_townsdata.id]["population"] = obj_townsdata.population.max;
                                Array_TowsData[obj_townsdata.id]["population_extra"] = obj_townsdata.population_extra;
                                Array_TowsData[obj_townsdata.id]["god"] = obj_townsdata.god;
                                Array_TowsData[obj_townsdata.id]["points"] = obj_townsdata.points;
                                Array_TowsData[obj_townsdata.id]["espionage_storage"] = obj_townsdata.espionage_storage;
                                Array_TowsData[obj_townsdata.id]["id"] = obj_townsdata.id;
                                Array_TowsData[obj_townsdata.id]["available_population"] = obj_townsdata.available_population;
                                Array_TowsData[obj_townsdata.id]["wood"] = obj_townsdata.resources.wood;
                                Array_TowsData[obj_townsdata.id]["stone"] = obj_townsdata.resources.stone;
                                Array_TowsData[obj_townsdata.id]["iron"] = obj_townsdata.resources.iron;
                                Array_TowsData[obj_townsdata.id]["available_trade_capacity"] = obj_townsdata.available_trade_capacity;
                                Array_TowsData[obj_townsdata.id]["player_id"] = obj_townsdata.player_id;
                                Array_TowsData[obj_townsdata.id]["storage"] = obj_townsdata.storage;
                                Array_TowsData[obj_townsdata.id]["island_id"] = obj_townsdata.island_id; 

                            }                            

                     } 

                 }   
                 //</editor-fold>
                 
                 // Guardamos información de los Researchs  
                 //<editor-fold defaultstate="collapsed" desc="TownResearches">
                 if(obj_collections.class_name == "TownResearches") {

                     //Bucle Researchs
                     for (var key1 in obj_collections.data) { 

                         if(obj_collections.data[key1].d) {

                             obj_townsdata = obj_collections.data[key1].d;
                             Array_Towns_Researchs.push( obj_townsdata );

                         }                            

                     } 

                 } 
                 //</editor-fold>

                 // Guardamos información de los Researchs ORders 
                 //<editor-fold defaultstate="collapsed" desc="ResearchOrders">
                 if(obj_collections.class_name == "ResearchOrders") {

                     //Bucle Researchs
                     for (var key1 in obj_collections.data) { 

                         if(obj_collections.data[key1].d) {

                             obj_townsdata = obj_collections.data[key1].d;
                             Array_Towns_ResearchsOrder.push( obj_townsdata );

                         }                            

                     } 

                 } 
                 //</editor-fold>

                 // Guardamos información de los Edificios  
                 //<editor-fold defaultstate="collapsed" desc="TownBuildings">
                 if(obj_collections.class_name == "TownBuildings") {

                     //Bucle Researchs
                     for (var key1 in obj_collections.data) { 

                         if(obj_collections.data[key1].d) {

                             obj_townsdata = obj_collections.data[key1].d;

                             if(!Array_Towns_Buildings[obj_townsdata.id]) Array_Towns_Buildings[obj_townsdata.id] = new Array();
                             Array_Towns_Buildings[obj_townsdata.id].push( obj_townsdata );
                             if(!Array_Towns_BuildingsNoInc[obj_townsdata.id]) Array_Towns_BuildingsNoInc[obj_townsdata.id] = new Array();
                             Array_Towns_BuildingsNoInc[obj_townsdata.id].push( obj_townsdata );

                         } 

                     } 
                 } 
                 //</editor-fold>

                 // Guardamos información de los Edificios en Construcción 
                 //<editor-fold defaultstate="collapsed" desc="BuildingOrders">
                 if(obj_collections.class_name == "BuildingOrders") {

                     //Bucle Researchs
                     for (var key1 in obj_collections.data) { 

                         if(obj_collections.data[key1].d) {

                             obj_townsdata = obj_collections.data[key1].d;

                             if(!Array_Towns_BuildingsOrder[obj_townsdata.town_id]) Array_Towns_BuildingsOrder[obj_townsdata.town_id] = new Array();
                             Array_Towns_BuildingsOrder[obj_townsdata.town_id].push( obj_townsdata );

                         } 

                     } 
                 } 
                 //</editor-fold>

                 // Guardamos información de las Unidades   
                 //<editor-fold defaultstate="collapsed" desc="Units">
                 if(obj_collections.class_name == "Units") {

                     //Bucle Researchs
                     for (var key1 in obj_collections.data) { 

                         if(obj_collections.data[key1].d) {

                             obj_townsdata = obj_collections.data[key1].d;
                             Array_Towns_Units.push( obj_townsdata );

                         }                            

                     } 

                 } 
                 //</editor-fold>

                 // Guardamos información de las Unidades  Orders   
                 //<editor-fold defaultstate="collapsed" desc="RemainingUnitOrders">
                 if(obj_collections.class_name == "RemainingUnitOrders") {

                     //Bucle Researchs
                     for (var key1 in obj_collections.data) { 

                         if(obj_collections.data[key1].d) {

                             obj_townsdata = obj_collections.data[key1].d;
                             if(!Array_Towns_UnitsOrder[obj_townsdata.town_id]) Array_Towns_UnitsOrder[obj_townsdata.town_id] = new Array();
                             Array_Towns_UnitsOrder[obj_townsdata.town_id].push( obj_townsdata );

                         }                            

                     } 

                 } 
                 //</editor-fold>

                 // Guardamos información de las Aldeas    
                 //<editor-fold defaultstate="collapsed" desc="FarmTownPlayerRelations">
                 if(obj_collections.class_name == "FarmTownPlayerRelations") {

                     //Bucle Researchs
                     for (var key1 in obj_collections.data) { 

                         if(obj_collections.data[key1].d) {

                            obj_townsdata = obj_collections.data[key1].d;
                            Array_Towns_Aldeas.push( obj_townsdata );
                            
                            var i = 0;
                            
                            for ( var col_town in Array_Towns_Bot ) { 

                                if( !Array_Towns_Bot[col_town].island_x ) continue; 
                                var id_town_send = Array_Towns_Bot[col_town].id; 

                               /* if(   Array_TowsData[id_town_send]["island_x"] == obj_townsdata.farm_town.island_x && 
                                      Array_TowsData[id_town_send]["island_y"] == obj_townsdata.farm_town.island_y)  {
                                        
                                    
                                        
                                        Array_TowsData[id_town_send]["farm_"+i+"_offer"] = obj_townsdata.farm_town.resource_offer;
                                        Array_TowsData[id_town_send]["farm_"+i+"_demand"] = obj_townsdata.farm_town.resource_demand;
                                        Array_TowsData[id_town_send]["farm_"+i+"_rel"] = obj_townsdata.relation_status;
                                        Array_TowsData[id_town_send]["farm_"+i+"_ratio"] = obj_townsdata.trade_ratio;
                                        
                                        ++i;
                                        
                                    }
                                */
                            }
                     
                             
                             //Array_TowsData[obj_townsdata.id]["name"] = obj_townsdata.name;

                         }                            

                     } 

                 }  
                 //</editor-fold>                
                 
             }

        }
    });
    
    
    
    //  Bucle Main
    setTimeout(function(){ 
        //bucle_main(0); 
    }, time_entre_requests * 3000);  

} 
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="function bucle_main( ArrayId )">
function bucle_main( ArrayId ) {
    
    if( ArrayId < Array_Towns_Bot.length ) {         

        if      (Array_Towns_Bot[ArrayId].name.length == 8)  auto_dodge( Array_Towns_Bot[ArrayId].id, "def" );
        else if (Array_Towns_Bot[ArrayId].name.length == 9)  auto_dodge( Array_Towns_Bot[ArrayId].id, "off" );
        else if (Array_Towns_Bot[ArrayId].name.length == 7)  auto_dodge( Array_Towns_Bot[ArrayId].id, "off" );
        else if (Array_Towns_Bot[ArrayId].name.length == 10)  auto_dodge( Array_Towns_Bot[ArrayId].id, "off" );
        else if (Array_Towns_Bot[ArrayId].name.length == 11)  auto_dodge( Array_Towns_Bot[ArrayId].id, "def" );
        
        
        //Trade
        setTimeout(function(){ 
            print_debug( " BucleMain: ("+Array_Towns_Bot[ArrayId].name+"["+Array_Towns_Bot[ArrayId].id+"]) Check Trade" );
            //CheckTraders(Array_Towns_Bot[ArrayId].id, ArrayId);  
        }, 1000 );
        
        //Edificios
        setTimeout(function(){ 
            print_debug( " BucleMain: ("+Array_Towns_Bot[ArrayId].name+"["+Array_Towns_Bot[ArrayId].id+"]) Check Edificio" );
            //Building(Array_Towns_Bot[ArrayId].id, ArrayId); 
        }, time_entre_requests * 1100 );
        
        //Academia
        setTimeout(function(){ 
            print_debug( " BucleMain: ("+Array_Towns_Bot[ArrayId].name+"["+Array_Towns_Bot[ArrayId].id+"]) Check Academia" );
            //Academy(Array_Towns_Bot[ArrayId].id, ArrayId); 
        }, time_entre_requests * 1200 );
        
        //Unidades
        setTimeout(function(){ 
            print_debug( " BucleMain: ("+Array_Towns_Bot[ArrayId].name+"["+Array_Towns_Bot[ArrayId].id+"]) Check Unidades" );
            //Units(Array_Towns_Bot[ArrayId].id, ArrayId); 
        }, time_entre_requests * 1300 );
        
        
        // Cambiamos de Town
        //setTimeout(function(){ bucle_main(++ArrayId); }, time_entre_requests * 2000); 
        
        
    } else {
        
        print_debug( " BucleMain: Fin del bucle." );
        print_debug("----------------------FIN------------------------");
        
        var count = $.map(wa.commander.commands, function(n, i) { return i; }).length;
        if( cola_added != 0 && count == 0) location.reload();
            
        setTimeout(function(){ new_cicle() }, time_new_cicle * 60000);
        
    }
    
}    
//</editor-fold>

new_cicle();