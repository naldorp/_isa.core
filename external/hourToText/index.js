exports.run = function(){
    var d = calcTime(-2);

    var result = '';
    
    if(d.getHours() > 1){
        result += 'são' + d.getHours() + ' horas';
    }
    else{
        result += d.getHours() + ' hora';
    }
    
    if(d.getMinutes() > 0){
        result += ' e '+d.getMinutes() + ' minutos';
    }
    
    return result;
}

function calcTime(offset) {
    var d = new Date();
    var utc = d.getTime() - (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000*offset));

    return nd;
}
