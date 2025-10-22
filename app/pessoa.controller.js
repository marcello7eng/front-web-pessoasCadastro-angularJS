// app/pessoa.controller.js

angular.module('pessoaApp')
    .controller('PessoaController', ['$scope', 'PessoaService', function($scope, PessoaService) {

        // Modelos de dados ligados ao $scope
        $scope.pessoas = []; // A lista de pessoas da tabela
        $scope.pessoa = {};  // O objeto ligado ao formulário
        $scope.modoEdicao = false;

        // --- Funções ---

        // Função para carregar a lista de pessoas
        function carregarPessoas() {
            PessoaService.listar()
                .then(
                    function(response) { // Sucesso
                        $scope.pessoas = response.data;
                    },
                    function(error) { // Erro
                        console.error('Erro ao listar pessoas', error);
                        alert('Não foi possível carregar a lista.');
                    }
                );
        }

        // Função para limpar o formulário e o modo de edição
        $scope.limparFormulario = function() {
            $scope.pessoa = {};
            $scope.modoEdicao = false;
        };

        // Função chamada pelo botão "Salvar" ou "Atualizar"
        $scope.salvarOuAtualizar = function() {
            if ($scope.modoEdicao) {
                // --- ATUALIZAR (PUT) ---
                PessoaService.editar($scope.pessoa.id, $scope.pessoa)
                    .then(
                        function(success) {
                            alert('Pessoa atualizada com sucesso!');
                            $scope.limparFormulario();
                            carregarPessoas(); // Recarrega a lista
                        },
                        function(error) {
                            console.error('Erro ao atualizar', error);
                            alert('Erro ao atualizar pessoa.');
                        }
                    );
            } else {
                // --- CRIAR (POST) ---
                PessoaService.salvar($scope.pessoa)
                    .then(
                        function(success) {
                            alert('Pessoa salva com sucesso!');
                            $scope.limparFormulario();
                            carregarPessoas(); // Recarrega a lista
                        },
                        function(error) {
                            console.error('Erro ao salvar', error);
                            alert('Erro ao salvar pessoa.');
                        }
                    );
            }
        };

        // Função para colocar uma pessoa no formulário para edição
        $scope.prepararEdicao = function(pessoa) {
            // angular.copy() é IMPORTANTE!
            // Ele evita que a alteração no formulário mude a lista ANTES de salvar.
            $scope.pessoa = angular.copy(pessoa);
            $scope.modoEdicao = true;
        };

        // Função para apagar uma pessoa
        $scope.apagarPessoa = function(pessoa) {
            // Confirmação simples
            if (confirm('Tem certeza que deseja apagar ' + pessoa.nome + '?')) {
                PessoaService.apagar(pessoa.id)
                    .then(
                        function(success) {
                            alert('Pessoa apagada com sucesso!');
                            carregarPessoas(); // Recarrega a lista
                        },
                        function(error) {
                            console.error('Erro ao apagar', error);
                            alert('Erro ao apagar pessoa.');
                        }
                    );
            }
        };
        
        // --- Inicialização ---
        // Chama a função para carregar a lista assim que o controller é iniciado
        carregarPessoas();
    }]);