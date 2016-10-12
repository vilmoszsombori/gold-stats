a=[]; b=[]; c=[];
var step = 1, dots = 10;
var b1 = 1,b2 = 2, b3 = 3;
for (var i = 0; i < dots * step; i = i + step) {
	for (var j = 0; j < dots * step; j = j + step) {
		a.push(i);
		b.push(j);
		c.push(b1 * i + b2 * j + b3);
	}
}

var plane = {
		opacity:0.8,
		color:'rgb(300,100,200)',
		type: 'mesh3d',
		x: a,
		y: b,
		z: c
	}; 
         
app.controller('controller', function($scope, $timeout, $parse) {
	$scope.data = [ plane ];
	$scope.layout = {
		height : 600,
		width : 1000,
		title : 'Rory'
	};
	$scope.options = {
		showLink : false,
		displayLogo : false
	};
	$scope.movePoint = function() {
		// deep watch will pick up change.
		console.log($scope.data);
		$scope.data[0].y[4]++;
	}
	$scope.NumberOfSelectedPoints = 0;
	$scope.plotlyEvents = function(graph) {
		// Create custom events that subscribe to graph	
		$scope.graph = graph;
		graph.on('plotly_selected', function(event) {
			if (event) {
				$timeout(function() {
					$scope.NumberOfSelectedPoints = event.points.length;
				});
			}
		});
	};
    $scope.csv = {
        content: null,
        header: true,
        headerVisible: false,
        separator: ',',
        separatorVisible: false,
        result: null,
        encoding: 'ISO-8859-1',
        encodingVisible: false,
        callback: function () {
            var xArray = [], yArray = [], zArray = [];
            for (var i = 0; i < $scope.csv.result.length; i++) {
                xArray.push($scope.csv.result[i].x);
                yArray.push($scope.csv.result[i].y);
                zArray.push($scope.csv.result[i].z);
            }
            console.log(xArray);
            $scope.xArray = xArray;
            $scope.data[1] =   {
                                   opacity: 0.5,
                                   type: 'scatter3d',
                                   x: xArray,
                                   y: yArray,
                                   z: zArray,
                                   mode: 'markers'
                               };
            Plotly.redraw($scope.graph);
        }
    };

    var _lastGoodResult = '';
    $scope.toPrettyJSON = function (json, tabWidth) {
        var objStr = JSON.stringify(json);
        var obj = null;
        try {
            obj = $parse(objStr)({});
        } catch (e) {
            // eat $parse error
            return _lastGoodResult;
        }

        var result = JSON.stringify(obj, null, Number(tabWidth));
        _lastGoodResult = result;

        return result;
    };
});

app.controller('usersController', function($scope) {
	$scope.headingTitle = "User List";
});

app.controller('rolesController', function($scope) {
	$scope.headingTitle = "Roles List";
});

app.controller('bootstrapController', [ '$scope', function($scope) {
	$scope.layout = function(gender) {
		$scope.result = gender;
	}
} ]);
