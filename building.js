function Building(town_id, col_town) {
      
    var edificio, num_cola = 0;
    var h = new GameModels.BuildingOrder();
    var g;
    
    Array_TowsData[town_id].edificios   = new Array();      
    var EdificiosLevel                  = ITowns.getTown(town_id).buildings().attributes;
    var EdificiosCreandose              = ITowns.getTown(town_id).buildingOrders()["models"];
    
    //Sacamos el nivel actual del edificio.
    for (var key in GameData.buildings) {
        //eidicio:      key
        //edicio level: EdificiosLevel[key].level
        Array_TowsData[town_id]["edificios"][key] = EdificiosLevel[key];

    }
    //Sumamos el nivel que tiene a los que se estan creando.
    for (var is = 0; is < EdificiosCreandose.length; is++) { 
        var edificio_creandose = EdificiosCreandose[is].attributes.building_type;
        Array_TowsData[town_id]["edificios"][edificio_creandose] = Array_TowsData[town_id]["edificios"][edificio_creandose] + 1;
    }          
    //Volvemos a sumar el nivel a la cola del bot.
    var cola_total = 0;
    for ( var keys in a.queue.items ) { 
        if( !a.queue.items[keys].module ) continue;
        if( a.queue.items[keys].module == "foreman" && a.queue.items[keys].town == Array_TowsData[town_id].id ) {
            Array_TowsData[town_id]["edificios"][a.queue.items[keys].item] = Array_TowsData[town_id]["edificios"][a.queue.items[keys].item] + 1; 
            cola_total = 1;
        }
    }
  
      
    //si faltan nivele al edificio los añadimos al bot.
    for ( var key in Array_TowsData[town_id]["edificios"] ) {        
        
        if(key == "id") continue; 
  
        if( Array_TowsData[town_id]["edificios"][key] < Array_TowsData[town_id]["tipo"][key] ) {
            
            var i = 0;
            var bucle_count = Array_TowsData[town_id]["tipo"][key] - Array_TowsData[town_id]["edificios"][key];
            while (i < bucle_count) {
                
                print_info( " BuildBot:  ("+Array_Towns_Bot[col_town].name+"["+Array_Towns_Bot[col_town].id+"]) El edificio[lvl."+Array_TowsData[town_id]["edificios"][key]+"] ("+key+") < " + Array_TowsData[town_id]["tipo"][key] + " || Añadir a la cola" ); 
                
                ajaxObj=new XMLHttpRequest();
                var url   = "https://botsoft.org/en/bot/ajaxv2/?hash="+c;
                var params = '{"key":"'+a.key+'","method":"foreman:add","data":{"item":"'+key+'","town":'+town_id+',"type":"main","fixed":false,"gold":0}}';  
                ajaxObj.open("POST",url,true);
                ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                ajaxObj.send(params);

                Array_TowsData[town_id]["edificios"][key] = Array_TowsData[town_id]["edificios"][key] + 1; 

                cola_added = 1;
                
                ++i; 
            }            
            ++num_cola;           
            
        }
        
        else if( ( Array_TowsData[town_id]["edificios"][key] > Array_TowsData[town_id]["tipo"][key] ) && ( Array_TowsData[town_id]["tipo"][key] != 0 ) ) {
            
            if( num_cola < 1 && cola_total == 1 ) {                
                print_info( " BuildBot:  ("+Array_Towns_Bot[col_town].name+"["+Array_Towns_Bot[col_town].id+"]) El edificio[lvl."+Array_TowsData[town_id]["edificios"][key]+"] ("+key+") > " + Array_TowsData[town_id]["tipo"][key] + " || Destruir" ); 
                
                /*a.runAtTown(town_id, function() {
                    h.execute("tearDown", {
                        building_id: key,
                        town_id: town_id,
                        build_for_gold: false
                    }, g);
                });*/
                
                // Si el edificio a demoler es la academia que me avise por mail.
                /*sendMail(
                        "oditek.telecom@gmail.com",
                        " BuildBot:  ("+Array_Towns_Bot[col_town].name+"["+Array_Towns_Bot[col_town].id+"]) El edificio[lvl."+Array_TowsData[town_id]["edificios"][key]+"] ("+key+") > " + Array_TowsData[town_id]["tipo"][key] + " || Destruir"
                );*/
                if(key == "academy") {
                    /*sendMail(
                        "oditek.telecom@gmail.com",
                        " BuildBot:  ("+Array_Towns_Bot[col_town].name+"["+Array_Towns_Bot[col_town].id+"]) El edificio[lvl."+Array_Towns_BuildingsNoInc[town_id][0][key]+"] ("+key+") > " + Array_TowsData[town_id]["tipo"][key] + " || Destruir"
                    );*/
                }
                
                //Array_TowsData[town_id]["edificios"][key] = Array_TowsData[town_id]["edificios"][key] - 1;                
                //cola_added = 1;
                //++num_cola;                
            }          
        }        
    }
}

