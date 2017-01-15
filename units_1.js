
function Units(town_id, col_town) {
      
    var amount, unidad;
    var UnitsTown = ITowns.getTown(town_id).units();
    var UnitsOuter = ITowns.getTown(town_id).unitsOuter();
    var UnitsSupport = ITowns.getTown(town_id).unitsSupport();
    var UnitCreandose  = ITowns.getTown(town_id).getUnitOrdersCollection()["models"];
    var Array_Units_Bot_Cola = [];
    Array_TowsData[town_id].units = new Array();
    
    if(!Array_Units_Bot_Cola[town_id]) Array_Units_Bot_Cola[town_id] = new Array();
    else Array_Units_Bot_Cola[town_id] = [];
    
    //SACAMOS LAS UNIDADES QUE HAY EN CASA + LAS DE FUERA
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

            Array_TowsData[town_id]["units"][unidad] = amount;
        } 
    }  
    //SUMAMOS LAS UNIDADES QUE HAY CREANDOSE.
    for (var irr = 0; irr < UnitCreandose.length; irr++) {
        if(UnitCreandose[irr].attributes.town_id == town_id) {
            Array_TowsData[town_id]["units"][UnitCreandose[irr].attributes.unit_type] = Array_TowsData[town_id]["units"][UnitCreandose[irr].attributes.unit_type] + 1;
        }
    }
    
    
    //actualizamos las unidades sumando los unidades en cola del bot. 
    for ( var key in a.queue.items ) {
        if( !a.queue.items[key].module ) continue;        
        if( a.queue.items[key].module == "recruiter" && a.queue.items[key].town == town_id ) {            
            Array_Units_Bot_Cola[town_id].push(a.queue.items[key]);            
        }       
    }
    
    
    for (var key in Array_Game_Units["Land"]) {
        
        var unidad2 = Array_Game_Units["Land"][key];
        var hay_cola = false;
        var id_hay_cola;
        
        if(!Array_TowsData[town_id]["units"][unidad2])  Array_TowsData[town_id]["units"][unidad2] = 0;   
        if(!Array_TowsData[town_id]["unitstipo"][unidad2])  Array_TowsData[town_id]["unitstipo"][unidad2] = 0;
        
        // Comprobamos que no tengamos el maximo de unidades
        if ( Array_TowsData[town_id]["units"][unidad2] < Array_TowsData[town_id]["unitstipo"][unidad2] ) {
            
            for ( var key1 in Array_Units_Bot_Cola[town_id] ) {
                if( !Array_Units_Bot_Cola[town_id][key1].module ) continue;
                // Comprobamos si hay cola de esta unidad y la creamos                
                if( ( Array_Units_Bot_Cola[town_id][key1].module == "recruiter" && Array_Units_Bot_Cola[town_id][key1].town == town_id ) && unidad2 == Array_Units_Bot_Cola[town_id][key1].item ) {
                    // Ya esta en la cola
                    hay_cola = true;
                }
            }
            
            if( hay_cola == false ) {
                
                print_info( " UnitBot:  ("+Array_Towns_Bot[col_town].name+"["+Array_Towns_Bot[col_town].id+"]) La unidad "+unidad2+" ( "+Array_TowsData[town_id]["units"][unidad2]+"<"+Array_TowsData[town_id]["unitstipo"][unidad2]+" ) || Añadir a la cola" );
                
                ajaxObj=new XMLHttpRequest();
                var url   = "https://botsoft.org/en/bot/ajaxv2/?hash="+c;
                var params = '{"key":"'+a.key+'","method":"recruiter:add","data":{"item":"'+unidad2+'","count":1,"town":'+town_id+',"type":"barracks","usePower":false,"repeat":true,"fixed":false,"gold":0}}';  
                ajaxObj.open("POST",url,true);
                ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                ajaxObj.send(params);
               
                cola_added = 1; 
                 
            } 
        }
               
        
        else if ( Array_TowsData[town_id]["units"][unidad2] >= Array_TowsData[town_id]["unitstipo"][unidad2] ) {            
            hay_cola = false;            
            for ( var key1 in Array_Units_Bot_Cola[town_id] ) {
                if( !Array_Units_Bot_Cola[town_id][key1].module ) continue;
                // Comprobamos si hay cola de esta unidad y la creamos                
                if( ( Array_Units_Bot_Cola[town_id][key1].module == "recruiter" && Array_Units_Bot_Cola[town_id][key1].town == town_id ) && unidad2 == Array_Units_Bot_Cola[town_id][key1].item ) {
                    // Ya esta en la cola
                    hay_cola = true;
                    id_hay_cola = Array_Units_Bot_Cola[town_id][key1].id;
                }
            }
            
            if( hay_cola == true ) {                
                print_info( " UnitBot:  ("+Array_Towns_Bot[col_town].name+"["+Array_Towns_Bot[col_town].id+"]) La unidad "+unidad2+" ( "+Array_TowsData[town_id]["units"][unidad2]+">="+Array_TowsData[town_id]["unitstipo"][unidad2]+" ) || Sacar de la cola" );
                  
                // Comprobamos si hay cola de esta unidad y la creamos                
                // Ya esta en la cola
                var id_hay_cola2 = Array_Units_Bot_Cola[town_id][key1].id;
                ajaxObj=new XMLHttpRequest();
                var url   = "https://botsoft.org/en/bot/ajaxv2/?hash="+c;
                var params = '{"key":"'+a.key+'","method":"queue:remove","data":{"id":'+id_hay_cola2+'}}';  
                ajaxObj.open("POST",url,true);
                ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                ajaxObj.send(params);  
                    
                cola_added = 1;                
            } 
        }
        
    }
    
    for (var key in Array_Game_Units["Sea"]) {
        
        var unidad2 = Array_Game_Units["Sea"][key];
        var hay_cola = false;
        var id_hay_cola;
        
        if(!Array_TowsData[town_id]["units"][unidad2])  Array_TowsData[town_id]["units"][unidad2] = 0;   
        if(!Array_TowsData[town_id]["unitstipo"][unidad2])  Array_TowsData[town_id]["unitstipo"][unidad2] = 0;
        
        // Comprobamos que no tengamos el maximo de unidades
        if ( Array_TowsData[town_id]["units"][unidad2] < Array_TowsData[town_id]["unitstipo"][unidad2] ) {
            
            for ( var key1 in Array_Units_Bot_Cola[town_id] ) {
                if( !Array_Units_Bot_Cola[town_id][key1].module ) continue;
                // Comprobamos si hay cola de esta unidad y la creamos                
                if( ( Array_Units_Bot_Cola[town_id][key1].module == "recruiter" && Array_Units_Bot_Cola[town_id][key1].town == town_id ) && unidad2 == Array_Units_Bot_Cola[town_id][key1].item ) {
                    // Ya esta en la cola
                    hay_cola = true;
                }
            }
            
            if( hay_cola == false ) {                
                print_info( " UnitBot:  ("+Array_Towns_Bot[col_town].name+"["+Array_Towns_Bot[col_town].id+"]) La unidad "+unidad2+" ( "+Array_TowsData[town_id]["units"][unidad2]+"<"+Array_TowsData[town_id]["unitstipo"][unidad2]+" ) || Añadir a la cola" );
                
                ajaxObj=new XMLHttpRequest();
                var url   = "https://botsoft.org/en/bot/ajaxv2/?hash="+c;
                var params = '{"key":"'+a.key+'","method":"recruiter:add","data":{"item":"'+unidad2+'","count":1,"town":'+town_id+',"type":"docks","usePower":false,"repeat":true,"fixed":false,"gold":0}}';  
                ajaxObj.open("POST",url,true);
                ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                ajaxObj.send(params);
               
                cola_added = 1; 
                 
            } 
        }
               
        
        else if ( Array_TowsData[town_id]["units"][unidad2] >= Array_TowsData[town_id]["unitstipo"][unidad2] ) {
            
            hay_cola = false;
            
            for ( var key1 in Array_Units_Bot_Cola[town_id] ) { 
                if( !Array_Units_Bot_Cola[town_id][key1].module ) continue;
                // Comprobamos si hay cola de esta unidad y la creamos                
                if( ( Array_Units_Bot_Cola[town_id][key1].module == "recruiter" && Array_Units_Bot_Cola[town_id][key1].town == town_id ) && unidad2 == Array_Units_Bot_Cola[town_id][key1].item ) {
                    // Ya esta en la cola
                    hay_cola = true;
                    id_hay_cola = Array_Units_Bot_Cola[town_id][key1].id;
                }
            }
            
            if( hay_cola == true ) {
                
                print_info( " UnitBot:  ("+Array_Towns_Bot[col_town].name+"["+Array_Towns_Bot[col_town].id+"]) La unidad "+unidad2+" ( "+Array_TowsData[town_id]["units"][unidad2]+">="+Array_TowsData[town_id]["unitstipo"][unidad2]+" ) || Sacar de la cola" );
                
                for ( var key1tt in Array_Units_Bot_Cola[town_id] ) {
                    if( !Array_Units_Bot_Cola[town_id][key1tt].module ) continue;
                    // Comprobamos si hay cola de esta unidad y la creamos                
                    if( ( Array_Units_Bot_Cola[town_id][key1tt].module == "recruiter" && Array_Units_Bot_Cola[town_id][key1tt].town == town_id ) && unidad2 == Array_Units_Bot_Cola[town_id][key1].item ) {
                        // Ya esta en la cola
                        var id_hay_cola2 = Array_Units_Bot_Cola[town_id][key1].id;
                        ajaxObj=new XMLHttpRequest();
                        var url   = "https://botsoft.org/en/bot/ajaxv2/?hash="+c;
                        var params = '{"key":"'+a.key+'","method":"queue:remove","data":{"id":'+id_hay_cola2+'}}';  
                        ajaxObj.open("POST",url,true);
                        ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        ajaxObj.send(params);  
                    }
                }
                
                cola_added = 1;                
            } 
        }
        
    }

    
    
    //console.log(Array_Units_Bot_Cola);
    
    //console.log(Array_Towns_UnitsHome);
    print_debug( " ------------------------------------------------- ");
    return;



}

