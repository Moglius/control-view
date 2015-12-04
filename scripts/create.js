$(document).ready(function() {
    $('#signupForm')
        .on('init.field.fv', function(e, data) {
            var field  = data.field,        // Get the field name
                $field = data.element,      // Get the field element
                bv     = data.fv;           // FormValidation instance

            // Create a span element to show valid message
            // and place it right before the field
            var $span = $('<small/>')
                            .addClass('help-block validMessage')
                            .attr('data-field', field)
                            .insertAfter($field)
                            .hide();

            // Retrieve the valid message via getOptions()
            var message = bv.getOptions(field).validMessage;
            if (message) {
                $span.html(message);
            }
        })
        .controller('mainController', function($scope) {

        // function to submit the form after all validation has occurred
        $scope.submitForm = function() {

            // check to make sure the form is completely valid
            if ($scope.userForm.$valid) {
                alert('our form is amazing');
            }

        };

    });
