'use strict';

function QuizModel(id, cards, imageUrl) {
	this.pack = new Pack(id, cards, imageUrl);
	this.currentIndex = 0;

	this.getShuffledCards = function getShuffledCards() {
		var mycards = new Array();
		var index = 0;

		for (var i = 0; i < this.pack.cards.length; i++) {
			if (this.pack.cards[i].id != this.getCurrentCard().id) {
				mycards[index] = cards[i];
				index++;
			}
		}
		mycards[index] = this.getCurrentCard();
		shuffle(mycards);
		return mycards;

	};

	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}

	this.getCurrentCard = function getCurrentCard() {
		return this.pack.cards[this.currentIndex];

	};

	this.incrementIndex = function incrementIndex() {
		if (this.currentIndex < this.pack.cards.length - 1) {
			this.currentIndex = this.currentIndex + 1;
		} else {
			this.currentIndex = 0;
		}
	};

};

function PackViewerModel(id, cards, imageUrl) {
	this.pack = new Pack(id, cards, imageUrl);
	this.currentIndex = 0;

	this.getCurrentCard = function getCurrentCard() {
		return this.pack.cards[this.currentIndex];

	};

	this.incrementIndex = function incrementIndex() {
		if (this.currentIndex < this.pack.cards.length - 1) {
			this.currentIndex = this.currentIndex + 1;
		} else {
			this.currentIndex = 0;
		}
	};

	this.getInfo = function getInfo() {
		return this.pack.getInfo();
	};

};

function Pack(id, cards, imageUrl) {

	this.id = id;
	this.imageUrl = imageUrl;
	this.cards = cards;

	this.getInfo = function getInfo() {
		return this.id;
	};

};

