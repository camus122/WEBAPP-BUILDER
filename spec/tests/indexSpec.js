/**
 * Created by Crystian on 01/11/2015.
 */
var cheerio = require('cheerio');
require('shelljs/global');

var testFolder = 'spec/fixture/index',
		rootFwk = '../../../..',
		pathLoader = '/loader',
		index = '/index.html';

describe("Index template to index - ", function(){

	beforeEach(function(){
		cd(testFolder);
		//createPkgJson();
	});
	afterEach(function(){
		cd(rootFwk);
	});


	it('(01) should create a copy', function(){
		cd('01');

		rm('-rf', rootFwk + pathLoader + index);
		expect(test('-e', rootFwk + pathLoader + index)).toBe(false);

		expect(exec('gulp makeIndex --noUpdateGit', {silent:true}).code).toBe(0);

		expect(test('-e', rootFwk + pathLoader + index)).toBe(true);
	});

	it('(01) should modificate metadata', function(){
		cd('01');

		expect(exec('gulp makeIndex --noUpdateGit', {silent:true}).code).toBe(0);

		var indexContent = cat(rootFwk +'/'+ pathLoader +'/'+ index);
		$ = cheerio.load(indexContent);

		expect($('#viewport').attr('content')).toBe('Test1');
		expect($('#contentSecurity').attr('content')).toBe('Test2');
		expect($('#pageTitle').html()).toBe('Test3');
		expect($('#pageDescription').attr('content')).toBe('Test4');
		expect($('#pageKeyword').attr('content')).toBe('Test5');
		expect($('#pageAuthor').attr('content')).toBe('Test6');
		expect($('#noscript').html()).toBe('Test7');
	});

	it('(02) should replace quote on contentSecurity', function(){
		cd('02');

		expect(exec('gulp makeIndex --noUpdateGit', {silent:true}).code).toBe(0);

		var indexContent = cat(rootFwk +'/'+ pathLoader +'/'+ index);
		$ = cheerio.load(indexContent);

		expect($('#contentSecurity').attr('content')).toBe('Test2');
	});

});