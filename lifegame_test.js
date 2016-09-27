var i1,j1;

describe('init',function () {
	it('should be a function',function(){
		assert.isFunction(init);
	});
	it('should have two arguments',function(){
		assert.equal(init.length,2);
	});
	//测试棋盘初始化随机数为0或1
	it('should make chessboard in 0,1 range',function(){
		var checkflag = false;
		var testarr = init(100,100);
		for (i1 = 0 ; i1 < 100 ; i1++) 
			for (j1 = 0 ; j1 < 100 ; j1++)
				if ((testarr[i1*100+j1]!=0)&&(testarr[i1*100+j1]!=1))
					checkflag = true;
		assert.strictEqual(checkflag,false);
	});
});

describe('calc',function(){
	it('should be a function',function(){
		assert.isFunction(calc);
	});
	it('should have five arguments',function(){
		assert.equal(calc.length,5);
	});
	it('3 life',function(){
		var testarr = [1,0,0,0,0,0,1,0,1];
		var testresult = calc(1,1,3,3,testarr);
		assert.strictEqual(testresult,1);
	});
	it('2 life',function(){
		var testarr = [1,0,0,0,1,0,1,0,0];
		var testresult = calc(1,1,3,3,testarr);
		assert.strictEqual(testresult,1);
	});
	it('<=1 life',function(){
		var testarr = [0,0,0,0,1,0,1,0,0];
		var testresult = calc(1,1,3,3,testarr);
		assert.strictEqual(testresult,0);
	});
	it('>=4 life',function(){
		var testarr = [1,1,1,1,1,1,1,0,0];
		var testresult = calc(1,1,3,3,testarr);
		assert.strictEqual(testresult,0);
	});
});

describe('fresh',function(){
	it('should be a function',function(){
		assert.isFunction(fresh);
	});
	it('should have three arguments',function(){
		assert.equal(fresh.length,3);
	});
	it('one exampe : all life',function(){
		var testarr = [1,1,1,1,1,1,1,1,1];
		var testresult = fresh(3,3,testarr);
		var sum = 0;
		for (i1 = 0 ; i1 < 9 ; i1++)
			sum = sum + testresult[i1];
		assert.strictEqual(sum,0);
	});
})

describe('draw',function(){
	it('should be a function',function(){
		assert.isFunction(fresh);
	});
	it('should have three arguments',function(){
		assert.equal(fresh.length,3);
	});
})