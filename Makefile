.PHONY: bootstrap test

BIN = ./node_modules/.bin

bootstrap:
	npm install

lint:
	$(BIN)/standard
