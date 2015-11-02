/**
 * Created by Crystian on 01/11/2015.
 */

var fs = require('fs');

require('shelljs/global');

function readJsonFile(f){
	return eval('('+fs.readFileSync(f,'utf8')+')');
}
function saveJsonFile(f, c){
	return fs.writeFileSync(f, JSON.stringify(c, null,'\t') , {encoding: 'utf8'});
}

var pkgjson = 'package.json';

describe("Full test for the build system of framework (fuaaa) - ", function(){
	it("should fill gitVersion field", function(){
		var test01 = 'templates/test/01';

		cd(test01);
		expect(readJsonFile(pkgjson).gitVersion).toBeUndefined();

		expect(exec('gulp nothing', {silent:true}).code).toBe(0);

		var pkg = readJsonFile(pkgjson);
		expect(pkg.gitVersion).toBeDefined();

		delete pkg.gitVersion;
		saveJsonFile(pkgjson,pkg);
	});

	//it("npm install", function()
	//{
	//	rm('-rf', 'node_modules');
	//	expect(test('-d', 'node_modules')).toBe(false);
	//	expect(exec('npm install', {silent:true}).code).toBe(0);
	//	expect(test('-d', 'node_modules')).toBe(true);
	//});

	//it("gulp nothing", function(){
	//	//rm('-rf', 'dist');
	//	//expect(test('-d', 'dist')).toBe(false);
	//	expect(exec('gulp nothing', {silent:true}).code).toBe(0);
	//	//expect(test('-f', 'dist/main.css')).toBe(true);
	//});

	//it("gulp src", function()
	//{
	//	rm('-rf', 'dist');
	//	expect(test('-d', 'dist')).toBe(false);
	//	expect(exec('gulp src', {silent:true}).code).toBe(0);
	//	expect(test('-f', 'dist/all.js')).toBe(true);
	//});
});