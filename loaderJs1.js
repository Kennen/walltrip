
var Bot_Array = new Array();


var enable_bot = false;  
var builds_max;


var trade_sended = 10;
var trade_exced = 80;
var trade_low = 30;

// DEBUG EDICIFIOS
var debug_añadir_edificios = false;
var debug_añadir_unidades = false;

var debug_mode = true;

var created = false;

function cargarjs() {    
      
    console.log("<<<<< EJECUTADO INJECT >>>>>");    
    
    //SACAMOS LAS CIUDADES QUE TENEMOS POR ID
    var i = 0;
    for (var key in ITowns.towns) { 
        Bot_Array[i] = new Array();
        Bot_Array[i].id = ITowns.towns[key].id;
        Bot_Array[i].name = ITowns.towns[key].name;        
        Bot_Array[i].tipo = new Array();                
        Bot_Array[i].unitstipo = new Array();
        
        if (Bot_Array[i].name.length == 4)  {
            var tipe_text = "maticoras";
            Bot_Array[i]["tipo_text"] = tipe_text;
            Bot_Array[i]["tipo"] = check_city_type(tipe_text);
            Bot_Array[i]["unitstipo"] = check_city_type_units(tipe_text);
        }
        else if (Bot_Array[i].name.length == 5) {
            var tipe_text = "conquest";
            Bot_Array[i]["tipo_text"] = tipe_text;
            Bot_Array[i]["tipo"] = check_city_type(tipe_text);
            Bot_Array[i]["unitstipo"] = check_city_type_units(tipe_text);
        }
        else if (Bot_Array[i].name.length == 6) {
            var tipe_text = "nav_def";
            Bot_Array[i]["tipo_text"] = tipe_text;
            Bot_Array[i]["tipo"] =  check_city_type(tipe_text);
            Bot_Array[i]["unitstipo"] =  check_city_type_units(tipe_text);
        }
        else if (Bot_Array[i].name.length == 7) {
            var tipe_text = "nav_off";
            Bot_Array[i]["tipo_text"] = tipe_text;
            Bot_Array[i]["tipo"] = check_city_type(tipe_text);
            Bot_Array[i]["unitstipo"] = check_city_type_units(tipe_text);
        }
        else if (Bot_Array[i].name.length == 8) {
            var tipe_text = "mix_def";
            Bot_Array[i]["tipo_text"] = tipe_text;
            Bot_Array[i]["tipo"] = check_city_type(tipe_text);
            Bot_Array[i]["unitstipo"] = check_city_type_units(tipe_text);
        } 
        else if (Bot_Array[i].name.length == 9) {
            var tipe_text = "land_off";
            Bot_Array[i]["tipo_text"] = tipe_text;
            Bot_Array[i]["tipo"] = check_city_type(tipe_text);
            Bot_Array[i]["unitstipo"] = check_city_type_units(tipe_text);
        }
        ++i;        
    }  
    
  
    
    if( enable_bot == true )  {  
        //SACAMOS LAS UNIDADES TOTALES  POR CIUDAD    
        for (var i = 0; i < Bot_Array.length; i++) {         
            Bot_Array[i].units = new Array();        
            var amount, unidad;
            var UnitsTown = ITowns.getTown(Bot_Array[i].id).units();
            var UnitsOuter = ITowns.getTown(Bot_Array[i].id).unitsOuter();
            var UnitsSupport = ITowns.getTown(Bot_Array[i].id).unitsSupport();
            var UnitCreandose  = ITowns.getTown(Bot_Array[i].id).getUnitOrdersCollection()["models"];
            
            
            for (var key in GameData.units) {
                if(UnitsTown[GameData.units[key].id] || UnitsOuter[GameData.units[key].id] || UnitsSupport[GameData.units[key].id]) {

                    if(!UnitsOuter[GameData.units[key].id])
                        UnitsOuter[GameData.units[key].id] = 0;
                    if(!UnitsSupport[GameData.units[key].id])
                        UnitsSupport[GameData.units[key].id] = 0;
                    if(!UnitsTown[GameData.units[key].id])
                        UnitsTown[GameData.units[key].id] = 0;

                    amount = UnitsTown[GameData.units[key].id] + UnitsOuter[GameData.units[key].id] + UnitsSupport[GameData.units[key].id];
                    unidad = GameData.units[key].id;

                    Bot_Array[i]["units"][unidad] = amount;

                } 
            }  
            
            for (var irr = 0; irr < UnitCreandose.length; irr++) {
                if(UnitCreandose[irr].attributes.town_id == Bot_Array[i].id) {
                    Bot_Array[i]["units"][UnitCreandose[irr].attributes.unit_type] = Bot_Array[i]["units"][UnitCreandose[irr].attributes.unit_type] + 1;
                }
            }            
            
            //COMPROBAMOS SI HACE FALTA AÑADIR COLA O SACAR DE LA COLA A LAS UNIDADES
            console.log(Bot_Array[i]["unitstipo"]);

            Object.keys( Bot_Array[i]["unitstipo"] ).forEach(function (key) {
                
                var unidad_encola = false;

                // SI HAY MENOS UNIDADES DE LAS QUE DEBERIA COMPROBAMOS SI ESTA EN COLA             
                if( Bot_Array[i]["units"][key] < Bot_Array[i]["unitstipo"][key] || !Bot_Array[i]["units"][key]) {                    
                    for ( var keysr in a.queue.items ) {
                        
                        if( !a.queue.items[keysr].module ) continue;                                          
                        
                        if( ( a.queue.items[keysr].module == "recruiter" && a.queue.items[keysr].town == Bot_Array[i].id ) && a.queue.items[keysr].item == key ) {                          
                            unidad_encola = true;
                            //console.log(Bot_Array[i].name +" || "+a.queue.items[keysr].item +" aa "+key);
                        }
                    }
                    //AÑADIMOS LA UNDIAD A LA COLA
                    if( unidad_encola == false && debug_añadir_unidades == true ) {
                        
                        created = true;                        
                        var unidadd = "barracks";                        
                        if(GameData.units[key].is_naval == true) unidad = "docks";
                        
                        ajaxObj=new XMLHttpRequest();
                        var url   = "https://botsoft.org/en/bot/ajaxv2/?hash="+c;
                        var params = '{"key":"'+a.key+'","method":"recruiter:add","data":{"item":"'+key+'","count":1,"town":'+Bot_Array[i].id+',"type":"'+unidadd+'","usePower":false,"repeat":true,"fixed":false,"gold":0}}';  
                        ajaxObj.open("POST",url,true);
                        ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        ajaxObj.send(params)
                        
                        console.log(Bot_Array[i].name+"("+Bot_Array[i].tipo_text+") hay que crear "+key+" [hay: "+Bot_Array[i]["units"][key]+" | necesito: "+Bot_Array[i]["unitstipo"][key]+"]");
                    }
                } 
                // SI YA TENEMOS EL TOTAL DE UNIDADES O NOS HEMOS PASADO
                else if( Bot_Array[i]["units"][key] >= Bot_Array[i]["unitstipo"][key] ) {      
                    
                    for ( var keysqq in a.queue.items ) { 
                        if( !a.queue.items[keysqq].module ) continue;
                        if(     a.queue.items[keysqq].module == "recruiter" && 
                                a.queue.items[keysqq].town == Bot_Array[i].id && 
                                a.queue.items[keysqq].item == key &&
                                debug_añadir_unidades == true
                            ) {    
                        
                            created = true;
                            
                            ajaxObj=new XMLHttpRequest();
                            var url   = "https://botsoft.org/en/bot/ajaxv2/?hash="+c;
                            var params = '{"key":"'+a.key+'","method":"queue:remove","data":{"id":'+a.queue.items[keysqq].id+'}}';  
                            ajaxObj.open("POST",url,true);
                            ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                            ajaxObj.send(params);
                            
                            console.log(Bot_Array[i].name+"("+Bot_Array[i].tipo_text+") le quitamos de la cola "+key+" [hay: "+Bot_Array[i]["units"][key]+" | necesito: "+Bot_Array[i]["unitstipo"][key]+"]");
                            
                        }
                    }
                    
                } 
                
             });

        }
        
        //SACAMOS LOS EDIFICIOS  POR CIUDAD      
        for (var i = 0; i < Bot_Array.length; i++) {         
            Bot_Array[i].edificios = new Array();        
            var EdificiosLevel      = ITowns.getTown(Bot_Array[i].id).buildings().attributes;
            var EdificiosCreandose  = ITowns.getTown(Bot_Array[i].id).buildingOrders()["models"];
            
            for (var key in GameData.buildings) {
                //eidicio:      key
                //edicio level: EdificiosLevel[key].level
                Bot_Array[i]["edificios"][key] = EdificiosLevel[key];

            }

            for (var is = 0; is < EdificiosCreandose.length; is++) { 
                var edificio_creandose = EdificiosCreandose[is].attributes.building_type;
                Bot_Array[i]["edificios"][edificio_creandose] = Bot_Array[i]["edificios"][edificio_creandose] + 1;
            }          
            
            
            for ( var keys in a.queue.items ) { 
                if( !a.queue.items[keys].module ) continue;
                if( a.queue.items[keys].module == "foreman" && a.queue.items[keys].town == Bot_Array[i].id ) {

                    Bot_Array[i]["edificios"][a.queue.items[keys].item] = Bot_Array[i]["edificios"][a.queue.items[keys].item] + 1; 

                }
            }
        }
        
        //SI FALTAN NIVELES AL EDIFICIO LOS AÑADIMOS AL BOT
        for (var i = 0; i < Bot_Array.length; i++) {
  
            for (var key in GameData.buildings) {
                //COMPROBAMOS SI HAY EDIFICIOS POR AÑADIR
                var levelsUp = 0;
                if( Bot_Array[i]["edificios"][key] < Bot_Array[i]["tipo"][key] ) {
                    levelsUp = Bot_Array[i]["tipo"][key] - Bot_Array[i]["edificios"][key];
   
                    print_info( " BuildBot:  ("+Bot_Array[i].name+"["+Bot_Array[i].id+"]) El edificio[lvl."+Bot_Array[i]["edificios"][key]+"] ("+key+") < " + Bot_Array[i]["tipo"][key] + " || Añadir a la cola ("+levelsUp+" lvls)" ); 
                
                    //Bucle para añadir a la cola los niveles que faltan
                    if(debug_añadir_edificios == true) {
                        console.log("OK");
                        for (var ir = 0; ir < levelsUp; ir++) {
                            ajaxObj=new XMLHttpRequest();
                            var url   = "https://botsoft.org/en/bot/ajaxv2/?hash="+c;
                            var params = '{"key":"'+a.key+'","method":"foreman:add","data":{"item":"'+key+'","town":'+Bot_Array[i].id+',"type":"main","fixed":false,"gold":0}}';  
                            ajaxObj.open("POST",url,true);
                            ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                            ajaxObj.send(params);
                        }
                    }
                } else if( Bot_Array[i]["edificios"][key] > Bot_Array[i]["tipo"][key] ) {
                    levelsUp = Bot_Array[i]["edificios"][key] - Bot_Array[i]["tipo"][key];
                    print_info( " BuildBot:  ("+Bot_Array[i].name+"["+Bot_Array[i].id+"]) El edificio[lvl."+Bot_Array[i]["edificios"][key]+"] ("+key+") > " + Bot_Array[i]["tipo"][key] + " || Destruir ("+levelsUp+" lvls)" );            
                }
            }            
        }  
        
        //SACAMOS DATOS ACADEMIA    
        for (var i = 0; i < Bot_Array.length; i++) {         
            Bot_Array[i].academia = new Array();
            //var AcademiaReal      = ITowns.getTown(Bot_Array[i].id).researches().attributes;
            var caca = Object.keys(ITowns.getTown( Bot_Array[i].id ).researches()._events["all"][0].context._byId)[Object.keys(ITowns.getTown( Bot_Array[i].id ).researches()._events["all"][0].context._byId).length-1];
            var AcademiaReal = ITowns.getTown( Bot_Array[i].id ).researches()._events["all"][0].context._byId[caca].attributes;
            
            for (var key in GameData.researches) {
                //eidicio:      key
                //edicio level: EdificiosLevel[key].level
                Bot_Array[i]["academia"][key] = AcademiaReal[key];

            }
        }
        
        if(created == true) {
            reload_bot();
        }
        
    } 
    
  
    
    //console.log( GameData.researches ); 
    console.log( ITowns.getTown( 13282 ).researches().attributes ); 
    console.log( ITowns.getTown( 13282 ) ); 
    console.log( ITowns.getTown( 13282 ).buildings().attributes );            
    console.log( Array_TowsData[13282].edificios.market );             
    
    console.log("<<<<< CERRANDO INJECT >>>>>");
    
    
    
}



