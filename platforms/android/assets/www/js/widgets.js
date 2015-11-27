/* global _ */

var Widgets = {
    string: {
        template: '<input type="text" class="form-control" placeholder="Condition name" aria-describedby="basic-addon-<%= id %>" value="<%= value %>">',
        populate: function () {
            //alert (this.template);
        }
    },
    boolean: {
        template: "",
        populate: function () {
            
        }
    },
    number: {
        template: '<input type="number" class="form-control" placeholder="Condition name" aria-describedby="basic-addon-<%= id %>" value="<%= value %>">',
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
        populate: function (values) {
            for (var key in values) {
                $('.combobox', this.$el).append(this.optiontemplate({ky: key}));
            }
            
            $('.combobox', this.$el).combobox();
        }
    }
};