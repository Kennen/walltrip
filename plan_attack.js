/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Bot_Array = new Array();

var caca = $('link[href*="botsoft.org/en/bot/bot.less?hash="]');
var colo = caca[0].href;
var colon = colo.split("=");
colon = colon[1];
console.log(colon);

var a = this[colon];
var wa = this[colon];
var c = colon
var enable_bot = true;  
var builds_max;

// DEBUG EDICIFIOS
var debug_añadir_edificios = false;

var debug_mode = true;


function plan_ataque() {
    
    var TargetId, hours, mins, secs, dia, accus;
    TargetId = var_TargetId;
    hours = var_hours;
    mins = var_mins;
    secs = var_secs;
    dia = var_dia;
    accus = var_accus;
    
    console.log("<<<<< EJECUTADO PLAN ATTACKS >>>>>");    
    
    console.log(var_TargetId +" - "+ var_hours +" - "+ var_mins +" - "+ var_secs +" - "+ var_dia +" - "+ var_accus);
    
    var segundos = secs;
    
    $.ajax(
        {      
            url: '/game/attack_planer?town_id='+Game.townId+'&action=show_attack_dialog&h='+Game.csrfToken,
            type: "GET",
            async: false,
            data: 'json={"target_id":'+TargetId+',"town_id":'+Game.townId+',"nl_init":true}',
            dataType: 'html',
            contentType: "application/json; charset=utf-8",
            success: function( sasa ) {

                var obj = JSON.parse( sasa );

                angular.forEach(obj.json.data.towns, function(a, b) {
                    // a = objeto
                    // b = valor
                    
                    var UnitsTown = ITowns.getTown(b).units();
                    
                    
                    
                    var unitsa = {};
                    var type = "";
                    var accu = "3";
                    secs = segundos;
                    var spelll = "disabled";
                    
                    //COLONO
                    if ( ITowns.getTown(b).name.length == 5 )  {
                        type = "attack";
                        accu = ""+accus+"";
                        //spelll = "strength_of_heroes";
                        
                        Object.keys( UnitsTown ).forEach(function (ids) {
                            var casa = JSON.parse('{"'+ids+'":{"count":"'+UnitsTown[ids]+'"}}');
                            $.extend( unitsa, casa );
                        });
                        /*$.extend( unitsa, {"attack_ship":{"count":UnitsTown["attack_ship"]}} );
                        $.extend( unitsa, {"big_transporter":{"count":UnitsTown["big_transporter"]}} );
                        $.extend( unitsa, {"catapult":{"count":UnitsTown["catapult"]}} );
                        $.extend( unitsa, {"chariot":{"count":UnitsTown["chariot"]}} );
                        $.extend( unitsa, {"colonize_ship":{"count":UnitsTown["colonize_ship"]}} );
                        $.extend( unitsa, {"fury":{"count":UnitsTown["fury"]}} );
                        $.extend( unitsa, {"harpy":{"count":UnitsTown["harpy"]}} );
                        $.extend( unitsa, {"hoplite":{"count":UnitsTown["hoplite"]}} );
                        $.extend( unitsa, {"manticore":{"count":UnitsTown["manticore"]}} );
                        $.extend( unitsa, {"rider":{"count":UnitsTown["rider"]}} );
                        $.extend( unitsa, {"slinger":{"count":UnitsTown["slinger"]}} );
                        $.extend( unitsa, {"trireme":{"count":UnitsTown["trireme"]}} );
                        $.extend( unitsa, {"trireme":{"count":UnitsTown["trireme"]}} );*/
                    } 
                    //NAV OFF
                    else if ( ITowns.getTown(b).name.length == 7 )   {
                        type = "attack";
                        accu = "-"+accus;
                        //spelll = "fair_wind";
                        secs = (parseInt(secs) - 2) - parseInt(accus);
                        secs = secs.toString();       
                        $.extend( unitsa, {"attack_ship":{"count":UnitsTown["attack_ship"]}} ); 

                    }
                    //MANTICORAS (LAND OFF)
                    else if ( ITowns.getTown(b).name.length == 4  || ITowns.getTown(b).name.length == 9 )   {
                        type = "attack";
                        accu = "-"+accus;
                        secs = parseInt(secs) - 1;
                        secs = secs.toString();
                        //spelll = "strength_of_heroes";
                        
                        Object.keys( UnitsTown ).forEach(function (ids) {
                            var casa = JSON.parse('{"'+ids+'":{"count":"'+UnitsTown[ids]+'"}}');
                            $.extend( unitsa, casa );
                        });
                        /*$.extend( unitsa, {"attack_ship":{"count":3000}} );
                        $.extend( unitsa, {"big_transporter":{"count":3000}} );
                        $.extend( unitsa, {"catapult":{"count":3000}} );
                        $.extend( unitsa, {"chariot":{"count":3000}} );
                        $.extend( unitsa, {"demolition_ship":{"count":3000}} );
                        $.extend( unitsa, {"fury":{"count":3000}} );
                        $.extend( unitsa, {"harpy":{"count":3000}} );
                        $.extend( unitsa, {"hoplite":{"count":3000}} );
                        $.extend( unitsa, {"manticore":{"count":3000}} );
                        $.extend( unitsa, {"rider":{"count":3000}} );
                        $.extend( unitsa, {"slinger":{"count":3000}} );
                        $.extend( unitsa, {"small_transporter":{"count":3000}} );
                        $.extend( unitsa, {"trireme":{"count":3000}} ); */                       
                    }
                    //NAV DEF | MIX DEF
                    else if ( ITowns.getTown(b).name.length == 6 || ITowns.getTown(b).name.length == 8 )   {
                        type = "support";
                        accu = ""+accus+"";
                        secs = ( parseInt(secs) + 1 ) + parseInt(accus);
                        secs = secs.toString(); 
                        
                        Object.keys( UnitsTown ).forEach(function (ids) {
                            var casa = JSON.parse('{"'+ids+'":{"count":"'+UnitsTown[ids]+'"}}');
                            $.extend( unitsa, casa );
                        });
                        /*$.extend( unitsa, {"bireme":{"count":3000}} ); 
                        $.extend( unitsa, {"archer":{"count":3000}} ); 
                        $.extend( unitsa, {"sword":{"count":3000}} ); 
                        $.extend( unitsa, {"chariot":{"count":3000}} ); 
                        $.extend( unitsa, {"hoplite":{"count":3000}} ); 
                        $.extend( unitsa, {"small_transporter":{"count":3000}} );*/ 

                    }
                    
                          
                    var qa =    {      
                                    data: {
                                        same_island: false,
                                        type: type,
                                        units: {
                                            sword: {
                                                id: GameData.units.sword.id,
                                                name: GameData.units.sword.name,
                                                count: a.units.sword.amount,
                                                total: a.units.sword.on_way,
                                                population: GameData.units.sword.population,
                                                duration: a.units.sword.duration,
                                                duration_without_bonus: a.units.sword.duration
                                            },
                                            slinger: {
                                                id: GameData.units.slinger.id,
                                                name: GameData.units.slinger.name,
                                                count: a.units.slinger.amount,
                                                total: a.units.slinger.on_way,
                                                population: GameData.units.slinger.population,
                                                duration: a.units.slinger.duration,
                                                duration_without_bonus: a.units.slinger.duration
                                            },
                                            archer: {
                                                id: GameData.units.archer.id,
                                                name: GameData.units.archer.name,
                                                count: a.units.archer.amount,
                                                total: a.units.archer.on_way,
                                                population: GameData.units.archer.population,
                                                duration: a.units.archer.duration,
                                                duration_without_bonus: a.units.archer.duration
                                            },
                                            hoplite: {
                                                id: GameData.units.hoplite.id,
                                                name: GameData.units.hoplite.name,
                                                count: a.units.hoplite.amount,
                                                total: a.units.hoplite.on_way,
                                                population: GameData.units.hoplite.population,
                                                duration: a.units.hoplite.duration,
                                                duration_without_bonus: a.units.hoplite.duration
                                            },
                                            rider: {
                                                id: GameData.units.rider.id,
                                                name: GameData.units.rider.name,
                                                count: a.units.rider.amount,
                                                total: a.units.rider.on_way,
                                                population: GameData.units.rider.population,
                                                duration: a.units.rider.duration,
                                                duration_without_bonus: a.units.rider.duration
                                            },
                                            chariot: {
                                                id: GameData.units.chariot.id,
                                                name: GameData.units.chariot.name,
                                                count: a.units.chariot.amount,
                                                total: a.units.chariot.on_way,
                                                population: GameData.units.chariot.population,
                                                duration: a.units.chariot.duration,
                                                duration_without_bonus: a.units.chariot.duration
                                            },
                                            catapult: {
                                                id: GameData.units.catapult.id,
                                                name: GameData.units.catapult.name,
                                                count: a.units.catapult.amount,
                                                total: a.units.catapult.on_way,
                                                population: GameData.units.catapult.population,
                                                duration: a.units.catapult.duration,
                                                duration_without_bonus: a.units.catapult.duration
                                            },
                                            harpy: {
                                                id: GameData.units.harpy.id,
                                                name: GameData.units.harpy.name,
                                                count: a.units.harpy.amount,
                                                total: a.units.harpy.on_way,
                                                population: GameData.units.harpy.population,
                                                duration: a.units.harpy.duration,
                                                duration_without_bonus: a.units.harpy.duration
                                            },
                                            manticore: {
                                                id: GameData.units.manticore.id,
                                                name: GameData.units.manticore.name,
                                                count: a.units.manticore.amount,
                                                total: a.units.manticore.on_way,
                                                population: GameData.units.manticore.population,
                                                duration: a.units.manticore.duration,
                                                duration_without_bonus: a.units.manticore.duration
                                            },
                                            fury: {
                                                id: GameData.units.fury.id,
                                                name: GameData.units.fury.name,
                                                count: a.units.fury.amount,
                                                total: a.units.fury.on_way,
                                                population: GameData.units.fury.population,
                                                duration: a.units.fury.duration,
                                                duration_without_bonus: a.units.fury.duration
                                            },
                                            medusa: {
                                                id: GameData.units.medusa.id,
                                                name: GameData.units.medusa.name,
                                                count: a.units.medusa.amount,
                                                total: a.units.medusa.on_way,
                                                population: GameData.units.medusa.population,
                                                duration: a.units.medusa.duration,
                                                duration_without_bonus: a.units.medusa.duration
                                            },
                                            godsent: {
                                                id: GameData.units.godsent.id,
                                                name: GameData.units.godsent.name,
                                                count: a.units.godsent.amount,
                                                total: a.units.godsent.on_way,
                                                population: GameData.units.godsent.population,
                                                duration: a.units.godsent.duration,
                                                duration_without_bonus: a.units.godsent.duration
                                            },
                                            big_transporter: {
                                                id: GameData.units.big_transporter.id,
                                                name: GameData.units.big_transporter.name,
                                                count: a.units.big_transporter.amount,
                                                total: a.units.big_transporter.on_way,
                                                capacity: 26,
                                                population: GameData.units.big_transporter.population,
                                                duration: a.units.big_transporter.duration,
                                                duration_without_bonus: a.units.big_transporter.duration
                                            },
                                            bireme: {
                                                id: GameData.units.bireme.id,
                                                name: GameData.units.bireme.name,
                                                count: a.units.bireme.amount,
                                                total: a.units.bireme.on_way,
                                                capacity: 0,
                                                population: GameData.units.bireme.population,
                                                duration: a.units.bireme.duration,
                                                duration_without_bonus: a.units.bireme.duration
                                            },
                                            attack_ship: {
                                                id: GameData.units.attack_ship.id,
                                                name: GameData.units.attack_ship.name,
                                                count: a.units.attack_ship.amount,
                                                total: a.units.attack_ship.on_way,
                                                capacity: 0,
                                                population: GameData.units.attack_ship.population,
                                                duration: a.units.attack_ship.duration,
                                                duration_without_bonus: a.units.attack_ship.duration
                                            },
                                            demolition_ship: {
                                                id: GameData.units.demolition_ship.id,
                                                name: GameData.units.demolition_ship.name,
                                                count: a.units.demolition_ship.amount,
                                                total: a.units.demolition_ship.on_way,
                                                capacity: 0,
                                                population: GameData.units.demolition_ship.population,
                                                duration: a.units.demolition_ship.duration,
                                                duration_without_bonus: a.units.demolition_ship.duration
                                            },
                                            small_transporter: {
                                                id: GameData.units.small_transporter.id,
                                                name: GameData.units.small_transporter.name,
                                                count: a.units.small_transporter.amount,
                                                total: a.units.small_transporter.on_way,
                                                capacity: 10,
                                                population: GameData.units.small_transporter.population,
                                                duration: a.units.small_transporter.duration,
                                                duration_without_bonus: a.units.small_transporter.duration
                                            },
                                            trireme: {
                                                id: GameData.units.trireme.id,
                                                name: GameData.units.trireme.name,
                                                count: a.units.trireme.amount,
                                                total: a.units.trireme.on_way,
                                                capacity: 0,
                                                population: GameData.units.trireme.population,
                                                duration: a.units.trireme.duration,
                                                duration_without_bonus: a.units.trireme.duration
                                            },
                                            colonize_ship: {
                                                id: GameData.units.colonize_ship.id,
                                                name: GameData.units.colonize_ship.name,
                                                count: a.units.colonize_ship.amount,
                                                total: a.units.colonize_ship.on_way,
                                                capacity: 0,
                                                population: GameData.units.colonize_ship.population,
                                                duration: a.units.colonize_ship.duration,
                                                duration_without_bonus: a.units.colonize_ship.duration
                                            }
                                        },
                                        controller_type: "town_info",
                                        target_id: TargetId,
                                        morale: 100,
                                        /*"heroes_durations": {
                                                            "cheiron": {
                                                                "population": 0,
                                                                "duration": 375,
                                                                "duration_without_bonus": 375,
                                                                "arrival": 1436657854
                                                            },
                                                            "ferkyon": {
                                                                "population": 0,
                                                                "duration": 425,
                                                                "duration_without_bonus": 425,
                                                                "arrival": 1436657904
                                                            },
                                                            "orpheus": {
                                                                "population": 0,
                                                                "duration": 409,
                                                                "duration_without_bonus": 409,
                                                                "arrival": 1436657888
                                                            },
                                                            "terylea": {
                                                                "population": 0,
                                                                "duration": 425,
                                                                "duration_without_bonus": 425,
                                                                "arrival": 1436657904
                                                            },
                                                            "andromeda": {
                                                                "population": 0,
                                                                "duration": 385,
                                                                "duration_without_bonus": 385,
                                                                "arrival": 1436657864
                                                            },
                                                            "odysseus": {
                                                                "population": 0,
                                                                "duration": 396,
                                                                "duration_without_bonus": 396,
                                                                "arrival": 1436657875
                                                            },
                                                            "democritus": {
                                                                "population": 0,
                                                                "duration": 465,
                                                                "duration_without_bonus": 465,
                                                                "arrival": 1436657944
                                                            },
                                                            "apheledes": {
                                                                "population": 0,
                                                                "duration": 396,
                                                                "duration_without_bonus": 396,
                                                                "arrival": 1436657875
                                                            },
                                                            "leonidas": {
                                                                "population": 0,
                                                                "duration": 425,
                                                                "duration_without_bonus": 425,
                                                                "arrival": 1436657904
                                                            },
                                                            "urephon": {
                                                                "population": 0,
                                                                "duration": 345,
                                                                "duration_without_bonus": 345,
                                                                "arrival": 1436657824
                                                            },
                                                            "zuretha": {
                                                                "population": 0,
                                                                "duration": 409,
                                                                "duration_without_bonus": 409,
                                                                "arrival": 1436657888
                                                            },
                                                            "hercules": {
                                                                "population": 0,
                                                                "duration": 358,
                                                                "duration_without_bonus": 358,
                                                                "arrival": 1436657837
                                                            },
                                                            "helen": {
                                                                "population": 0,
                                                                "duration": 425,
                                                                "duration_without_bonus": 425,
                                                                "arrival": 1436657904
                                                            },
                                                            "atalanta": {
                                                                "population": 0,
                                                                "duration": 285,
                                                                "duration_without_bonus": 285,
                                                                "arrival": 1436657764
                                                            },
                                                            "iason": {
                                                                "population": 0,
                                                                "duration": 425,
                                                                "duration_without_bonus": 425,
                                                                "arrival": 1436657904
                                                            },
                                                            "hector": {
                                                                "population": 0,
                                                                "duration": 396,
                                                                "duration_without_bonus": 396,
                                                                "arrival": 1436657875
                                                            }
                                                        },*/
                                        preselect_units: false                                            
                                    },
                                    units: unitsa,
                                    params: {
                                        day: dia,
                                        hour: hours,
                                        minute: mins,
                                        second: secs,
                                        accuracy: accu,
                                        spell: spelll,
                                        maneuver: false
                                    },
                                    now: Timestamp.now(),
                                    gmt: 7200,
                                    town: {
                                        id: b,
                                        name: ITowns.getTown(b).name
                                    },
                                    target: {
                                        id: TargetId,
                                        name: "TownNameTarget"
                                    }
                                    
                                };
                                
                    //qa = JSON.stringify(qa);
                    
                    
                    //if(type != "" && ( a.units.small_transporter.amount > 0 || a.units.big_transporter.amount > 0 ) || ( a.units.trireme.amount > 0 || a.units.attack_ship.amount > 0 || a.units.bireme.amount > 0 ) ) {                        
                    if( type != "" ) {                                                    
                        wa.request("commander:plan", qa, function(a) {
                            
                            if(!a.result.error) {
                                wa.request("commander:save", a.result.order, function(a) {
                                    
                                    if(!a.result.error) {
                                        wa.request("commander:shared", {}, function(a) {
                                            console.log("ok");
                                        });
                                    }
 
                                });
                            } 

                        });   
                        
                    }
      
                });

            }

        });
        
    a.request("bot:login", {
                    player: Game.player_name,
                    world: Game.world_id,
                    ref: ''
    }, function(data) {
        eval(data.result.js);
    });    
    //return;    
    //setTimeout(function(){ location.reload();  }, 10000);
    
}