//SIN USARSE
var bucle_send_trade;
function BucleTrade( id ) {
    bucle_send_trade = '';
    bucle_send_trade = new Array();
    if( id == 0 ) {
        print_info( " BuildBot: Cargamos el modulo TRADE " );
        setTimeout(function() {
            BucleTrade( 1 );
        }, 1800000);
        return true;
    }

//SACAMOS LOS RECURSOS DE CADA ALDEA
    for (var i = 0; i < Bot_Array.length; i++) {        
        Bot_Array[i].resources = new Array();
        var response    = ITowns.getTown( Bot_Array[i].id ).resources();
        var max_storage = ITowns.getTown( Bot_Array[i].id ).getStorage();
        var max_trade_cap = ITowns.getTown( Bot_Array[i].id ).getAvailableTradeCapacity();
        Bot_Array[i]["resources"]["max_storage"] = max_storage;
        Bot_Array[i]["resources"]["max_trade_cap"] = max_trade_cap;
        
        for ( var key in response ) {
            Bot_Array[i]["resources"][key] = response[key];
        }
    }
//VEMOS QUIEN LE SOBRA Y A QUIEN LE HACEN FALTA RECURSOS
    for (var i = 0; i < Bot_Array.length; i++) {
        //console.log("buble: "+Bot_Array[i].name);
        var piedra = Bot_Array[i]["resources"]["stone"];
        var madera = Bot_Array[i]["resources"]["wood"];
        var plata = Bot_Array[i]["resources"]["iron"];
        var max_res = Bot_Array[i]["resources"]["max_storage"];
        
        //BUSCAMOS EN CADA RECURSO QUIEN PUEDE ENVIAR
        if( Math.round( ( piedra * 100 ) / max_res ) >= trade_exced ) {
            for (var is = 0; is < Bot_Array.length; is++) {
                var piedras = Bot_Array[is]["resources"]["stone"];
                var max_ress = Bot_Array[is]["resources"]["max_storage"];
                if( Math.round( ( piedras * 100 ) / max_ress ) <= trade_low ) { 
                    var index = functiontofindIndexByKeyValue(bucle_send_trade, "to_id", Bot_Array[is].id);
                    if(index === undefined || index === null) {
                        var cantidad = Math.round( ( trade_sended * piedra ) / 100 );
                        var j = {
                            stone: cantidad,
                            wood: 0,
                            iron: 0,
                            id: Bot_Array[is].id,
                            town_id: Bot_Array[i].id
                        };
                         a.ajaxRequestPost("town_info", "trade", j, function(e, f) {            
                            print_info( " TradeBot:  Enviamos recuros de "+Bot_Array[i].name+" a "+Bot_Array[is].name+" [piedra:"+cantidad+"]");
                        }, "queue"); 
                    }
                }
            } 
        }
        if( Math.round( ( madera * 100 ) / max_res ) >= trade_exced ) { 
            for (var is = 0; is < Bot_Array.length; is++) {
                var maderas = Bot_Array[is]["resources"]["wood"];
                var max_ress = Bot_Array[is]["resources"]["max_storage"];
                if( Math.round( ( maderas * 100 ) / max_ress ) <= trade_low ) { 
                    var index = functiontofindIndexByKeyValue(bucle_send_trade, "to_id", Bot_Array[is].id);
                    if(index === undefined || index === null) {
                        var cantidad = Math.round( ( trade_sended * madera ) / 100 );
                        var j = {
                            stone: 0,
                            wood: cantidad,
                            iron: 0,
                            id: Bot_Array[is].id,
                            town_id: Bot_Array[i].id
                        };
                         a.ajaxRequestPost("town_info", "trade", j, function(e, f) {            
                            print_info( " TradeBot:  Enviamos recuros de "+Bot_Array[i].name+" a "+Bot_Array[is].name+" [madera:"+cantidad+"]");
                        }, "queue"); 
                    }
                }
            }
        }
        if( Math.round( ( plata * 100 ) / max_res ) >= trade_exced ) { 
            for (var is = 0; is < Bot_Array.length; is++) {
                var platas = Bot_Array[is]["resources"]["iron"];
                var max_ress = Bot_Array[is]["resources"]["max_storage"];
                if( Math.round( ( platas * 100 ) / max_ress ) <= trade_low ) { 
                    var index = functiontofindIndexByKeyValue(bucle_send_trade, "to_id", Bot_Array[is].id);
                    if(index === undefined || index === null) {
                        var cantidad = Math.round( ( trade_sended * plata ) / 100 );
                        var j = {
                            stone: 0,
                            wood: 0,
                            iron: cantidad,
                            id: Bot_Array[is].id,
                            town_id: Bot_Array[i].id
                        };
                         a.ajaxRequestPost("town_info", "trade", j, function(e, f) {            
                            print_info( " TradeBot:  Enviamos recuros de "+Bot_Array[i].name+" a "+Bot_Array[is].name+" [plata:"+cantidad+"]");
                        }, "queue"); 
                       
                    }
                }
            }
        }       
    }

    //if( id == 1 ) SendTrade( bucle_send_trade );    
  
//CARGAMOS EL BUCLE CADA X MINUTOS
/*setTimeout(function() {
    BucleTrade( 1 );
}, 60000);
  */ 
}

