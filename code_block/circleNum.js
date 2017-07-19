function circleNum(n) {
    var arr = new Array(n);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(n);
    };
    //
    var length = n * n;
    var cell = range_(length)
    console.log(cell)
    var c = {
        "index": 1,
        "direction": -1
    }
    var r = {
        "index": 1,
        "direction": -1
    }
    var step = n - 1;
    var jo = 0;
    var i = 1;
    var _ = 0;
    var direction = {
        0: function() {
            c["direction"] = -Math.abs(c["direction"])
            return c
        },
        1: function() {
            r["direction"] = -Math.abs(r["direction"])
            return r
        },
        2: function() {
            c["direction"] = Math.abs(c["direction"])
            return c
        },
        3: function() {
            r["direction"] = Math.abs(r["direction"])
            return r
        }
    }

    var cishu = 0;

    while (i <= cell.length) {

        arr[r["index"] - 1][c["index"] - 1] = cell[i - 1];

        var step_num = Math.floor((i - 1) / ((n - 1) * 3)) == 0 ? 3 : 2;

        if (i - jo <= step) {

            var s = direction[_ % 4]();

            
            s["index"] = s["index"] - s["direction"]

            if (i - jo == step) {

                _++;

                jo = i;

                cishu++;

                if (cishu == step_num) {

                    step--;
                    cishu = 0
                }
            }
        }

        i++
    }

    function range_(start, stop, step) {
        if (arguments.length < 3) {
            step = 1;
            if (arguments.length < 2) {
                stop = start;
                start = 0;
            }
        }
        if ((stop - start) / step === Infinity) throw new Error("infinite range");
        var range = [],
            k = range_integerScale(Math.abs(step)),
            i = -1,
            j;
        start *= k, stop *= k, step *= k;
        if (step < 0)
            while ((j = start + step * ++i) > stop) range.push(range_interger_10(j / k));
        else
            while ((j = start + step * ++i) < stop) range.push(range_interger_10(j / k));
        return range;
    };

    function range_integerScale(x) {
        var k = 1;
        while (x * k % 1) k *= 10;
        return k;
    }

    function range_interger_10(a) {
        a = a >= 10 ? range_interger_10(a % 10) : a;
        return a;
    }
    for (var ii = 0; ii < n; ii++) {
    	console.log(arr[ii])
    }
    return arr;
}


var map = (function() {
        function map(n) {
            this.map = [], this.row = 0, this.col = -1, this.dir = 0, this.n = n;
            // 建立个二维数组
            for (var i = 0; i < this.n; i++) { this.map.push([]); }
            // 定义移动的顺序为 右，下，左，上
            var order = [this.right, this.bottom, this.left, this.up];
            i = 0;
            do {
                // 能移动则更新数字，否则更改方向
                order[this.dir % 4].call(this) ? i++ : this.dir++;
                // 赋值
                this.map[this.row][this.col] = i;
            } while (i < n * n);
        }
        map.prototype = {
            print: function() { for (var i = 0; i < this.n; i++) { console.log(this.map[i].join(' ')) } },
            // 向该方向移动
            left: function() { return this.move(this.row, this.col - 1); },
            right: function() { return this.move(this.row, this.col + 1); },
            up: function() { return this.move(this.row - 1, this.col); },
            bottom: function() { return this.move(this.row + 1, this.col); },
            // 如果坐标在范围内，并且目标没有值，条件满足则更新坐标
            move: function(row, col) {
                return (0 <= row && row < this.n) && (0 <= col && col < this.n) && !this.map[row][col] && (this.row = row, this.col = col, true);
            },
        };
        return map;
    })();