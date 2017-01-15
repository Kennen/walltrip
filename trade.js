/*  Funcion que se ejecuta para ver si se puede comercia entre ciudades */
function comercio_entre_ciudades(town_id, col_town){   
    
    //if( !Array_TowsData[town_id].island_x ) continue;
    
    var max_resource = Trade_max_resource;    // Valor maximo de recursos para intercambiar.
    max_resource = (Array_TowsData[town_id].storage*max_resource)/100;
    max_resource = Math.round(max_resource);

    var id_town_send = town_id; 
    /*  ENVIO */
    if(Array_TowsData[town_id].wood > max_resource) check_receptor("wood", id_town_send, town_id, col_town);   
    if(Array_TowsData[town_id].stone > max_resource) check_receptor("stone", id_town_send, town_id, col_town);   
    if(Array_TowsData[town_id].iron > max_resource) check_receptor("iron", id_town_send, town_id, col_town);    

}

function comercio_entre_islas( TownId ){
    
    /*if(a.models.Town[TownId].attributes.island_id) {
        Array_TowsData[TownId].villages = new Array();
        a.ajaxRequestGet("island_info", "index", {
            island_id: a.models.Town[TownId].attributes.island_id,
            town_id: TownId
        }, function(a, b) {
            var e = b.json.farm_town_list;
            Array_TowsData[TownId]["villages"].push(e);
        }, "na");
    } */   
}

