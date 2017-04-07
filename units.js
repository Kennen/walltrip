
function Units(town_id, col_town) {
    
    if ( Array_TowsData[town_id]["available_population"] < 10) return;
      
    var amount, unidad;
    var UnitsTown = ITowns.getTown(town_id).units();
    var UnitsOuter = ITowns.getTown(town_id).unitsOuter();
    var UnitsSupport = ITowns.getTown(town_id).unitsSupport();
    var UnitCreandose  = ITowns.getTown(town_id).getUnitOrdersCollection()["models"];
    var naval = 0;
    var ground = 0;
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
            
            if(UnitCreandose[irr].attributes.kind == "ground") ++ground;
            else if(UnitCreandose[irr].attributes.kind == "naval") ++naval;
            
            Array_TowsData[town_id]["units"][UnitCreandose[irr].attributes.unit_type] = Array_TowsData[town_id]["units"][UnitCreandose[irr].attributes.unit_type] + 1;
        
        }
    }
    
    //Forzamos a crear colono en las ciudades de conquista
    if(Array_TowsData[town_id].name.length == 5 && Array_TowsData[town_id]["units"]["colonize_ship"] == 0 && a.recruiter.active == true) {
        
        if( check_addresources( 'unidades', "colonize_ship", town_id ) == true ) {
            var e = {
                        town_id: town_id,
                        unit_id: "colonize_ship",
                        amount: 1
                    };       
            a.ajaxRequestPost(GameData.buildings["docks"].controller, "build", e, {
                    success: function() {

                    },
                    error: function(d, e) {

                    }
                });
            Array_TowsData[town_id]["units"]["colonize_ship"] = Array_TowsData[town_id]["units"]["colonize_ship"] + 1;
            ++naval;
        }
        return;
    }  
    
    //Creamos las siguientes unidades terrestres
    for (var key in Array_Game_Units["Land"]) {
        
        if(ground >= 7) break;
        
        var unidad2 = Array_Game_Units["Land"][key];
        
        if(!Array_TowsData[town_id]["units"][unidad2])  Array_TowsData[town_id]["units"][unidad2] = 0;   
        if(!Array_TowsData[town_id]["unitstipo"][unidad2])  Array_TowsData[town_id]["unitstipo"][unidad2] = 0;
        
        // Comprobamos que no tengamos el maximo de unidades
        if ( Array_TowsData[town_id]["units"][unidad2] < Array_TowsData[town_id]["unitstipo"][unidad2]  && a.recruiter.active == true ) {
            
            if( check_addresources( 'unidades', unidad2, town_id ) == false ) {
                //print_info( " UnitBot:  ("+Array_TowsData[town_id].name+"["+Array_TowsData[town_id].id+"]) La unidad "+unidad2+" ( "+Array_TowsData[town_id]["units"][unidad2]+"<"+Array_TowsData[town_id]["unitstipo"][unidad2]+" ) || No hay recursos" );
                continue;
            }
            
            print_info( " UnitBot:  ("+Array_TowsData[town_id].name+"["+Array_TowsData[town_id].id+"]) La unidad "+unidad2+" ( "+Array_TowsData[town_id]["units"][unidad2]+"<"+Array_TowsData[town_id]["unitstipo"][unidad2]+" ) || Añadir a la cola" );
            var e = {
                    town_id: town_id,
                    unit_id: unidad2,
                    amount: 1
                };
                
            a.ajaxRequestPost(GameData.buildings["barracks"].controller, "build", e, {
                    success: function() {
                        
                    },
                    error: function(d, e) {
                        
                    }
                });
                
            Array_TowsData[town_id]["units"][unidad2] = Array_TowsData[town_id]["units"][unidad2] + 1;
            ++ground;
        }        
    }
    
    //Forzamos a crear botes de transporte
    if(naval < 7) {
        var unidad2 = "small_transporter";
        if ( Array_TowsData[town_id]["units"][unidad2] < Array_TowsData[town_id]["unitstipo"][unidad2]  && a.recruiter.active == true ) {
            if( check_addresources( 'unidades',  unidad2, town_id ) == true ) {
                //print_info( " UnitBot:  ("+Array_TowsData[town_id].name+"["+Array_TowsData[town_id].id+"]) La unidad "+unidad2+" ( "+Array_TowsData[town_id]["units"][unidad2]+"<"+Array_TowsData[town_id]["unitstipo"][unidad2]+" ) || No hay recursos" );
                var e = {
                    town_id: town_id,
                    unit_id: unidad2,
                    amount: 1
                };
                
                a.ajaxRequestPost(GameData.buildings["docks"].controller, "build", e, {
                        success: function() {

                        },
                        error: function(d, e) {

                        }
                    });

                Array_TowsData[town_id]["units"][unidad2] = Array_TowsData[town_id]["units"][unidad2] + 1;
            }    
        }
        ++naval;
    }
    
    //Creamos las siguientes unidades navales
    for (var key in Array_Game_Units["Sea"]) {
        
        if(naval >= 7) break;
        
        var unidad2 = Array_Game_Units["Sea"][key];
        
        if(!Array_TowsData[town_id]["units"][unidad2])  Array_TowsData[town_id]["units"][unidad2] = 0;   
        if(!Array_TowsData[town_id]["unitstipo"][unidad2])  Array_TowsData[town_id]["unitstipo"][unidad2] = 0;

        // Comprobamos que no tengamos el maximo de unidades
        if ( Array_TowsData[town_id]["units"][unidad2] < Array_TowsData[town_id]["unitstipo"][unidad2]  && a.recruiter.active == true ) {
            
            if( check_addresources( 'unidades',  unidad2, town_id ) == false ) {
                //print_info( " UnitBot:  ("+Array_TowsData[town_id].name+"["+Array_TowsData[town_id].id+"]) La unidad "+unidad2+" ( "+Array_TowsData[town_id]["units"][unidad2]+"<"+Array_TowsData[town_id]["unitstipo"][unidad2]+" ) || No hay recursos" );
                continue;
            }
            
            //print_info( " UnitBot:  ("+Array_TowsData[town_id].name+"["+Array_TowsData[town_id].id+"]) La unidad "+unidad2+" ( "+Array_TowsData[town_id]["units"][unidad2]+"<"+Array_TowsData[town_id]["unitstipo"][unidad2]+" ) || Añadir a la cola" );
            
            var e = {
                    town_id: town_id,
                    unit_id: unidad2,
                    amount: 1
                };
                
            a.ajaxRequestPost(GameData.buildings["docks"].controller, "build", e, {
                    success: function() {
                        
                    },
                    error: function(d, e) {
                        
                    }
                });
                
            Array_TowsData[town_id]["units"][unidad2] = Array_TowsData[town_id]["units"][unidad2] + 1;        
            ++naval;
        }        
    }
    
    $.ajax(
    {      
        url: 'https://localhost/grepolis/updateUnits.php',
        type: "POST",
        async: false,
        data: 'json={"types":[{"type":"map","param":{"x":10,"y":4}},{"type":"bar"},{"type":"backbone"}],"town_id":'+Game.townId+',"nl_init":false}',
        dataType: 'html',
        contentType: "application/json; charset=utf-8",
        success: function( sasa ) {
            console.log(sasa);
        }
    });
    
    
    print_debug( " ------------------------------------------------- ");
    return;



}