/*
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
        vuelta["market"] = 30;
        vuelta["docks"] = 30;
        vuelta["barracks"] = 30;
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
        vuelta["market"] = 20;
        vuelta["docks"] = 30;
        vuelta["barracks"] = 1;
        vuelta["wall"] = 25;
        vuelta["academy"] = 30;
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
        vuelta["market"] = 20;
        vuelta["docks"] = 30;
        vuelta["barracks"] = 30;
        vuelta["wall"] = 25;
        vuelta["academy"] = 30;
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
        vuelta["market"] = 20;
        vuelta["docks"] = 30;
        vuelta["barracks"] = 30;
        vuelta["wall"] = 25;
        vuelta["academy"] = 30;
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
        vuelta["market"] = 20;
        vuelta["docks"] = 30;
        vuelta["barracks"] = 1;
        vuelta["wall"] = 25;
        vuelta["academy"] = 30;
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
    else if(tipo == "land_off1") {
        vuelta["main"] = 24;
        vuelta["hide"] = 10;
        vuelta["storage"] = 30;
        vuelta["farm"] = 45;
        vuelta["lumber"] = 35;
        vuelta["stoner"] = 20;
        vuelta["ironer"] = 32;
        vuelta["market"] = 20;
        vuelta["docks"] = 1;
        vuelta["barracks"] = 30;
        vuelta["wall"] = 25;
        vuelta["academy"] = 35;
        vuelta["temple"] = 35;
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
        vuelta["market"] = 30;
        vuelta["docks"] = 1;
        vuelta["barracks"] = 30;
        vuelta["wall"] = 25;
        vuelta["academy"] = 30;
        vuelta["temple"] = 35;
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
        vuelta["hoplite"] = 400;
        vuelta["slinger"] = 300;
        vuelta["rider"] = 100; // * 3 = 150
        vuelta["big_transporter"] = 38; // * 32 = 1216
        vuelta["attack_ship"] = 100;
        vuelta["colonize_ship"] = 1;
        vuelta["bireme"] = 100;
    }
    else if(tipo == "nav_def") {
        vuelta["bireme"] = 330;
    }
    else if(tipo == "land_off") {
        vuelta["rider"] = 250;
        vuelta["attack_ship"] = 100;
        vuelta["catapult"] = 25;
        vuelta["small_transporter"] = 93;
        vuelta["slinger"] = 750;
    }
    else if(tipo == "mix_def") {
        vuelta["sword"] = 360;
        vuelta["archer"] = 120;
        vuelta["hoplite"] = 300;
        vuelta["small_transporter"] = 49;
        vuelta["bireme"] = 210;
    }
    else if(tipo == "maticoras") {
        vuelta["manticore"] = 50;
        vuelta["attack_ship"] = 100;
        vuelta["small_transporter"] = 32;
        vuelta["slinger"] = 500;
    }
    else if(tipo == "nav_off") {
        vuelta["attack_ship"] = 330;
    }
   

    return vuelta;
}
//</editor-fold>
*/

cargarjs();

