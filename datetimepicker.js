angular.module('ui.bootstrap.datetimepicker',
    ["ui.bootstrap.dateparser", "ui.bootstrap.datepicker", "ui.bootstrap.timepicker"]
  )
  .directive('datepickerPopup', function (){
   return {
    restrict: 'EAC',
    require: 'ngModel',
    link: function(scope, element, attr, controller) {
      controller.$formatters.shift();
    }
   }
  })
  .directive('datetimepicker', [
    function() {
      if (angular.version.full < '1.1.4') {
        return {
          restrict: 'EA',
          template: "<div class=\"alert alert-danger\">Angular 1.1.4 or above is required for datetimepicker to work correctly</div>"
        };
      }
      return {
        restrict: 'EA',
        require: 'ngModel',
        scope: {
          ngModel: '=',
          dayFormat: "=",
          monthFormat: "=",
          yearFormat: "=",
          dayHeaderFormat: "=",
          dayTitleFormat: "=",
          monthTitleFormat: "=",
          showWeeks: "=",
          startingDay: "=",
          yearRange: "=",
          dateFormat: "=",
          minDate: "=",
          maxDate: "=",
          dateOptions: "=",
          dateDisabled: "&",
          hourStep: "=",
          minuteStep: "=",
          showMeridian: "=",
          meredians: "=",
          mousewheel: "=",
          placeholder: "=",
          readonlyTime: "@",
          ngDisabled: "=",
          utcMode: "="
        },
        template: function(elem, attrs) {
          function dashCase(name, separator) {
            return name.replace(/[A-Z]/g, function(letter, pos) {
              return (pos ? '-' : '') + letter.toLowerCase();
            });
          }

          function createAttr(innerAttr, dateTimeAttrOpt) {
            var dateTimeAttr = angular.isDefined(dateTimeAttrOpt) ? dateTimeAttrOpt : innerAttr;
            if (attrs[dateTimeAttr]) {
              return dashCase(innerAttr) + "=\"" + dateTimeAttr + "\" ";
            } else {
              return '';
            }
          }

          function createFuncAttr(innerAttr, funcArgs, dateTimeAttrOpt) {
            var dateTimeAttr = angular.isDefined(dateTimeAttrOpt) ? dateTimeAttrOpt : innerAttr;
            if (attrs[dateTimeAttr]) {
              return dashCase(innerAttr) + "=\"" + dateTimeAttr + "({" + funcArgs + "})\" ";
            } else {
              return '';
            }
          }

          function createEvalAttr(innerAttr, dateTimeAttrOpt) {
            var dateTimeAttr = angular.isDefined(dateTimeAttrOpt) ? dateTimeAttrOpt : innerAttr;
            if (attrs[dateTimeAttr]) {
              return dashCase(innerAttr) + "=\"" + attrs[dateTimeAttr] + "\" ";
            } else {
              return dashCase(innerAttr);
            }
          }

          function createAttrConcat(previousAttrs, attr) {
            return previousAttrs + createAttr.apply(null, attr)
          }
          var tmpl = "<div class=\"datetimepicker-wrapper\">" +
            "<input class=\"form-control\" type=\"text\" " +
              "ng-click=\"open($event)\" " +
              "ng-change=\"date_change($event)\" " +
              "is-open=\"opened\" " +
              "ng-model=\"ngModel\" " + [
              ["minDate"],
              ["maxDate"],
              ["dayFormat"],
              ["monthFormat"],
              ["yearFormat"],
              ["dayHeaderFormat"],
              ["dayTitleFormat"],
              ["monthTitleFormat"],
              ["startingDay"],
              ["yearRange"],
              ["datepickerOptions", "dateOptions"],
              ["ngDisabled"]
          ].reduce(createAttrConcat, '') +
            createFuncAttr("dateDisabled", "date: date, mode: mode") +
            createEvalAttr("datepickerPopup", "dateFormat") +
            createEvalAttr("placeholder", "placeholder") +
            "/>\n" +
            "</div>\n";
          return tmpl;
        },
        controller: ['$scope',
          function($scope) {

            $scope.date_change = function() {
              var time = $scope.time;
              if($scope.ngModel.getHours() == 0) {
                $scope.ngModel.setHours($scope.ngModel.getHours() + 1);
              }
            };

            $scope.time_change = function() {
            };
              
            $scope.open = function($event) {
              $event.preventDefault();
              $event.stopPropagation();
              $scope.opened = true;
            };
          }
        ],
        link: function(scope, element) {
          var firstTimeAssign = true;

          scope.$watch(function() {
            return scope.ngModel;
          }, function(newTime) {
            if (true) {
            }
          }, true);
        }
      }
    }
  ]);
