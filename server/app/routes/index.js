/* Código simplório, apenas para fornecer o serviço para a aplicação */

var api = require('../api');

module.exports  = function(app) {
    
    app.route('/trades/week')
        .get(api.listaSemana);
        
    app.route('/trades/last-week')
        .get(api.listaAnterior);
        
    app.route('/trades/before-last-week')
        .get(api.listaRetrasada);  
        
    app.route('/trades')
        .post(api.cadastraNegociacao);          
};