/* global _ */

var Widgets = {
    string: {
        template: '<input type="text" class="form-control" placeholder="Condition name" aria-describedby="basic-addon1" value="<%= value %>">',
        populate: function ($el) {
            //alert (this.template);
        }
    },
    boolean: {
        template: "",
        populate: function () {
            
        }
    },
    number: {
        template: "",
        populate: function () {
            
        }
    },
    reference: {
        template: "",
        populate: function () {
            
        }
    },
    ConditionalAttributesSet: {
        template: '<select class="combobox"><option></option></select>',
        optiontemplate: _.template('<option value="<%= ky %>"><%= ky %></option>'),
        populate: function ($el, values) {
            for (var key in values) {
                $('.combobox', $el).append(this.optiontemplate({ky: key}));
            }
            
            //$('.combobox', $el).combobox();
        }
    }
};