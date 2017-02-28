ROLLUP = ./node_modules/.bin/rollup
KARMAJS = ./node_modules/karma/bin/karma

all: es6 umd umd-min

es6: dist/es.acheron.js
umd: dist/acheron.js
umd-min: dist/acheron.min.js

dist/acheron.js dist/acheron.js.map: src/*.js
	$(ROLLUP) -c build/rollup.umd.js

dist/acheron.min.js dist/acheron.min.js.map: src/*.js
	$(ROLLUP) -c build/rollup.umd.min.js

dist/es.acheron.js dist/es.acheron.js.map: src/*.js
	$(ROLLUP) -c build/rollup.es.js

clean:
	rm -rf dist
	rm -rf *.log

test:
	NODE_ENV=test $(KARMAJS) start --single-run
.PHONY: test
