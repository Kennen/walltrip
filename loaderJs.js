
//get_island_data(10966);
//console.log(Array_TowsData);

function cacaca( TownId ) {  
        
    var sender = ITowns.getTown( TownId );

    var max_resource = Trade_max_resource;    // Valor minimo de recuros que tenemos que tener para cargar la funcion
    max_resource = (sender.getStorage()*max_resource)/100;
    max_resource = Math.round(max_resource);
    
    var min_resuorce = Trade_min_resuorce;    // Valor minimo de recuros que tenemos que tener para cargar la funcion
    min_resuorce = (sender.getStorage()*min_resuorce)/100;
    min_resuorce = Math.round(min_resuorce);

    if( sender.getCurrentResources().wood >= max_resource && ( sender.getCurrentResources().stone <= min_resuorce || sender.getCurrentResources().iron <= min_resuorce ) ) {
        if(sender.getCurrentResources().stone <= min_resuorce) {
            console.log(sender.id+" sobra wood necesitamos stone");
        }
        if(sender.getCurrentResources().iron <= min_resuorce) {
            console.log(sender.id+"sobra wood necesitamos iron");
        }               
    }

    if( sender.getCurrentResources().stone >= max_resource && ( sender.getCurrentResources().wood <= min_resuorce || sender.getCurrentResources().iron <= min_resuorce ) ) {
        if(sender.getCurrentResources().wood <= min_resuorce) {
            console.log(sender.id+"sobra stone necesitamos wood");
        }
        if(sender.getCurrentResources().iron <= min_resuorce) {
            console.log(sender.id+"sobra stone necesitamos iron");
        }
    }

    if( sender.getCurrentResources().iron >= max_resource && ( sender.getCurrentResources().wood <= min_resuorce || sender.getCurrentResources().stone <= min_resuorce ) ) {
        if(sender.getCurrentResources().wood <= min_resuorce) {
            console.log(sender.id+"sobra iron necesitamos wood");
        }
        if(sender.getCurrentResources().stone <= min_resuorce) {
            console.log(sender.id+"sobra iron necesitamos stone");
        }
    }
}


angular.forEach(ITowns.towns, function(sender) {
    //cacaca(sender.id);
});

console.log(Array_TowsData);
//toolTin("info", "([town]{0}[/town]) {1} ({2})", 222, 1, 2).msg().send();

angular.forEach(ITowns.getTowns(), function(c) {
    var d = a.models.Town[c.id];
    //console.log(d.get("island_id"));  
    
});