function comercio_entre_ciudades_new( TownId ) {
    
    var sender = ITowns.getTown( TownId );
    
    var max_resource = Trade_max_resource;    // Valor minimo de recuros que tenemos que tener para cargar la funcion
    max_resource = (sender.getStorage()*max_resource)/100;
    max_resource = Math.round(max_resource);
    //max_resource = 10000;
   
    if(sender.getCurrentResources().wood >= max_resource) {
        //console.log("le sobran recursos wood("+sender.name+"["+sender.id+"])");        
        angular.forEach(ITowns.towns, function(receptor) {
            
            var min_resuorce = Trade_min_resuorce;    // Valor minimo de recuros que tenemos que tener para cargar la funcion
            min_resuorce = (receptor.getStorage()*min_resuorce)/100;
            min_resuorce = Math.round(min_resuorce);
            
            if(receptor.getCurrentResources().wood <= min_resuorce && ITowns.getTown(sender.id).buildings().attributes.market > 10 && CountReceptor(receptor.id+'_wood', ArrayReceptor) <= 5 && CountReceptor(sender.id+'_iron', ArrayEmisor) <= 2) {
                var send_resuorce = Trade_send_resuorce;    // Cantidad de Recursos a enviar
                send_resuorce = (sender.getCurrentResources().wood*send_resuorce)/100;                 
                send_resuorce = Math.round(send_resuorce);

                if(send_resuorce > sender.getAvailableTradeCapacity()) send_resuorce = sender.getAvailableTradeCapacity();
                if(send_resuorce > 0) {                    
                    //console.log("le falta wood a ("+receptor.name+"["+receptor.id+"])");
                    ArrayReceptor.push(receptor.id+"_wood");
                    ArrayEmisor.push(sender.id+"_wood");
                    print_info( " TradeBot:  Comerciar entre Ciudades de ("+sender.name+"["+sender.id+"]) a ("+receptor.name+"["+receptor.id+"]) (wood: "+send_resuorce+")" );
                    send_recursos(0, send_resuorce, 0, receptor.id, sender.id);
                }
            }
            
        });        
    }
    
    if(sender.getCurrentResources().stone >= max_resource){
        //console.log("le sobran recursos stone("+sender.name+"["+sender.id+"])");
        angular.forEach(ITowns.towns, function(receptor) {
            
            var min_resuorce = Trade_min_resuorce;    // Valor minimo de recuros que tenemos que tener para cargar la funcion
            min_resuorce = (receptor.getStorage()*min_resuorce)/100;
            min_resuorce = Math.round(min_resuorce);
            
            if(receptor.getCurrentResources().stone <= min_resuorce && ITowns.getTown(sender.id).buildings().attributes.market > 10 && CountReceptor(receptor.id+'_stone', ArrayReceptor) <= 5 && CountReceptor(sender.id+'_stone', ArrayEmisor) <= 2) {
                var send_resuorce = Trade_send_resuorce;    // Cantidad de Recursos a enviar
                send_resuorce = (sender.getCurrentResources().stone*send_resuorce)/100;                 
                send_resuorce = Math.round(send_resuorce);

                if(send_resuorce > sender.getAvailableTradeCapacity()) send_resuorce = sender.getAvailableTradeCapacity();
                if(send_resuorce > 0) {                    
                    //console.log("le falta stone a ("+receptor.name+"["+receptor.id+"])");
                    ArrayReceptor.push(receptor.id+"_stone");
                    ArrayEmisor.push(sender.id+"_stone");
                    print_info( " TradeBot:  Comerciar entre Ciudades de ("+sender.name+"["+sender.id+"]) a ("+receptor.name+"["+receptor.id+"]) (stone: "+send_resuorce+")" );
                    send_recursos(send_resuorce, 0, 0, receptor.id, sender.id);
                }
            }
            
        });        
    }
    
    if(sender.getCurrentResources().iron >= 10000){
        //console.log("le sobran recursos iron("+sender.name+"["+sender.id+"])");
        angular.forEach(ITowns.towns, function(receptor) {
            
            var min_resuorce = Trade_min_resuorce;    // Valor minimo de recuros que tenemos que tener para cargar la funcion
            min_resuorce = (receptor.getStorage()*min_resuorce)/100;
            min_resuorce = Math.round(min_resuorce);
            
            if(receptor.getCurrentResources().iron <= min_resuorce && ITowns.getTown(sender.id).buildings().attributes.market > 10 && CountReceptor(receptor.id+'_iron', ArrayReceptor) <= 5 && CountReceptor(sender.id+'_iron', ArrayEmisor) <= 2) {
                var send_resuorce = Trade_send_resuorce;    // Cantidad de Recursos a enviar
                send_resuorce = (sender.getCurrentResources().iron*send_resuorce)/100;                 
                send_resuorce = Math.round(send_resuorce);

                if(send_resuorce > sender.getAvailableTradeCapacity()) send_resuorce = sender.getAvailableTradeCapacity();
                if(send_resuorce > 0) {                    
                    //console.log("le falta iron a ("+receptor.name+"["+receptor.id+"])");
                    ArrayReceptor.push(receptor.id+"_iron");
                    ArrayEmisor.push(sender.id+"_iron");
                    print_info( " TradeBot:  Comerciar entre Ciudades de ("+sender.name+"["+sender.id+"]) a ("+receptor.name+"["+receptor.id+"]) (iron: "+send_resuorce+")" ); 
                    send_recursos(0, 0, send_resuorce, receptor.id, sender.id);
                }
            }
            
        });         
    } 
    
}
/* Funcion "check_receptor()", para mandar recursos a las granjas */
function check_receptor(recurso, id_town_send, town_id, col_town)  {

    var send_resuorce = Trade_send_resuorce;    // Cantidad de Recursos a enviar
        if(recurso == "wood") send_resuorce = (ITowns.towns[town_id].getCurrentResources().wood*send_resuorce)/100;
        else if(recurso == "stone") send_resuorce = (ITowns.towns[town_id].getCurrentResources().stone*send_resuorce)/100;
        else if(recurso == "iron") send_resuorce = (ITowns.towns[town_id].getCurrentResources().iron*send_resuorce)/100;
        //send_resuorce = (Array_TowsData[town_id].storage*send_resuorce)/100;
    send_resuorce = Math.round(send_resuorce);
        
    if(send_resuorce > ITowns.towns[town_id].getAvailableTradeCapacity()) send_resuorce = ITowns.towns[town_id].getAvailableTradeCapacity();
    if(send_resuorce == 0) return;
    
     
    /* Bucle de ciudades para ver cual tiene pocos recursos */ 
    for ( var keyd in Array_Towns_Bot ) { 
        
        var id_town_receiber = Array_Towns_Bot[keyd].id;
        
        //var IndexSenderArray = ArraySender.indexOf(id_town_receiber);

        if( !Array_TowsData[id_town_receiber].island_x ) continue;
        //if(IndexSenderArray != -1) return;
        
        var min_resuorce = Trade_min_resuorce;    // Valor minimo de recuros que tenemos que tener para cargar la funcion
            min_resuorce = (Array_TowsData[id_town_receiber].storage*min_resuorce)/100;
            min_resuorce = Math.round(min_resuorce);
        
        if(recurso == "wood") {
            
            if(Array_TowsData[id_town_receiber].wood <= min_resuorce && Array_TowsData[id_town_send].edificios.market > 10)
            {                
                print_info( " TradeBot:  Comerciar entre Ciudades de ("+Array_TowsData[town_id].name+"["+Array_TowsData[town_id].id+"]) a ("+Array_TowsData[id_town_receiber].name+"["+Array_TowsData[id_town_receiber].id+"]) ("+recurso+": "+send_resuorce+")" ); 
                
                Array_TowsData[id_town_receiber].wood = Array_TowsData[id_town_receiber].wood + send_resuorce;
                
                send_recursos(0, send_resuorce, 0, Array_TowsData[id_town_receiber].id, Array_TowsData[town_id].id);
                /*ArraySender.push(id_town_receiber);*/
                continue;
            }
        }
        else if(recurso == "stone") {
            if(Array_TowsData[id_town_receiber].stone <= min_resuorce && Array_TowsData[id_town_send].edificios.market > 10)
            {                
                print_info( " TradeBot:  Comerciar entre Ciudades de ("+Array_TowsData[town_id].name+"["+Array_TowsData[town_id].id+"]) a ("+Array_TowsData[id_town_receiber].name+"["+Array_TowsData[id_town_receiber].id+"]) ("+recurso+": "+send_resuorce+")" ); 
                
                Array_TowsData[id_town_receiber].stone = Array_TowsData[id_town_receiber].stone + send_resuorce;
                
                send_recursos(send_resuorce, 0, 0, Array_TowsData[id_town_receiber].id, Array_TowsData[town_id].id);
                /*ArraySender.push(id_town_receiber);*/
                continue;
            }            
        }
        else if(recurso == "iron") {
            if(Array_TowsData[id_town_receiber].iron <= min_resuorce && Array_TowsData[id_town_send].edificios.market > 10)
            {   
                print_info( " TradeBot:  Comerciar entre Ciudades de ("+Array_TowsData[town_id].name+"["+Array_TowsData[town_id].id+"]) a ("+Array_TowsData[id_town_receiber].name+"["+Array_TowsData[id_town_receiber].id+"]) ("+recurso+": "+send_resuorce+")" ); 
                
                Array_TowsData[id_town_receiber].iron = Array_TowsData[id_town_receiber].iron + send_resuorce;
                
                send_recursos(0, 0, send_resuorce, Array_TowsData[id_town_receiber].id, Array_TowsData[town_id].id);
                /*ArraySender.push(id_town_receiber);*/
                continue;
            }            
        }
    }
}
function send_recursos(piedra, madera, iron, receptor, emisor) {
    var j = {
        stone: piedra,
        wood: madera,
        iron: iron,
        id: receptor,
        town_id: emisor
    };
     a.ajaxRequestPost("town_info", "trade", j, function(e, f) {            
        //print_info( " TradeBot:  Enviamos recuros de "+Bot_Array[i].name+" a "+Bot_Array[is].name+" [piedra:"+cantidad+"]");
    }, "queue"); 
}

