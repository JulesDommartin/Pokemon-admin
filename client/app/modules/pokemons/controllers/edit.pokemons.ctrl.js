(function () {

	'use strict';

	angular
		.module('com.module.pokemons')
		.controller('EditPokemonsCtrl', function (pokemon, moves, PokemonService, $state) {

			this.pokemon = pokemon;
			this.moves = moves;

			console.log(this.pokemon);

			this.pokemon.moves = pokemon.moves.sort(PokemonService.sortBy('level_learned_at', false, null));

			$('#edit-moves').on('click', () => {
				$('#edit-moves-modal').modal({});
			});

			console.log(pokemon);

			this.deleteMove = function (move) {
				if (this.pokemon.moves.includes(move)) {
					var index = this.pokemon.moves.indexOf(move);
					this.pokemon.moves.splice(index, 1);
				} else {
					console.log(pokemon.name + " n'a pas cette attaque.");
				}
			};

			this.addMove = function () {
				this.pokemon.moves.push({
					id: null,
					name: '',
					level_learned_at: 1
				});	
				this.defaultMove.push({
					id: null,
					name: '',
					level_learned_at: 1
				});
			};

			this.changeAttack = function (index) {
				var selected = $('.move_select')[index].selectedIndex;
				this.defaultMove[index] = this.availableMoves[selected];
				this.pokemon.moves[index] = this.defaultMove[index];
				console.log(this.defaultMove);
			};

			this.savePokemon = function () {
				PokemonService.update(this.pokemon)
					.then((res) => {
						console.log(res);
						$('#edit-moves').modal('hide');
					})
					.catch((err) => {
						console.log(err);
					});
			};

			console.log(this.moves);

			this.availableMoves = [];

			this.defaultMove = [];

			for (var i = 0; i < this.pokemon.moves.length; i++) {
				this.defaultMove.push({
					id: null,
					name: '',
					level_learned_at: 1
				});
			} 

			for (var i = 0; i < this.moves.length; i++) {
				var availableMove = {
					id: this.moves[i].id,
					name: this.moves[i].names.fr,
					level_learned_at: 1
				};
				this.availableMoves.push(availableMove);
			}

			this.availableMoves.sort(PokemonService.sortBy('name', false, null));

			this.prevPok = function () {
				var id;
				if (this.pokemon.id == 1) {
					id = 1;
				} else {
					id = this.pokemon.id - 1;
				}
				$state.go('app.pokemons.edit', {id: id});
			};

			this.nextPok = function () {
				var id;
				if (this.pokemon.id == 151) {
					id = 151;
				} else {
					id = this.pokemon.id + 1;
				}
				$state.go('app.pokemons.edit', {id: id});
			};


		});

}) ();