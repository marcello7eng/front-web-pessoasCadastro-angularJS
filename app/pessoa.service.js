// app/pessoa.service.js

angular.module('pessoaApp')
    // 'factory' é a forma mais comum de criar um serviço
    .factory('PessoaService', ['$http', function($http) {

        // A URL base da sua API
        var API_URL = 'http://localhost:8080/api/pessoas';

        // O objeto do serviço que será retornado
        var service = {};

        // GET /pessoas
        service.listar = function() {
            // $http retorna uma "Promise" (não um Observable)
            return $http.get(API_URL);
        };

        // POST /pessoas
        service.salvar = function(pessoa) {
            return $http.post(API_URL, pessoa);
        };

        // PUT /pessoas/{id}
        service.editar = function(id, pessoa) {
            return $http.put(API_URL + '/' + id, pessoa);
        };

        // DELETE /pessoas/{id}
        service.apagar = function(id) {
            return $http.delete(API_URL + '/' + id);
        };

        return service;
    }]);