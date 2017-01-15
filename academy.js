
function Academy(town_id, col_town) {
      
    var IndexTownArray, edificio;
    
    Array_TowsData[town_id].academia = new Array();
    
    var AcademiaReal = ITowns.getTown( town_id ).researches().attributes;
            
    for (var key in GameData.researches) {
        //eidicio:      key
        //edicio level: EdificiosLevel[key].level
        Array_TowsData[town_id]["academia"][key] = AcademiaReal[key];

    }      
    
       
    //si faltan cola en la academia la añadimos
    for ( var key in Array_TowsData[town_id]["academia"] ) {        
        
        if(key == "id") continue; 
        //console.log(key);
        //console.log("---");
        
        if(Array_TowsData[town_id]["academiatipo"][key] == 1) Array_TowsData[town_id]["academiatipo"][key] = true;
        else if(Array_TowsData[town_id]["academiatipo"][key] == 0) Array_TowsData[town_id]["academiatipo"][key] = false;

        if( Array_TowsData[town_id]["academiatipo"][key] == true && Array_TowsData[town_id]["academia"][key] == false ) {
           
            if( check_addresources( 'academy', key, town_id ) == false ) {
                //print_info( " AcademyBot:  ("+Array_Towns_Bot[col_town].name+"["+Array_Towns_Bot[col_town].id+"]) La actualización de la academia ("+key+") es " + Array_TowsData[town_id]["academia"][key] + " !=  " + Array_TowsData[town_id]["academiatipo"][key] + " || No hay recursos" ); 
                continue;
            }
            
            print_info( " AcademyBot:  ("+Array_Towns_Bot[col_town].name+"["+Array_Towns_Bot[col_town].id+"]) La actualización de la academia ("+key+") es " + Array_TowsData[town_id]["academia"][key] + " !=  " + Array_TowsData[town_id]["academiatipo"][key] + " || Añadir a la cola" ); 
                
            var g = new GameModels.ResearchOrder({
                research_type: key
            });
            a.runAtTown(town_id, function() {                
                g.research(function() {
                    
                });
            });
            
            Array_TowsData[town_id]["academia"][key] = true;
            
            //cola_added = 1;                  
            
        }
        else if( Array_TowsData[town_id]["academiatipo"][key] == false && Array_TowsData[town_id]["academia"][key] == true ) {
            
            print_info( " AcademyBot:  ("+Array_Towns_Bot[col_town].name+"["+Array_Towns_Bot[col_town].id+"]) La actualización de la academia ("+key+") es " + Array_TowsData[town_id]["academia"][key] + " !=  " + Array_TowsData[town_id]["academiatipo"][key] + " || Borrar..." ); 
            
        }
        
    }
    
   

}

