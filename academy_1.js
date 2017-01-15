
function Academy(town_id, col_town) {
      
    var IndexTownArray, edificio;
    
    Array_TowsData[town_id].academia = new Array();
    
    var AcademiaReal = ITowns.getTown( town_id ).researches().attributes;
            
    for (var key in GameData.researches) {
        //eidicio:      key
        //edicio level: EdificiosLevel[key].level
        Array_TowsData[town_id]["academia"][key] = AcademiaReal[key];

    }
    
    //actualizamos el nivel de los edificios sumando los edificios en cola de grepolis. 
    /*for ( var key in Array_Towns_ResearchsOrder ) {        

        if(!Array_Towns_ResearchsOrder[key].research_type) continue;
        
        edificio = Array_Towns_ResearchsOrder[key].research_type; 
        
        if( Array_Towns_ResearchsOrder[key].town_id == town_id ) Array_TowsData[town_id]["academia"][edificio] = true; 
        
    }*/
    
    //actualizamos el nivel de los edificios sumando los edificios en cola del bot. 
    for ( var key in a.queue.items ) {        
        if( !a.queue.items[key].module ) continue;
        if( a.queue.items[key].module == "docent" && a.queue.items[key].town == town_id ) {            
             Array_TowsData[town_id]["academia"][a.queue.items[key].item] = true;             
        }        
    }
       
    //si faltan cola en la academia la añadimos
    for ( var key in Array_TowsData[town_id]["academia"] ) {        
        
        if(key == "id") continue; 
        
        if(Array_TowsData[town_id]["academiatipo"][key] == 1) Array_TowsData[town_id]["academiatipo"][key] = true;
        else if(Array_TowsData[town_id]["academiatipo"][key] == 0) Array_TowsData[town_id]["academiatipo"][key] = false;

        if( Array_TowsData[town_id]["academiatipo"][key] == true && Array_TowsData[town_id]["academia"][key] == false ) {
            
            print_info( " AcademyBot:  ("+Array_Towns_Bot[col_town].name+"["+Array_Towns_Bot[col_town].id+"]) La actualización de la academia ("+key+") es " + Array_TowsData[town_id]["academia"][key] + " !=  " + Array_TowsData[town_id]["academiatipo"][key] + " || Añadir a la cola" ); 
                
            ajaxObj=new XMLHttpRequest();
            var url   = "https://botsoft.org/en/bot/ajaxv2/?hash="+c;
            var params = '{"key":"'+a.key+'","method":"docent:add","data":{"item":"'+key+'","module":"docent","fixed":false,"town":'+town_id+',"gold":0}}';  
            ajaxObj.open("POST",url,true);
            ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajaxObj.send(params);
            
            Array_TowsData[town_id]["academia"][key] = true;
            
            //cola_added = 1;                  
            
        }
        else if( Array_TowsData[town_id]["academiatipo"][key] == false && Array_TowsData[town_id]["academia"][key] == true ) {
            
            print_info( " AcademyBot:  ("+Array_Towns_Bot[col_town].name+"["+Array_Towns_Bot[col_town].id+"]) La actualización de la academia ("+key+") es " + Array_TowsData[town_id]["academia"][key] + " !=  " + Array_TowsData[town_id]["academiatipo"][key] + " || Borrar..." ); 
            
        }
        
    }
    
   

}

