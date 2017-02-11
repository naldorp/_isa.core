exports.run = function(){
    var d = calcTime(-2);
    
    return "são "+ d.getHours() + " horas e " + d.getMinutes() + " minutos";
}

function calcTime(offset) {
    var d = new Date();
    var utc = d.getTime() - (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000*offset));

    return nd;
}
