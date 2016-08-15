(function () {

	'use strict';

	angular
		.module('com.module.pokemons')
		.controller('EditPokemonsCtrl', function (pokemon, moves, PokemonService) {

			this.pokemon = pokemon;
			this.moves = moves;

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


		});

}) ();