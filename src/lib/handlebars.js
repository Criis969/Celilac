const { format, register} = require("timeago.js");

const helpers = {};

helpers.timeago = (timestamp) => {
    register('es_ES', (number, index, total_sec) => [
        ['Justo ahora', 'Ahora mismo'],
        ['Hace %s segundos', 'en %s segundos'],
        ['Hace 1 minuto', 'en 1 minuto'],
        ['Hace %s minutos', 'en %s minutos'],
        ['Hace 1 hora', 'en 1 hora'],
        ['Hace %s horas', 'in %s horas'],
        ['Hace 1 dia', 'en 1 dia'],
        ['Hace %s dias', 'en %s dias'],
        ['Hace 1 semana', 'en 1 semana'],
        ['Hace %s semanas', 'en %s semanas'],
        ['1 mes', 'en 1 mes'],
        ['Hace %s meses', 'en %s meses'],
        ['Hace 1 año', 'en 1 año'],
        ['Hace %s años', 'en %s años']
    ][index]);
    return format(timestamp, "es_ES");
};

module.exports = helpers;