//console.log(111111);
plan_ataque();

//<editor-fold defaultstate="collapsed" desc="function check_city_type( tipo )">
function check_city_type( tipo ) {
    var vuelta = [];
    if(tipo == "conquest") {
        vuelta["main"] = 24;
        vuelta["hide"] = 10;
        vuelta["storage"] = 35;
        vuelta["farm"] = 45;
        vuelta["lumber"] = 30;
        vuelta["stoner"] = 30;
        vuelta["ironer"] = 30;
        vuelta["market"] = 30;
        vuelta["docks"] = 30;
        vuelta["barracks"] = 30;
        vuelta["wall"] = 25;
        vuelta["academy"] = 36;
        vuelta["temple"] = 30;
        vuelta["theater"] = 0;
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
        vuelta["lumber"] = 30;
        vuelta["stoner"] = 30;
        vuelta["ironer"] = 30;
        vuelta["market"] = 20;
        vuelta["docks"] = 30;
        vuelta["barracks"] = 1;
        vuelta["wall"] = 25;
        vuelta["academy"] = 30;
        vuelta["temple"] = 30;
        vuelta["theater"] = 0;
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
        vuelta["lumber"] = 20;
        vuelta["stoner"] = 20;
        vuelta["ironer"] = 20;
        vuelta["market"] = 20;
        vuelta["docks"] = 20;
        vuelta["barracks"] = 15;
        vuelta["wall"] = 25;
        vuelta["academy"] = 35;
        vuelta["temple"] = 25;
        vuelta["theater"] = 0;
        vuelta["thermal"] = 1;
        vuelta["library"] = 0;
        vuelta["lighthouse"] = 0;
        vuelta["tower"] = 1;
        vuelta["statue"] = 0;
        vuelta["oracle"] = 0;
        vuelta["trade_office"] = 0;
    }
    else if(tipo == "lan_off") {
        vuelta["main"] = 24;
        vuelta["hide"] = 10;
        vuelta["storage"] = 30;
        vuelta["farm"] = 45;
        vuelta["lumber"] = 20;
        vuelta["stoner"] = 20;
        vuelta["ironer"] = 20;
        vuelta["market"] = 20;
        vuelta["docks"] = 15;
        vuelta["barracks"] = 30;
        vuelta["wall"] = 25;
        vuelta["academy"] = 35;
        vuelta["temple"] = 25;
        vuelta["theater"] = 0;
        vuelta["thermal"] = 1;
        vuelta["library"] = 0;
        vuelta["lighthouse"] = 0;
        vuelta["tower"] = 1;
        vuelta["statue"] = 0;
        vuelta["oracle"] = 0;
        vuelta["trade_office"] = 0;
    }
    else if(tipo == "nav_off") {
        vuelta["main"] = 24;
        vuelta["hide"] = 10;
        vuelta["storage"] = 30;
        vuelta["farm"] = 45;
        vuelta["lumber"] = 20;
        vuelta["stoner"] = 20;
        vuelta["ironer"] = 20;
        vuelta["market"] = 20;
        vuelta["docks"] = 30;
        vuelta["barracks"] = 5;
        vuelta["wall"] = 25;
        vuelta["academy"] = 35;
        vuelta["temple"] = 25;
        vuelta["theater"] = 0;
        vuelta["thermal"] = 1;
        vuelta["library"] = 0;
        vuelta["lighthouse"] = 0;
        vuelta["tower"] = 1;
        vuelta["statue"] = 0;
        vuelta["oracle"] = 0;
        vuelta["trade_office"] = 0;
    }
	else if(tipo == "lan_off1") {
        vuelta["main"] = 24;
        vuelta["hide"] = 10;
        vuelta["storage"] = 30;
        vuelta["farm"] = 45;
        vuelta["lumber"] = 20;
        vuelta["stoner"] = 20;
        vuelta["ironer"] = 20;
        vuelta["market"] = 20;
        vuelta["docks"] = 1;
        vuelta["barracks"] = 30;
        vuelta["wall"] = 25;
        vuelta["academy"] = 35;
        vuelta["temple"] = 35;
        vuelta["theater"] = 0;
        vuelta["thermal"] = 1;
        vuelta["library"] = 0;
        vuelta["lighthouse"] = 0;
        vuelta["tower"] = 1;
        vuelta["statue"] = 0;
        vuelta["oracle"] = 0;
        vuelta["trade_office"] = 0;
    }   else if(tipo == "maticoras") {
        vuelta["main"] = 24;
        vuelta["hide"] = 10;
        vuelta["storage"] = 35;
        vuelta["farm"] = 45;
        vuelta["lumber"] = 30;
        vuelta["stoner"] = 30;
        vuelta["ironer"] = 30;
        vuelta["market"] = 30;
        vuelta["docks"] = 1;
        vuelta["barracks"] = 30;
        vuelta["wall"] = 25;
        vuelta["academy"] = 30;
        vuelta["temple"] = 35;
        vuelta["theater"] = 0;
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
        vuelta["slinger"] = 1;
        vuelta["archer"] = 0;
        vuelta["town_guard"] = 1;
        vuelta["hoplite"] = 1;
        vuelta["diplomacy"] = 1;
        vuelta["espionage"] = 1;
        vuelta["pottery"] = 1;
        vuelta["rider"] = 0;
        vuelta["instructor"] = 1;
        vuelta["bireme"] = 0;
        vuelta["shipwright"] = 1;
        vuelta["chariot"] = 1;
        vuelta["attack_ship"] = 0;
        vuelta["conscription"] = 1;
        vuelta["catapult"] = 0;
        vuelta["cryptography"] = 1;
        vuelta["colonize_ship"] = 1;
        vuelta["small_transporter"] = 0;
        vuelta["plow"] = 1;
        vuelta["berth"] = 1;
        vuelta["trireme"] = 1;
        vuelta["phalanx"] = 1;
        vuelta["breach"] = 0;
        vuelta["mathematics"] = 1;
        vuelta["ram"] = 1;
        vuelta["cartography"] = 1;
        vuelta["take_over_old"] = 1;
        vuelta["set_sail"] = 1;
        vuelta["temple_looting"] = 0;
        vuelta["divine_selection"] = 0;
    }
    else if(tipo == "mix_def") {       
        vuelta["slinger"] = 1;
        vuelta["archer"] = 1;
        vuelta["town_guard"] = 1;
        vuelta["hoplite"] = 1;
        vuelta["diplomacy"] = 1;
        vuelta["espionage"] = 1;
        vuelta["pottery"] = 1;
        vuelta["rider"] = 0;
        vuelta["instructor"] = 1;
        vuelta["bireme"] = 1;
        vuelta["shipwright"] = 1;
        vuelta["chariot"] = 0;
        vuelta["attack_ship"] = 0;
        vuelta["conscription"] = 1;
        vuelta["catapult"] = 0;
        vuelta["cryptography"] = 1;
        vuelta["colonize_ship"] = 0;
        vuelta["small_transporter"] = 1;
        vuelta["plow"] = 1;
        vuelta["berth"] = 1;
        vuelta["trireme"] = 0;
        vuelta["phalanx"] = 1;
        vuelta["breach"] = 0;
        vuelta["mathematics"] = 1;
        vuelta["ram"] = 1;
        vuelta["cartography"] = 1;
        vuelta["take_over_old"] = 0;
        vuelta["set_sail"] = 0;
        vuelta["temple_looting"] = 0;
        vuelta["divine_selection"] = 0;
    }
    else if(tipo == "lan_off") {       
        vuelta["slinger"] = 1;
        vuelta["archer"] = 0;
        vuelta["town_guard"] = 1;
        vuelta["hoplite"] = 1;
        vuelta["diplomacy"] = 1;
        vuelta["espionage"] = 1;
        vuelta["pottery"] = 1;
        vuelta["rider"] = 1;
        vuelta["instructor"] = 1;
        vuelta["bireme"] = 0;
        vuelta["shipwright"] = 1;
        vuelta["chariot"] = 0;
        vuelta["attack_ship"] = 1;
        vuelta["conscription"] = 1;
        vuelta["catapult"] = 1;
        vuelta["cryptography"] = 1;
        vuelta["colonize_ship"] = 0;
        vuelta["small_transporter"] = 1;
        vuelta["plow"] = 1;
        vuelta["berth"] = 1;
        vuelta["trireme"] = 0;
        vuelta["phalanx"] = 1;
        vuelta["breach"] = 0;
        vuelta["mathematics"] = 1;
        vuelta["ram"] = 1;
        vuelta["cartography"] = 1;
        vuelta["take_over_old"] = 0;
        vuelta["set_sail"] = 0;
        vuelta["temple_looting"] = 0;
        vuelta["divine_selection"] = 0;
    }
    else if(tipo == "nav_off") {       
        vuelta["slinger"] = 1;
        vuelta["archer"] = 0;
        vuelta["town_guard"] = 1;
        vuelta["hoplite"] = 0;
        vuelta["diplomacy"] = 1;
        vuelta["espionage"] = 1;
        vuelta["pottery"] = 1;
        vuelta["rider"] = 0;
        vuelta["instructor"] = 0;
        vuelta["bireme"] = 0;
        vuelta["shipwright"] = 1;
        vuelta["chariot"] = 0;
        vuelta["attack_ship"] = 1;
        vuelta["conscription"] = 0;
        vuelta["catapult"] = 0;
        vuelta["cryptography"] = 1;
        vuelta["colonize_ship"] = 0;
        vuelta["small_transporter"] = 0;
        vuelta["plow"] = 1;
        vuelta["berth"] = 0;
        vuelta["trireme"] = 0;
        vuelta["phalanx"] = 0;
        vuelta["breach"] = 0;
        vuelta["mathematics"] = 1;
        vuelta["ram"] = 1;
        vuelta["cartography"] = 1;
        vuelta["take_over_old"] = 0;
        vuelta["set_sail"] = 0;
        vuelta["temple_looting"] = 0;
        vuelta["divine_selection"] = 0;
    }
	else if(tipo == "lan_off1") {       
        vuelta["slinger"] = 1;
        vuelta["archer"] = 0;
        vuelta["town_guard"] = 1;
        vuelta["hoplite"] = 0;
        vuelta["diplomacy"] = 1;
        vuelta["espionage"] = 1;
        vuelta["pottery"] = 1;
        vuelta["rider"] = 0;
        vuelta["instructor"] = 1;
        vuelta["bireme"] = 0;
        vuelta["shipwright"] = 0;
        vuelta["chariot"] = 0;
        vuelta["attack_ship"] = 0;
        vuelta["conscription"] = 1;
        vuelta["catapult"] = 0;
        vuelta["cryptography"] = 1;
        vuelta["colonize_ship"] = 0;
        vuelta["small_transporter"] = 0;
        vuelta["plow"] = 1;
        vuelta["berth"] = 0;
        vuelta["trireme"] = 0;
        vuelta["phalanx"] = 1;
        vuelta["breach"] = 0;
        vuelta["mathematics"] = 0;
        vuelta["ram"] = 0;
        vuelta["cartography"] = 0;
        vuelta["take_over_old"] = 0;
        vuelta["set_sail"] = 0;
        vuelta["temple_looting"] = 1;
        vuelta["divine_selection"] = 1;
    }
    return vuelta;
}
//</editor-fold>
//<editor-fold defaultstate="collapsed" desc="function check_city_type_units( tipo )">
function check_city_type_units( tipo ) {
    var vuelta = [];
    if(tipo == "conquest") {
        vuelta["slinger"] = 0;
        vuelta["archer"] = 0;
        vuelta["hoplite"] = 400;
        vuelta["rider"] = 0;
        vuelta["chariot"] = 150;
        vuelta["catapult"] = 0;
        vuelta["sword"] = 0;
        vuelta["big_transporter"] = 32;
        vuelta["bireme"] = 0;
        vuelta["attack_ship"] = 0;
        vuelta["demolition_ship"] = 0;
        vuelta["small_transporter"] = 0;
        vuelta["trireme"] = 75;
        vuelta["colonize_ship"] = 1;
    }
    else if(tipo == "mix_def") {
        vuelta["slinger"] = 0;
        vuelta["archer"] = 120;
        vuelta["hoplite"] = 300;
        vuelta["rider"] = 0;
        vuelta["chariot"] = 0;
        vuelta["catapult"] = 0;
        vuelta["sword"] = 360;
        vuelta["big_transporter"] = 0;
        vuelta["bireme"] = 210;
        vuelta["attack_ship"] = 0;
        vuelta["demolition_ship"] = 0;
        vuelta["small_transporter"] = 49;
        vuelta["trireme"] = 0;
        vuelta["colonize_ship"] = 0;
    }
    else if(tipo == "lan_off") {
        vuelta["slinger"] = 500;
        vuelta["archer"] = 0;
        vuelta["hoplite"] = 500;
        vuelta["rider"] = 165;
        vuelta["chariot"] = 0;
        vuelta["catapult"] = 20;
        vuelta["sword"] = 0;
        vuelta["big_transporter"] = 0;
        vuelta["bireme"] = 0;
        vuelta["attack_ship"] = 50;
        vuelta["demolition_ship"] = 0;
        vuelta["small_transporter"] = 113;
        vuelta["trireme"] = 0;
        vuelta["colonize_ship"] = 0;
    }
    else if(tipo == "nav_off") {
        vuelta["slinger"] = 0;
        vuelta["archer"] = 0;
        vuelta["hoplite"] = 0;
        vuelta["rider"] = 0;
        vuelta["chariot"] = 0;
        vuelta["catapult"] = 0;
        vuelta["sword"] = 0;
        vuelta["big_transporter"] = 0;
        vuelta["bireme"] = 0;
        vuelta["attack_ship"] = 220;
        vuelta["demolition_ship"] = 0;
        vuelta["small_transporter"] = 0;
        vuelta["trireme"] = 0;
        vuelta["colonize_ship"] = 0;
    }
    else if(tipo == "lan_off1") {
        vuelta["harpy"] = 200;
        vuelta["archer"] = 0;
        vuelta["hoplite"] = 0;
        vuelta["rider"] = 0;
        vuelta["chariot"] = 0;
        vuelta["catapult"] = 0;
        vuelta["sword"] = 0;
        vuelta["big_transporter"] = 0;
        vuelta["bireme"] = 0;
        vuelta["attack_ship"] = 0;
        vuelta["demolition_ship"] = 0;
        vuelta["small_transporter"] = 0;
        vuelta["trireme"] = 0;
        vuelta["colonize_ship"] = 0;        
    }

    return vuelta;
}
//</editor-fold>

